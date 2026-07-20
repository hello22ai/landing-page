"use client";

// Blog detail page ka "On this page" sidebar card + scroll-spy. Client component isliye
// ki active-link class useEffect (hydration ke baad) mein lagti hai — inline <script>
// se pehle lagane par React hydration-mismatch warning deta tha (2026-07-20).
// Animations (client 2026-07-20): link click par smooth scroll, active highlight par CSS
// transition (BLOG_CSS), aur lambi TOC mein active item apne aap card ke view mein rehta hai.
import { useEffect, useRef, useState } from "react";
import { SUB } from "./PageShell";

export type TocHeading = { text: string; id: string };

export default function BlogToc({ headings }: { headings: TocHeading[] }) {
  const [active, setActive] = useState(headings[0]?.id);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    // getBoundingClientRect (viewport-relative) — offsetTop NAHI: WYSIWYG content ke
    // Word-paste divs mein inline position:relative hota hai jo offsetTop ko us div ke
    // relative kar deta tha aur spy hamesha aakhri heading par atak jata tha (bug 2026-07-20)
    const pick = () => {
      let cur = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top <= 121) cur = el.id;
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

  // active item ko sidebar ke scrollable container (.bp-sticky) ke andar visible rakho —
  // 16+ headings par active link card se bahar nikal jata tha
  useEffect(() => {
    const link = navRef.current?.querySelector<HTMLAnchorElement>("a.on");
    const box = navRef.current?.closest(".bp-sticky") as HTMLElement | null;
    if (!link || !box || box.scrollHeight <= box.clientHeight) return;
    const br = box.getBoundingClientRect();
    const lr = link.getBoundingClientRect();
    if (lr.top < br.top + 10) box.scrollTo({ top: box.scrollTop + (lr.top - br.top) - 10, behavior: "smooth" });
    else if (lr.bottom > br.bottom - 10) box.scrollTo({ top: box.scrollTop + (lr.bottom - br.bottom) + 10, behavior: "smooth" });
  }, [active]);

  if (!headings.length) return null;
  return (
    <nav ref={navRef} className="bp-toc" aria-label="On this page" style={{ background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 20, padding: "20px 22px" }}>
      <span style={{ display: "flex", alignItems: "center", gap: 9, fontFamily: SUB, fontSize: 12.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--dim)" }}>
        <i className="fa-solid fa-list-check" aria-hidden="true" style={{ color: "var(--num)" }} />On this page
      </span>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 14 }}>
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={active === h.id ? "on" : undefined}
            onClick={(e) => {
              // reduced-motion/global CSS se independent smooth scroll; hash bhi update rahe
              const el = document.getElementById(h.id);
              if (!el) return;
              e.preventDefault();
              el.scrollIntoView({ behavior: "smooth", block: "start" });
              window.history.replaceState(null, "", `#${h.id}`);
              setActive(h.id);
            }}
          >
            {h.text}
          </a>
        ))}
      </div>
    </nav>
  );
}
