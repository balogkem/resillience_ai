// Right-hand analysis panel. Score and AI analyst are placeholders until
// the scoring engine (v0.3) and LLM explanations exist on the back end.

export default function Panel({ summary }) {
  return (
    <aside className="panel">
      <section className="card">
        <div className="card-h">
          <span className="eyebrow">Resilience score</span>
          <span className="basis">{summary ? `${summary.components} components` : ""}</span>
        </div>
        <div className="score-wrap">
          <div className="gauge">
            <svg width="128" height="128" viewBox="0 0 128 128">
              <circle className="track" cx="64" cy="64" r="52" />
            </svg>
            <div className="num"><div><b>–</b><small>/ 100</small></div></div>
          </div>
          <div className="score-side">
            <div className="grade muted">Not scored yet</div>
            <div className="delta">Scoring engine arrives in v0.3</div>
          </div>
        </div>
        <div className="metrics">
          <Metric value={summary?.components} label="Components" />
          <Metric value={summary?.dependencies} label="Dependencies" />
          <Metric value={summary?.business_services} label="Business services" />
          <Metric value={summary ? (summary.is_acyclic ? "Yes" : "No") : undefined} label="Acyclic graph" />
        </div>
      </section>

      <section className="card ai">
        <div className="ai-head">
          <div className="ai-orb" />
          <div>
            <div className="ai-title">AI Resilience Analyst</div>
            <div className="ai-sub">Not connected</div>
          </div>
        </div>
        <div className="ai-body">
          <div className="ai-idle">
            Once simulation is built, I will explain the highest risk the graph engine finds and suggest a mitigation.
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-h"><span className="eyebrow">Propagation log</span></div>
        <div className="log-empty">No simulation run yet.</div>
      </section>
    </aside>
  );
}

function Metric({ value, label }) {
  return (
    <div className="metric">
      <b>{value ?? "–"}</b>
      <span>{label}</span>
    </div>
  );
}
