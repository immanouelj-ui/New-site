import { buildUrlset, xmlResponse } from "@/lib/sitemap-xml";
import { realisations } from "@/lib/content/realisations";

export const revalidate = 3600;

const guidePaths = [
  "/conseils",
  "/quelle-borne-recharge-choisir",
  "/droit-a-la-prise",
  "/installation-borne-recharge",
];

export async function GET() {
  const realisationPaths = realisations.map((r) => `/realisations/${r.slug}`);
  return xmlResponse(buildUrlset([...guidePaths, ...realisationPaths].map((loc) => ({ loc }))));
}
