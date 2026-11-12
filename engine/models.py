"""Data model for the dependency twin.

A Dependency points from a *provider* to a *dependent*: "dc1 -> db" means
the Core Banking DB depends on DC-1. Dependencies that share a ``group`` on
the same dependent are redundant (any one provider is enough); different
groups are all required. Ungrouped dependencies are each required on their own.
"""

from enum import Enum

from pydantic import BaseModel, Field


class NodeState(str, Enum):
    OK = "ok"
    DEGRADED = "deg"
    FAILED = "fail"


class Node(BaseModel):
    id: str
    label: str
    type: str
    layer: str
    criticality: str


class Dependency(BaseModel):
    provider: str
    dependent: str
    group: str | None = None


class Organisation(BaseModel):
    organisation: str
    synthetic: bool = True
    description: str = ""
    nodes: list[Node]
    dependencies: list[Dependency] = Field(default_factory=list)
