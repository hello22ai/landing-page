import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import PageShell, { DISP, SUB } from "@/components/site22/PageShell";
import BlogToc from "@/components/site22/BlogToc";
import BlogDemoForm from "@/components/site22/BlogDemoForm";
import BlogListen from "@/components/site22/BlogListen";
import CopyLink from "@/components/site22/CopyLink";
import { CATEGORY_STYLE, formatDate, type BlogBlock, type BlogPost } from "@/components/site22/blogData";
import { getBlogPost, getBlogPosts, urlFor } from "@/lib/sanity";

// Har blog post ka page — data Sanity CMS se (lib/sanity.ts), sample articles fallback.
// UI: client-approved reference (bolt mock, 2026-07-20) — 2-column layout with sticky
// sidebar (On this page TOC / trial card / recent posts), left-aligned header, feature
// strip, tags + share card, written-by card, 2 bade "Keep reading" cards, dark CTA.
// Colors/fonts reference ke green/Jakarta ke bajaye hamare brand system ke (blue + theme vars).

// ISR — Studio mein publish/edit hua post 60s ke andar live (naye slugs on-demand render hote hain)
export const revalidate = 60;

export async function generateStaticParams() {
  return (await getBlogPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(decodeURIComponent(slug));
  if (!post) return { title: "Article not found" };
  // Studio ke SEO fields (seoTitle/ogTitle/...) bhare hon to wahi jeetein
  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: post.seo?.canonical || `/blog/${post.slug}` },
    openGraph: {
      title: post.seo?.ogTitle || title,
      description: post.seo?.ogDescription || description,
      type: "article",
      images: [post.cover],
    },
  };
}

/* ===================== TOC helpers ===================== */

// h2 text → anchor id (teeno content sources ek hi function use karte hain taaki TOC
// list aur rendered headings ke ids hamesha match karein)
function slugifyHeading(text: string): string {
  return text.toLowerCase().replace(/&[a-z#0-9]+;/g, " ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "section";
}

const stripTags = (s: string) => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

// Portable text block ke children se plain text
function ptText(block: PortableTextBlock): string {
  const children = (block as { children?: { text?: unknown }[] }).children;
  if (!Array.isArray(children)) return "";
  return children.map((c) => (typeof c.text === "string" ? c.text : "")).join("");
}

// Article ke saare h2 — sidebar "On this page" ke liye
function extractHeadings(post: BlogPost): { text: string; id: string }[] {
  let texts: string[] = [];
  if (post.html) {
    texts = [...post.html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => stripTags(m[1]));
  } else if (post.body?.length) {
    texts = (post.body as PortableTextBlock[]).filter((b) => (b as { style?: string }).style === "h2").map(ptText);
  } else if (post.blocks) {
    texts = post.blocks.filter((b): b is Extract<BlogBlock, { t: "h2" }> => b.t === "h2").map((b) => b.x);
  }
  return texts.filter(Boolean).map((text) => ({ text, id: slugifyHeading(text) }));
}

// WYSIWYG HTML ke h2 tags mein wahi ids inject — TOC anchors inse jump karte hain.
// ("#" hash-link anchors reference mein the, client ne hatwa diye 2026-07-20 — wapas na lana)
function injectHeadingIds(html: string): string {
  return html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_m, attrs: string, inner: string) =>
    /\sid=/.test(attrs) ? `<h2${attrs}>${inner}</h2>` : `<h2${attrs} id="${slugifyHeading(stripTags(inner))}">${inner}</h2>`
  );
}

// SunEditor mein headings aksar "bada font + bold" paragraph ke roop mein likhi jati hain
// (real h2 nahi) — TOC khali reh jata tha (client report 2026-07-20, "Top 10 Benefits" post).
// Aise blocks ko real h2 mein promote karo: font-size >= 18px + pura block strong + chhota text.
// Do nesting patterns handle hote hain (SunEditor dono banata hai).
function promoteFakeHeadings(html: string): string {
  const clean = (s: string) => stripTags(s).replace(/&nbsp;/gi, " ").replace(/ /g, " ").trim();
  // Har <p> dekho: agar uska SAARA visible text ek big-font bold run hai (aas-paas sirf
  // whitespace/stray spans — SunEditor highlight-space chhod deta hai), to wo heading hai
  let out = html.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (m, inner: string) => {
    const run = /<span([^>]*font-size:\s*(\d+)px[^>]*)>\s*<strong>([\s\S]*?)<\/strong>\s*<\/span>/i.exec(inner);
    if (!run) return m;
    const size = Number(run[2]);
    const text = clean(run[3]);
    const rest = clean(inner.replace(run[0], ""));
    return size >= 18 && text.length > 0 && text.length <= 120 && rest === "" ? `<h2>${text}</h2>` : m;
  });
  // <span font-size><strong><p>text</p></strong></span> — SunEditor ka ulta nesting
  out = out.replace(/<span([^>]*)>\s*<strong>\s*<p[^>]*>([\s\S]*?)<\/p>\s*<\/strong>\s*<\/span>/gi, (m, attrs: string, t: string) => {
    const size = Number(/font-size:\s*(\d+)/i.exec(attrs)?.[1] ?? 0);
    const text = clean(t);
    return size >= 18 && text.length > 0 && text.length <= 120 ? `<h2>${text}</h2>` : m;
  });
  return out;
}

