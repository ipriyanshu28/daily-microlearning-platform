import re
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field, field_validator


class UserPreferences(BaseModel):
    skill_level: str = Field(default="Beginner", description="User's initial self-assessed skill level")
    domains: List[str] = Field(
        default_factory=lambda: ["Data Structures & Algorithms"],
        description="Selected technical domains of interest"
    )
    daily_goal_minutes: int = Field(default=10, ge=5, le=60, description="Target daily study time in minutes")

    model_config = ConfigDict(extra="forbid")

    @field_validator("skill_level")
    @classmethod
    def validate_skill_level(cls, v: str) -> str:
        valid_levels = {"Beginner", "Intermediate", "Advanced"}
        if v not in valid_levels:
            raise ValueError(f"skill_level must be one of: {', '.join(sorted(valid_levels))}")
        return v


class PreferencesUpdate(BaseModel):
    skill_level: Optional[str] = None
    domains: Optional[List[str]] = None
    daily_goal_minutes: Optional[int] = Field(default=None, ge=5, le=60)

    model_config = ConfigDict(extra="forbid")

    @field_validator("skill_level")
    @classmethod
    def validate_skill_level(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            valid_levels = {"Beginner", "Intermediate", "Advanced"}
            if v not in valid_levels:
                raise ValueError(f"skill_level must be one of: {', '.join(sorted(valid_levels))}")
        return v


class UserRegister(BaseModel):
    email: str = Field(..., min_length=5, max_length=255, description="User email address")
    password: str = Field(..., min_length=8, max_length=128, description="Plaintext password (min 8 chars)")
    full_name: str = Field(..., min_length=2, max_length=100, description="User's full name")
    preferences: Optional[UserPreferences] = None

    model_config = ConfigDict(extra="forbid")

    @field_validator("email")
    @classmethod
    def validate_email_format(cls, v: str) -> str:
        email = v.strip().lower()
        email_regex = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"
        if not re.match(email_regex, email):
            raise ValueError("Invalid email format")
        return email


class UserLogin(BaseModel):
    email: str = Field(..., description="User email address")
    password: str = Field(..., description="User password")

    model_config = ConfigDict(extra="forbid")

    @field_validator("email")
    @classmethod
    def normalize_email(cls, v: str) -> str:
        return v.strip().lower()


class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str
    preferences: UserPreferences
    created_at: str

    model_config = ConfigDict(extra="forbid")
