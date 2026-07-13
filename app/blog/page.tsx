import type { Metadata } from "next";
import PageShell from "@/components/site22/PageShell";
import BlogIndex from "@/components/site22/BlogIndex";

// Listing UI BlogIndex (client) mein hai — search/category/sort interactive hain.
// Reference-style redesign 2026-07-13 (navy hero panel + pastel card thumbs).
export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ideas, guides, and product news from hello22 — practical advice on answering every call, capturing more leads, and putting AI voice technology to work for your business.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <PageShell current="/blog" maxWidth={1200}>
      <BlogIndex />
    </PageShell>
  );
}
