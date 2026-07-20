"use client";

// /blog listing UI — murf.ai/blog reference redesign (client 2026-07-20): dark gradient
// hero band with featured-post CAROUSEL (dots, auto-advance), minimal underline search +
// category pill tabs, flat borderless article cards (rounded image / neutral chip / title /
// uppercase meta), centered CTA band. Colors/fonts murf ke purple/Robotoflex ke bajaye
// hamare brand system ke — blue #2c76ed, Conthrax/Space Grotesk/Manrope, dono themes.
import { useEffect, useMemo, useState } from "react";
import { PASTELS, formatDate, type BlogPost } from "./blogData";
import { DISP, SUB } from "./PageShell";

const APP_URL = "https://app.hello22.ai/";

const CSS = `
.mb-card .mb-title{transition:color .2s ease}
.mb-card:hover .mb-title{color:var(--num)}
.mb-card .mb-img img{transition:transform .45s ease}
.mb-card:hover .mb-img img{transform:scale(1.045)}
.mb-search{background:transparent;border:0;border-bottom:1.5px solid var(--line2);border-radius:0;color:var(--tx);font-family:inherit;font-size:14.5px;padding:9px 4px 9px 30px;width:220px;outline:none}
.mb-search:focus{border-bottom-color:var(--num)}
.mb-pill{border:1px solid transparent;border-radius:10px;font-family:inherit;font-size:13.5px;font-weight:600;padding:9px 16px;cursor:pointer;background:var(--toggle-bg);color:var(--mut);transition:background .2s ease,color .2s ease}
.mb-pill:hover{color:var(--tx)}
.mb-pill.on{background:var(--tint);border-color:var(--tint-bd);color:var(--num)}
@keyframes mbfade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.mb-slide{animation:mbfade .45s ease}
.mb-hero-grid{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:clamp(24px,4vw,52px);align-items:center}
@media(max-width:880px){
 .mb-hero-grid{grid-template-columns:minmax(0,1fr)}
 .mb-ctrls{flex-direction:column;align-items:stretch!important}
 .mb-search{width:100%}
}
`;

// Flat article card (murf style) — koi border/box nahi: image, chip, title, meta
function ArticleCard({ post }: { post: BlogPost }) {
  const img = post.thumb || post.cover;
  return (
    <a href={`/blog/${post.slug}`} className="mb-card" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textDecoration: "none", color: "inherit" }}>
      <span className="mb-img" style={{ display: "block", width: "100%", borderRadius: 16, overflow: "hidden", aspectRatio: "16 / 10", background: PASTELS[post.pastel] }}>
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: 18, fontFamily: SUB, fontWeight: 700, fontSize: 19, lineHeight: 1.3, letterSpacing: "-.01em", color: "#14203c", textAlign: "center" }}>{post.short}</span>
        )}
      </span>
      <span style={{ display: "inline-flex", alignItems: "center", padding: "5px 12px", borderRadius: 8, background: "var(--toggle-bg)", border: "1px solid var(--toggle-bd)", color: "var(--mut)", fontFamily: SUB, fontSize: 11, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", marginTop: 16 }}>{post.category}</span>
      <span className="mb-title" style={{ display: "block", fontFamily: SUB, fontWeight: 700, fontSize: 18, lineHeight: 1.35, color: "var(--tx)", marginTop: 10 }}>{post.title}</span>
      <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--dim)", marginTop: 10 }}>{formatDate(post.date)} · {post.readMins} min read</span>
    </a>
  );
}

