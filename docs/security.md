# Security Architecture & Risk Register — DailySkill

**Version:** 0.1.0  
**Last Audited:** October 2026 (Phase 1 Review)

---

## 🛡️ Current Security Controls Implemented

### 1. HTTP Security Headers
All FastAPI responses pass through an HTTP security headers middleware that enforces:
- `X-Content-Type-Options: nosniff` (mitigates MIME-type sniffing attacks).
- `X-Frame-Options: DENY` (clickjacking defense; denies iframe embedding).
- `Referrer-Policy: strict-origin-when-cross-origin` (prevents path/query parameter leaks across origins).
- `Permissions-Policy: geolocation=(), camera=(), microphone=()` (disables unnecessary browser device access).
- `Strict-Transport-Security: max-age=31536000; includeSubDomains` (enforced when `DEBUG=false` in production).

### 2. CORS Policy
- Configured via `CORSMiddleware` with explicit origin whitelist parsed from `ALLOWED_CORS_ORIGINS`.
- Wildcard origins (`*`) are prohibited whenever credentialed requests are supported.

### 3. Production Configuration Safeguards
- Automated validation via `settings.validate_production_security()` raises an immediate startup error if `ENVIRONMENT=production` runs with `DEBUG=True` or with the default development `SECRET_KEY`.

### 4. Input & Schema Boundaries
- All incoming payloads are validated via Pydantic models with `extra="forbid"` to prevent mass-assignment vulnerabilities.

### 5. Repository Protection
- Comprehensive `.gitignore` ignores all `.env*` files, private keys, database dumps, and virtual environments.
- `.env.example` provides explicit placeholder values only.

---

## ⚠️ Unresolved Risks & Phase Limitations (Honest Disclosure)

1. **Authentication Not Yet Connected (Phase 2 Requirement)**:
   - *Current State*: The frontend exhibits UI demo state for login and lesson completion toggles.
   - *Material Risk*: Until Phase 2 implements Argon2/bcrypt password hashing and secure HTTP-only cookies, no endpoints require user identity verification.
2. **Client-Side State Disclaimer**:
   - *Current State*: Lesson completion and bookmarking are stored in local React state.
   - *Material Risk*: In Phase 3, lesson progress, quiz accuracy, and streak calculations must be evaluated exclusively server-side using PostgreSQL authoritative tables. Never trust client-provided scores.
3. **Rate Limiting**:
   - *Current State*: No rate-limiting middleware is currently active on `/api/v1/health`.
   - *Remediation Plan*: Implement slowapi / Redis rate limiting on authentication routes (`/auth/login`, `/auth/register`) in Phase 2.
4. **Content Security Policy (CSP)**:
   - *Current State*: Default browser CSP is active.
   - *Remediation Plan*: When backend serves HTML or production static bundles, configure explicit `Content-Security-Policy` with nonces to prevent XSS.
