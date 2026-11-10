import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async rewrites() {
    return [{ source: "/pichbaz/privacy", destination: "/pichbaz/privacy.html" }];
  },
  async redirects() {
    return [{ source: "/projects/go-rbac-api", destination: "/work/go-rbac-api", permanent: true }];
  },
};

export default nextConfig;
