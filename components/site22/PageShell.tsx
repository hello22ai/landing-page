"use client";

// About/Contact jaise standalone pages ka shared themed shell — homepage jaisa light/dark
// (h22-theme localStorage) + toggle. 2026-07-10: minimal "Back to home" header ki jagah
// FULL navbar (homepage jaisa) — ye marketing pages hain, visitor ko yahin se Pricing/Demo/
// Try free ka rasta milna chahiye. Legal pages (LegalPage.tsx) minimal hi hain.
// Content CSS vars use karta hai (--tx/--mut/--surface/--line/--num) jo theme ke saath badalte hain.
import { useEffect, useState } from "react";

export const DISP = "'Conthrax', var(--font-space), 'Space Grotesk', sans-serif";
export const SUB = "var(--font-space), 'Space Grotesk', sans-serif";

const APP_URL = "https://app.hello22.ai/";
const LOGIN_URL = "https://app.hello22.ai/login";
const SUPPORT_EMAIL = "connect@hello22.ai";

// Homepage ke NAV_LINKS ka mirror — section links yahan /# form mein (pehle home, phir scroll).
// 2026-07-13: Blog add, FAQ removed (homepage nav ke saath sync).
const NAV_LINKS: { n: string; h: string }[] = [
  { n: "Demo", h: "/#demo" },
  { n: "Features", h: "/#features" },
  { n: "Industries", h: "/#industries" },
  { n: "Pricing", h: "/#pricing" },
  { n: "Blog", h: "/blog" },
  { n: "About us", h: "/about" },
  { n: "Contact", h: "/contact" },
];

const PAL = {
  dark: {
    "--bg": "#07070d", "--tx": "#f4f4f7", "--tx2": "#e4e4ec", "--tx3": "#c9c9d4", "--mut": "#9594a6", "--dim": "#6f6f80",
    "--surface": "#12121d", "--line": "rgba(255,255,255,.07)", "--line2": "rgba(255,255,255,.09)",
    "--nav": "rgba(7,7,13,.72)", "--foot": "#090910", "--num": "#4d8ef5",
    "--toggle-bg": "rgba(255,255,255,.06)", "--toggle-bd": "rgba(255,255,255,.12)",
    "--tint": "rgba(44,118,237,.12)", "--tint-bd": "rgba(44,118,237,.3)",
    "--sh1": "rgba(0,0,0,.75)", "--sh2": "rgba(0,0,0,.6)",
    // Homepage footer port (2026-07-13) — Hello22Site THEMES se same values; --w04 CalcCard ke liye
    "--w04": "rgba(255,255,255,.04)", "--w05": "rgba(255,255,255,.05)", "--w07": "rgba(255,255,255,.07)", "--w09": "rgba(255,255,255,.09)", "--w10": "rgba(255,255,255,.1)",
    "--lime": "#2c76ed", "--blue-ink": "#4d8ef5",
  },
  light: {
    "--bg": "#f5f6fa", "--tx": "#10131c", "--tx2": "#1d2433", "--tx3": "#3e4658", "--mut": "#4a5266", "--dim": "#6c7488",
    "--surface": "#ffffff", "--line": "rgba(13,18,32,.08)", "--line2": "rgba(13,18,32,.09)",
    "--nav": "rgba(255,255,255,.82)", "--foot": "#eceef5", "--num": "#1e63d6",
    "--toggle-bg": "rgba(13,18,32,.05)", "--toggle-bd": "rgba(13,18,32,.1)",
    "--tint": "rgba(44,118,237,.1)", "--tint-bd": "rgba(44,118,237,.28)",
    // Homepage jaisi soft shadows — heavy hardcoded shadows in vars se replace (2026-07-10)
    "--sh1": "rgba(28,42,84,.16)", "--sh2": "rgba(28,42,84,.12)",
    "--w04": "rgba(13,18,32,.03)", "--w05": "rgba(13,18,32,.04)", "--w07": "rgba(13,18,32,.06)", "--w09": "rgba(13,18,32,.08)", "--w10": "rgba(13,18,32,.09)",
    "--lime": "#2c76ed", "--blue-ink": "#1e63d6",
  },
} as const;

