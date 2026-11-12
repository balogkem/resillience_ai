"""FastAPI back end. Run with:  uvicorn app.main:app --reload"""

from fastapi import FastAPI

from engine.graph import build_graph, load_organisation, summary

app = FastAPI(title="ResilienCE AI", version="0.1.0")

_org = load_organisation()
_graph = build_graph(_org)


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.get("/graph")
def get_graph() -> dict:
    return _org.model_dump()


@app.get("/graph/summary")
def get_summary() -> dict:
    return summary(_graph)
