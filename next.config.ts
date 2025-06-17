import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["srhjieykuiezyiisnvgl.supabase.co"],
  },
  rules: {
    "no-console": "warn",
    "react-hooks/exhaustive-deps": "off",
    "no-unused-vars": "error"
  }
};

export default nextConfig;
