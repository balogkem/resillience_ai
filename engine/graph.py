"""Load an organisation into a NetworkX directed graph."""

import json
from pathlib import Path

import networkx as nx

from engine.models import Organisation

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
DEFAULT_ORG = DATA_DIR / "northbridge_bank.json"


def load_organisation(path: Path = DEFAULT_ORG) -> Organisation:
    with open(path, encoding="utf-8") as f:
        return Organisation.model_validate(json.load(f))


def build_graph(org: Organisation) -> nx.DiGraph:
    """Build the twin. Rejects edges that reference unknown nodes."""
    g = nx.DiGraph(name=org.organisation, synthetic=org.synthetic)
    for node in org.nodes:
        g.add_node(node.id, **node.model_dump(exclude={"id"}))

    for dep in org.dependencies:
        for end in (dep.provider, dep.dependent):
            if end not in g:
                raise ValueError(f"Dependency references unknown node '{end}'")
        g.add_edge(dep.provider, dep.dependent, group=dep.group)
    return g


def business_services(g: nx.DiGraph) -> list[str]:
    return [n for n, d in g.nodes(data=True) if d.get("type") == "service"]


def summary(g: nx.DiGraph) -> dict:
    return {
        "organisation": g.graph.get("name"),
        "synthetic": g.graph.get("synthetic", True),
        "components": g.number_of_nodes(),
        "dependencies": g.number_of_edges(),
        "business_services": len(business_services(g)),
        "is_acyclic": nx.is_directed_acyclic_graph(g),
    }
