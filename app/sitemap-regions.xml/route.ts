import { buildUrlset, xmlResponse } from "@/lib/sitemap-xml";
import { getPublishedRegions, regionPath } from "@/lib/geo/queries";

export const revalidate = 3600;

export async function GET() {
  const regions = await getPublishedRegions();
  return xmlResponse(buildUrlset(regions.map((r) => ({ loc: regionPath(r) }))));
}
