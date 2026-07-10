import type { MetadataRoute } from "next";

// /sitemap.xml — lastModified har build par refresh hota hai; naya page banao to yahan entry add karo.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: "https://www.hello22.ai/", lastModified, priority: 1.0 },
    { url: "https://www.hello22.ai/about", lastModified, priority: 0.8 },
    { url: "https://www.hello22.ai/contact", lastModified, priority: 0.8 },
    { url: "https://www.hello22.ai/terms", lastModified, priority: 0.8 },
    { url: "https://www.hello22.ai/privacy", lastModified, priority: 0.8 },
  ];
}
