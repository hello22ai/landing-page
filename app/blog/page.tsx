import type { Metadata } from "next";
import PageShell from "@/components/site22/PageShell";
import BlogIndex from "@/components/site22/BlogIndex";
import { getBlogPosts } from "@/lib/sanity";

// Listing UI BlogIndex (client) mein hai — search/category/sort interactive hain.
// Reference-style redesign 2026-07-13 (navy hero panel + pastel card thumbs).
// Data Sanity CMS se aata hai (lib/sanity.ts) — sample articles ke saath merged.
export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ideas, guides, and product news from hello22 — practical advice on answering every call, capturing more leads, and putting AI voice technology to work for your business.",
  alternates: { canonical: "/blog" },
};

// ISR — Studio mein publish hua naya post 60s ke andar live
export const revalidate = 60;

export default async function BlogPage() {
  // body/blocks/html/seo listing ko nahi chahiye — client payload halka rakho
  const posts = (await getBlogPosts()).map((p) => ({ ...p, blocks: undefined, body: undefined, html: undefined, seo: undefined }));
  // 1536 = homepage sections ka container — 1200 wide screens par narrow lag raha tha (user feedback)
  return (
    <PageShell current="/blog" maxWidth={1536}>
      <BlogIndex posts={posts} />
    </PageShell>
  );
}
