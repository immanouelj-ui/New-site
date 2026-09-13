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
      {
        source: "/borne-recharge-paris",
        destination: "/installation-borne-recharge/ile-de-france/paris/paris",
        permanent: true,
      },
      {
        source: "/borne-recharge-lyon",
        destination: "/installation-borne-recharge/auvergne-rhone-alpes/rhone/lyon",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
