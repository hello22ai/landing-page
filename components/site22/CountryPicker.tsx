"use client";

// Nav ka country selector (2026-07-22, user request) — "Country" ek plain text nav link hai
// (Demo/Features/Industries wali row mein), hover par countries ka dropdown khulta hai.
// 5 markets: Australia / United States / United Kingdom / New Zealand / Canada.
// Flags wahi assets hain jo About + Contact pages already use karte hain.
//
// Behaviour:
//  - Desktop: hover se open (12px ka invisible bridge gap ko cover karta hai, taake mouse
//    link se panel tak jaate hue dropdown band na ho).
//  - Touch/keyboard: click toggle + Arrow/Enter/Esc — hover-only menus touch par dead hote hain.
//  - ≤920px: baaki nav links ki tarah ye bhi hide ho jaata hai aur mobile menu mein
//    <CountryChips /> ki flag-chip row aa jaati hai.
//  - Selection localStorage("h22-country") mein persist hoti hai aur "h22:country" event
//    fire karti hai — dono instances isi event se sync rehte hain, aur aage regional
//    numbers/pricing bhi isi par hook ho sakte hain.
//
// Styling PageShell aur Hello22Site dono ke CSS vars par chalti hai; jo var sirf ek jagah
// defined hai uske liye fallback chain di gayi hai (--w06 → --toggle-bg → neutral).

import { useCallback, useEffect, useRef, useState } from "react";

export type CountryCode = "AU" | "US" | "GB" | "NZ" | "CA";

export type Country = {
  code: CountryCode;
  /** Mobile chips par dikhne wala short label — UK ke liye "UK" (GB nahi). */
  short: string;
  name: string;
  flag: string;
  /** Country landing page — jin markets ka page ban chuka hai unke liye. Baaki sirf select hote hain. */
  href?: string;
};

export const COUNTRIES: Country[] = [
  { code: "AU", short: "AU", name: "Australia", flag: "/images/flags/au.svg", href: "/australia" },
  { code: "US", short: "US", name: "United States", flag: "/images/flags/us.svg" },
  { code: "GB", short: "UK", name: "United Kingdom", flag: "/images/flags/gb.svg" },
  { code: "NZ", short: "NZ", name: "New Zealand", flag: "/images/flags/nz.svg" },
  { code: "CA", short: "CA", name: "Canada", flag: "/images/flags/ca.svg" },
];

const STORAGE_KEY = "h22-country";
const EVENT = "h22:country";
const DEFAULT_CODE: CountryCode = "AU";
/** Mouse ko button→panel travel karne ka time (bridge ke ilawa safety). */
const CLOSE_DELAY = 130;

const isCode = (v: unknown): v is CountryCode => COUNTRIES.some((c) => c.code === v);

/** Selected country — SSR default AU, mount ke baad localStorage, phir event se live sync. */
function useCountry(): [CountryCode, (next: CountryCode) => void] {
  const [code, setCode] = useState<CountryCode>(DEFAULT_CODE);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (isCode(saved)) setCode(saved);
    } catch {
      /* private mode */
    }
    // Doosri instance (nav link ↔ mobile chips) ke changes yahan reflect ho jaate hain.
    const onChange = (e: Event) => {
      const next = (e as CustomEvent<CountryCode>).detail;
      if (isCode(next)) setCode(next);
    };
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);

  const select = useCallback((next: CountryCode) => {
    setCode(next);
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch { /* private mode */ }
    window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
  }, []);

  return [code, select];
}

