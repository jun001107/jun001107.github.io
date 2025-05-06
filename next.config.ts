import type { NextConfig } from "next";

/**@type {import('next').NextConfig}*/
const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
