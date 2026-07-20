// Blog content types + helpers — /blog (listing) + /blog/[slug] (detail) + sitemap.
// 2026-07-20 (client order): saare dummy/sample articles UDA diye — ab blog ka single
// source Sanity CMS hai (lib/sanity.ts). BLOG_POSTS array + merge machinery isliye
// rakhi hai taaki zaroorat pade to hand-written posts wapas add ho saken — bas is
// array mein object daalo, page khud ban jayega.

export type BlogBlock =
  | { t: "p"; x: string }
  | { t: "h2"; x: string }
  | { t: "list"; items: string[] }
  | { t: "quote"; x: string; by?: string }
  | { t: "tip"; x: string };

// CMS detail-page SEO fields (Sanity Studio ke seoTitle/ogTitle/... se aate hain)
export type BlogSeo = {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  schemaMarkup?: string; // JSON-LD string — detail page par as-is inject hota hai
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Growth" | "Product" | "Guides" | "Industries";
  date: string; // ISO yyyy-mm-dd
  updated?: string; // CMS _updatedAt (yyyy-mm-dd) — detail page "Updated ..." meta (reference UI)
  readMins: number;
  cover: string;
  coverAlt?: string; // CMS featureImage.alt — cover ke neeche caption + img alt (reference UI)
  short: string; // card thumbnail ka bada 2-3 word label (SoftQA-reference UI, 2026-07-13)
  pastel: keyof typeof PASTELS; // card thumbnail ka pastel bg
  thumb?: string; // listing-card image (CMS: featureImage)
  tags?: string[]; // CMS tags — detail page ke cover-overlay + "Tagged:" chips
  author: { name: string; role: string; avatar: string; bio?: string }; // avatar "" = CMS team-badge fallback
  reviewedBy?: { name: string; role: string; avatar: string; bio?: string }; // "Reviewed by" card (reference UI)
  blocks?: BlogBlock[]; // hand-written content (fallback source)
  body?: unknown[]; // Sanity portable text (purane CMS posts)
  html?: string; // Sanity WYSIWYG editor ka HTML (naya primary content) — teeno mein se ek
  seo?: BlogSeo;
};

// Card-thumbnail pastels (reference UI jaise) — fixed light colors, dono themes mein same
// (thumb ke andar text bhi fixed dark hai, isliye theme vars nahi chahiye).
export const PASTELS = {
  mint: "#e7f2da",
  pink: "#f8e3ee",
  lavender: "#e9e6fa",
  lemon: "#f5f6d4",
  sky: "#deebfb",
  cream: "#f3ede0",
} as const;

// Category → accent (about-page story cards wali palette; orange nahi — brand blue hai)
export const CATEGORY_STYLE: Record<BlogPost["category"], { c: string; bg: string; bd: string }> = {
  Growth: { c: "#1a9a5c", bg: "rgba(34,197,94,.1)", bd: "rgba(34,197,94,.25)" },
  Product: { c: "var(--num)", bg: "var(--tint)", bd: "var(--tint-bd)" },
  Guides: { c: "#8b5cf6", bg: "rgba(139,92,246,.1)", bd: "rgba(139,92,246,.25)" },
  Industries: { c: "#e2564d", bg: "rgba(226,86,77,.1)", bd: "rgba(226,86,77,.25)" },
};

export function formatDate(iso: string): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [y, m, d] = iso.split("-").map(Number);
  return `${months[m - 1]} ${d}, ${y}`;
}

// Khali — dummy articles 2026-07-20 ko hataye gaye; sab posts ab Sanity Studio se aate hain.
export const BLOG_POSTS: BlogPost[] = [];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
