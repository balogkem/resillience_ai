"""FastAPI back end. Run with:  uvicorn app.main:app --reload"""

from fastapi import FastAPI
from fastapi.responses import RedirectResponse

from engine.graph import build_graph, load_organisation, summary

app = FastAPI(title="ResilienCE AI", version="0.1.0")

_org = load_organisation()
_graph = build_graph(_org)


@app.get("/", include_in_schema=False)
def root() -> RedirectResponse:
    # No UI yet (React front end is milestone v0.7), so send visitors to the API docs.
    return RedirectResponse(url="/docs")


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.get("/graph")
def get_graph() -> dict:
    return _org.model_dump()


@app.get("/graph/summary")
def get_summary() -> dict:
    return summary(_graph)
