import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Comic Vine cover art. Local covers under /public need no entry.
    remotePatterns: [
      new URL("https://comicvine.gamespot.com/a/uploads/**"),
    ],
  },
};

export default nextConfig;
