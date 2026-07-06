import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Long-lived caching for static assets (PSI: "use efficient cache lifetimes").
  async headers() {
    const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    return [
      { source: "/fonts/:path*", headers: immutable },
      { source: "/images/:path*", headers: immutable },
      { source: "/audio/:path*", headers: immutable },
      { source: "/fa/:path*", headers: immutable },
      { source: "/hello22-logo.png", headers: immutable },
    ];
  },
};

export default nextConfig;
