# Roadmap

Milestones for the proof of concept. Each one should land as one or more commits.

- [x] **v0.1 Skeleton**: repo layout, data model, synthetic Northbridge Bank, graph loader, FastAPI `/health` and `/graph`, tests
- [ ] **v0.2 Cascade engine**: grouped-redundancy failure propagation in waves (`engine/simulate.py`)
- [ ] **v0.3 Scoring and SPOF detection**: resilience score (0-100), single points of failure, affected business services
- [ ] **v0.4 Scenarios API**: power loss, supplier outage, cyber, cloud region; `POST /simulate`
- [ ] **v0.5 Incident AI**: LLM extraction to `IncidentExtraction` JSON, graph validation (unknown nodes, duplicates, cycles)
- [ ] **v0.6 Human approval**: approve or reject proposals, then apply them to the twin (e.g. HSM Cluster from INC-2026-0417)
- [ ] **v0.7 Front end**: React dependency graph, scenario runner, AI analyst panel
- [ ] **v0.8 Security hardening**: input limits, PII redaction before LLM calls, secrets in `.env`, audit log

## Notes

- The edge direction is `provider -> dependent`.
- Dependencies that share a `group` on the same dependent are redundant. For example, DC-1 has two `power` providers, so it fails only when both are down.
- The HSM Cluster is deliberately missing from the base data. It is found later from incident INC-2026-0417.
