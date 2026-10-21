from fastapi import HTTPException, Request, status
from app.core.security import decode_access_token
from app.schemas.user import UserResponse
from app.services.user_service import user_service


async def get_current_user(request: Request) -> UserResponse:
    """
    Extracts and authenticates the user from an HttpOnly cookie or Bearer authorization header.
    Raises HTTP 401 Unauthorized if the token is missing, expired, or invalid.
    """
    # 1. Check HttpOnly cookie
    token = request.cookies.get("access_token")

    # 2. Check Bearer header as secondary fallback (for API clients)
    if not token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header[7:].strip()

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Please log in.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    payload = decode_access_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired or invalid. Please log in again.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = user_service.get_by_id(payload["sub"])
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account no longer exists.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user
