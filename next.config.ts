import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/volleyball-matcher",
  images: {
    unoptimized: true,
  },
  output: "export",
  reactStrictMode: true,
};

export default nextConfig;
