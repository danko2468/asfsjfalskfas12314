const path = require("node:path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    deviceSizes: [576, 768, 1200],
  },
  rewrites: async () => ({
    beforeFiles: [],
    afterFiles: [],
    fallback: [
      {
        source: "/:path*",
        destination: "/",
      },
    ],
  }),
  experimental: {
    outputFileTracingRoot: path.resolve(__dirname, "./"),
  },
};

module.exports = nextConfig;