const CSS = `
.ps-burger{display:none}
@media(max-width:920px){
 .ps-links,.ps-signin{display:none!important}
 .ps-burger{display:inline-flex!important}
}
@media(max-width:480px){
 .ps-cta{display:none!important}
}
/* Homepage footer port (2026-07-13) — .nl link + pulse + responsive grid, Hello22Site jaisa */
@keyframes h22pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.55)}}
.ps-foot a.nl{color:var(--tx3);text-decoration:none;padding:3px 0}
.ps-foot a.nl:hover{color:var(--tx)}
@media(max-width:920px){
 .ps-footer-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
}
@media(max-width:560px){
 .ps-footer-grid{grid-template-columns:minmax(0,1fr)!important;gap:28px!important;padding:32px 18px 28px!important}
 .ps-footer-bottom{padding:16px 18px!important}
}
`;

export default function PageShell({ children, current, maxWidth = 1100 }: { children: React.ReactNode; current?: string; maxWidth?: number }) {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const saved = window.localStorage.getItem("h22-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);
  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
    document.documentElement.style.background = PAL[theme]["--bg"];
    document.body.style.background = PAL[theme]["--bg"];
  }, [theme]);
  const isLight = theme === "light";
  const flipTheme = () => setTheme((t) => { const next = t === "dark" ? "light" : "dark"; try { window.localStorage.setItem("h22-theme", next); } catch { /* private mode */ } return next; });

  return (
    <div style={{ ...(PAL[theme] as unknown as React.CSSProperties), background: "var(--bg)", color: "var(--tx)", minHeight: "100vh", fontFamily: "var(--font-manrope), Manrope, sans-serif", WebkitFontSmoothing: "antialiased", position: "relative", overflowX: "clip" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {!isLight && <div style={{ position: "absolute", top: -180, left: "50%", transform: "translateX(-50%)", width: 700, height: 460, borderRadius: "50%", background: "radial-gradient(circle,rgba(44,118,237,.16),transparent 70%)", filter: "blur(30px)", pointerEvents: "none", zIndex: 0 }} />}

      {/* HEADER — full navbar (homepage jaisa) */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: "var(--nav)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1536, margin: "0 auto", padding: "0 28px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <a href="/" aria-label="hello22.ai" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={isLight ? "/images/hello22-logo-color.svg" : "/hello22-logo.png"} alt="hello22.ai" style={{ height: 32, width: "auto", display: "block" }} />
          </a>
          <nav className="ps-links" style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 14.5, fontWeight: 500 }}>
            {NAV_LINKS.map((l) => {
              const active = current === l.h;
              return (
                <a key={l.n} href={l.h} aria-current={active ? "page" : undefined} style={{ textDecoration: "none", color: active ? "var(--num)" : "var(--tx2)", fontWeight: active ? 700 : 500 }}>
                  {l.n}
                  <span aria-hidden="true" style={{ display: "block", height: 3, borderRadius: 3, marginTop: 3, background: active ? "var(--num)" : "transparent" }} />
                </a>
              );
            })}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            <a className="ps-signin" href={LOGIN_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--tx)", textDecoration: "none", fontSize: 14.5, fontWeight: 600 }}>Sign in</a>
            <a className="ps-cta" href={APP_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", background: "#2c76ed", color: "#fff", fontWeight: 700, fontSize: 14.5, padding: "11px 20px", borderRadius: 999, boxShadow: "0 10px 26px -12px rgba(44,118,237,.7)" }}>Try free</a>
            <button onClick={flipTheme} aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"} title={isLight ? "Dark mode" : "Light mode"} style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--toggle-bg)", border: "1px solid var(--toggle-bd)", color: "var(--tx)", fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <i className={`fa-solid ${isLight ? "fa-moon" : "fa-sun"}`} aria-hidden="true" />
            </button>
            <button className="ps-burger" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)} style={{ width: 40, height: 40, borderRadius: 12, background: "var(--toggle-bg)", border: "1px solid var(--toggle-bd)", color: "var(--tx)", fontSize: 16, cursor: "pointer", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} aria-hidden="true" />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav style={{ borderTop: "1px solid var(--line)", background: "var(--bg)", padding: "8px 20px 18px", display: "flex", flexDirection: "column", maxHeight: "calc(100dvh - 72px)", overflowY: "auto" }}>
            {NAV_LINKS.map((l) => (
              <a key={l.n} href={l.h} onClick={() => setMenuOpen(false)} style={{ color: current === l.h ? "var(--num)" : "var(--tx2)", textDecoration: "none", fontSize: 16, fontWeight: current === l.h ? 700 : 600, padding: "13px 4px", borderBottom: "1px solid var(--line)" }}>{l.n}</a>
            ))}
            <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} style={{ color: "var(--tx2)", textDecoration: "none", fontSize: 16, fontWeight: 600, padding: "13px 4px" }}>Sign in</a>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", textAlign: "center", background: "#2c76ed", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 20px", borderRadius: 999, marginTop: 8, boxShadow: "0 10px 26px -12px rgba(44,118,237,.7)" }}>Try free</a>
          </nav>
        )}
      </header>

      <main style={{ position: "relative", zIndex: 1, maxWidth, margin: "0 auto", padding: "72px 28px 100px" }}>{children}</main>

      {/* FOOTER — homepage jaisa floating rounded card (user request 2026-07-13); section
          links /# form mein kyunki ye pages home se alag route par hain. */}
      <footer className="ps-foot" style={{ position: "relative", zIndex: 1, padding: "0 28px calc(56px + env(safe-area-inset-bottom))" }}>
        <div style={{ maxWidth: 1536, margin: "0 auto", background: "var(--surface)", border: "1px solid var(--w09)", borderRadius: 28, overflow: "hidden" }}>
          <div className="ps-footer-grid" style={{ padding: "44px 40px 36px", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40, alignItems: "start" }}>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={isLight ? "/images/hello22-logo-color.svg" : "/hello22-logo.png"} alt="hello22.ai" style={{ height: 34, width: "auto", display: "block" }} />
              <p style={{ fontSize: 14.5, color: "var(--mut)", lineHeight: 1.6, margin: "16px 0 0", maxWidth: 280 }}>Your 24/7 AI voice receptionist — answers every call, books appointments, and never misses a customer.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18, fontSize: 14 }}>
                <a href={`mailto:${SUPPORT_EMAIL}`} className="nl" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}><i className="fa-regular fa-envelope" style={{ color: "var(--blue-ink)", fontSize: 14 }} aria-hidden="true" />{SUPPORT_EMAIL}</a>
              </div>
            </div>
            {([
              { t: "Product", l: [{ n: "Features", h: "/#features" }, { n: "Voices", h: "/#voices" }, { n: "Pricing", h: "/#pricing" }, { n: "Live demo", h: "/#demo" }, { n: "FAQ", h: "/#faq" }] },
              { t: "Company", l: [{ n: "About us", h: "/about" }, { n: "Contact", h: "/contact" }, { n: "Blog", h: "/blog" }, { n: "Reviews", h: "/#testimonials" }, { n: "Support", h: `mailto:${SUPPORT_EMAIL}` }] },
            ] as { t: string; l: { n: string; h: string }[] }[]).map((col) => (
              <div key={col.t}>
                <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--dim)", marginBottom: 16 }}>{col.t}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14.5 }}>
                  {col.l.map((l) => <a key={l.n} className="nl" href={l.h}>{l.n}</a>)}
                </div>
              </div>
            ))}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--dim)", marginBottom: 16 }}>Follow us</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{[
                { ic: "fa-facebook-f", href: "https://www.facebook.com/hello22ai" },
                { ic: "fa-instagram", href: "https://www.instagram.com/hello22.ai" },
                { ic: "fa-pinterest-p", href: "https://www.pinterest.com/hello22_ai" },
                { ic: "fa-linkedin-in", href: "https://www.linkedin.com/company/hello22-ai" },
                { ic: "fa-youtube", href: "https://www.youtube.com/@hello22ai" },
              ].map((s) => (
                <a key={s.ic} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.ic} style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--w05)", border: "1px solid var(--w10)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--mut)", fontSize: 14, textDecoration: "none" }}><i className={`fa-brands ${s.ic}`} /></a>
              ))}</div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--mut)", marginTop: 18 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--lime)", animation: "h22pulse 1.6s infinite" }} />All systems operational</span>
            </div>
          </div>
          <div className="ps-footer-bottom" style={{ padding: "18px 40px", borderTop: "1px solid var(--w07)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13.5, color: "var(--dim)" }}>© 2026 hello22.ai · <a href="https://sparkview.com.au" target="_blank" rel="noopener noreferrer" style={{ color: "var(--mut)", textDecoration: "none", fontWeight: 600 }}>Powered by SparkView</a></span>
            <span style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 13.5 }}>
              <a className="nl" href="/terms">Terms of Service</a>
              <a className="nl" href="/privacy">Privacy Policy</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
