"""Scenario simulation (N-1 failure propagation).

Planned: fail a set of nodes, then propagate in waves. A dependent fails when
any of its required dependency groups has no healthy provider left. The run
stops when a wave produces no new failures. Deterministic: same input, same output.
"""

import networkx as nx


def simulate(g: nx.DiGraph, failed: set[str]) -> list[set[str]]:
    """Return the failure waves caused by ``failed``. Not implemented yet."""
    raise NotImplementedError("Cascade engine is the next milestone")
