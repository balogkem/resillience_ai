// Thin wrapper around the FastAPI back end (proxied through Vite at /api).

async function get(path) {
  const res = await fetch(`/api${path}`);
  if (!res.ok) throw new Error(`${path} returned ${res.status}`);
  return res.json();
}

export const fetchGraph = () => get("/graph");
export const fetchSummary = () => get("/graph/summary");
