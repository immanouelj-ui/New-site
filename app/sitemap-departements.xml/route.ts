import { buildUrlset, xmlResponse } from "@/lib/sitemap-xml";
import { departmentPath, getPublishedDepartments, getRegionById } from "@/lib/geo/queries";

export const revalidate = 3600;

export async function GET() {
  const departments = await getPublishedDepartments();
  const entries = [];
  for (const d of departments) {
    const region = await getRegionById(d.region_id);
    if (!region || !region.published) continue;
    entries.push({ loc: departmentPath(region, d) });
  }
  return xmlResponse(buildUrlset(entries));
}
