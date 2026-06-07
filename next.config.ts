import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "demo.togaar.com",
      },
    ],
  },
};

export default nextConfig;
