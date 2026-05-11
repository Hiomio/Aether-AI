# 🤖 Multi-Agent AI Research System

A production-grade AI research platform that automates deep research using **6 autonomous AI agents** — from planning and web search to summarizing and report generation — all streamed live in real time.

![UI Preview](https://github.com/Hiomio/Aether-AI/blob/main/Screenshot%20(195).png)

---

## ✨ Features

- 🧠 **6-Agent Pipeline** — Planner → Search → Scraper → Summary → Citation → Report
- ⚡ **Real-time Streaming** — Live SSE token streaming with agent status updates
- 📄 **RAG Pipeline** — Upload PDFs/DOCX, semantic search via ChromaDB
- 🔐 **JWT Auth** — Signup, login, access + refresh token rotation
- 👥 **Team Collaboration** — Shared workspaces and member management
- 🎨 **Premium Dark UI** — Glassmorphism, Framer Motion, React Flow workflow graph
- 🐳 **Dockerized** — 7 services orchestrated with Docker Compose

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | Next.js 15, TypeScript, TailwindCSS, Framer Motion, Zustand |
| **Backend** | FastAPI, Python 3.12, LangGraph, LangChain |
| **AI/LLM** | Gemini 2.0 Flash, LangGraph, LangChain |
| **Database** | PostgreSQL / SQLite, SQLAlchemy 2.0 (async) |
| **Vector DB** | ChromaDB + sentence-transformers |
| **Auth** | JWT (bcrypt + access/refresh tokens) |
| **Queue** | Redis + Celery |
| **Infra** | Docker Compose, Nginx, GitHub Actions CI/CD |

---

## 🤖 Agent Pipeline

| # | Agent | Role | Avg Time |
|---|-------|------|----------|
| 1 | **Planner Agent** | Breaks query into research strategy | 2.3s |
| 2 | **Search Agent** | Web search and source discovery | 5.7s |
| 3 | **Scraper Agent** | Content extraction from sources | 12.4s |
| 4 | **Summary Agent** | Synthesizes key insights | 8.1s |
| 5 | **Citation Agent** | Validates and formats citations | 3.5s |
| 6 | **Report Agent** | Generates final markdown report | 4.2s |

---

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
git clone https://github.com/Hiomio/Aether-AI.git
cd multi-agent-research

cp backend/.env.example backend/.env
# Add your GOOGLE_API_KEY to backend/.env

docker compose up -d
```

Open **http://localhost:3000**

---

### Option 2: Local Dev

**Backend**
```bash
cd backend
python -m venv venv

# Mac/Linux
source venv/bin/activate
# Windows
venv\Scripts\activate

pip install -r requirements.txt
cp .env.example .env
# Add GOOGLE_API_KEY in .env

uvicorn app.main:app --reload --port 8000
```

**Frontend**
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Open **http://localhost:3000**

---

## 🔑 Environment Variables

```env
# Required
GOOGLE_API_KEY=        # Free at aistudio.google.com
JWT_SECRET_KEY=        # Any random string
DATABASE_URL=          # SQLite (default) or PostgreSQL

# Optional
GROQ_API_KEY=          # For Llama 3.3 70B (free)
REDIS_URL=             # For background tasks
```

See `backend/.env.example` for all options.

---

## 📡 API Endpoints

```
POST   /auth/signup                  Create account
POST   /auth/login                   Login
GET    /auth/me                      Current user

GET    /api/research/stream?query=   SSE streaming research
GET    /api/chats/                   List chats
POST   /api/chats/                   Create chat
POST   /api/documents/upload         Upload PDF/DOCX
GET    /api/reports/                 List reports
GET    /api/agents/                  List agents
```

Swagger docs → **http://localhost:8000/docs**

---

## 📁 Project Structure

```
multi-agent-research/
├── frontend/
│   └── src/
│       ├── app/              # Pages (landing, auth, dashboard)
│       ├── components/       # Sidebar, Chat, Workflow panel
│       ├── store/            # Zustand state
│       └── services/         # API layer
│
├── backend/
│   └── app/
│       ├── api/v1/           # Auth, Research, Chat, Documents
│       ├── agents/           # 6-agent orchestrator
│       ├── core/             # Config, DB, Security, LLM factory
│       ├── models/           # SQLAlchemy models (9 tables)
│       └── tasks/            # Celery background jobs
│
├── nginx/                    # Reverse proxy config
├── docker-compose.yml        # 7-service orchestration
└── .github/workflows/        # CI/CD pipeline
```

---

## 📸 Screenshots

> Landing Page · Research Workspace · Agent Workflow Panel · Reports · Documents

---

## 📄 License

MIT License — free to use and modify.

---

⭐ If you found this useful, give it a star!
