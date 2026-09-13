import { buildUrlset, xmlResponse } from "@/lib/sitemap-xml";
import {
  cityPath,
  getCityContent,
  getPublishedCities,
  getPublishedCityProjectPages,
  resolveCityLocation,
} from "@/lib/geo/queries";

export const revalidate = 3600;

// Only cities that have real published editorial content (city_content) —
// resolveCityLocation already checks the city/department/region chain is
// fully published; the page itself 404s without city_content, so this
// sitemap must not list a city that would 404.
export async function GET() {
  const cities = await getPublishedCities();
  const entries: { loc: string }[] = [];
  for (const c of cities) {
    const location = await resolveCityLocation(c.slug);
    if (!location) continue;
    const content = await getCityContent(c.id);
    if (!content) continue;
    const base = cityPath(location);
    entries.push({ loc: base });
    const projectPages = await getPublishedCityProjectPages(c.id);
    for (const p of projectPages) {
      entries.push({ loc: `${base}/${p.project_type}` });
    }
  }
  return xmlResponse(buildUrlset(entries));
}
