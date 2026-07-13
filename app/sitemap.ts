import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/components/site22/blogData";

// /sitemap.xml — lastModified har build par refresh hota hai; naya page banao to yahan entry add karo.
// Blog posts blogData.ts se automatically aate hain.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: "https://www.hello22.ai/", lastModified, priority: 1.0 },
    { url: "https://www.hello22.ai/about", lastModified, priority: 0.8 },
    { url: "https://www.hello22.ai/contact", lastModified, priority: 0.8 },
    { url: "https://www.hello22.ai/blog", lastModified, priority: 0.8 },
    { url: "https://www.hello22.ai/calculator", lastModified, priority: 0.7 },
    ...BLOG_POSTS.map((p) => ({
      url: `https://www.hello22.ai/blog/${p.slug}`,
      lastModified: new Date(p.date),
      priority: 0.6,
    })),
    { url: "https://www.hello22.ai/terms", lastModified, priority: 0.8 },
    { url: "https://www.hello22.ai/privacy", lastModified, priority: 0.8 },
  ];
}
