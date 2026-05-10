from fastapi import APIRouter, Depends
from app.core.security import get_current_user_id
from app.schemas.schemas import AgentInfo
from typing import List

router = APIRouter()

AGENTS = [
    AgentInfo(name="Planner Agent", description="Decomposes queries into structured research plans", status="active", runs=147, avg_time=2.3, success_rate=98.2),
    AgentInfo(name="Search Agent", description="Executes multi-engine web searches", status="active", runs=143, avg_time=5.7, success_rate=97.1),
    AgentInfo(name="Scraper Agent", description="Extracts content from web sources", status="active", runs=138, avg_time=12.4, success_rate=94.5),
    AgentInfo(name="Summary Agent", description="Synthesizes content into key insights", status="active", runs=135, avg_time=8.1, success_rate=99.1),
    AgentInfo(name="Citation Agent", description="Validates sources and formats references", status="idle", runs=132, avg_time=3.5, success_rate=99.8),
    AgentInfo(name="Report Agent", description="Generates comprehensive markdown reports", status="idle", runs=128, avg_time=4.2, success_rate=99.5),
]


@router.get("/", response_model=List[AgentInfo])
async def list_agents(user_id: str = Depends(get_current_user_id)):
    return AGENTS


@router.get("/{agent_name}/logs")
async def get_agent_logs(agent_name: str, user_id: str = Depends(get_current_user_id)):
    return {"logs": [f"[INFO] {agent_name} initialized", f"[INFO] Processing query", f"[INFO] Completed successfully"]}