// Article ka pura text reading order mein — "Listen to this article" (speechSynthesis) ke liye
function articlePlainText(post: BlogPost): string {
  let body = "";
  if (post.html) {
    body = stripTags(post.html.replace(/<\/(p|h[1-6]|li|blockquote|td|figcaption)>/gi, ". ")).replace(/&[a-z#0-9]+;/gi, " ");
  } else if (post.body?.length) {
    body = (post.body as PortableTextBlock[]).map(ptText).filter(Boolean).join(". ");
  } else if (post.blocks?.length) {
    body = post.blocks
      .map((b) => (b.t === "list" ? b.items.join(". ") : b.t === "quote" ? `${b.x}${b.by ? ` — ${b.by}` : ""}` : b.x))
      .join(". ");
  }
  return `${post.title}. ${post.excerpt || ""} ${body}`.replace(/\s+/g, " ").trim();
}

/* ===================== content styles ===================== */

const para: React.CSSProperties = { fontSize: 17.5, lineHeight: 1.75, color: "var(--mut)", margin: "20px 0 0" };
const h2Style: React.CSSProperties = { fontFamily: SUB, fontWeight: 700, letterSpacing: "-.015em", fontSize: "clamp(22px,3vw,29px)", lineHeight: 1.3, color: "var(--tx)", margin: "48px 0 0", scrollMarginTop: 96 };
const listStyle: React.CSSProperties = { listStyle: "none", padding: 0, margin: "22px 0 0", display: "flex", flexDirection: "column", gap: 12 };
const liStyle: React.CSSProperties = { display: "flex", gap: 13, alignItems: "flex-start", fontSize: 16, lineHeight: 1.65, color: "var(--tx2)" };
// Reference: simple accent dot bullets (check-circles retire — 2026-07-20 redesign)
const dotBullet: React.CSSProperties = { width: 7, height: 7, borderRadius: "50%", flexShrink: 0, marginTop: 9, background: "var(--num)" };
const numBadge: React.CSSProperties = { width: 24, height: 24, borderRadius: "50%", flexShrink: 0, marginTop: 1, background: "var(--tint)", border: "1px solid var(--tint-bd)", color: "var(--num)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 };
const quoteFigure: React.CSSProperties = { margin: "28px 0 0", padding: "22px 26px", background: "var(--tint)", border: "1px solid var(--tint-bd)", borderLeft: "4px solid #2c76ed", borderRadius: 16 };
const quoteText: React.CSSProperties = { margin: 0, fontFamily: SUB, fontSize: 17.5, fontWeight: 600, lineHeight: 1.6, color: "var(--tx)" };
const sideCard: React.CSSProperties = { background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 20, padding: "20px 22px" };
const sideLabel: React.CSSProperties = { display: "flex", alignItems: "center", gap: 9, fontFamily: SUB, fontSize: 12.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--dim)" };
const shareCircle: React.CSSProperties = { width: 38, height: 38, borderRadius: "50%", background: "var(--toggle-bg)", border: "1px solid var(--toggle-bd)", color: "var(--mut)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14, textDecoration: "none" };

// Sample articles ka hand-written content (blogData.ts blocks)
function Block({ b }: { b: BlogBlock }) {
  switch (b.t) {
    case "h2":
      return <h2 id={slugifyHeading(b.x)} style={h2Style}>{b.x}</h2>;
    case "p":
      return <p style={para}>{b.x}</p>;
    case "list":
      return (
        <ul style={listStyle}>
          {b.items.map((it) => (
            <li key={it} style={liStyle}>
              <span style={dotBullet} aria-hidden="true" />
              {it}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <figure style={quoteFigure}>
          <blockquote style={quoteText}>&ldquo;{b.x}&rdquo;</blockquote>
          {b.by && <figcaption style={{ marginTop: 10, fontSize: 13.5, fontWeight: 600, color: "var(--num)" }}>— {b.by}</figcaption>}
        </figure>
      );
    case "tip":
      return (
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", margin: "28px 0 0", padding: "18px 22px", background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 16 }}>
          <span style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.25)", color: "#1a9a5c", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 15 }} aria-hidden="true"><i className="fa-regular fa-lightbulb" /></span>
          <span>
            <span style={{ display: "block", fontFamily: SUB, fontSize: 12.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#1a9a5c" }}>Pro tip</span>
            <span style={{ display: "block", fontSize: 15, lineHeight: 1.65, color: "var(--mut)", marginTop: 5 }}>{b.x}</span>
          </span>
        </div>
      );
  }
}

// CMS content (Sanity portable text) — styles Block ke saath 1:1 match, taaki dono
// source ka article ek jaisa dikhe.
const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p style={para}>{children}</p>,
    h2: ({ children, value }) => <h2 id={slugifyHeading(ptText(value as PortableTextBlock))} style={h2Style}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ ...h2Style, fontSize: "clamp(17.5px,2.2vw,20px)", margin: "32px 0 0" }}>{children}</h3>,
    h4: ({ children }) => <h4 style={{ ...h2Style, fontSize: 17, margin: "28px 0 0" }}>{children}</h4>,
    blockquote: ({ children }) => (
      <figure style={quoteFigure}>
        <blockquote style={quoteText}>{children}</blockquote>
      </figure>
    ),
  },
  list: {
    bullet: ({ children }) => <ul style={listStyle}>{children}</ul>,
    number: ({ children }) => <ol style={{ ...listStyle, counterReset: "pt-ol" }}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li style={liStyle}>
        <span style={dotBullet} aria-hidden="true" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children, index }) => (
      <li style={liStyle}>
        <span style={numBadge} aria-hidden="true">{index + 1}</span>
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong style={{ color: "var(--tx)", fontWeight: 700 }}>{children}</strong>,
    highlight: ({ children }) => <span style={{ background: "rgba(44,118,237,.16)", borderRadius: 3, padding: "0 3px" }}>{children}</span>,
    link: ({ children, value }) => {
      const href: string = value?.href || "#";
      // Studio ke "Open in new tab" toggle ki respect; external http links bhi new tab
      const blank = value?.blank ?? href.startsWith("http");
      return (
        <a href={href} target={blank ? "_blank" : undefined} rel={blank ? "noopener noreferrer" : undefined} style={{ color: "var(--num)", fontWeight: 600 }}>
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) =>
      value?.asset ? (
        <figure style={{ margin: "28px 0 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={urlFor(value).width(1400).auto("format").url()} alt={value.alt || ""} loading="lazy" style={{ width: "100%", borderRadius: 18, border: "1px solid var(--line2)", display: "block" }} />
          {value.caption && <figcaption style={{ marginTop: 10, fontSize: 13.5, color: "var(--dim)", textAlign: "center" }}>{value.caption}</figcaption>}
        </figure>
      ) : null,
    // Studio ka @sanity/table block — pehli row header ban'ti hai; narrow screens par
    // wrapper horizontally scroll karta hai taaki page layout na toote
    table: ({ value }) => {
      const rows: { _key?: string; cells?: string[] }[] = value?.rows ?? [];
      if (!rows.length) return null;
      const [head, ...body] = rows;
      return (
        <div style={{ overflowX: "auto", margin: "28px 0 0", border: "1px solid var(--line2)", borderRadius: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, lineHeight: 1.6 }}>
            <thead>
              <tr>
                {(head.cells ?? []).map((c, i) => (
                  <th key={i} style={{ textAlign: "left", fontFamily: SUB, fontWeight: 700, fontSize: 13.5, letterSpacing: ".02em", color: "var(--tx)", background: "var(--tint)", padding: "12px 16px", borderBottom: "1px solid var(--line2)", whiteSpace: "nowrap" }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={r._key ?? ri}>
                  {(r.cells ?? []).map((c, ci) => (
                    <td key={ci} style={{ padding: "12px 16px", color: "var(--mut)", verticalAlign: "top", borderBottom: ri === body.length - 1 ? "none" : "1px solid var(--line)" }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
};

// WYSIWYG (SunEditor) posts ka HTML content — styles Block/ptComponents se 1:1 match,
// taaki teeno content sources (sample blocks / portable text / HTML) ka article same dikhe.
// Raw HTML hai isliye CSS rules — editor ke inline styles (colors etc.) upar carry hote hain.
const CMS_CSS = `
.cms-html{font-size:17.5px;line-height:1.75;color:var(--mut);overflow-wrap:break-word}
.cms-html>*:first-child{margin-top:0}
.cms-html p{margin:20px 0 0}
.cms-html h1{font-family:${SUB};font-weight:700;letter-spacing:-.015em;font-size:clamp(24px,3.2vw,30px);line-height:1.25;color:var(--tx);margin:44px 0 0}
.cms-html h2{font-family:${SUB};font-weight:700;letter-spacing:-.015em;font-size:clamp(22px,3vw,29px);line-height:1.3;color:var(--tx);margin:48px 0 0;scroll-margin-top:96px}
.cms-html h3{font-family:${SUB};font-weight:700;letter-spacing:-.01em;font-size:clamp(17.5px,2.2vw,20px);color:var(--tx);margin:32px 0 0}
.cms-html h4{font-family:${SUB};font-weight:700;font-size:17px;color:var(--tx);margin:28px 0 0}
.cms-html h5{font-family:${SUB};font-weight:700;font-size:15.5px;color:var(--tx);margin:26px 0 0}
.cms-html h6{font-family:${SUB};font-weight:700;font-size:13.5px;letter-spacing:.04em;text-transform:uppercase;color:var(--tx2);margin:24px 0 0}
.cms-html strong,.cms-html b{color:var(--tx);font-weight:700}
.cms-html a{color:var(--num);font-weight:600}
.cms-html ul,.cms-html ol{margin:22px 0 0;padding-left:26px;color:var(--tx2);font-size:16px;line-height:1.65}
.cms-html li{margin-top:10px}
.cms-html li::marker{color:var(--num)}
.cms-html li p{margin:0}
.cms-html blockquote{margin:28px 0 0;padding:22px 26px;background:var(--tint);border:1px solid var(--tint-bd);border-left:4px solid #2c76ed;border-radius:16px;font-family:${SUB};font-size:17.5px;font-weight:600;line-height:1.6;color:var(--tx)}
.cms-html blockquote p{margin:0}
.cms-html img{max-width:100%;height:auto;border-radius:18px;border:1px solid var(--line2);margin:28px 0 0}
.cms-html figure{margin:28px 0 0}
.cms-html figure img{margin:0}
.cms-html figcaption{margin-top:10px;font-size:13.5px;color:var(--dim);text-align:center}
.cms-html hr{border:0;border-top:1px solid var(--line2);margin:36px 0 0}
.cms-html table{display:block;max-width:100%;overflow-x:auto;border-collapse:collapse;margin:28px 0 0;font-size:15px;line-height:1.6}
.cms-html table td,.cms-html table th{border:1px solid var(--line2);padding:11px 15px;color:var(--mut);vertical-align:top;min-width:90px}
.cms-html table th{font-family:${SUB};font-weight:700;font-size:13.5px;color:var(--tx);background:var(--tint);text-align:left}
.cms-html iframe{max-width:100%;border:0;border-radius:14px}
.cms-html .se-component{margin:28px 0 0}
`;

// Layout CSS — inline styles media queries nahi kar sakte, isliye grid/sidebar/responsive
// rules yahan. Class prefix "bp-" (blog post).
const BLOG_CSS = `
@media(prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}
/* align-items yahan STRETCH hi rehna chahiye (default) — start karne par aside content-height
   tak sikud jata hai aur .bp-sticky ke paas stick hone ki travel-room nahi bachti */
.bp-grid{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:44px;margin-top:46px}
.bp-sticky{position:sticky;top:96px;display:flex;flex-direction:column;gap:16px;max-height:calc(100vh - 112px);overflow-y:auto;scrollbar-width:thin}
.bp-toc a{display:block;padding:7px 0 7px 14px;border-left:2px solid var(--line2);font-size:14px;line-height:1.45;font-weight:600;color:var(--mut);text-decoration:none}
.bp-toc a:hover{color:var(--tx)}
.bp-toc a.on{color:var(--num);border-left-color:var(--num)}
.bp-hero{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,.95fr);gap:20px;align-items:start;margin-top:26px}
@media(max-width:980px){
 .bp-hero{grid-template-columns:minmax(0,1fr)}
}
/* form fields 1-col: (a) 981–1180 band mein jahan side-by-side form column tang hai,
   (b) chhote phones par. Stacked tablet (641–980) full-width hai — wahan 2-col theek. */
@media(max-width:1180px) and (min-width:981px){
 .bp-form-row{grid-template-columns:minmax(0,1fr)!important}
}
@media(max-width:640px){
 .bp-form-row{grid-template-columns:minmax(0,1fr)!important}
}
.bp-feats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:14px;margin-top:34px}
/* tablets: 4-across cramped / 3+1 lopsided hota tha — saaf 2x2; chhote phones par 1-col */
@media(max-width:1180px){.bp-feats{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:560px){.bp-feats{grid-template-columns:minmax(0,1fr)}}
.bp-keep{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:20px;margin-top:24px}
.bp-meta-row{display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap;margin-top:26px}
@media(max-width:1080px){
 .bp-grid{grid-template-columns:minmax(0,1fr)}
 .bp-sticky{position:static;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));align-items:stretch;max-height:none;overflow:visible}
 .bp-toc{display:none}
}
@media(max-width:640px){
 .bp-cover{border-radius:18px!important}
 .bp-cta{padding:34px 22px!important}
 .bp-author{flex-direction:column}
}
`;

/* ===================== page ===================== */

const APP_URL = "https://app.hello22.ai/";

// Feature strip — claims homepage/JSON-LD par already live copy se (kuch naya invent nahi)
const FEATURES = [
  { ic: "fa-solid fa-phone-volume", t: "Answers every call", s: "24/7 — no voicemail, no busy signal" },
  { ic: "fa-regular fa-calendar-check", t: "Books appointments", s: "Straight into your calendar" },
  { ic: "fa-solid fa-user-plus", t: "Captures every lead", s: "Name, number & reason logged" },
  { ic: "fa-solid fa-language", t: "Speaks 22+ languages", s: "Natural, human-like voices" },
];

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rawPost = await getBlogPost(decodeURIComponent(slug));
  if (!rawPost) notFound();
  // fake headings ko pehle hi promote kar do — TOC/anchors/audio sab isi normalized html se chalte hain
  const post = rawPost.html ? { ...rawPost, html: promoteFakeHeadings(rawPost.html) } : rawPost;

  const cat = CATEGORY_STYLE[post.category];
  const allPosts = await getBlogPosts();
  const others = allPosts.filter((p) => p.slug !== post.slug);
  // Keep reading: 2 bade cards (reference layout) — same category pehle
  const related = [...others].sort((a, b) => (a.category === post.category ? -1 : 0) - (b.category === post.category ? -1 : 0)).slice(0, 2);
  // Sidebar recent: latest 3
  const recent = others.slice(0, 3);
  const headings = extractHeadings(post);
  const shareUrl = `https://www.hello22.ai/blog/${post.slug}`;
  const shareTitle = encodeURIComponent(post.title);
  const shareLinks = [
    { ic: "fa-brands fa-linkedin-in", label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
    { ic: "fa-brands fa-x-twitter", label: "Share on X", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}` },
    { ic: "fa-brands fa-facebook-f", label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { ic: "fa-regular fa-envelope", label: "Share via email", href: `mailto:?subject=${shareTitle}&body=${encodeURIComponent(shareUrl)}` },
  ];
  const coverChips = post.tags?.length ? post.tags.slice(0, 4) : [post.category];

  const personAvatar = (p: { avatar: string }, size: number, radius: string | number = "50%") =>
    p.avatar ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={p.avatar} alt="" style={{ width: size, height: size, borderRadius: radius, objectFit: "cover", border: "1px solid var(--line2)", display: "block", flexShrink: 0 }} />
    ) : (
      <span style={{ width: size, height: size, borderRadius: radius, background: "var(--tint)", border: "1px solid var(--tint-bd)", color: "var(--num)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.38, flexShrink: 0 }} aria-hidden="true"><i className="fa-solid fa-headset" /></span>
    );

  // Author stat tiles (reference UI) — sab REAL data se computed, invented metrics nahi
  const authorPosts = allPosts.filter((p) => p.author.name === post.author.name);
  const catCount = new Map<string, number>();
  for (const p of authorPosts) catCount.set(p.category, (catCount.get(p.category) ?? 0) + 1);
  const topCat = [...catCount.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? post.category;
  const authorStats = [
    { ic: "fa-regular fa-file-lines", v: String(authorPosts.length), l: authorPosts.length === 1 ? "Article published" : "Articles published" },
    { ic: "fa-regular fa-clock", v: `${authorPosts.reduce((s, p) => s + p.readMins, 0)} min`, l: "Of guides published" },
    { ic: "fa-regular fa-star", v: topCat, l: "Writes mostly about" },
  ];
  // Company profiles — authors ke personal socials exist nahi karte (site footer wale hi links)
  const authorLinks = [
    { ic: "fa-brands fa-linkedin-in", t: "LinkedIn", href: "https://www.linkedin.com/company/hello22-ai" },
    { ic: "fa-brands fa-facebook-f", t: "Facebook", href: "https://www.facebook.com/hello22ai" },
    { ic: "fa-regular fa-envelope", t: "Email", href: "mailto:connect@hello22.ai" },
  ];

  return (
    <PageShell current="/blog" maxWidth={1280}>
      <style dangerouslySetInnerHTML={{ __html: BLOG_CSS }} />
      {/* Studio ka schemaMarkup field (JSON-LD) — bhara ho to as-is inject */}
      {post.seo?.schemaMarkup && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: post.seo.schemaMarkup }} />}

      {/* ===== BREADCRUMB ===== */}
      <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", fontFamily: SUB, fontSize: 13.5, fontWeight: 600 }}>
        <a href="/" style={{ color: "var(--mut)", textDecoration: "none" }}>Home</a>
        <i className="fa-solid fa-chevron-right" aria-hidden="true" style={{ fontSize: 9, color: "var(--dim)" }} />
        <a href="/blog" style={{ color: "var(--mut)", textDecoration: "none" }}>Blog</a>
        <i className="fa-solid fa-chevron-right" aria-hidden="true" style={{ fontSize: 9, color: "var(--dim)" }} />
        <a href="/blog" style={{ color: "var(--num)", textDecoration: "none" }}>{post.category}</a>
        <i className="fa-solid fa-chevron-right" aria-hidden="true" style={{ fontSize: 9, color: "var(--dim)" }} />
        <span style={{ color: "var(--dim)" }}>Article</span>
      </nav>

      {/* ===== HEADER — left-aligned (reference) ===== */}
      <header style={{ marginTop: 26, maxWidth: 920 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", padding: "6px 14px", borderRadius: 999, background: cat.bg, border: `1px solid ${cat.bd}`, color: cat.c, fontFamily: SUB, fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>{post.category}</span>
        </div>
        <h1 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.025em", fontSize: "clamp(27px,4vw,46px)", lineHeight: 1.14, margin: "20px 0 0" }}>{post.title}</h1>
        {post.excerpt && <p style={{ fontFamily: SUB, fontSize: "clamp(16px,2vw,18.5px)", fontWeight: 500, lineHeight: 1.6, color: "var(--mut)", margin: "18px 0 0" }}>{post.excerpt}</p>}
      </header>

      {/* meta row: author + date/read-time (left) · share icons (right) */}
      <div className="bp-meta-row">
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 11 }}>
            {personAvatar(post.author, 44)}
            <span>
              <span style={{ display: "block", fontFamily: SUB, fontSize: 14.5, fontWeight: 700, color: "var(--tx)" }}>{post.author.name}</span>
              <span style={{ display: "block", fontSize: 12.5, color: "var(--dim)", marginTop: 1 }}>{post.author.role}</span>
            </span>
          </span>
          <span aria-hidden="true" style={{ width: 1, height: 30, background: "var(--line2)" }} />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--dim)" }}><i className="fa-regular fa-calendar" aria-hidden="true" />{formatDate(post.date)}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--dim)" }}><i className="fa-regular fa-clock" aria-hidden="true" />{post.readMins} min read</span>
          {post.updated && post.updated !== post.date && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--dim)" }}><i className="fa-regular fa-pen-to-square" aria-hidden="true" />Updated <strong style={{ fontWeight: 700, color: "var(--mut)" }}>{formatDate(post.updated)}</strong></span>
          )}
        </div>
      </div>

      {/* listen pill LEFT + share cluster RIGHT — ek hi row (reference UI) */}
      <div className="bp-meta-row" style={{ marginTop: 20 }}>
        <BlogListen text={articlePlainText(post)} mins={post.readMins} />
        <span style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--dim)" }}>Share</span>
          {shareLinks.map((s) => (
            <a key={s.ic} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={shareCircle}><i className={s.ic} aria-hidden="true" /></a>
          ))}
          <CopyLink url={shareUrl} />
        </span>
      </div>

      {/* ===== HERO ROW — cover image LEFT (kam width) + demo form RIGHT (client order 2026-07-20).
          Image apne uploaded aspect ratio par render hoti hai — crop nahi (client: "jo size m
          upload hogi") ===== */}
      <div className="bp-hero">
        <figure style={{ margin: 0, alignSelf: "start", minWidth: 0 }}>
          <div className="bp-cover" style={{ position: "relative", borderRadius: 24, overflow: "hidden", border: "1px solid var(--line2)", boxShadow: "0 26px 54px -32px var(--sh1)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/* maxHeight cap — landscape CMS covers apne uploaded aspect par hi rehte hain
                (cap se neeche), sirf portrait photos gracefully crop hoti hain warna image
                form se dugni lambi ho jati thi (visual audit 2026-07-20) */}
            <img src={post.cover} alt={post.coverAlt || ""} style={{ width: "100%", height: "auto", maxHeight: 560, objectFit: "cover", objectPosition: "center 30%", display: "block" }} />
            <span style={{ position: "absolute", left: 16, bottom: 14, display: "flex", gap: 8, flexWrap: "wrap" }} aria-hidden="true">
              {coverChips.map((t) => (
                <span key={t} style={{ background: "rgba(255,255,255,.92)", color: "#10131c", fontFamily: SUB, fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>#{t.replace(/\s+/g, "")}</span>
              ))}
            </span>
          </div>
          {/* caption (reference UI) — Studio ke featureImage.alt se; khali ho to nahi dikhta */}
          {post.coverAlt && <figcaption style={{ marginTop: 12, fontSize: 13.5, color: "var(--dim)", textAlign: "center" }}>{post.coverAlt}</figcaption>}
        </figure>
        <BlogDemoForm />
      </div>

      {/* ===== FEATURE STRIP (reference ke 4 mini-cards) ===== */}
      <div className="bp-feats">
        {FEATURES.map((f) => (
          <div key={f.t} style={{ display: "flex", alignItems: "flex-start", gap: 13, background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 16, padding: "15px 17px" }}>
            <span style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: "var(--tint)", border: "1px solid var(--tint-bd)", color: "var(--num)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 15 }} aria-hidden="true"><i className={f.ic} /></span>
            <span>
              <span style={{ display: "block", fontFamily: SUB, fontSize: 14.5, fontWeight: 700, color: "var(--tx)" }}>{f.t}</span>
              <span style={{ display: "block", fontSize: 12.5, lineHeight: 1.5, color: "var(--dim)", marginTop: 3 }}>{f.s}</span>
            </span>
          </div>
        ))}
      </div>

      {/* ===== 2-COLUMN: content + sticky sidebar ===== */}
      <div className="bp-grid">
        <article style={{ minWidth: 0 }}>
          {post.html ? (
            <>
              <style dangerouslySetInnerHTML={{ __html: CMS_CSS }} />
              <div className="cms-html" dangerouslySetInnerHTML={{ __html: injectHeadingIds(post.html) }} />
            </>
          ) : post.body?.length ? (
            <PortableText value={post.body as PortableTextBlock[]} components={ptComponents} />
          ) : (
            post.blocks?.map((b, i) => <Block key={i} b={b} />)
          )}

          {/* tags */}
          {post.tags && post.tags.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 44, paddingTop: 26, borderTop: "1px solid var(--line2)" }}>
              <span style={{ fontFamily: SUB, fontSize: 13.5, fontWeight: 700, color: "var(--tx)" }}>Tagged:</span>
              {post.tags.map((t) => (
                <span key={t} style={{ background: "var(--toggle-bg)", border: "1px solid var(--toggle-bd)", color: "var(--mut)", fontSize: 13, fontWeight: 600, padding: "6px 14px", borderRadius: 999 }}>#{t}</span>
              ))}
            </div>
          )}

          {/* share card (reference: "Found this useful?") */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginTop: post.tags?.length ? 20 : 44, background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 18, padding: "18px 22px" }}>
            <span>
              <span style={{ display: "block", fontFamily: SUB, fontSize: 15, fontWeight: 700, color: "var(--tx)" }}>Found this useful?</span>
              <span style={{ display: "block", fontSize: 13.5, color: "var(--mut)", marginTop: 3 }}>Share it with another business owner.</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--dim)" }}>Share</span>
              {shareLinks.map((s) => (
                <a key={s.ic} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={shareCircle}><i className={s.ic} aria-hidden="true" /></a>
              ))}
            </span>
          </div>

          {/* written by — bio + computed stat tiles + socials (reference UI) */}
          <div className="bp-author" style={{ display: "flex", alignItems: "flex-start", gap: 20, marginTop: 20, background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 18, padding: "24px 26px" }}>
            {personAvatar(post.author, 88, 18)}
            <span style={{ minWidth: 0, flex: 1 }}>
              <span style={{ display: "block", fontFamily: SUB, fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--num)" }}>Written by</span>
              <span style={{ display: "block", fontFamily: SUB, fontSize: 21, fontWeight: 700, color: "var(--tx)", marginTop: 6 }}>{post.author.name}</span>
              <span style={{ display: "block", fontSize: 13.5, color: "var(--mut)", marginTop: 3 }}>{post.author.role}</span>
              {post.author.bio && <span style={{ display: "block", fontSize: 14.5, lineHeight: 1.65, color: "var(--mut)", marginTop: 12 }}>{post.author.bio}</span>}
              {/* compact horizontal tiles — icon/value/label ek line par (client 2026-07-20:
                  stacked layout mein spacing zyada lag rahi thi) */}
              <span style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,175px),1fr))", gap: 10, marginTop: 14 }}>
                {authorStats.map((s) => (
                  <span key={s.l} style={{ display: "flex", alignItems: "center", gap: 11, border: "1px solid var(--line2)", borderRadius: 12, padding: "10px 13px" }}>
                    <span style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: "var(--tint)", border: "1px solid var(--tint-bd)", color: "var(--num)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 }} aria-hidden="true"><i className={s.ic} /></span>
                    <span style={{ minWidth: 0 }}>
                      <span style={{ display: "block", fontFamily: SUB, fontSize: 14.5, fontWeight: 700, lineHeight: 1.2, color: "var(--tx)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.v}</span>
                      <span style={{ display: "block", fontSize: 11.5, color: "var(--dim)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.l}</span>
                    </span>
                  </span>
                ))}
              </span>
              <span style={{ display: "flex", gap: 9, flexWrap: "wrap", marginTop: 14 }}>
                {authorLinks.map((s) => (
                  <a key={s.t} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid var(--line2)", borderRadius: 10, padding: "8px 14px", fontSize: 13, fontWeight: 600, color: "var(--mut)", textDecoration: "none" }}><i className={s.ic} aria-hidden="true" />{s.t}</a>
                ))}
              </span>
            </span>
          </div>

          {/* reviewed by (reference UI) — sirf jab data ho (sample posts; CMS posts par nahi) */}
          {post.reviewedBy && (
            <div style={{ display: "flex", alignItems: "center", gap: 15, marginTop: 16, background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 18, padding: "18px 24px" }}>
              {personAvatar(post.reviewedBy, 52)}
              <span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: SUB, fontSize: 11.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--num)" }}>Reviewed by <i className="fa-solid fa-circle-check" aria-hidden="true" style={{ fontSize: 12 }} /></span>
                <span style={{ display: "block", fontFamily: SUB, fontSize: 16, fontWeight: 700, color: "var(--tx)", marginTop: 4 }}>{post.reviewedBy.name}</span>
                <span style={{ display: "block", fontSize: 13, color: "var(--dim)", marginTop: 2 }}>{post.reviewedBy.role}</span>
              </span>
            </div>
          )}
        </article>

        {/* ===== SIDEBAR ===== */}
        <aside style={{ minWidth: 0 }}>
          <div className="bp-sticky">
            {/* On this page — client component (scroll-spy hydration-safe) */}
            <BlogToc headings={headings} />

            {/* author card (reference sidebar) — bio + articles count + socials */}
            <div style={sideCard}>
              <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                {personAvatar(post.author, 52)}
                <span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: SUB, fontSize: 15.5, fontWeight: 700, color: "var(--tx)" }}>{post.author.name} <i className="fa-solid fa-circle-check" aria-hidden="true" style={{ color: "var(--num)", fontSize: 13 }} /></span>
                  <span style={{ display: "block", fontSize: 13, color: "var(--dim)", marginTop: 2 }}>{post.author.role}</span>
                </span>
              </div>
              {post.author.bio && (
                <span style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", fontSize: 13.5, lineHeight: 1.6, color: "var(--mut)", marginTop: 12 }}>{post.author.bio}</span>
              )}
              <span style={{ display: "block", fontSize: 12.5, color: "var(--dim)", marginTop: 10 }}><strong style={{ color: "var(--tx)", fontWeight: 700 }}>{authorPosts.length}</strong> {authorPosts.length === 1 ? "article" : "articles"} on this blog</span>
              <span style={{ display: "flex", gap: 8, marginTop: 12 }}>
                {authorLinks.map((s) => (
                  <a key={s.t} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" aria-label={s.t} style={{ width: 32, height: 32, borderRadius: 9, border: "1px solid var(--line2)", color: "var(--mut)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, textDecoration: "none" }}><i className={s.ic} aria-hidden="true" /></a>
                ))}
              </span>
            </div>

            {/* recent posts */}
            {recent.length > 0 && (
              <div style={sideCard}>
                <span style={sideLabel}><i className="fa-solid fa-arrow-trend-up" aria-hidden="true" style={{ color: "var(--num)" }} />Recent posts</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
                  {recent.map((p) => (
                    <a key={p.slug} href={`/blog/${p.slug}`} style={{ display: "flex", gap: 12, alignItems: "flex-start", textDecoration: "none" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.thumb || p.cover} alt="" loading="lazy" style={{ width: 64, height: 48, borderRadius: 10, objectFit: "cover", border: "1px solid var(--line2)", flexShrink: 0 }} />
                      <span style={{ minWidth: 0 }}>
                        <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", fontFamily: SUB, fontSize: 13.5, fontWeight: 700, lineHeight: 1.4, color: "var(--tx)" }}>{p.title}</span>
                        <span style={{ display: "block", fontSize: 12, color: "var(--dim)", marginTop: 4 }}>{formatDate(p.date)} · {p.readMins} min</span>
                      </span>
                    </a>
                  ))}
                </div>
                <a href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--num)", fontFamily: SUB, fontSize: 13.5, fontWeight: 700, textDecoration: "none", marginTop: 16 }}>View all posts <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: 11 }} /></a>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* ===== KEEP READING — 2 bade cards (reference) ===== */}
      {related.length > 0 && (
        <div style={{ marginTop: 76 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "var(--tint)", border: "1px solid var(--tint-bd)", color: "var(--num)", fontFamily: SUB, fontSize: 11.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14 }}><i className="fa-solid fa-star" aria-hidden="true" style={{ fontSize: 9 }} />Featured</span>
              <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: "clamp(22px,3vw,30px)", margin: 0 }}>Keep reading</h2>
              <p style={{ fontSize: 14.5, color: "var(--mut)", margin: "8px 0 0" }}>Hand-picked reads on AI receptionists, missed-call recovery, and front-desk automation.</p>
            </div>
            <a href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--num)", fontFamily: SUB, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>View all articles <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: 11 }} /></a>
          </div>
          <div className="bp-keep">
            {related.map((p) => {
              const rc = CATEGORY_STYLE[p.category];
              return (
                <a key={p.slug} href={`/blog/${p.slug}`} style={{ background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit" }}>
                  <span style={{ position: "relative", display: "block", aspectRatio: "16 / 8", overflow: "hidden", borderBottom: "1px solid var(--line)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.cover} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <span style={{ position: "absolute", top: 14, left: 14, background: "rgba(255,255,255,.92)", color: rc.c, fontFamily: SUB, fontSize: 11.5, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", padding: "6px 13px", borderRadius: 999 }}>{p.category}</span>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1, padding: "18px 22px 22px" }}>
                    <span style={{ fontSize: 12.5, color: "var(--dim)" }}>{formatDate(p.date)} · {p.readMins} min read</span>
                    <span style={{ display: "block", fontFamily: SUB, fontWeight: 700, fontSize: 18, lineHeight: 1.35, color: "var(--tx)", marginTop: 9 }}>{p.title}</span>
                    {p.excerpt && <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", fontSize: 14, lineHeight: 1.6, color: "var(--mut)", marginTop: 8 }}>{p.excerpt}</span>}
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--num)", fontFamily: SUB, fontSize: 14, fontWeight: 700, marginTop: "auto", paddingTop: 14 }}>Read article <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: 11 }} /></span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== CTA — dark panel (reference ka "Say hello" section) ===== */}
      <div className="bp-cta" style={{ marginTop: 76, background: "radial-gradient(ellipse at 50% -30%, rgba(44,118,237,.3), transparent 55%), #0c1122", borderRadius: 28, padding: "52px 40px", textAlign: "center" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(44,118,237,.16)", border: "1px solid rgba(44,118,237,.35)", color: "#8ab4f8", fontFamily: SUB, fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: "7px 16px", borderRadius: 999 }}><i className="fa-solid fa-hand-sparkles" aria-hidden="true" />Say hello</span>
        <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: "clamp(24px,3.6vw,38px)", lineHeight: 1.15, color: "#fff", margin: "18px auto 0", maxWidth: 640 }}>to your new AI receptionist<span style={{ color: "#4d8ef5" }}>.</span></h2>
        <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "rgba(244,244,247,.75)", maxWidth: 520, margin: "14px auto 0" }}>Launch your AI receptionist in 22 minutes and let it answer while you work — every call, every language, every hour.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginTop: 26 }}>
          <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", background: "#2c76ed", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 26px", borderRadius: 999, boxShadow: "0 14px 30px -14px rgba(44,118,237,.8)" }}>Start free trial <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: 12 }} /></a>
          <a href="/#demo" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", background: "transparent", color: "#e4e4ec", fontWeight: 700, fontSize: 15, padding: "12px 24px", borderRadius: 999, border: "1.5px solid rgba(255,255,255,.25)" }}>Hear a live call</a>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap", marginTop: 30, fontSize: 13.5, color: "rgba(244,244,247,.65)" }}>
          {[
            { ic: "fa-regular fa-clock", x: "22-minute setup" },
            { ic: "fa-solid fa-language", x: "22+ languages" },
            { ic: "fa-solid fa-phone-volume", x: "24/7 answering" },
          ].map((s) => (
            <span key={s.x} style={{ display: "inline-flex", alignItems: "center", gap: 9 }}><i className={s.ic} aria-hidden="true" style={{ color: "#4d8ef5" }} />{s.x}</span>
          ))}
        </div>
      </div>

    </PageShell>
  );
}
