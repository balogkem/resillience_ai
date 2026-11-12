import { useMemo, useRef, useState } from "react";
import { LAYERS, VIEW_H, VIEW_W, edgePath, layoutNodes } from "../layout.js";
import { TYPE_NAMES } from "./Icons.jsx";

export default function DependencyGraph({ graph }) {
  const { nodes, dependencies } = graph;
  const pos = useMemo(() => layoutNodes(nodes), [nodes]);
  const [hover, setHover] = useState(null);
  const canvasRef = useRef(null);
  const nodeRefs = useRef({});

  const counts = useMemo(() => {
    const c = {};
    nodes.forEach((n) => (c[n.id] = { dependsOn: 0, dependents: 0 }));
    dependencies.forEach((d) => {
      c[d.dependent].dependsOn += 1;
      c[d.provider].dependents += 1;
    });
    return c;
  }, [nodes, dependencies]);

  return (
    <div className="canvas" ref={canvasRef}>
      <svg id="graph" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="xMidYMid meet" role="img"
        aria-label={`Dependency graph of ${graph.organisation}`}>
        <defs>
          <radialGradient id="halo"><stop offset="0" stopColor="#3ff0a1" stopOpacity=".35" /><stop offset="1" stopColor="#3ff0a1" stopOpacity="0" /></radialGradient>
        </defs>

        {LAYERS.map((l, i) => (
          <text key={l.id} x={[95, 325, 550, 775, 1005][i]} y={40} className="colhead">{l.title}</text>
        ))}

        <g>
          {dependencies.map((d, i) => {
            const A = pos[d.provider];
            const B = pos[d.dependent];
            if (!A || !B) return null;
            const p = edgePath(A, B);
            const dim = hover && d.provider !== hover.id && d.dependent !== hover.id;
            return (
              <g key={i} className={"edgegrp" + (dim ? " dimmed" : "")}>
                <path d={p} className="edge" />
                <path d={p} className="flow" style={{ animationDelay: `${-(i % 7) * 0.34}s` }} />
              </g>
            );
          })}
        </g>

        <g>
          {nodes.map((n) => {
            const P = pos[n.id];
            if (!P) return null;
            return (
              <g key={n.id} ref={(el) => (nodeRefs.current[n.id] = el)}
                className={"node" + (hover?.id === n.id ? " focus" : "")}
                transform={`translate(${P.x},${P.y})`} tabIndex={0} role="button" aria-label={n.label}
                onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(n)} onBlur={() => setHover(null)}>
                <circle r={46} className="halo" />
                <circle r={35} className="ring" />
                <circle r={28} className="core" />
                <use href={`#i-${n.type}`} x={-12} y={-12} width={24} height={24} className="ico" />
                <text y={50} className="lbl">{n.label}</text>
                <text y={63} className="sub">{(TYPE_NAMES[n.type] || n.type).toUpperCase()}</text>
              </g>
            );
          })}
        </g>
      </svg>

      <Tooltip node={hover} counts={counts} canvasRef={canvasRef} nodeRefs={nodeRefs} />

      <div className="legend">
        <span><i style={{ background: "var(--accent)" }} />Healthy</span>
        <span><i style={{ background: "var(--warn)" }} />Degraded</span>
        <span><i style={{ background: "var(--crit)" }} />Failed</span>
      </div>
      <div className="watermark">PROTOTYPE · FICTIONAL ORGANISATION</div>
    </div>
  );
}

function Tooltip({ node, counts, canvasRef, nodeRefs }) {
  if (!node || !canvasRef.current || !nodeRefs.current[node.id]) return <div className="tip" />;
  const c = canvasRef.current.getBoundingClientRect();
  const r = nodeRefs.current[node.id].querySelector(".core").getBoundingClientRect();
  let left = r.right - c.left + 14;
  if (left + 230 > c.width) left = r.left - c.left - 230;
  const top = Math.max(8, Math.min(r.top - c.top - 10, c.height - 170));
  return (
    <div className="tip show" style={{ left: Math.max(8, left), top }}>
      <h4>{node.label}</h4>
      <div className="t-type">{TYPE_NAMES[node.type] || node.type}</div>
      <dl>
        <dt>Status</dt><dd style={{ color: "var(--accent)" }}>Healthy</dd>
        <dt>Criticality</dt><dd>{node.criticality}</dd>
        <dt>Depends on</dt><dd>{counts[node.id].dependsOn}</dd>
        <dt>Dependents</dt><dd>{counts[node.id].dependents}</dd>
        <dt>Source</dt><dd>API · /graph</dd>
      </dl>
    </div>
  );
}
