// SVG symbol sprite: one icon per component type. Nodes reference them with <use href="#i-type" />.

export const TYPE_NAMES = {
  dc: "Data centre", power: "Power supply", cloud: "Cloud region", network: "Network",
  building: "Facility", db: "Database", shield: "Security service", app: "Application",
  phone: "Customer channel", chip: "ML service", people: "People", rail: "Payment scheme",
  card: "Supplier", tower: "Supplier", key: "Security hardware", service: "Business service",
};

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };

export default function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <symbol id="i-dc" viewBox="0 0 24 24" {...S}><rect x="4" y="3" width="16" height="5" rx="1.5" /><rect x="4" y="9.5" width="16" height="5" rx="1.5" /><rect x="4" y="16" width="16" height="5" rx="1.5" /><path d="M7 5.5h.01M7 12h.01M7 18.5h.01M11 5.5h6M11 12h6M11 18.5h6" /></symbol>
        <symbol id="i-power" viewBox="0 0 24 24" {...S}><path d="M13 2 4.5 13.5H11L10 22l9-12h-6.5z" /></symbol>
        <symbol id="i-cloud" viewBox="0 0 24 24" {...S}><path d="M7 18.5h10.5a4 4 0 0 0 .4-7.98A6 6 0 0 0 6.3 9.3 4.6 4.6 0 0 0 7 18.5z" /></symbol>
        <symbol id="i-network" viewBox="0 0 24 24" {...S}><circle cx="12" cy="5" r="2.4" /><circle cx="5" cy="18" r="2.4" /><circle cx="19" cy="18" r="2.4" /><circle cx="12" cy="13" r="1.6" /><path d="M12 7.4v4M10.7 14 6.8 16.5M13.3 14l3.9 2.5M7.4 18h9.2" /></symbol>
        <symbol id="i-building" viewBox="0 0 24 24" {...S}><path d="M4 21V5.5L13 3v18M13 9h7v12M2.5 21h19" /><path d="M7 8h2M7 11.5h2M7 15h2M16 12.5h1.5M16 16h1.5" /></symbol>
        <symbol id="i-db" viewBox="0 0 24 24" {...S}><ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" /><path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" /></symbol>
        <symbol id="i-shield" viewBox="0 0 24 24" {...S}><path d="M12 2.8 19.5 6v6c0 4.6-3.2 7.7-7.5 9.2C7.7 19.7 4.5 16.6 4.5 12V6z" /><circle cx="12" cy="10.5" r="2" /><path d="M12 12.5v3" /></symbol>
        <symbol id="i-app" viewBox="0 0 24 24" {...S}><rect x="3" y="4.5" width="18" height="15" rx="2.5" /><path d="M3 9h18M6 6.8h.01M8.5 6.8h.01M7 13h5M7 16h8" /></symbol>
        <symbol id="i-phone" viewBox="0 0 24 24" {...S}><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M10.5 18.5h3" /></symbol>
        <symbol id="i-chip" viewBox="0 0 24 24" {...S}><rect x="6.5" y="6.5" width="11" height="11" rx="2" /><path d="M9.5 3v3.5M14.5 3v3.5M9.5 17.5V21M14.5 17.5V21M3 9.5h3.5M3 14.5h3.5M17.5 9.5H21M17.5 14.5H21M10 12l1.5 1.5L14.5 10" /></symbol>
        <symbol id="i-people" viewBox="0 0 24 24" {...S}><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.6 3-5.6 6-5.6s5.4 2 6 5.6" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.6.2 4 1.9 4.5 4.8" /></symbol>
        <symbol id="i-rail" viewBox="0 0 24 24" {...S}><path d="M4 8h14l-3.5-3.5M20 16H6l3.5 3.5" /></symbol>
        <symbol id="i-card" viewBox="0 0 24 24" {...S}><rect x="2.5" y="5.5" width="19" height="13" rx="2.5" /><path d="M2.5 10h19M6 15h4" /></symbol>
        <symbol id="i-tower" viewBox="0 0 24 24" {...S}><path d="M12 11 8 21M12 11l4 10M9.4 17.5h5.2" /><circle cx="12" cy="9" r="1.6" /><path d="M8.2 5.5a5.3 5.3 0 0 0 0 7M15.8 5.5a5.3 5.3 0 0 1 0 7M5.4 3a9 9 0 0 0 0 12M18.6 3a9 9 0 0 1 0 12" /></symbol>
        <symbol id="i-key" viewBox="0 0 24 24" {...S}><rect x="4" y="9" width="16" height="11" rx="2" /><path d="M8 9V6.5a4 4 0 0 1 8 0V9" /><circle cx="12" cy="14.5" r="1.6" /></symbol>
        <symbol id="i-service" viewBox="0 0 24 24" {...S}><path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7z" /><path d="M12 12 20.5 7M12 12 3.5 7M12 12v9.5" /></symbol>
      </defs>
    </svg>
  );
}
