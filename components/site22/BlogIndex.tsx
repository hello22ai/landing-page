"use client";

// /blog listing UI — SoftQA-style reference se adapt (user request 2026-07-13):
// dark navy hero panel (subtle grid pattern) + usme latest 2 white cards, neeche
// search/category/sort controls ke saath all-articles grid, pastel thumbnails +
// author photos + "Read more →", end mein dark CTA band. Brand = blue (#2c76ed),
// dono themes supported — hero panel dono mein navy hi rehta hai (reference jaisa).
import { useMemo, useState } from "react";
import { BLOG_POSTS, CATEGORY_STYLE, PASTELS, formatDate, type BlogPost } from "./blogData";
import { DISP, SUB } from "./PageShell";

// 2026-07-13 (user feedback): almost-black navy se deep royal blue — brand #2c76ed family.
const NAVY = "#12358f";
const NAVY_LINE = "rgba(255,255,255,.14)";
const CATEGORIES = ["All", "Growth", "Product", "Guides", "Industries"] as const;

const CSS = `
.bxcard{transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease}
.bxcard:hover{transform:translateY(-4px);box-shadow:0 22px 44px -24px var(--sh1);border-color:var(--tint-bd)}
.bxcard .bx-title{transition:color .2s ease}
.bxcard:hover .bx-title{color:var(--num)}
.bx-ctrl:focus{outline:2px solid var(--tint-bd);outline-offset:1px}
`;

function Thumb({ post, big }: { post: BlogPost; big?: boolean }) {
  // fixed height — minHeight se hero ke dono thumbs alag-alag stretch ho rahe the
  return (
    <span style={{ display: "flex", alignItems: "stretch", gap: 12, background: PASTELS[post.pastel], borderRadius: 14, padding: 14, height: big ? 148 : 124, boxSizing: "border-box" }}>
      <span style={{ flex: "1 1 auto", display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
        <span style={{ fontFamily: SUB, fontWeight: 700, fontSize: big ? 21 : 18, lineHeight: 1.25, letterSpacing: "-.01em", color: "#14203c", overflowWrap: "break-word" }}>{post.short}</span>
        <span style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", padding: "4px 10px", borderRadius: 999, background: "rgba(20,32,60,.08)", fontFamily: SUB, fontSize: 10.5, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "#37456b" }}>#{post.category}</span>
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={post.author.avatar} alt="" loading="lazy" style={{ width: big ? 104 : 88, borderRadius: 10, objectFit: "cover", objectPosition: "center top", flexShrink: 0, display: "block" }} />
    </span>
  );
}

function MetaRow({ post }: { post: BlogPost }) {
  const cat = CATEGORY_STYLE[post.category];
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      <span style={{ display: "inline-flex", alignItems: "center", padding: "4px 11px", borderRadius: 999, background: cat.bg, border: `1px solid ${cat.bd}`, color: cat.c, fontFamily: SUB, fontSize: 11, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase" }}>{post.category}</span>
      <span style={{ fontSize: 12.5, color: "var(--dim)" }}>{formatDate(post.date)} · {post.readMins} min read</span>
    </span>
  );
}

// Hero panel ke andar wala card — fixed white (navy par pop karta hai, dono themes mein)
function HeroCard({ post }: { post: BlogPost }) {
  return (
    <a href={`/blog/${post.slug}`} className="bxcard" style={{ background: "#ffffff", border: "1px solid rgba(13,18,32,.08)", borderRadius: 18, padding: 16, display: "flex", flexDirection: "column", alignItems: "flex-start", textDecoration: "none", color: "#10131c" }}>
      <span style={{ display: "block", width: "100%" }}><Thumb post={post} big /></span>
      <span style={{ marginTop: 14 }}><MetaRow post={post} /></span>
      <span style={{ display: "block", fontFamily: SUB, fontWeight: 700, fontSize: 18.5, lineHeight: 1.35, color: "#10131c", marginTop: 10 }}>{post.title}</span>
      <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", fontSize: 14, lineHeight: 1.6, color: "#4a5266", marginTop: 8 }}>{post.excerpt}</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, background: NAVY, color: "#fff", fontFamily: SUB, fontWeight: 700, fontSize: 13.5, padding: "10px 20px", borderRadius: 999 }}>
        Read article <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: 11 }} />
      </span>
    </a>
  );
}

// Grid card — theme-aware surface
function GridCard({ post }: { post: BlogPost }) {
  return (
    <a href={`/blog/${post.slug}`} className="bxcard" style={{ background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 18, padding: 16, display: "flex", flexDirection: "column", alignItems: "flex-start", textDecoration: "none", color: "inherit" }}>
      <span style={{ display: "block", width: "100%" }}><Thumb post={post} /></span>
      <span style={{ marginTop: 14 }}><MetaRow post={post} /></span>
      <span className="bx-title" style={{ display: "block", fontFamily: SUB, fontWeight: 700, fontSize: 17, lineHeight: 1.35, color: "var(--tx)", marginTop: 10 }}>{post.title}</span>
      <span style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", fontSize: 14, lineHeight: 1.6, color: "var(--mut)", marginTop: 8 }}>{post.excerpt}</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: SUB, fontSize: 13.5, fontWeight: 700, color: "var(--num)", marginTop: "auto", paddingTop: 16 }}>
        Read more <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: 11 }} />
      </span>
    </a>
  );
}

const ctrl: React.CSSProperties = { height: 42, borderRadius: 999, border: "1px solid var(--line2)", background: "var(--surface)", color: "var(--tx2)", fontFamily: "inherit", fontSize: 14, padding: "0 16px" };

