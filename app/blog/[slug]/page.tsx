import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import PageShell, { DISP, SUB } from "@/components/site22/PageShell";
import { CATEGORY_STYLE, formatDate, type BlogBlock } from "@/components/site22/blogData";
import { getBlogPost, getBlogPosts, urlFor } from "@/lib/sanity";

// Har blog post ka page — data Sanity CMS se (lib/sanity.ts), sample articles fallback.
// CMS posts ka content portable text (body) hai, sample articles ka hand-written blocks.

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

const para: React.CSSProperties = { fontSize: 16.5, lineHeight: 1.8, color: "var(--mut)", margin: "20px 0 0" };
const h2Style: React.CSSProperties = { fontFamily: SUB, fontWeight: 700, letterSpacing: "-.01em", fontSize: "clamp(20px,2.6vw,25px)", color: "var(--tx)", margin: "40px 0 0" };
const listStyle: React.CSSProperties = { listStyle: "none", padding: 0, margin: "22px 0 0", display: "flex", flexDirection: "column", gap: 12 };
const liStyle: React.CSSProperties = { display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15.5, lineHeight: 1.65, color: "var(--tx2)" };
const checkBadge: React.CSSProperties = { width: 22, height: 22, borderRadius: "50%", flexShrink: 0, marginTop: 2, background: "var(--tint)", border: "1px solid var(--tint-bd)", color: "var(--num)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10 };
const quoteFigure: React.CSSProperties = { margin: "28px 0 0", padding: "22px 26px", background: "var(--tint)", border: "1px solid var(--tint-bd)", borderLeft: "4px solid #2c76ed", borderRadius: 16 };
const quoteText: React.CSSProperties = { margin: 0, fontFamily: SUB, fontSize: 17.5, fontWeight: 600, lineHeight: 1.6, color: "var(--tx)" };

// Sample articles ka hand-written content (blogData.ts blocks)
function Block({ b }: { b: BlogBlock }) {
  switch (b.t) {
    case "h2":
      return <h2 style={h2Style}>{b.x}</h2>;
    case "p":
      return <p style={para}>{b.x}</p>;
    case "list":
      return (
        <ul style={listStyle}>
          {b.items.map((it) => (
            <li key={it} style={liStyle}>
              <span style={checkBadge} aria-hidden="true"><i className="fa-solid fa-check" /></span>
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
    h2: ({ children }) => <h2 style={h2Style}>{children}</h2>,
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
        <span style={checkBadge} aria-hidden="true"><i className="fa-solid fa-check" /></span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children, index }) => (
      <li style={liStyle}>
        <span style={{ ...checkBadge, fontSize: 11.5, fontWeight: 700 }} aria-hidden="true">{index + 1}</span>
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
.cms-html{font-size:16.5px;line-height:1.8;color:var(--mut);overflow-wrap:break-word}
.cms-html>*:first-child{margin-top:0}
.cms-html p{margin:20px 0 0}
.cms-html h1{font-family:${SUB};font-weight:700;letter-spacing:-.015em;font-size:clamp(24px,3.2vw,30px);line-height:1.25;color:var(--tx);margin:44px 0 0}
.cms-html h2{font-family:${SUB};font-weight:700;letter-spacing:-.01em;font-size:clamp(20px,2.6vw,25px);color:var(--tx);margin:40px 0 0}
.cms-html h3{font-family:${SUB};font-weight:700;letter-spacing:-.01em;font-size:clamp(17.5px,2.2vw,20px);color:var(--tx);margin:32px 0 0}
.cms-html h4{font-family:${SUB};font-weight:700;font-size:17px;color:var(--tx);margin:28px 0 0}
.cms-html h5{font-family:${SUB};font-weight:700;font-size:15.5px;color:var(--tx);margin:26px 0 0}
.cms-html h6{font-family:${SUB};font-weight:700;font-size:13.5px;letter-spacing:.04em;text-transform:uppercase;color:var(--tx2);margin:24px 0 0}
.cms-html strong,.cms-html b{color:var(--tx);font-weight:700}
.cms-html a{color:var(--num);font-weight:600}
.cms-html ul,.cms-html ol{margin:22px 0 0;padding-left:26px;color:var(--tx2);font-size:15.5px;line-height:1.65}
.cms-html li{margin-top:10px}
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(decodeURIComponent(slug));
  if (!post) notFound();

  const cat = CATEGORY_STYLE[post.category];
  // 4 related — 3 cards wide container mein row aadha khali chhod rahe the (user feedback 2026-07-13)
  const allPosts = await getBlogPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug).sort((a, b) => (a.category === post.category ? -1 : 0) - (b.category === post.category ? -1 : 0)).slice(0, 4);
  const shareUrl = `https://www.hello22.ai/blog/${post.slug}`;
  const shareTitle = encodeURIComponent(post.title);

  return (
    // maxWidth 1536 = homepage sections ka container (user feedback 2026-07-13: 860/1200 dono
    // wide screens par narrow lage); header/cover container-wide, article text readable width par.
    <PageShell current="/blog" maxWidth={1536}>
      {/* Studio ka schemaMarkup field (JSON-LD) — bhara ho to as-is inject */}
      {post.seo?.schemaMarkup && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: post.seo.schemaMarkup }} />}

      {/* ===== BREADCRUMB ===== */}
      <a href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", fontFamily: SUB, fontSize: 13.5, fontWeight: 700, color: "var(--mut)" }}>
        <i className="fa-solid fa-arrow-left" aria-hidden="true" style={{ fontSize: 11 }} /> All articles
      </a>

      {/* ===== HEADER — centered, container-wide ===== */}
      <header style={{ marginTop: 30, textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", padding: "6px 14px", borderRadius: 999, background: cat.bg, border: `1px solid ${cat.bd}`, color: cat.c, fontFamily: SUB, fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>{post.category}</span>
          <span style={{ fontSize: 13.5, color: "var(--dim)" }}>{formatDate(post.date)} · {post.readMins} min read</span>
        </div>
        <h1 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.025em", fontSize: "clamp(27px,4vw,46px)", lineHeight: 1.15, maxWidth: 980, margin: "22px auto 0" }}>{post.title}</h1>
        {post.excerpt && <p style={{ fontFamily: SUB, fontSize: "clamp(16px,2vw,19px)", fontWeight: 500, lineHeight: 1.6, color: "var(--mut)", maxWidth: 760, margin: "18px auto 0" }}>{post.excerpt}</p>}
        {/* author row — CMS posts ka avatar nahi hota, brand badge dikhta hai */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 28, textAlign: "left" }}>
          {post.author.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.author.avatar} alt="" style={{ width: 46, height: 46, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--line2)", display: "block" }} />
          ) : (
            <span style={{ width: 46, height: 46, borderRadius: "50%", background: "var(--tint)", border: "1px solid var(--tint-bd)", color: "var(--num)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 17 }} aria-hidden="true"><i className="fa-solid fa-headset" /></span>
          )}
          <span>
            <span style={{ display: "block", fontFamily: SUB, fontSize: 15, fontWeight: 700, color: "var(--tx)" }}>{post.author.name}</span>
            <span style={{ display: "block", fontSize: 13, color: "var(--dim)", marginTop: 2 }}>{post.author.role}</span>
          </span>
        </div>
      </header>

      {/* ===== COVER — full container width ===== */}
      <div style={{ borderRadius: 26, overflow: "hidden", border: "1px solid var(--line2)", boxShadow: "0 26px 54px -32px var(--sh1)", marginTop: 38, aspectRatio: "21 / 9" }} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* center 30% — portrait covers mein 21:9 crop face kaat raha tha (visual audit 2026-07-13) */}
        <img src={post.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }} />
      </div>

      {/* ===== BODY — FULL container width, no centered column (user ka clear order 2026-07-13:
          "content width mein karo taaki left-right space cover ho") ===== */}
      <article style={{ margin: "30px 0 0" }}>
        {post.html ? (
          <>
            <style dangerouslySetInnerHTML={{ __html: CMS_CSS }} />
            <div className="cms-html" dangerouslySetInnerHTML={{ __html: post.html }} />
          </>
        ) : post.body ? (
          <PortableText value={post.body as PortableTextBlock[]} components={ptComponents} />
        ) : (
          post.blocks?.map((b, i) => <Block key={i} b={b} />)
        )}

        {/* share */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginTop: 48, paddingTop: 26, borderTop: "1px solid var(--line2)" }}>
          <span style={{ fontFamily: SUB, fontSize: 13.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--dim)" }}>Share this article</span>
          <span style={{ display: "flex", gap: 10 }}>
            {[
              { ic: "fa-brands fa-linkedin-in", label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
              { ic: "fa-brands fa-x-twitter", label: "Share on X", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}` },
              { ic: "fa-brands fa-facebook-f", label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
            ].map((s) => (
              <a key={s.ic} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--toggle-bg)", border: "1px solid var(--toggle-bd)", color: "var(--mut)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14, textDecoration: "none" }}>
                <i className={s.ic} aria-hidden="true" />
              </a>
            ))}
          </span>
        </div>
      </article>

      {/* ===== KEEP READING ===== */}
      {related.length > 0 && (
        <div style={{ marginTop: 72 }}>
          <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: "clamp(19px,2.4vw,24px)", margin: 0 }}>Keep Reading</h2>
          {/* auto-fit (not auto-fill) — khali tracks collapse hote hain, cards poori row bharte hain */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: 16, marginTop: 20 }}>
            {related.map((p) => {
              const rc = CATEGORY_STYLE[p.category];
              return (
                <a key={p.slug} href={`/blog/${p.slug}`} style={{ background: "var(--surface)", border: "1px solid var(--line2)", borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit" }}>
                  <span style={{ position: "relative", display: "block", aspectRatio: "16 / 9", overflow: "hidden", borderBottom: "1px solid var(--line)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.cover} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1, padding: "16px 18px 18px" }}>
                    <span style={{ fontFamily: SUB, fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: rc.c }}>{p.category}</span>
                    <span style={{ display: "block", fontFamily: SUB, fontWeight: 700, fontSize: 15, lineHeight: 1.4, color: "var(--tx)", marginTop: 8 }}>{p.title}</span>
                    <span style={{ fontSize: 12.5, color: "var(--dim)", marginTop: "auto", paddingTop: 12 }}>{formatDate(p.date)} · {p.readMins} min read</span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== CTA ===== */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginTop: 72, background: "var(--tint)", border: "1px solid var(--tint-bd)", borderRadius: 24, padding: "24px 28px" }}>
        <div>
          <h2 style={{ fontFamily: DISP, fontWeight: 600, fontSize: "clamp(18px,2.2vw,22px)", letterSpacing: "-.01em", margin: 0 }}>See hello22 Answer a Real Call</h2>
          <p style={{ fontSize: 14.5, color: "var(--mut)", margin: "6px 0 0" }}>Try the live demo, or launch your own AI receptionist in 22 minutes.</p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="https://app.hello22.ai/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", background: "#2c76ed", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 24px", borderRadius: 999, boxShadow: "0 14px 30px -14px rgba(44,118,237,.7)" }}>Start free trial</a>
          <a href="/#demo" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", background: "transparent", color: "var(--num)", fontWeight: 700, fontSize: 15, padding: "12px 22px", borderRadius: 999, border: "1.5px solid var(--tint-bd)" }}>Hear a live call</a>
        </div>
      </div>
    </PageShell>
  );
}
