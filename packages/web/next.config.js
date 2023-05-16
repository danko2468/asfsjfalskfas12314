/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    deviceSizes: [576, 768, 1200],
  },
};

module.exports = nextConfig;
