import asyncio
import json
import time
from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.models import Chat, Message, WorkflowExecution, Report, Citation
from app.schemas.schemas import ResearchRequest
from app.agents.orchestrator import ResearchOrchestrator

router = APIRouter()


@router.get("/stream")
async def stream_research(
    query: str = Query(..., min_length=3),
    chat_id: str = Query(None),
    db: AsyncSession = Depends(get_db),
):
    """Stream research results via Server-Sent Events"""

    async def event_generator():
        orchestrator = ResearchOrchestrator()
        
        try:
            async for event in orchestrator.run(query):
                yield f"data: {json.dumps(event)}\n\n"
                await asyncio.sleep(0)  # yield control

        except asyncio.CancelledError:
            yield f"data: {json.dumps({'type': 'cancelled'})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"
        finally:
            yield f"data: {json.dumps({'type': 'done'})}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Access-Control-Allow-Origin": "*",
        },
    )


@router.post("/")
async def create_research(
    data: ResearchRequest,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Create a research task (non-streaming, background)"""
    # Create or get chat
    if data.chat_id:
        result = await db.execute(select(Chat).where(Chat.id == data.chat_id))
        chat = result.scalar_one_or_none()
        if not chat:
            raise HTTPException(status_code=404, detail="Chat not found")
    else:
        chat = Chat(user_id=user_id, title=data.query[:100])
        db.add(chat)
        await db.flush()

    # Add user message
    user_msg = Message(chat_id=chat.id, role="user", content=data.query)
    db.add(user_msg)

    # Create workflow execution record
    execution = WorkflowExecution(chat_id=chat.id, query=data.query, status="pending")
    db.add(execution)
    await db.flush()

    return {"chat_id": chat.id, "execution_id": execution.id, "status": "started"}
