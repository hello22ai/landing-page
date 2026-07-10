import type { MetadataRoute } from "next";

// /robots.txt — Next isse build par static route ki tarah serve karta hai.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private/system routes (app.hello22.ai jaise paths yahan exist nahi karte,
      // par crawlers ke liye explicitly block rakhe hain)
      disallow: [
        "/admin/",
        "/dashboard/",
        "/login/",
        "/register/",
        "/account/",
        "/api/",
        "/private/",
        "/checkout/",
        "/search/",
      ],
    },
    sitemap: "https://www.hello22.ai/sitemap.xml",
  };
}
