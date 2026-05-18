# StudyAce

StudyAce is an AI-powered SaaS platform designed for college students to improve productivity, learning, collaboration, and placement preparation through intelligent automation and modern full-stack technologies.

The platform combines AI-based learning tools, productivity tracking, smart scheduling, collaboration systems, and placement assistance into a single web application.

---

# Core Features

## 1. Authentication System
### Functions
- User Registration
- Login/Logout
- Google Login
- Email Verification
- Password Reset
- Protected Routes

### Tech Used
| Function | Technology |
|---|---|
| Authentication APIs | Spring Security |
| JWT Token | JWT |
| Google Login | OAuth 2.0 |
| Password Encryption | BCrypt |
| Frontend Forms | React |
| API Requests | Axios |

### Integration
- React sends login/signup request to Spring Boot APIs.
- Backend validates credentials and generates JWT token.
- Token stored in localStorage/sessionStorage.
- Protected frontend routes verify token before access.

---

# 2. Smart Dashboard
### Functions
- Assignment Tracking
- Attendance Monitoring
- Productivity Tracking
- Study Hours Analytics
- Upcoming Exams

### Tech Used
| Function | Technology |
|---|---|
| Dashboard UI | React |
| State Management | Redux Toolkit |
| Analytics Charts | Chart.js |
| Backend APIs | Spring Boot REST APIs |
| Database Storage | MySQL |

### Integration
- Backend stores student activity data.
- APIs provide analytics data.
- React fetches data using Axios and displays charts dynamically.

---

# 3. AI Study Assistant
### Functions
- Answer student questions
- Explain concepts
- Study guidance

### Tech Used
| Function | Technology |
|---|---|
| AI Processing | Google Gemini API |
| Backend AI Service | Spring Boot |
| Frontend Chat UI | React |
| API Communication | REST APIs |

### Integration
- User sends question from React chat interface.
- Spring Boot backend forwards request to Gemini API.
- AI response returned and displayed in frontend.

---

# 4. AI Notes Summarizer
### Functions
- PDF Summarization
- PPT Summarization
- Notes Summarization

### Tech Used
| Function | Technology |
|---|---|
| File Upload | Spring Boot Multipart APIs |
| PDF Parsing | Apache PDFBox |
| AI Summarization | Gemini/OpenAI API |
| Frontend Upload UI | React |

### Integration
- User uploads file.
- Backend extracts text using PDF parser.
- Extracted content sent to AI API.
- Summary returned to frontend.

---

# 5. AI Quiz Generator
### Functions
- Generate MCQs
- Generate Short Questions
- Difficulty Levels

### Tech Used
| Function | Technology |
|---|---|
| AI Question Generation | Gemini API |
| Quiz APIs | Spring Boot |
| Quiz UI | React |
| Database | MySQL |

### Integration
- User uploads topic/notes.
- Backend sends content to AI service.
- AI generates quiz data.
- Quiz displayed dynamically on frontend.

---

# 6. Assignment & Task Management
### Functions
- Kanban Board
- Priority Tracking
- Reminders
- Deadlines

### Tech Used
| Function | Technology |
|---|---|
| Task APIs | Spring Boot |
| Database | MySQL |
| Drag & Drop UI | React DnD |
| State Handling | Redux Toolkit |

### Integration
- Tasks stored in database.
- React dashboard fetches tasks using REST APIs.
- UI updates dynamically after CRUD operations.

---

# 7. Smart Timetable Generator
### Functions
- Personalized Study Plan
- Weak Subject Priority
- Exam Scheduling

### Tech Used
| Function | Technology |
|---|---|
| Scheduling Logic | Java |
| Backend APIs | Spring Boot |
| Frontend UI | React |

### Integration
- User inputs subjects and exam dates.
- Backend generates optimized timetable logic.
- React displays generated schedule.

---

# 8. Collaborative Study Rooms
### Functions
- Real-time Chat
- Video Calls
- Notes Sharing

### Tech Used
| Function | Technology |
|---|---|
| Real-time Chat | WebSocket |
| Video Calling | WebRTC |
| Frontend | React |
| Backend | Spring Boot |

### Integration
- WebSocket enables real-time messaging.
- WebRTC handles peer-to-peer video calls.
- Shared notes stored in MySQL.

---

# 9. Resume Assistant
### Functions
- Resume Analysis
- Skill Suggestions
- ATS Score

### Tech Used
| Function | Technology |
|---|---|
| Resume Upload | Spring Boot |
| Resume Parsing | Apache Tika |
| AI Analysis | Gemini/OpenAI API |
| Frontend UI | React |

### Integration
- User uploads resume.
- Backend extracts text from resume.
- AI analyzes content and returns suggestions.

---

# Tech Stack Overview

## Frontend
- React
- Vite
- Tailwind CSS
- Redux Toolkit
- React Query
- Axios
- React Router DOM
- Framer Motion

## Backend
- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication
- Maven

## Database
- MySQL

## AI Services
- Google Gemini API
- OpenAI API
- Apache PDFBox
- Apache Tika

---

# Project Structure

```bash
StudyAce/
│
├── frontend/
│
├── backend/
│
├── ai-services/
│
└── README.md
```

## Deployment

Frontend (Vite + React)

- Install dependencies and build:

```powershell
cd frontend
npm install
npm run build
```

- On Vercel set the environment variable `VITE_API_BASE_URL` to your backend API (e.g. `https://api.example.com/api`). The project includes `frontend/vercel.json` and `frontend/.env.production` as examples.

Backend (Spring Boot)

- The backend reads database and server settings from environment variables with safe defaults (H2 memory DB for local development). Key env vars:
	- `SERVER_PORT` (default 8080)
	- `DB_URL` (default uses H2 in-memory)
	- `DB_DRIVER`, `DB_USERNAME`, `DB_PASSWORD`

- Build and run:

```powershell
cd backend
mvn -B -DskipTests package
java -jar target/*.jar
```

Root helper scripts are provided in the `scripts/` folder for quick local runs: `scripts/run-frontend.ps1` and `scripts/run-backend.ps1`.

Notes

- The frontend expects `VITE_API_BASE_URL` at build time; set this when deploying the frontend.
- For production use, configure a persistent MySQL (or other) database and set `DB_URL` accordingly. The application defaults to H2 for convenience during local development.


