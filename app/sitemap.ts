import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/sanity";

// /sitemap.xml — lastModified har build par refresh hota hai; naya page banao to yahan entry add karo.
// Blog posts Sanity CMS + sample articles (lib/sanity.ts merge) se automatically aate hain.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const posts = await getBlogPosts();
  return [
    { url: "https://www.hello22.ai/", lastModified, priority: 1.0 },
    { url: "https://www.hello22.ai/about", lastModified, priority: 0.8 },
    { url: "https://www.hello22.ai/contact", lastModified, priority: 0.8 },
    { url: "https://www.hello22.ai/australia", lastModified, priority: 0.9 },
    { url: "https://www.hello22.ai/blog", lastModified, priority: 0.8 },
    { url: "https://www.hello22.ai/calculator", lastModified, priority: 0.7 },
    ...posts.map((p) => ({
      url: `https://www.hello22.ai/blog/${p.slug}`,
      lastModified: new Date(p.date),
      priority: 0.6,
    })),
    { url: "https://www.hello22.ai/terms", lastModified, priority: 0.8 },
    { url: "https://www.hello22.ai/privacy", lastModified, priority: 0.8 },
  ];
}
