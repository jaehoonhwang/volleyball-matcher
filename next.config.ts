import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: process.env.PAGES_BASE_PATH,
  output: "export",
  reactStrictMode: true,
};

export default nextConfig;
