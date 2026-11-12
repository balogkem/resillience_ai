import { useEffect, useState } from "react";
import { fetchGraph, fetchSummary } from "./api.js";
import IconSprite from "./components/Icons.jsx";
import Sidebar from "./components/Sidebar.jsx";
import DependencyGraph from "./components/DependencyGraph.jsx";
import Panel from "./components/Panel.jsx";

export default function App() {
  const [view, setView] = useState("twin");
  const [graph, setGraph] = useState(null);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchGraph(), fetchSummary()])
      .then(([g, s]) => { setGraph(g); setSummary(s); })
      .catch((e) => setError(e.message));
  }, []);

  const org = summary?.organisation ?? "…";

  return (
    <>
      <IconSprite />
      <div className="app">
        <Sidebar view={view} onView={setView} summary={summary} />

        <main className="main">
          {view === "twin" ? (
            <>
              <div className="topbar">
                <div className="crumbs"><span>{org} /</span> Dependency twin</div>
                <div className="chips">
                  <span className={"chip" + (error ? " err" : " live")}>
                    <span className="dot" />{error ? "API offline" : graph ? "Live · from API" : "Connecting…"}
                  </span>
                </div>
              </div>

              <form className="ask" onSubmit={(e) => e.preventDefault()}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" /><circle cx="12" cy="12" r="2.5" /></svg>
                <input type="text" aria-label="Describe a disruption to simulate"
                  placeholder="What would happen if HQ Building A lost power for 24 hours?" />
                <button className="btn" type="submit" disabled title="Simulation engine arrives in v0.2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l12-7.5z" /></svg>
                  Run simulation
                </button>
              </form>

              {error ? (
                <div className="canvas center">
                  <div className="offline">
                    <b>Cannot reach the API</b>
                    <span>Start the back end in another terminal: <code>uvicorn app.main:app --reload</code></span>
                  </div>
                </div>
              ) : graph ? (
                <DependencyGraph graph={graph} />
              ) : (
                <div className="canvas center"><div className="shim" style={{ width: 240 }} /></div>
              )}
            </>
          ) : (
            <>
              <div className="topbar">
                <div className="crumbs"><span>{org} /</span> Incident recovery AI</div>
              </div>
              <div className="card placeholder">
                <span className="eyebrow">Coming in v0.5</span>
                <p>Paste an incident report and the LLM will propose new dependencies. Each proposal is checked against the schema and the graph, then waits for your approval.</p>
              </div>
            </>
          )}
        </main>

        <Panel summary={summary} />
      </div>
    </>
  );
}
