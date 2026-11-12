# ResilienCE AI

AI-assisted digital twin for operational resilience. It models an organisation's dependencies as a graph, simulates disruptions (N-1 failure propagation), and uses an LLM to extract new dependencies from incident reports. Every proposal goes through schema validation and human approval.

**Synthetic data only.** "Forks Bank" is fictional.

> Principle: the LLM proposes, the graph disposes, and a human approves.

## Structure

| Folder    | Purpose |
|-----------|---------|
| `engine/` | NetworkX twin: data model, graph loading, (soon) cascade simulation and scoring |
| `ai/`     | LLM incident extraction: output schema and (soon) the extractor and validator |
| `app/`    | FastAPI back end |
| `frontend/` | React (Vite) UI: live dependency graph drawn from the API |
| `data/`   | Synthetic organisation and sample incident reports |
| `tests/`  | pytest suite |
| `docs/`   | Design notes and roadmap |

## Run locally

You need two terminals: one for the API and one for the UI.

**Terminal 1: API (Python)**

```bash
python -m venv .venv
.venv\Scripts\activate        # Windows  (macOS/Linux: source .venv/bin/activate)
pip install -r requirements.txt

pytest                         # run tests
uvicorn app.main:app --reload  # API at http://127.0.0.1:8000/docs
```

**Terminal 2: UI (Node 18+)**

```bash
cd frontend
npm install                    # first time only
npm run dev                    # UI at http://localhost:5173
```

The UI calls `/api/...`, and Vite forwards those requests to the API on port 8000. If the API isn't running, the UI shows "API offline".

## Status

v0.1: skeleton. The graph loads, the API serves it and the UI draws it live. Simulation and the LLM are next. See [docs/roadmap.md](docs/roadmap.md).
