// Sanity CMS integration — /blog ka data source (project lesy43y1, dataset production).
// CMS posts + blogData.ts ke sample articles merge hote hain (same slug par CMS jeetta hai);
// client jab Studio mein real posts publish karega to wo automatically list mein aa jayenge.
// Studio schema fields: title, slug, description, publishedAt, body (portable text),
// featureImage, tags, seoTitle/seoDescription/canonicalUrl/ogTitle/ogDescription/schemaMarkup.
import { createClient } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";
import { BLOG_POSTS, PASTELS, getPost, type BlogPost } from "@/components/site22/blogData";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "lesy43y1",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true, // public read-only content — CDN fast hai, ISR ke saath fresh bhi
});

const builder = createImageUrlBuilder(sanityClient);
export function urlFor(src: SanityImageSource) {
  return builder.image(src);
}

// tags/publishedAt Studio mein optional hain — coalesce se _createdAt fallback
const POST_FIELDS = `
  _id, title, "slug": slug.current, description,
  "date": coalesce(publishedAt, _createdAt),
  body, featureImage, tags,
  seoTitle, seoDescription, canonicalUrl, ogTitle, ogDescription, schemaMarkup
`;
const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc){${POST_FIELDS}}`;
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{${POST_FIELDS}}`;

type RawPost = {
  _id: string;
  title?: string;
  slug: string;
  description?: string;
  date: string;
  body?: PortableTextBlock[];
  featureImage?: SanityImageSource;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  schemaMarkup?: string;
};

const CATEGORIES: BlogPost["category"][] = ["Growth", "Product", "Guides", "Industries"];
const PASTEL_KEYS = Object.keys(PASTELS) as (keyof typeof PASTELS)[];

// Studio mein category field nahi hai — tag ka naam kisi category se match ho to wahi,
// warna "Product" (brand-blue styling). Client ko batao: tag "Growth"/"Guides"/... lagayen.
function toCategory(tags?: string[]): BlogPost["category"] {
  return CATEGORIES.find((c) => tags?.some((t) => t.toLowerCase() === c.toLowerCase())) ?? "Product";
}

// slug se stable pastel — index-based hota to naya post aane par sab shift ho jaate
function toPastel(slug: string): keyof typeof PASTELS {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) % 9973;
  return PASTEL_KEYS[h % PASTEL_KEYS.length];
}

function toReadMins(body?: PortableTextBlock[]): number {
  if (!body?.length) return 2;
  let words = 0;
  for (const block of body) {
    const children = (block as { children?: { text?: unknown }[] }).children;
    if (!Array.isArray(children)) continue;
    for (const child of children) {
      if (typeof child.text === "string") words += child.text.split(/\s+/).filter(Boolean).length;
    }
  }
  return Math.min(12, Math.max(2, Math.round(words / 200)));
}

const TEAM_AUTHOR = { name: "hello22 Team", role: "hello22.ai", avatar: "" } as const;

function mapPost(raw: RawPost): BlogPost {
  const title = raw.title ?? "Untitled";
  return {
    slug: raw.slug,
    title,
    excerpt: raw.description ?? "",
    category: toCategory(raw.tags),
    date: raw.date.slice(0, 10),
    readMins: toReadMins(raw.body),
    cover: raw.featureImage
      ? urlFor(raw.featureImage).width(1680).height(720).fit("crop").auto("format").url()
      : "/images/office-reception.jpg",
    thumb: raw.featureImage
      ? urlFor(raw.featureImage).width(440).height(320).fit("crop").auto("format").url()
      : "",
    short: title.split(/\s+/).slice(0, 3).join(" "),
    pastel: toPastel(raw.slug),
    author: TEAM_AUTHOR,
    body: raw.body ?? [],
    seo: {
      title: raw.seoTitle,
      description: raw.seoDescription,
      canonical: raw.canonicalUrl,
      ogTitle: raw.ogTitle,
      ogDescription: raw.ogDescription,
      schemaMarkup: raw.schemaMarkup,
    },
  };
}

// Sanity down/unreachable ho to page crash na ho — sample articles dikhte rahen
async function fetchSanity<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, params, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const raw = (await fetchSanity<RawPost[]>(POSTS_QUERY)) ?? [];
  const cms = raw.filter((r) => r.slug).map(mapPost);
  const cmsSlugs = new Set(cms.map((p) => p.slug));
  const samples = BLOG_POSTS.filter((p) => !cmsSlugs.has(p.slug));
  return [...cms, ...samples].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const raw = await fetchSanity<RawPost | null>(POST_QUERY, { slug });
  return raw?.slug ? mapPost(raw) : getPost(slug);
}
