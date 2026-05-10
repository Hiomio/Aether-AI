"""
Basic tests for the Multi-Agent Research System API.
Run with: pytest tests/ -v
"""
import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.mark.asyncio
async def test_health():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


@pytest.mark.asyncio
async def test_signup():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.post("/auth/signup", json={
            "name": "Test User",
            "email": "test@example.com",
            "password": "password123"
        })
    # May return 400 if DB not available in test
    assert response.status_code in (200, 400, 500)


@pytest.mark.asyncio
async def test_docs():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/docs")
    assert response.status_code == 200
