# DailySkill — Personalized Daily Microlearning Platform

DailySkill is a production-minded web application designed to help learners and professionals master computer science, software engineering, DSA, and modern technical skills through focused 5–15 minute daily micro-lessons, interactive practice, and spaced repetition.

---

## 🏛️ Architecture Overview

The repository is structured as a decoupled full-stack application:

```
daily-microlearning-platform/
├── frontend/             # React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons
│   ├── src/
│   │   ├── app/          # Core layout & navigation
│   │   ├── components/   # Reusable UI tokens and atomic components
│   │   ├── features/     # Feature modules (lessons, assessments, progress)
│   │   ├── pages/        # Route pages
│   │   └── types/        # TypeScript interfaces and domain models
│   ├── package.json
│   └── vite.config.ts
├── backend/              # Python FastAPI + Pydantic + SQLAlchemy 2.x
│   ├── app/
│   │   ├── api/v1/       # Versioned API routes
│   │   ├── core/         # Settings, security & database configuration
│   │   ├── models/       # Database models (SQLAlchemy)
│   │   ├── schemas/      # Input/Output validation schemas (Pydantic)
│   │   ├── services/     # Business logic & domain services
│   │   └── main.py       # FastAPI application entry point
│   ├── tests/            # Automated Pytest suite
│   └── pyproject.toml    # Dependencies and packaging configuration
├── docs/                 # Project documentation and engineering logs
│   └── PROJECT_STATUS.md # Living status tracker, decisions, and milestones
├── .env.example          # Environment variables template
└── .gitignore            # Security-focused ignore rules
```

---

## 🚀 Quickstart & Development Setup

### Prerequisites
- **Node.js**: v20+ (tested on v24+)
- **npm**: v10+ (tested on v11+)
- **Python**: v3.11+ (tested on v3.14+)
- **Git**

---

### 1. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server (accessible at http://localhost:5173)
npm run dev

# Run linting
npm run lint

# Run type check and production build
npm run build
```

---

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
py -m venv .venv

# Activate virtual environment
# On Windows (PowerShell):
.venv\Scripts\Activate.ps1
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -e .

# Run development server (accessible at http://127.0.0.1:8000)
uvicorn app.main:app --reload --port 8000

# Run automated tests
pytest
```

---

## 🔒 Security Principles

- **No Secrets in Version Control**: `.env` and sensitive files are ignored by default.
- **Strict Server-Side Validation**: All user inputs are validated through Pydantic schemas.
- **Explicit CORS**: Restricted to trusted origins; wildcards are prohibited with credentials.
- **Fail-Safe Defaults**: Least-privilege permissions and secure headers are enforced.

---

## 📊 Phased Roadmap

- [x] **Phase 0 — Repository Audit & Foundation**: Environment conventions, strict tooling, minimal health check.
- [ ] **Phase 1 — Responsive Frontend Foundation**: Shared layout, atomic components, discovery & learning views.
- [ ] **Phase 2 — Authentication & Onboarding**: Secure session management, role enforcement, learning preferences.
- [ ] **Phase 3 — Database & Daily Lesson Delivery**: PostgreSQL models, Alembic migrations, prerequisite resolution.
- [ ] **Phase 4 — Interactive Assessments**: Server-evaluated quizzes, predict-the-output, coding exercises.
- [ ] **Phase 5 — Progress & Habit Analytics**: Authoritative streak calculations, mastery tracking.
- [ ] **Phase 6 — Recommendations & Spaced Repetition**: Leitner/SM-2 inspired revision scheduling.
- [ ] **Phase 7 — AI-Assisted Learning**: Server-orchestrated targeted explanations and practice questions.
- [ ] **Phase 8 — Hardening, Deployment & CI/CD**: End-to-end audit, security headers, containerization.
