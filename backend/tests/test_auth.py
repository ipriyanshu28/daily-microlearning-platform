import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.config import settings
from app.services.user_service import user_service

client = TestClient(app)


@pytest.fixture(autouse=True)
def clean_users():
    """Reset the user repository before each test to guarantee test isolation."""
    user_service._users.clear()
    user_service._email_index.clear()


def test_register_success():
    """Verify that a valid registration creates the user and sets an HttpOnly cookie."""
    payload = {
        "email": "student@example.com",
        "password": "Password123!",
        "full_name": "Test Student",
        "preferences": {
            "skill_level": "Beginner",
            "domains": ["Data Structures & Algorithms", "Java Fundamentals"],
            "daily_goal_minutes": 15,
        },
    }
    response = client.post(f"{settings.API_V1_PREFIX}/auth/register", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "student@example.com"
    assert data["full_name"] == "Test Student"
    assert data["preferences"]["skill_level"] == "Beginner"
    assert data["preferences"]["daily_goal_minutes"] == 15
    assert "id" in data

    # Verify HttpOnly cookie was set
    cookie = response.cookies.get("access_token")
    assert cookie is not None


def test_register_invalid_email_format():
    """Verify that malformed email strings are rejected with 422."""
    payload = {
        "email": "not-an-email",
        "password": "Password123!",
        "full_name": "Invalid User",
    }
    response = client.post(f"{settings.API_V1_PREFIX}/auth/register", json=payload)
    assert response.status_code == 422


def test_register_short_password():
    """Verify that passwords shorter than 8 characters are rejected with 422."""
    payload = {
        "email": "valid@example.com",
        "password": "short",
        "full_name": "Short Password User",
    }
    response = client.post(f"{settings.API_V1_PREFIX}/auth/register", json=payload)
    assert response.status_code == 422


def test_register_duplicate_email():
    """Verify that duplicate registrations return 409 Conflict."""
    payload = {
        "email": "duplicate@example.com",
        "password": "Password123!",
        "full_name": "Original User",
    }
    res1 = client.post(f"{settings.API_V1_PREFIX}/auth/register", json=payload)
    assert res1.status_code == 201

    # Second attempt with case variation
    payload["email"] = "DUPLICATE@example.com"
    res2 = client.post(f"{settings.API_V1_PREFIX}/auth/register", json=payload)
    assert res2.status_code == 409
    assert "already exists" in res2.json()["detail"]


def test_login_success_and_cookie():
    """Verify that valid login credentials set the session cookie and return user profile."""
    # First register
    reg_payload = {
        "email": "loginuser@example.com",
        "password": "SecurePassword123!",
        "full_name": "Login User",
    }
    client.post(f"{settings.API_V1_PREFIX}/auth/register", json=reg_payload)

    # Login
    login_payload = {
        "email": "LOGINUSER@example.com",
        "password": "SecurePassword123!",
    }
    response = client.post(f"{settings.API_V1_PREFIX}/auth/login", json=login_payload)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "loginuser@example.com"
    assert response.cookies.get("access_token") is not None


def test_login_invalid_credentials():
    """Verify that wrong password returns 401 without revealing user existence."""
    reg_payload = {
        "email": "secret@example.com",
        "password": "SecurePassword123!",
        "full_name": "Secret User",
    }
    client.post(f"{settings.API_V1_PREFIX}/auth/register", json=reg_payload)

    # Wrong password
    res = client.post(f"{settings.API_V1_PREFIX}/auth/login", json={"email": "secret@example.com", "password": "wrong"})
    assert res.status_code == 401
    assert "Incorrect email or password" in res.json()["detail"]

    # Non-existent user returns identical 401
    res2 = client.post(f"{settings.API_V1_PREFIX}/auth/login", json={"email": "nobody@example.com", "password": "wrong"})
    assert res2.status_code == 401
    assert "Incorrect email or password" in res2.json()["detail"]


def test_get_me_authenticated_and_unauthenticated():
    """Verify /auth/me returns profile when session cookie is provided, and 401 when missing."""
    # Unauthenticated request
    unauth_res = client.get(f"{settings.API_V1_PREFIX}/auth/me")
    assert unauth_res.status_code == 401

    # Register and get session
    reg_payload = {
        "email": "myme@example.com",
        "password": "Password123!",
        "full_name": "Me User",
    }
    reg_res = client.post(f"{settings.API_V1_PREFIX}/auth/register", json=reg_payload)
    cookie = reg_res.cookies.get("access_token")

    # Authenticated request using cookie
    client.cookies.set("access_token", cookie)
    auth_res = client.get(f"{settings.API_V1_PREFIX}/auth/me")
    assert auth_res.status_code == 200
    assert auth_res.json()["email"] == "myme@example.com"


def test_update_preferences():
    """Verify that an authenticated user can update their onboarding preferences."""
    reg_payload = {
        "email": "prefs@example.com",
        "password": "Password123!",
        "full_name": "Prefs User",
    }
    reg_res = client.post(f"{settings.API_V1_PREFIX}/auth/register", json=reg_payload)
    cookie = reg_res.cookies.get("access_token")
    client.cookies.set("access_token", cookie)

    # Update preferences
    update_payload = {
        "skill_level": "Intermediate",
        "domains": ["Web Development", "Cybersecurity & Systems"],
        "daily_goal_minutes": 20,
    }
    update_res = client.put(f"{settings.API_V1_PREFIX}/auth/preferences", json=update_payload)
    assert update_res.status_code == 200
    data = update_res.json()
    assert data["preferences"]["skill_level"] == "Intermediate"
    assert data["preferences"]["domains"] == ["Web Development", "Cybersecurity & Systems"]
    assert data["preferences"]["daily_goal_minutes"] == 20


def test_logout_clears_cookie():
    """Verify that logging out clears the session cookie."""
    reg_payload = {
        "email": "logout@example.com",
        "password": "Password123!",
        "full_name": "Logout User",
    }
    reg_res = client.post(f"{settings.API_V1_PREFIX}/auth/register", json=reg_payload)
    assert reg_res.cookies.get("access_token") is not None

    logout_res = client.post(f"{settings.API_V1_PREFIX}/auth/logout")
    assert logout_res.status_code == 200
    assert logout_res.json()["message"] == "Successfully logged out."
