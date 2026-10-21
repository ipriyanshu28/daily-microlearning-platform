from typing import List
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "DailySkill"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    API_V1_PREFIX: str = "/api/v1"
    BACKEND_HOST: str = "127.0.0.1"
    BACKEND_PORT: int = 8000
    SECRET_KEY: str = "insecure-dev-secret-key-change-in-production"

    # CORS origins: string in env, parsed into list
    ALLOWED_CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"

    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOWED_CORS_ORIGINS.split(",") if origin.strip()]

    def validate_production_security(self) -> None:
        """Enforces mandatory security settings when running in production."""
        if self.ENVIRONMENT.lower() == "production":
            if self.SECRET_KEY == "insecure-dev-secret-key-change-in-production" or len(self.SECRET_KEY) < 32:
                raise ValueError("In production, SECRET_KEY must be set to a cryptographically secure value at least 32 characters long.")
            if self.DEBUG:
                raise ValueError("DEBUG mode must be disabled in production.")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )


settings = Settings()
