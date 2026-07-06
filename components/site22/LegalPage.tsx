"use client";

// Privacy/Terms ka shared themed layout — homepage jaisa light/dark (h22-theme localStorage) + toggle.
import { Manrope, Space_Grotesk } from "next/font/google";
import { useEffect, useState } from "react";
import { LogoIcon } from "./LogoIcon";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-space", display: "swap" });
const DISP = "var(--font-space), 'Space Grotesk', sans-serif";

export type LegalBody = { sub?: string; p?: string; list?: string[] };
export type LegalSection = { n: string; title: string; body: LegalBody[] };

const PAL = {
  dark: {
    bg: "#07070d", tx: "#f4f4f7", tx2: "#e4e4ec", mut: "#9594a6", dim: "#6f6f80",
    line: "rgba(255,255,255,.07)", line2: "rgba(255,255,255,.08)", nav: "rgba(7,7,13,.72)",
    foot: "#090910", num: "#2c76ed", toggleBg: "rgba(255,255,255,.06)", toggleBd: "rgba(255,255,255,.12)",
  },
  light: {
    bg: "#f5f6fa", tx: "#10131c", tx2: "#1d2433", mut: "#4a5266", dim: "#6c7488",
    line: "rgba(13,18,32,.08)", line2: "rgba(13,18,32,.09)", nav: "rgba(255,255,255,.82)",
    foot: "#eceef5", num: "#1e63d6", toggleBg: "rgba(13,18,32,.05)", toggleBd: "rgba(13,18,32,.1)",
  },
};

export default function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro?: string; sections: LegalSection[] }) {
  // Homepage jaisa hi: default light, saved toggle choice jeet-ti hai.
  const [theme, setTheme] = useState<"dark" | "light">("light");
  useEffect(() => {
    const saved = window.localStorage.getItem("h22-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);
  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
    document.documentElement.style.background = PAL[theme].bg;
    document.body.style.background = PAL[theme].bg;
  }, [theme]);
  const isLight = theme === "light";
  const c = PAL[theme];
  const flipTheme = () => setTheme((t) => { const next = t === "dark" ? "light" : "dark"; try { window.localStorage.setItem("h22-theme", next); } catch { /* private mode */ } return next; });

  return (
    <div
      className={`${manrope.variable} ${space.variable}`}
      style={{ background: c.bg, color: c.tx, minHeight: "100vh", fontFamily: "var(--font-manrope), Manrope, sans-serif", WebkitFontSmoothing: "antialiased", position: "relative", overflowX: "clip" }}
    >
      {/* ambient glow — sirf dark mein (light flat rehta hai) */}
      {!isLight && <div style={{ position: "absolute", top: -180, left: "50%", transform: "translateX(-50%)", width: 700, height: 460, borderRadius: "50%", background: "radial-gradient(circle,rgba(44,118,237,.16),transparent 70%)", filter: "blur(30px)", pointerEvents: "none", zIndex: 0 }} />}

      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: c.nav, borderBottom: `1px solid ${c.line}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <a href="/" aria-label="hello22.ai" style={{ display: "flex", alignItems: "center", gap: 8, height: 30, textDecoration: "none" }}>
            <LogoIcon />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={isLight ? "/images/hello22-text-color.svg" : "/images/hello22-text-white.svg"} alt="hello22.ai" style={{ height: "100%", width: "auto", display: "block" }} />
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: c.tx2, textDecoration: "none", fontSize: 14.5, fontWeight: 600 }}><i className="fa-solid fa-arrow-left" style={{ fontSize: 12 }} aria-hidden="true" /> Back to home</a>
            <button onClick={flipTheme} aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"} title={isLight ? "Dark mode" : "Light mode"} style={{ width: 38, height: 38, borderRadius: "50%", background: c.toggleBg, border: `1px solid ${c.toggleBd}`, color: c.tx, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <i className={`fa-solid ${isLight ? "fa-moon" : "fa-sun"}`} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "72px 28px 100px" }}>
        <div style={{ fontSize: 13, letterSpacing: ".16em", textTransform: "uppercase", color: c.num, fontWeight: 700 }}>Legal</div>
        <h1 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.03em", fontSize: "clamp(40px,6vw,64px)", lineHeight: 1.02, margin: "14px 0 0" }}>{title}</h1>
        <p style={{ fontSize: 13.5, color: c.dim, margin: "16px 0 0", fontVariantNumeric: "tabular-nums" }}>Last updated: {updated}</p>
        {intro && <p style={{ fontSize: 16, lineHeight: 1.75, color: c.mut, margin: "24px 0 0" }}>{intro}</p>}

        <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 44 }}>
          {sections.map((s) => (
            <section key={s.n}>
              <h2 style={{ fontFamily: DISP, fontWeight: 600, fontSize: 24, letterSpacing: "-.01em", margin: 0, display: "flex", gap: 12 }}>
                <span style={{ color: c.num }}>{s.n}.</span>
                <span>{s.title}</span>
              </h2>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
                {s.body.map((b, i) =>
                  b.sub ? (
                    <h3 key={i} style={{ fontFamily: DISP, fontWeight: 600, fontSize: 16, color: c.tx2, margin: "8px 0 0" }}>{b.sub}</h3>
                  ) : b.list ? (
                    <ul key={i} style={{ margin: 0, paddingLeft: 22, display: "flex", flexDirection: "column", gap: 9 }}>
                      {b.list.map((li, j) => <li key={j} style={{ fontSize: 16, lineHeight: 1.65, color: c.mut }}>{li}</li>)}
                    </ul>
                  ) : (
                    <p key={i} style={{ fontSize: 16, lineHeight: 1.75, color: c.mut, margin: 0 }}>{b.p}</p>
                  )
                )}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: `1px solid ${c.line2}`, background: c.foot }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "26px 28px calc(26px + env(safe-area-inset-bottom))", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", fontSize: 13.5, color: c.dim }}>
          <span>© 2026 hello22.ai</span>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <a href="/" style={{ color: c.mut, textDecoration: "none" }}>Home</a>
            <a href="/privacy" style={{ color: c.mut, textDecoration: "none" }}>Privacy</a>
            <a href="/terms" style={{ color: c.mut, textDecoration: "none" }}>Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
