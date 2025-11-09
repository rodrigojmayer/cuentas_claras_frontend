import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* Any existing config options */
  devIndicators: false,

  webpack: (config) => {
    // Ensure all libraries use the same Emotion instance
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@emotion/react": path.resolve("./node_modules/@emotion/react"),
      "@emotion/styled": path.resolve("./node_modules/@emotion/styled"),
    };
    return config;
  },
};

export default nextConfig;