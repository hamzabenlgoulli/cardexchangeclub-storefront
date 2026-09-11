import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. Without it, Turbopack walks up the
  // tree and picks up an unrelated lockfile from the user's home directory.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
