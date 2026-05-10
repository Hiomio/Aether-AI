from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import List

from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.models import Chat, Message
from app.schemas.schemas import ChatOut, MessageOut, ChatCreate

router = APIRouter()


@router.get("/", response_model=List[ChatOut])
async def list_chats(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 50,
):
    result = await db.execute(
        select(Chat)
        .where(Chat.user_id == user_id)
        .order_by(desc(Chat.created_at))
        .offset(skip)
        .limit(limit)
    )
    chats = result.scalars().all()
    return [ChatOut.model_validate(c) for c in chats]


@router.post("/", response_model=ChatOut)
async def create_chat(
    data: ChatCreate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    chat = Chat(user_id=user_id, title=data.title, workspace_id=data.workspace_id)
    db.add(chat)
    await db.flush()
    await db.refresh(chat)
    return ChatOut.model_validate(chat)


@router.get("/{chat_id}", response_model=ChatOut)
async def get_chat(
    chat_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Chat).where(Chat.id == chat_id, Chat.user_id == user_id)
    )
    chat = result.scalar_one_or_none()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    return ChatOut.model_validate(chat)


@router.get("/{chat_id}/messages", response_model=List[MessageOut])
async def get_messages(
    chat_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    # Verify ownership
    result = await db.execute(
        select(Chat).where(Chat.id == chat_id, Chat.user_id == user_id)
    )
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Chat not found")

    msgs = await db.execute(
        select(Message).where(Message.chat_id == chat_id).order_by(Message.created_at)
    )
    return [MessageOut.model_validate(m) for m in msgs.scalars().all()]


@router.delete("/{chat_id}")
async def delete_chat(
    chat_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Chat).where(Chat.id == chat_id, Chat.user_id == user_id)
    )
    chat = result.scalar_one_or_none()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    await db.delete(chat)
    return {"message": "Chat deleted"}
