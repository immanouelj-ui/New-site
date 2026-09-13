import { buildSitemapIndex, xmlResponse } from "@/lib/sitemap-xml";

export const revalidate = 3600;

export async function GET() {
  return xmlResponse(
    buildSitemapIndex([
      "/sitemap-services.xml",
      "/sitemap-regions.xml",
      "/sitemap-departements.xml",
      "/sitemap-villes.xml",
      "/sitemap-guides.xml",
    ]),
  );
}