export default function BlogIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [sort, setSort] = useState<"new" | "old">("new");

  const latest = BLOG_POSTS.slice(0, 2);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = BLOG_POSTS.filter((p) =>
      (cat === "All" || p.category === cat) &&
      (!needle || `${p.title} ${p.excerpt} ${p.author.name}`.toLowerCase().includes(needle)));
    return sort === "new" ? list : [...list].reverse();
  }, [q, cat, sort]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ===== HERO PANEL — navy, subtle grid pattern, latest cards inside ===== */}
      <div style={{ background: NAVY, backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize: "44px 44px", border: `1px solid ${NAVY_LINE}`, borderRadius: 28, padding: "clamp(32px,5vw,56px) clamp(20px,4vw,48px) clamp(24px,3.5vw,40px)" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontFamily: DISP, fontSize: 11.5, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: "#8fb3f2" }}>| Our Blog</div>
          <h1 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: "clamp(26px,3.8vw,40px)", lineHeight: 1.18, color: "#ffffff", margin: "16px 0 0" }}>
            Ideas &amp; Guides for Businesses That Never Miss a Call
          </h1>
          <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "rgba(255,255,255,.66)", margin: "14px auto 0", maxWidth: 520 }}>
            Practical advice on answering every call, winning more customers, and putting AI voice technology to work — written by the team building it.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: "clamp(28px,4vw,44px)" }}>
          <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.01em", fontSize: "clamp(17px,2.2vw,21px)", color: "#ffffff", margin: 0 }}>Latest</h2>
          <span style={{ color: "#8fb3f2", fontSize: 18, lineHeight: 1 }} aria-hidden="true">*</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: 18, marginTop: 18 }}>
          {latest.map((p) => <HeroCard key={p.slug} post={p} />)}
        </div>
      </div>

      {/* ===== ALL ARTICLES + CONTROLS ===== */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginTop: 64 }}>
        <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: "clamp(20px,2.6vw,26px)", margin: 0 }}>Browse All Articles</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true" style={{ position: "absolute", left: 15, fontSize: 13, color: "var(--dim)", pointerEvents: "none" }} />
            <input className="bx-ctrl" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" aria-label="Search articles" style={{ ...ctrl, paddingLeft: 40, width: 190 }} />
          </span>
          {/* appearance:none + custom chevron — native select arrow edge se chipka hua tha (user feedback 2026-07-13) */}
          <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
            <select className="bx-ctrl" value={sort} onChange={(e) => setSort(e.target.value as "new" | "old")} aria-label="Sort articles" style={{ ...ctrl, cursor: "pointer", appearance: "none", WebkitAppearance: "none", MozAppearance: "none", paddingRight: 40 }}>
              <option value="new">Most recent</option>
              <option value="old">Oldest first</option>
            </select>
            <i className="fa-solid fa-chevron-down" aria-hidden="true" style={{ position: "absolute", right: 16, fontSize: 10.5, color: "var(--dim)", pointerEvents: "none" }} />
          </span>
          <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
            <select className="bx-ctrl" value={cat} onChange={(e) => setCat(e.target.value as (typeof CATEGORIES)[number])} aria-label="Filter by category" style={{ ...ctrl, cursor: "pointer", appearance: "none", WebkitAppearance: "none", MozAppearance: "none", paddingRight: 40 }}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c === "All" ? "All categories" : c}</option>)}
            </select>
            <i className="fa-solid fa-chevron-down" aria-hidden="true" style={{ position: "absolute", right: 16, fontSize: 10.5, color: "var(--dim)", pointerEvents: "none" }} />
          </span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "64px 20px", border: "1px dashed var(--line2)", borderRadius: 18, marginTop: 24 }}>
          <p style={{ fontFamily: SUB, fontWeight: 700, fontSize: 16, color: "var(--tx2)", margin: 0 }}>No articles found</p>
          <p style={{ fontSize: 14, color: "var(--mut)", margin: "6px 0 0" }}>Try a different search or category.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,300px),1fr))", gap: 18, marginTop: 24 }}>
          {filtered.map((p) => <GridCard key={p.slug} post={p} />)}
        </div>
      )}
      <p style={{ fontSize: 13, color: "var(--dim)", textAlign: "right", margin: "14px 2px 0" }}>Showing {filtered.length} of {BLOG_POSTS.length} articles</p>

      {/* ===== CTA — navy band (reference jaisa) ===== */}
      <div style={{ background: NAVY, border: `1px solid ${NAVY_LINE}`, borderRadius: 28, padding: "clamp(28px,4.5vw,48px)", marginTop: 72, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 520 }}>
          <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.015em", fontSize: "clamp(20px,2.8vw,28px)", lineHeight: 1.25, color: "#ffffff", margin: 0 }}>Ready to Turn Missed Calls Into Booked Jobs?</h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,.66)", margin: "10px 0 0" }}>Set up your AI receptionist in 22 minutes and see the magic of hello22 in action. 14-day free trial, no credit card needed.</p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="https://app.hello22.ai/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", background: "#2c76ed", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 24px", borderRadius: 999, boxShadow: "0 14px 30px -14px rgba(44,118,237,.7)" }}>Start free trial</a>
          <a href="/#demo" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", background: "transparent", color: "#dce7fb", fontWeight: 700, fontSize: 15, padding: "12px 22px", borderRadius: 999, border: "1.5px solid rgba(255,255,255,.28)" }}><i className="fa-solid fa-play" aria-hidden="true" style={{ fontSize: 11 }} /> Hear a live call</a>
        </div>
      </div>
    </>
  );
}
