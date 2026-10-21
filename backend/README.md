# DailySkill Backend

FastAPI service powering the DailySkill microlearning platform.

## Setup & Running

```bash
# Create virtual environment
py -m venv .venv

# Activate virtual environment (Windows PowerShell)
.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run server with hot-reload
uvicorn app.main:app --reload --port 8000

# Run automated tests
pytest
```

## Endpoints (Phase 0)

- `GET /api/v1/health` - Service health status, environment, and version info