// posts server se aate hain (app/blog/page.tsx) — Sanity CMS se, newest-first sorted
export default function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const featured = posts.slice(0, Math.min(posts.length, 5));
  // pills sirf un categories ki jo actually maujood hain — khali filters confuse karte hain
  const cats = useMemo(() => ["All", ...[...new Set(posts.map((p) => p.category))]], [posts]);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return posts.filter((p) =>
      (cat === "All" || p.category === cat) &&
      (!needle || `${p.title} ${p.excerpt} ${p.author.name}`.toLowerCase().includes(needle)));
  }, [posts, q, cat]);

  // carousel auto-advance — hover par pause, 1 slide ho to band
  useEffect(() => {
    if (paused || featured.length < 2) return;
    const t = window.setInterval(() => setSlide((s) => (s + 1) % featured.length), 5000);
    return () => window.clearInterval(t);
  }, [paused, featured.length]);
  const cur = featured[slide % Math.max(featured.length, 1)];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ===== HERO BAND — dark gradient + wave decoration + featured carousel (murf) ===== */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ position: "relative", overflow: "hidden", borderRadius: 28, background: "radial-gradient(ellipse at 82% 12%, rgba(44,118,237,.5), transparent 58%), linear-gradient(118deg, #0a1330 20%, #12358f 100%)", border: "1px solid rgba(255,255,255,.12)", padding: "clamp(32px,4.5vw,52px) clamp(22px,4vw,52px) clamp(24px,3.5vw,38px)" }}
      >
        {/* waves (murf ki decorative lines) */}
        <svg viewBox="0 0 1200 320" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", inset: "auto 0 0 0", width: "100%", height: "55%", opacity: 0.5, pointerEvents: "none" }}>
          <path d="M-20 260 C 250 180, 480 320, 760 240 S 1150 140, 1240 210" fill="none" stroke="rgba(77,142,245,.4)" strokeWidth="1.6" />
          <path d="M-20 300 C 280 220, 520 350, 820 270 S 1160 190, 1240 250" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1.4" />
          <path d="M-20 220 C 220 150, 500 280, 780 205 S 1140 100, 1240 175" fill="none" stroke="rgba(44,118,237,.28)" strokeWidth="1.2" />
        </svg>

        <h1 style={{ position: "relative", fontFamily: DISP, fontWeight: 600, letterSpacing: ".02em", textTransform: "lowercase", fontSize: "clamp(26px,3.6vw,40px)", margin: 0, color: "#ffffff" }}>
          hello22 <span style={{ color: "#4d8ef5" }}>blog</span>
        </h1>

        {cur && (
          <a key={cur.slug + slide} href={`/blog/${cur.slug}`} className="mb-slide mb-hero-grid" style={{ position: "relative", textDecoration: "none", marginTop: "clamp(22px,3vw,34px)" }}>
            <span style={{ display: "block", borderRadius: 20, overflow: "hidden", boxShadow: "0 30px 60px -30px rgba(0,0,0,.6)", aspectRatio: "16 / 9", background: PASTELS[cur.pastel] }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cur.thumb || cur.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </span>
            <span>
              <span style={{ display: "inline-flex", alignItems: "center", padding: "6px 14px", borderRadius: 8, background: "rgba(255,255,255,.94)", color: "#10131c", fontFamily: SUB, fontSize: 11.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>{cur.category}</span>
              <span style={{ display: "block", fontFamily: SUB, fontWeight: 700, letterSpacing: "-.015em", fontSize: "clamp(21px,2.9vw,33px)", lineHeight: 1.25, color: "#ffffff", marginTop: 16 }}>{cur.title}</span>
              <span style={{ display: "block", fontSize: 13, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.72)", marginTop: 16 }}>{formatDate(cur.date)} · {cur.readMins} min read</span>
            </span>
          </a>
        )}

        {featured.length > 1 && (
          <span style={{ position: "relative", display: "flex", justifyContent: "center", gap: 8, marginTop: "clamp(20px,3vw,30px)" }}>
            {featured.map((p, i) => (
              <button key={p.slug} onClick={() => setSlide(i)} aria-label={`Featured article ${i + 1}: ${p.title}`} aria-current={i === slide} style={{ width: i === slide ? 26 : 8, height: 8, borderRadius: 999, border: "none", cursor: "pointer", padding: 0, background: i === slide ? "#ffffff" : "rgba(255,255,255,.38)", transition: "width .3s ease, background .3s ease" }} />
            ))}
          </span>
        )}
      </div>

      {/* ===== CONTROLS — underline search LEFT + category pills RIGHT (murf) ===== */}
      <div className="mb-ctrls" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, flexWrap: "wrap", marginTop: 48 }}>
        <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
          <i className="fa-solid fa-magnifying-glass" aria-hidden="true" style={{ position: "absolute", left: 4, fontSize: 13.5, color: "var(--dim)", pointerEvents: "none" }} />
          <input className="mb-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" aria-label="Search articles" />
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {cats.map((c) => (
            <button key={c} className={`mb-pill${cat === c ? " on" : ""}`} onClick={() => setCat(c)} aria-pressed={cat === c}>{c}</button>
          ))}
        </span>
      </div>

      {/* ===== LATEST ARTICLES — flat borderless grid (murf) ===== */}
      <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: "clamp(21px,2.8vw,28px)", margin: "44px 0 0" }}>Latest Articles</h2>
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "64px 20px", border: "1px dashed var(--line2)", borderRadius: 18, marginTop: 24 }}>
          <p style={{ fontFamily: SUB, fontWeight: 700, fontSize: 16, color: "var(--tx2)", margin: 0 }}>No articles found</p>
          <p style={{ fontSize: 14, color: "var(--mut)", margin: "6px 0 0" }}>Try a different search or category.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,300px),1fr))", gap: "34px 26px", marginTop: 26 }}>
          {filtered.map((p) => <ArticleCard key={p.slug} post={p} />)}
        </div>
      )}

      {/* ===== CTA — centered band (murf ka "Pure Magic" band, brand copy ke saath) ===== */}
      <div style={{ marginTop: 84, background: "var(--tint)", border: "1px solid var(--tint-bd)", borderRadius: 28, padding: "clamp(36px,5vw,56px) 28px", textAlign: "center" }}>
        <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.015em", fontSize: "clamp(22px,3vw,32px)", lineHeight: 1.2, margin: 0 }}>Ready to Turn Missed Calls Into Booked Jobs?</h2>
        <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "var(--mut)", maxWidth: 520, margin: "12px auto 0" }}>Set up your AI receptionist and see the magic of hello22 in action. 14-day free trial, no credit card needed.</p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 24 }}>
          <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", background: "#2c76ed", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 26px", borderRadius: 999, boxShadow: "0 14px 30px -14px rgba(44,118,237,.7)" }}>Start free trial <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: 12 }} /></a>
          <a href="/#demo" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", color: "var(--num)", fontWeight: 700, fontSize: 14.5 }}><i className="fa-solid fa-play" aria-hidden="true" style={{ fontSize: 11 }} /> Hear a live call</a>
        </div>
      </div>
    </>
  );
}
