from pydantic import BaseModel, ConfigDict


class HealthResponse(BaseModel):
    status: str
    project_name: str
    environment: str
    version: str

    model_config = ConfigDict(extra="forbid")
