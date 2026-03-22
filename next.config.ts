import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@aurora-studio/sdk", "@aurora-studio/starter-core"],
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [
      { source: "/recipes", destination: "/for-you", permanent: true },
      { source: "/recipes/:slug*", destination: "/for-you/package/:slug*", permanent: true },
      { source: "/combos", destination: "/for-you", permanent: false },
      { source: "/combos/:slug*", destination: "/for-you/package/:slug*", permanent: false },
      { source: "/for-you/recipes", destination: "/for-you", permanent: true },
      { source: "/for-you/combos", destination: "/for-you", permanent: false },
    ];
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve = config.resolve ?? {};
      config.resolve.fallback = { ...config.resolve.fallback, fs: false, path: false };
    }
    return config;
  },
};

export default nextConfig;
