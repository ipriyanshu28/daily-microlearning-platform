import uuid
from datetime import datetime, timezone
from typing import Dict, Optional
from fastapi import HTTPException, status
from app.core.security import hash_password, verify_password
from app.schemas.user import (
    UserRegister,
    UserResponse,
    UserPreferences,
    PreferencesUpdate,
)


class InMemoryUserRepository:
    """
    In-memory user storage service for Phase 2 authentication and onboarding.
    Designed with a repository interface to allow seamless swap to PostgreSQL/SQLAlchemy in Phase 3.
    """

    def __init__(self) -> None:
        # Maps user_id -> user_dict
        self._users: Dict[str, dict] = {}
        # Maps normalized_email -> user_id
        self._email_index: Dict[str, str] = {}

    def get_by_email(self, email: str) -> Optional[dict]:
        norm_email = email.strip().lower()
        user_id = self._email_index.get(norm_email)
        if user_id:
            return self._users.get(user_id)
        return None

    def get_by_id(self, user_id: str) -> Optional[UserResponse]:
        user_dict = self._users.get(user_id)
        if not user_dict:
            return None
        return UserResponse(
            id=user_dict["id"],
            email=user_dict["email"],
            full_name=user_dict["full_name"],
            preferences=user_dict["preferences"],
            created_at=user_dict["created_at"],
        )

    def create(self, user_in: UserRegister) -> UserResponse:
        norm_email = user_in.email.strip().lower()
        if norm_email in self._email_index:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A user with this email address already exists.",
            )

        user_id = str(uuid.uuid4())
        hashed_pw = hash_password(user_in.password)
        now_iso = datetime.now(timezone.utc).isoformat()
        preferences = user_in.preferences or UserPreferences()

        user_record = {
            "id": user_id,
            "email": norm_email,
            "full_name": user_in.full_name.strip(),
            "hashed_password": hashed_pw,
            "preferences": preferences,
            "created_at": now_iso,
        }

        self._users[user_id] = user_record
        self._email_index[norm_email] = user_id

        return UserResponse(
            id=user_id,
            email=norm_email,
            full_name=user_record["full_name"],
            preferences=preferences,
            created_at=now_iso,
        )

    def authenticate(self, email: str, password: str) -> Optional[UserResponse]:
        user_dict = self.get_by_email(email)
        if not user_dict:
            return None
        if not verify_password(password, user_dict["hashed_password"]):
            return None
        return UserResponse(
            id=user_dict["id"],
            email=user_dict["email"],
            full_name=user_dict["full_name"],
            preferences=user_dict["preferences"],
            created_at=user_dict["created_at"],
        )

    def update_preferences(self, user_id: str, prefs_in: PreferencesUpdate) -> Optional[UserResponse]:
        user_dict = self._users.get(user_id)
        if not user_dict:
            return None

        current_prefs: UserPreferences = user_dict["preferences"]
        updated_data = current_prefs.model_dump()

        if prefs_in.skill_level is not None:
            updated_data["skill_level"] = prefs_in.skill_level
        if prefs_in.domains is not None:
            updated_data["domains"] = prefs_in.domains
        if prefs_in.daily_goal_minutes is not None:
            updated_data["daily_goal_minutes"] = prefs_in.daily_goal_minutes

        new_prefs = UserPreferences(**updated_data)
        user_dict["preferences"] = new_prefs

        return UserResponse(
            id=user_dict["id"],
            email=user_dict["email"],
            full_name=user_dict["full_name"],
            preferences=new_prefs,
            created_at=user_dict["created_at"],
        )


user_service = InMemoryUserRepository()
