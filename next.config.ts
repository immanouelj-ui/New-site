import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/borne-recharge-maison", destination: "/maison", permanent: true },
      { source: "/borne-recharge-copropriete", destination: "/copropriete", permanent: true },
      { source: "/borne-recharge-entreprise", destination: "/entreprise", permanent: true },
      { source: "/prix-borne-recharge", destination: "/prix", permanent: true },
      { source: "/aides-borne-recharge", destination: "/aides", permanent: true },
    ];
  },
};

export default nextConfig;
