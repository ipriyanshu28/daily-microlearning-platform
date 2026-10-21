from fastapi import APIRouter, Depends, HTTPException, Response, status
from app.api.deps import get_current_user
from app.core.config import settings
from app.core.security import create_access_token
from app.schemas.user import (
    UserRegister,
    UserLogin,
    UserResponse,
    PreferencesUpdate,
)
from app.services.user_service import user_service

router = APIRouter()

COOKIE_NAME = "access_token"
COOKIE_MAX_AGE = 60 * 60 * 24 * 7  # 7 days


def _set_auth_cookie(response: Response, token: str) -> None:
    """Sets a secure, HttpOnly session cookie on the response."""
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        max_age=COOKIE_MAX_AGE,
        httponly=True,
        samesite="lax",
        secure=not settings.DEBUG,  # True in production HTTPS
        path="/",
    )


def _clear_auth_cookie(response: Response) -> None:
    """Clears the session cookie."""
    response.delete_cookie(
        key=COOKIE_NAME,
        path="/",
        httponly=True,
        samesite="lax",
        secure=not settings.DEBUG,
    )


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED, summary="Register user")
async def register(user_in: UserRegister, response: Response) -> UserResponse:
    """
    Registers a new user account, stores password hash securely using bcrypt,
    attaches an HttpOnly session cookie, and returns the created user profile.
    """
    user = user_service.create(user_in)
    token = create_access_token({"sub": user.id, "email": user.email})
    _set_auth_cookie(response, token)
    return user


@router.post("/login", response_model=UserResponse, summary="Log in user")
async def login(credentials: UserLogin, response: Response) -> UserResponse:
    """
    Authenticates user credentials, sets an HttpOnly session cookie on success,
    and returns the authenticated user profile.
    """
    user = user_service.authenticate(credentials.email, credentials.password)
    if not user:
        # Avoid account enumeration by returning a generic error
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token({"sub": user.id, "email": user.email})
    _set_auth_cookie(response, token)
    return user


@router.get("/me", response_model=UserResponse, summary="Get current user profile")
async def get_me(current_user: UserResponse = Depends(get_current_user)) -> UserResponse:
    """Returns the authenticated user's profile and learning preferences."""
    return current_user


@router.post("/logout", summary="Log out user")
async def logout(response: Response) -> dict:
    """Clears the user's authentication cookie."""
    _clear_auth_cookie(response)
    return {"message": "Successfully logged out."}


@router.put("/preferences", response_model=UserResponse, summary="Update onboarding preferences")
async def update_preferences(
    prefs_in: PreferencesUpdate,
    current_user: UserResponse = Depends(get_current_user),
) -> UserResponse:
    """Updates learning preferences (skill level, domain interests, daily time goal)."""
    updated_user = user_service.update_preferences(current_user.id, prefs_in)
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )
    return updated_user
