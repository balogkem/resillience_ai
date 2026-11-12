"""The JSON the LLM must return when it reads an incident report.

The LLM proposes, the graph validates, and a human approves. Nothing in
this module changes the twin. It only defines the shape of a proposal.
"""

from pydantic import BaseModel, Field


class ProposedNode(BaseModel):
    id: str
    label: str
    type: str


class ProposedDependency(BaseModel):
    provider: str
    dependent: str
    confidence: float = Field(ge=0.0, le=1.0)
    evidence: str = Field(description="Quote or reasoning from the incident text")


class IncidentExtraction(BaseModel):
    incident_id: str
    new_nodes: list[ProposedNode] = Field(default_factory=list)
    dependencies: list[ProposedDependency] = Field(default_factory=list)
