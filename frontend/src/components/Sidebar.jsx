const NAV = [
  { id: "twin", label: "Digital twin", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8 7.5l3 8.5M16 7.5l-3 8.5M8.5 6h7" /></svg> },
  { id: "incidents", label: "Incident AI", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 3 2.5 20h19z" /><path d="M12 10v4.5M12 17.2h.01" /></svg> },
];

export default function Sidebar({ view, onView, summary }) {
  return (
    <aside className="side">
      <div className="brand">
        <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
          <path d="M17 2 30 9.5v15L17 32 4 24.5v-15z" fill="none" stroke="#3ff0a1" strokeWidth="1.8" />
          <circle cx="17" cy="11" r="2.6" fill="#3ff0a1" /><circle cx="10.5" cy="21" r="2.6" fill="#3ff0a1" /><circle cx="23.5" cy="21" r="2.6" fill="#ff5a74" />
          <path d="M17 11 10.5 21h13z" fill="none" stroke="#3ff0a1" strokeWidth="1.3" opacity=".7" />
        </svg>
        <div>
          <div className="brand-name">Resilien<b>CE</b> AI</div>
          <div className="brand-sub">DIGITAL TWIN · v0.1</div>
        </div>
      </div>

      <nav className="nav" aria-label="Main">
        {NAV.map((item) => (
          <button key={item.id} type="button" className={view === item.id ? "on" : ""} onClick={() => onView(item.id)}>
            {item.icon}<span className="t">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="side-foot">
        <div className="org">
          <div className="org-name">{summary?.organisation ?? "Loading…"}</div>
          <div className="org-meta">
            {summary ? `${summary.components} components · ${summary.dependencies} dependencies` : "–"}
          </div>
          {summary?.synthetic && <div className="synth">SYNTHETIC DATA</div>}
        </div>
      </div>
    </aside>
  );
}
