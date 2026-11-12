import pytest

from engine.graph import build_graph, load_organisation, summary
from engine.models import Dependency, Node, Organisation


def test_forks_bank_loads():
    g = build_graph(load_organisation())
    s = summary(g)
    assert s["synthetic"] is True
    assert s["components"] == 23
    assert s["dependencies"] == 31
    assert s["business_services"] == 4
    assert s["is_acyclic"]


def test_unknown_node_rejected():
    org = Organisation(
        organisation="Test",
        nodes=[Node(id="a", label="A", type="dc", layer="infrastructure", criticality="High")],
        dependencies=[Dependency(provider="a", dependent="ghost")],
    )
    with pytest.raises(ValueError, match="ghost"):
        build_graph(org)
