# ClassEdge

**ClassEdge | AI-Powered Learning Management System– React.js, Spring Boot, PostgreSQL, JWT, REST API**
• Developed a full-stack learning management platform with role-based access for students, faculty, and administrators using React.js, Spring Boot, PostgreSQL, and JWT authentication.
• Integrated Gemini APIs for AI-powered quiz generation, study assistance, and document summarization, along with Google OAuth2 authentication and Docker-based deployment.

---

## Feature status

| Feature | Status |
|---|---|
| Registration / login (JWT + BCrypt) | ✅ Working |
| Email verification | ✅ Working — requires SMTP credentials to send real mail; logs the link instead if unset |
| Password reset | ✅ Working — same SMTP requirement as above |
| Google login (OAuth2) | ✅ Working — requires your own Google Cloud OAuth credentials |
| AI Study Assistant (chat) | ✅ Working — requires a Gemini or OpenAI API key |
| AI Notes Summarizer (PDF/PPT) | ✅ Working — requires a Gemini or OpenAI API key |
| AI Quiz Generator | ✅ Working — requires a Gemini or OpenAI API key |
| Resume Analyzer | ✅ Working — requires a Gemini or OpenAI API key |
| Task management (Kanban-style CRUD) | ✅ Working |
| Smart Timetable Generator | ✅ Working — generated schedule is saved per user |
| Collaborative Study Rooms | ✅ Working — create/join rooms, persisted chat history over WebSocket |
| Study Room video calls | ✅ Working for 1:1 calls (WebRTC over the existing WebSocket for signaling, public STUN only — no TURN server, so it may not connect across strict/symmetric NATs) |
| Dashboard analytics | ✅ Working, backed by real task/study data |

---

## Tech stack (actual)

**Frontend:** React 18, Vite, Tailwind CSS, TanStack Query, Axios, React Router DOM, `@stomp/stompjs` + `sockjs-client` for WebSocket chat/signaling.

**Backend:** Java 21, Spring Boot 3, Spring Security (JWT + OAuth2 client), Spring Data JPA/Hibernate, Spring WebSocket (STOMP), Spring Mail, Maven.

**Database:** MySQL in production, H2 in-memory for local development.

**AI services:** Google Gemini API and/or OpenAI API (configurable, see below).

---

## Running locally

### Backend

```bash
cd backend
mvn -B -DskipTests package
java -jar target/*.jar
```

Defaults to an in-memory H2 database, so it runs with zero configuration. Everything that doesn't need an external credential (auth, tasks, timetable, study rooms, chat) works immediately.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_BASE_URL` (e.g. `http://localhost:8080/api`) in `frontend/.env` if your backend isn't on the default port.

### Optional integrations

These features degrade gracefully without configuration — the app still runs, the specific feature just stays inactive:

**AI features** (Study Assistant, Summarizer, Quiz, Resume Analyzer) — set one of:
```
AI_PROVIDER=gemini
GEMINI_API_KEY=your_key
# or
AI_PROVIDER=openai
OPENAI_API_KEY=your_key
```

**Email** (verification + password reset) — without these, links are logged to the console instead of emailed:
```
MAIL_ENABLED=true
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_address@gmail.com
MAIL_PASSWORD=your_app_password
```

**Google login** — without these, the "Continue with Google" button 404s; get credentials from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and set the authorized redirect URI to `<your-backend-url>/login/oauth2/code/google`:
```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

**Frontend URL** (used to build verification/reset/OAuth redirect links):
```
FRONTEND_URL=http://localhost:5173
```

---

## Project structure

```
ClassEdge/
├── frontend/    React + Vite SPA
├── backend/     Spring Boot REST + WebSocket API
└── scripts/     local dev helper scripts
```

## Deployment

The project is fully containerized and deployment-ready via Docker Compose.

```bash
docker-compose up --build -d
```

This single command will:
1. Build the Vite React frontend (Nginx)
2. Build the Spring Boot backend (Maven/Temurin)
3. Provision the PostgreSQL database
4. Start all three interconnected containers on port `3000` (frontend) and `8080` (backend).

*Note: Environment variables for external AI tools or SMTP should be passed to the `backend` service within `docker-compose.yml` or via a `.env` file.*
