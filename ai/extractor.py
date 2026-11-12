"""Incident -> proposed dependencies (LLM step).

Planned pipeline:
  1. send incident text + node catalogue to the LLM
  2. parse the reply against ``IncidentExtraction`` (schema check)
  3. compare with the twin (duplicates, cycles, unknown nodes)
  4. queue for human approval
"""

from ai.schema import IncidentExtraction


def extract_dependencies(incident_id: str, text: str, catalogue: list[dict]) -> IncidentExtraction:
    raise NotImplementedError("LLM integration is a later milestone")
