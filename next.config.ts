import type { NextConfig } from "next";

/**@type {import('next').NextConfig}*/
const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ?
      '/jun001107.github.io': '',
};

module.exports = nextConfig;
