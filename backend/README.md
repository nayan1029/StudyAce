# StudyAce Backend

StudyAce backend provides secure REST APIs, JWT authentication, core CRUD modules, analytics, and AI service stubs.

## Features

- JWT auth (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`)
- Notes CRUD APIs (`/api/notes`)
- Task APIs (`/api/tasks`)
- Quiz + summarizer + assistant APIs (`/api/quiz`, `/api/ai/*`)
- Dashboard analytics API (`/api/analytics/dashboard`)
- Timetable API (`/api/timetable`)
- Study rooms + WebSocket chat endpoint (`/api/rooms`, `/ws/chat`)
- Swagger/OpenAPI at `/swagger-ui.html`

## Tech Stack

- Java 21
- Spring Boot 3.3
- Spring Security + JWT
- Spring Data JPA + Hibernate
- MySQL (Docker) / H2 (default local)
- Lombok
- Maven

## Run Locally

```bash
mvn -f backend/pom.xml clean verify
mvn -f backend/pom.xml spring-boot:run
```

## Environment Variables

- `DB_URL`
- `DB_DRIVER`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRATION_MS`
- `CORS_ALLOWED_ORIGINS`