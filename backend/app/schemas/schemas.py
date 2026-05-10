from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Any, Dict
from datetime import datetime


# ─── Auth ────────────────────────────────────────────────────────────────────

class SignupRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=8)


class LoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: "UserOut"


class UserOut(BaseModel):
    id: str
    name: str
    email: str
    avatar: Optional[str] = None
    plan: str = "free"
    created_at: datetime

    class Config:
        from_attributes = True


class TokenRefresh(BaseModel):
    refresh_token: str


# ─── Chat ─────────────────────────────────────────────────────────────────────

class ChatCreate(BaseModel):
    title: str
    workspace_id: Optional[str] = None


class ChatOut(BaseModel):
    id: str
    title: str
    user_id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class MessageOut(BaseModel):
    id: str
    chat_id: str
    role: str
    content: str
    sources: Optional[List[Dict]] = None
    created_at: datetime

    class Config:
        from_attributes = True


# ─── Research ─────────────────────────────────────────────────────────────────

class ResearchRequest(BaseModel):
    query: str = Field(..., min_length=3, max_length=2000)
    chat_id: Optional[str] = None
    model: str = "gpt-4o-mini"
    use_rag: bool = False


class AgentState(BaseModel):
    name: str
    status: str  # pending | running | completed | error
    time: Optional[float] = None
    logs: List[str] = []


# ─── Reports ──────────────────────────────────────────────────────────────────

class ReportOut(BaseModel):
    id: str
    title: str
    content: str
    summary: Optional[str] = None
    sources_count: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# ─── Documents ────────────────────────────────────────────────────────────────

class DocumentOut(BaseModel):
    id: str
    name: str
    original_name: str
    file_type: str
    file_size: int
    status: str
    chunk_count: int
    created_at: datetime

    class Config:
        from_attributes = True


# ─── Workspaces ───────────────────────────────────────────────────────────────

class WorkspaceCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    description: Optional[str] = None


class WorkspaceOut(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    owner_id: str
    created_at: datetime

    class Config:
        from_attributes = True


class InviteMember(BaseModel):
    email: EmailStr
    role: str = "member"


# ─── Agent ────────────────────────────────────────────────────────────────────

class AgentInfo(BaseModel):
    name: str
    description: str
    status: str
    runs: int
    avg_time: float
    success_rate: float
