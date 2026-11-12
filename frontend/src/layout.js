// Turns API nodes into screen positions: one column per layer,
// nodes spread evenly down each column in the order the API returns them.

export const VIEW_W = 1100;
export const VIEW_H = 720;

export const LAYERS = [
  { id: "infrastructure", title: "INFRASTRUCTURE" },
  { id: "platforms", title: "PLATFORMS" },
  { id: "channels", title: "CHANNELS" },
  { id: "third_parties", title: "THIRD PARTIES" },
  { id: "business_services", title: "BUSINESS SERVICES" },
];

const COL_X = [95, 325, 550, 775, 1005];
const TOP = 105;
const BOTTOM = 625;

export function layoutNodes(nodes) {
  const pos = {};
  LAYERS.forEach((layer, c) => {
    const inLayer = nodes.filter((n) => n.layer === layer.id);
    const step = inLayer.length > 1 ? (BOTTOM - TOP) / (inLayer.length - 1) : 0;
    inLayer.forEach((n, i) => {
      pos[n.id] = { x: COL_X[c], y: inLayer.length > 1 ? TOP + i * step : (TOP + BOTTOM) / 2, c };
    });
  });
  return pos;
}

// Curved path from provider to dependent.
export function edgePath(A, B) {
  if (A.c === B.c && Math.abs(B.y - A.y) > 140) {
    // Same column, not neighbours: arc out to the side so the line skips nodes in between.
    const sd = A.c === 0 ? -1 : 1;
    return `M${A.x + sd * 28} ${A.y} C${A.x + sd * 95} ${A.y} ${B.x + sd * 95} ${B.y} ${B.x + sd * 28} ${B.y}`;
  }
  if (A.c === B.c) {
    const dir = B.y > A.y ? 1 : -1;
    return `M${A.x} ${A.y + dir * 30} L${B.x} ${B.y - dir * 30}`;
  }
  const dir = B.x > A.x ? 1 : -1;
  const x1 = A.x + dir * 30;
  const x2 = B.x - dir * 30;
  const k = Math.abs(x2 - x1) * 0.5 * dir;
  return `M${x1} ${A.y} C${x1 + k} ${A.y} ${x2 - k} ${B.y} ${x2} ${B.y}`;
}