export const COUNTRY_PICKER_CSS = `
.h22cp{position:relative;flex-shrink:0}
/* Trigger baaki nav links jaisa plain text hai — koi pill/box nahi (client feedback: buttons = plain text) */
.h22cp-btn{display:inline-flex;flex-direction:column;align-items:stretch;padding:0;background:none;border:0;
 color:var(--h22cp-tone,var(--tx3));font:inherit;font-size:14.5px;font-weight:500;line-height:1.5;
 cursor:pointer;transition:color .2s ease}
.h22cp-btn:hover,.h22cp[data-open="true"] .h22cp-btn{color:var(--tx)}
.h22cp-flag{width:22px;height:15px;border-radius:3px;object-fit:cover;display:block;flex-shrink:0;
 box-shadow:0 0 0 1px var(--w14,var(--toggle-bd,rgba(128,128,128,.2)))}
.h22cp-chev{font-size:9.5px;opacity:.6;transition:transform .22s ease}
.h22cp[data-open="true"] .h22cp-chev{transform:rotate(180deg)}
/* baaki nav links ke active-dot span jitni jagah — baseline align rakhne ke liye */
.h22cp-rail{display:block;height:3px;border-radius:3px;margin-top:3px;background:transparent}

.h22cp-pop{position:absolute;top:calc(100% + 10px);right:0;min-width:206px;padding:6px;z-index:80;
 background:var(--surface);border:1px solid var(--w12,var(--toggle-bd,rgba(128,128,128,.18)));
 border-radius:16px;box-shadow:0 26px 52px -26px var(--sh1);
 opacity:0;transform:translateY(-6px) scale(.98);pointer-events:none;
 transition:opacity .18s ease,transform .18s ease}
.h22cp[data-open="true"] .h22cp-pop{opacity:1;transform:none;pointer-events:auto}
/* hover bridge — button aur panel ke darmiyan 10px gap ko cover karta hai */
.h22cp-pop::before{content:"";position:absolute;top:-12px;left:0;right:0;height:12px}

.h22cp-item{display:flex;align-items:center;gap:10px;width:100%;padding:9px 10px;border-radius:11px;
 background:none;border:0;color:var(--tx2);font:inherit;font-size:14px;font-weight:600;line-height:1.2;
 text-align:left;text-decoration:none;cursor:pointer;transition:background .15s ease,color .15s ease}
.h22cp-item:hover,.h22cp-item[data-active="true"]{background:var(--w06,var(--toggle-bg,rgba(128,128,128,.08)))}
.h22cp-item[aria-selected="true"]{color:var(--blue-ink);background:rgba(44,118,237,.1)}
.h22cp-tick{margin-left:auto;font-size:11px;color:var(--blue-ink);opacity:0}
.h22cp-item[aria-selected="true"] .h22cp-tick{opacity:1}

/* mobile menu wali flag-chip row — sirf tab jab nav ka "Country" link chhupa ho */
.h22cp-chips{display:none;flex-wrap:wrap;gap:8px;padding:14px 4px 6px}
.h22cp-chips-label{width:100%;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--dim,var(--mut));margin-bottom:2px}
.h22cp-chip{display:inline-flex;align-items:center;gap:7px;padding:8px 13px;border-radius:999px;
 background:var(--w06,var(--toggle-bg,rgba(128,128,128,.08)));
 border:1px solid var(--w12,var(--toggle-bd,rgba(128,128,128,.18)));
 color:var(--tx2);font:inherit;font-size:13.5px;font-weight:600;line-height:1;cursor:pointer;
 transition:background .18s ease,border-color .18s ease,color .18s ease}
.h22cp-chip[aria-pressed="true"]{background:rgba(44,118,237,.12);border-color:rgba(44,118,237,.45);color:var(--blue-ink)}

@media(max-width:1080px){
 .h22cp-btn{font-size:14px}
 .h22cp-flag{width:20px;height:14px}
}
/* ≤920px: baaki nav links ki tarah ye bhi burger menu mein chala jaata hai */
@media(max-width:920px){
 .h22cp-nav{display:none!important}
 .h22cp-chips{display:flex}
}
`;

/**
 * Nav ke text links ke beech baithne wala "Country" link + hover dropdown.
 * `tone` = link colour var — homepage links `--tx3` hain, PageShell ke `--tx2`.
 */
export default function CountryPicker({ tone = "--tx3" }: { tone?: "--tx2" | "--tx3" }) {
  const [code, select] = useCountry();
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Outside click + Esc se band
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const cancelClose = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  const choose = (next: CountryCode) => {
    select(next);
    setOpen(false);
    setActiveIdx(-1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const dir = e.key === "ArrowDown" ? 1 : -1;
      const from = activeIdx === -1 ? COUNTRIES.findIndex((c) => c.code === code) : activeIdx;
      setOpen(true);
      setActiveIdx((from + dir + COUNTRIES.length) % COUNTRIES.length);
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open && activeIdx >= 0) choose(COUNTRIES[activeIdx].code);
      else setOpen((o) => !o);
      return;
    }
    if (e.key === "Tab") setOpen(false);
  };

  const current = COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0];

  return (
    <div
      ref={wrapRef}
      className="h22cp h22cp-nav"
      data-open={open ? "true" : "false"}
      style={{ ["--h22cp-tone" as string]: `var(${tone})` }}
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="h22cp-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country: ${current.name}. Change country`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
          Country
          <i className="fa-solid fa-chevron-down h22cp-chev" aria-hidden="true" />
        </span>
        <span className="h22cp-rail" aria-hidden="true" />
      </button>

      <div className="h22cp-pop" role="listbox" aria-label="Select your country" tabIndex={-1}>
        {COUNTRIES.map((c, i) => {
          const inner = (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="h22cp-flag" src={c.flag} alt="" aria-hidden="true" />
              <span>{c.name}</span>
              <i className="fa-solid fa-check h22cp-tick" aria-hidden="true" />
            </>
          );
          const shared = {
            role: "option" as const,
            "aria-selected": c.code === code,
            "data-active": i === activeIdx ? "true" : "false",
            className: "h22cp-item",
            onMouseEnter: () => setActiveIdx(i),
          };
          // Jis country ka landing page bana hua hai wo asli <a> hai — crawlable rahe.
          return c.href ? (
            <a key={c.code} {...shared} href={c.href} onClick={() => choose(c.code)}>{inner}</a>
          ) : (
            <button key={c.code} {...shared} type="button" onClick={() => choose(c.code)}>{inner}</button>
          );
        })}
      </div>
    </div>
  );
}

/** Mobile menu ke andar wali flag-chip row — CSS khud decide karti hai kab dikhni hai. */
export function CountryChips() {
  const [code, select] = useCountry();
  return (
    <div className="h22cp-chips" role="group" aria-label="Select your country">
      <span className="h22cp-chips-label">Country</span>
      {COUNTRIES.map((c) => (
        <button
          key={c.code}
          type="button"
          className="h22cp-chip"
          aria-pressed={c.code === code}
          onClick={() => select(c.code)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="h22cp-flag" src={c.flag} alt="" aria-hidden="true" />
          {c.short}
        </button>
      ))}
    </div>
  );
}
