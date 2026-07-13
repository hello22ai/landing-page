import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell, { DISP, SUB } from "@/components/site22/PageShell";
import { BLOG_POSTS, CATEGORY_STYLE, formatDate, getPost, type BlogBlock } from "@/components/site22/blogData";

// Har blog post ka static page — data blogData.ts se aata hai.
export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article", images: [post.cover] },
  };
}

const para: React.CSSProperties = { fontSize: 16.5, lineHeight: 1.8, color: "var(--mut)", margin: "20px 0 0" };

function Block({ b }: { b: BlogBlock }) {
  switch (b.t) {
    case "h2":
      return <h2 style={{ fontFamily: SUB, fontWeight: 700, letterSpacing: "-.01em", fontSize: "clamp(20px,2.6vw,25px)", color: "var(--tx)", margin: "40px 0 0" }}>{b.x}</h2>;
    case "p":
      return <p style={para}>{b.x}</p>;
    case "list":
      return (
        <ul style={{ listStyle: "none", padding: 0, margin: "22px 0 0", display: "flex", flexDirection: "column", gap: 12 }}>
          {b.items.map((it) => (
            <li key={it} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15.5, lineHeight: 1.65, color: "var(--tx2)" }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, marginTop: 2, background: "var(--tint)", border: "1px solid var(--tint-bd)", color: "var(--num)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10 }} aria-hidden="true"><i className="fa-solid fa-check" /></span>
              {it}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <figure style={{ margin: "28px 0 0", padding: "22px 26px", background: "var(--tint)", border: "1px solid var(--tint-bd)", borderLeft: "4px solid #2c76ed", borderRadius: 16 }}>
          <blockquote style={{ margin: 0, fontFamily: SUB, fontSize: 17.5, fontWeight: 600, lineHeight: 1.6, color: "var(--tx)" }}>&ldquo;{b.x}&rdquo;</blockquote>
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const cat = CATEGORY_STYLE[post.category];
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).sort((a, b) => (a.category === post.category ? -1 : 0) - (b.category === post.category ? -1 : 0)).slice(0, 3);
  const shareUrl = `https://www.hello22.ai/blog/${post.slug}`;
  const shareTitle = encodeURIComponent(post.title);

  return (
    <PageShell current="/blog" maxWidth={860}>
      {/* ===== BREADCRUMB ===== */}
      <a href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", fontFamily: SUB, fontSize: 13.5, fontWeight: 700, color: "var(--mut)" }}>
        <i className="fa-solid fa-arrow-left" aria-hidden="true" style={{ fontSize: 11 }} /> All articles
      </a>

      {/* ===== HEADER ===== */}
      <header style={{ marginTop: 26 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", padding: "6px 14px", borderRadius: 999, background: cat.bg, border: `1px solid ${cat.bd}`, color: cat.c, fontFamily: SUB, fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>{post.category}</span>
          <span style={{ fontSize: 13.5, color: "var(--dim)" }}>{formatDate(post.date)} · {post.readMins} min read</span>
        </div>
        <h1 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.025em", fontSize: "clamp(27px,4.2vw,42px)", lineHeight: 1.16, margin: "20px 0 0" }}>{post.title}</h1>
        <p style={{ fontFamily: SUB, fontSize: "clamp(16px,2vw,19px)", fontWeight: 500, lineHeight: 1.6, color: "var(--mut)", margin: "18px 0 0" }}>{post.excerpt}</p>
        {/* author row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 26, paddingTop: 22, borderTop: "1px solid var(--line2)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.author.avatar} alt="" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--line2)", display: "block" }} />
          <span>
            <span style={{ display: "block", fontFamily: SUB, fontSize: 15, fontWeight: 700, color: "var(--tx)" }}>{post.author.name}</span>
            <span style={{ display: "block", fontSize: 13, color: "var(--dim)", marginTop: 2 }}>{post.author.role}</span>
          </span>
        </div>
      </header>

      {/* ===== COVER ===== */}
      <div style={{ borderRadius: 26, overflow: "hidden", border: "1px solid var(--line2)", boxShadow: "0 26px 54px -32px var(--sh1)", marginTop: 34, aspectRatio: "21 / 9" }} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* center 30% — portrait covers mein 21:9 crop face kaat raha tha (visual audit 2026-07-13) */}
        <img src={post.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }} />
      </div>

      {/* ===== BODY ===== */}
      <article style={{ maxWidth: 720, margin: "22px auto 0" }}>
        {post.blocks.map((b, i) => <Block key={i} b={b} />)}

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
      <div style={{ marginTop: 72 }}>
        <h2 style={{ fontFamily: DISP, fontWeight: 600, letterSpacing: "-.02em", fontSize: "clamp(19px,2.4vw,24px)", margin: 0 }}>Keep Reading</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,240px),1fr))", gap: 16, marginTop: 20 }}>
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
