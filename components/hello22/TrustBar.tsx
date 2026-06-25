const BRANDS: { name: string; italic: boolean }[] = [
  { name: "Northwind Health", italic: true },
  { name: "CALDRICK", italic: false },
  { name: "Lumen Realty", italic: true },
  { name: "Pulsewave", italic: false },
  { name: "Sterling & Co.", italic: true },
  { name: "Vertex Auto", italic: false },
  { name: "Mercato", italic: true },
  { name: "Helix Bank", italic: false },
];

function Row({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="flex items-center gap-16 px-8 shrink-0" aria-hidden={ariaHidden}>
      {BRANDS.map((b, i) => (
        <span
          key={i}
          className={`font-display text-2xl text-[var(--text-muted)] ${b.italic ? "italic" : "font-semibold"}`}
        >
          {b.name}
        </span>
      ))}
    </div>
  );
}

export function TrustBar() {
  return (
    <section className="py-14 border-y border-[var(--border)] relative z-10 overflow-hidden bg-[var(--bg-soft)]/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-8">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-dim)] text-center">
          Trusted by 2,200+ teams talking to their customers
        </p>
      </div>
      <div className="marquee-track">
        <Row />
        <Row ariaHidden />
      </div>
    </section>
  );
}
