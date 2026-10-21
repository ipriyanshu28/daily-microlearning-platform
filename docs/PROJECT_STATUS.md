# Project Status — DailySkill

**Last Updated:** October 2026 (Phase 0 Audit)  
**Product Name:** DailySkill (configurable)

---

## 📍 Current Phase & Milestone

- **Current Phase:** Phase 0 — Repository Audit & Foundation
- **Current Milestone:** Milestone 0.1 — Repository baseline, environment setup, and minimal backend health check
- **Completed Milestones:**
  - Audit of existing frontend codebase and Git history (`e15f9c5`).
  - Establishment of root `.gitignore` and security boundaries.
  - Definition of `.env.example` configurations.
  - Root architectural `README.md` and `docs/PROJECT_STATUS.md`.

---

## 🏛️ Architectural Decisions & Rationale

1. **Monorepo Layout (`/frontend` and `/backend`)**:
   - Keeps frontend (React 19 + TypeScript + Vite + Tailwind CSS) and backend (FastAPI + Pydantic + SQLAlchemy) coordinated under a single version-controlled repository without complex submodule management.
2. **Configuration via Environment Variables**:
   - Pydantic `BaseSettings` used in backend to strictly parse and validate runtime configuration.
   - Separate `.env.example` templates to prevent accidental secret leaks.
3. **CORS Restrictions**:
   - Wildcards (`*`) are disallowed for credentials. Allowed origins are explicitly parsed from config.
4. **Preservation of Existing Work**:
   - Preserved initial React Vite TypeScript structure in `frontend/` while planning to modularize `App.tsx` into clean layout and feature directories in Phase 1.

---

## 🛠️ Relevant Commands

### Frontend
- Dev server: `cd frontend && npm run dev`
- Linting: `cd frontend && npm run lint`
- Build check: `cd frontend && npm run build`

### Backend
- Create venv: `cd backend && py -m venv .venv`
- Install dependencies: `pip install -e .`
- Test suite: `pytest`
- Dev server: `uvicorn app.main:app --reload --port 8000`

---

## 🧪 Tests & Quality Checks Last Run

- Frontend ESLint (`npm run lint`): **PASSED** (0 errors, 0 warnings)
- Frontend TypeScript & Vite Build (`npm run build`): **PASSED** (built in 885ms)
- Backend Test Suite: To be run upon backend package initialization.

---

## ⚠️ Known Limitations & Current State

- `frontend/src/App.tsx` contains monolithic UI demo code from initial prototype; will be refactored into modular components (`components/ui`, `components/layout`, `features/lessons`, etc.) during Phase 1.
- Backend is at minimal foundation stage; no database connections or authentication exist yet (per Phase 0 specification).

---

## ⏭️ Next 1–3 Implementation Steps

1. Create `backend/pyproject.toml` with FastAPI, Pydantic, Uvicorn, and Pytest.
2. Create `backend/app/core/config.py` and `backend/app/main.py` with `/api/v1/health` endpoint.
3. Add backend health check unit test (`backend/tests/test_health.py`) and verify `pytest` and `npm run build`.
