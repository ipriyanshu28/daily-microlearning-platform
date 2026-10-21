from fastapi.testclient import TestClient
from app.main import app
from app.core.config import settings

client = TestClient(app)


def test_root_endpoint():
    """Verify that the root endpoint returns expected service metadata."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert settings.PROJECT_NAME in data["message"]
    assert data["health"] == f"{settings.API_V1_PREFIX}/health"


def test_health_check_endpoint():
    """Verify that the health check returns 200 OK and valid schema."""
    response = client.get(f"{settings.API_V1_PREFIX}/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["project_name"] == settings.PROJECT_NAME
    assert data["environment"] == settings.ENVIRONMENT
    assert data["version"] == "0.1.0"


def test_health_check_cors_headers():
    """Verify that CORS headers are returned for allowed origins."""
    origin = settings.cors_origins[0]
    response = client.get(
        f"{settings.API_V1_PREFIX}/health",
        headers={"Origin": origin}
    )
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == origin
    assert response.headers.get("access-control-allow-credentials") == "true"
