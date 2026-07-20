"use client";

// Blog detail page ka "On this page" sidebar card + scroll-spy. Client component isliye
// ki active-link class useEffect (hydration ke baad) mein lagti hai — inline <script>
// se pehle lagane par React hydration-mismatch warning deta tha (2026-07-20).
import { useEffect, useState } from "react";
import { SUB } from "./PageShell";

export type TocHeading = { text: string; id: string };

export default function BlogToc({ headings }: { headings: TocHeading[] }) {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    // IntersectionObserver ke bajaye simple offset check — <=15 headings ke liye sasta,
    // aur "viewport ke upar-third mein kaunsa section hai" wali semantics seedhi milti hai
    const pick = () => {
      const y = window.scrollY + 120;
      let cur = els[0].id;
      for (const el of els) if (el.offsetTop <= y) cur = el.id;
      setActive(cur);
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick, { passive: true });
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [headings]);

  if (!headings.length) return null;
  return (
    <nav className="bp-toc" aria-label="On this page" style={{ background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 20, padding: "20px 22px" }}>
      <span style={{ display: "flex", alignItems: "center", gap: 9, fontFamily: SUB, fontSize: 12.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--dim)" }}>
        <i className="fa-solid fa-list-check" aria-hidden="true" style={{ color: "var(--num)" }} />On this page
      </span>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 14 }}>
        {headings.map((h) => (
          <a key={h.id} href={`#${h.id}`} className={active === h.id ? "on" : undefined}>{h.text}</a>
        ))}
      </div>
    </nav>
  );
}
