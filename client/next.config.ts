import type { NextConfig } from "next";
const removeImports = require("next-remove-imports")();

const nextConfig: NextConfig = removeImports({
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.io", // Allow images from ipfs.io
        pathname: "/ipfs/**", // Match the IPFS paths
      },
    ],
  },
});

export default nextConfig;
