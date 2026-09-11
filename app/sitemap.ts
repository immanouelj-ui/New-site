import type { MetadataRoute } from "next";
import { realisations } from "@/lib/content/realisations";

const base = "https://example.com";

const staticRoutes = [
  "",
  "/solutions",
  "/maison",
  "/copropriete",
  "/entreprise",
  "/recharge-rapide",
  "/bornes",
  "/borne-7kw",
  "/borne-11kw",
  "/borne-22kw",
  "/prix",
  "/aides",
  "/droit-a-la-prise",
  "/quelle-borne-recharge-choisir",
  "/installation-borne-recharge",
  "/realisations",
  "/avis",
  "/conseils",
  "/simulateur",
  "/contact",
  "/borne-recharge-paris",
  "/borne-recharge-lyon",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const realisationEntries = realisations.map((r) => ({
    url: `${base}/realisations/${r.slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...realisationEntries];
}
