import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: process.env.NODE_ENV === "production" ? "/volleyball-matcher" : "",
  images: {
    unoptimized: true,
  },
  output: "export",
  reactStrictMode: true,
};

export default nextConfig;
