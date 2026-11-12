from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
    assert client.get("/health").json() == {"status": "ok"}


def test_summary():
    body = client.get("/graph/summary").json()
    assert body["organisation"] == "Northbridge Bank"
    assert body["components"] == 23
