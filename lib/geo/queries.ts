import { supabase } from "@/lib/supabase/client";
import type {
  City,
  CityContent,
  CityProjectPage,
  Department,
  Faq,
  Installer,
  ProjectType,
  Region,
} from "./types";

// All queries read from tables prefixed evcharge_ in the public schema.
// Regions/departments/cities carry a `published` flag: the app only ever
// renders a full page for published rows — unpublished rows exist so the
// geographic hierarchy is complete in the database without generating thin
// pages ahead of real content (see README).

export async function getPublishedRegions(): Promise<Region[]> {
  const { data, error } = await supabase
    .from("evcharge_regions")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getRegionBySlug(slug: string): Promise<Region | null> {
  const { data, error } = await supabase
    .from("evcharge_regions")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getRegionById(id: string): Promise<Region | null> {
  const { data, error } = await supabase
    .from("evcharge_regions")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getDepartmentsByRegion(regionId: string): Promise<Department[]> {
  const { data, error } = await supabase
    .from("evcharge_departments")
    .select("*")
    .eq("region_id", regionId)
    .order("name", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getPublishedDepartmentsByRegion(regionId: string): Promise<Department[]> {
  const departments = await getDepartmentsByRegion(regionId);
  return departments.filter((d) => d.published);
}

export async function getDepartmentBySlug(slug: string): Promise<Department | null> {
  const { data, error } = await supabase
    .from("evcharge_departments")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getPublishedDepartments(): Promise<Department[]> {
  const { data, error } = await supabase
    .from("evcharge_departments")
    .select("*")
    .eq("published", true)
    .order("name", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getCitiesByDepartment(departmentId: string): Promise<City[]> {
  const { data, error } = await supabase
    .from("evcharge_cities")
    .select("*")
    .eq("department_id", departmentId)
    .order("name", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getPublishedCitiesByDepartment(departmentId: string): Promise<City[]> {
  const cities = await getCitiesByDepartment(departmentId);
  return cities.filter((c) => c.published);
}

export async function getCityBySlug(slug: string): Promise<City | null> {
  const { data, error } = await supabase
    .from("evcharge_cities")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getPublishedCities(): Promise<City[]> {
  const { data, error } = await supabase
    .from("evcharge_cities")
    .select("*")
    .eq("published", true)
    .order("name", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getCityContent(cityId: string): Promise<CityContent | null> {
  const { data, error } = await supabase
    .from("evcharge_city_content")
    .select("*")
    .eq("city_id", cityId)
    .eq("published", true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getCityProjectPage(
  cityId: string,
  projectType: ProjectType,
): Promise<CityProjectPage | null> {
  const { data, error } = await supabase
    .from("evcharge_city_project_pages")
    .select("*")
    .eq("city_id", cityId)
    .eq("project_type", projectType)
    .eq("published", true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getPublishedCityProjectPages(cityId: string): Promise<CityProjectPage[]> {
  const { data, error } = await supabase
    .from("evcharge_city_project_pages")
    .select("*")
    .eq("city_id", cityId)
    .eq("published", true);
  if (error) throw error;
  return data ?? [];
}

export async function getFaqs(
  scopeType: "region" | "department" | "city",
  scopeId: string,
): Promise<Faq[]> {
  const { data, error } = await supabase
    .from("evcharge_faqs")
    .select("*")
    .eq("scope_type", scopeType)
    .eq("scope_id", scopeId)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getNeighboringCities(cityId: string): Promise<City[]> {
  const { data, error } = await supabase
    .from("evcharge_city_neighbors")
    .select("neighbor_city_id, evcharge_cities:neighbor_city_id(*)")
    .eq("city_id", cityId);
  if (error) throw error;
  return (data ?? [])
    .map((row) => row.evcharge_cities as unknown as City)
    .filter((c): c is City => !!c && c.published);
}

export async function getVerifiedInstallers(): Promise<Installer[]> {
  const { data, error } = await supabase
    .from("evcharge_installers")
    .select("*")
    .eq("verified", true);
  if (error) throw error;
  return data ?? [];
}

// Used for the "find coverage" tool and the geolocation banner: matches a
// query against published city names and postal codes only — never claims
// coverage for a city that is not actually in the database.
export async function searchPublishedCities(query: string): Promise<City[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const { data, error } = await supabase
    .from("evcharge_cities")
    .select("*")
    .eq("published", true)
    .or(`name.ilike.%${trimmed}%,postal_codes.cs.{${trimmed}}`)
    .limit(8);
  if (error) throw error;
  return data ?? [];
}

export async function getAllPublishedCitiesWithLocation(): Promise<
  Pick<City, "id" | "slug" | "name" | "lat" | "lng" | "department_id">[]
> {
  const { data, error } = await supabase
    .from("evcharge_cities")
    .select("id, slug, name, lat, lng, department_id")
    .eq("published", true)
    .not("lat", "is", null)
    .not("lng", "is", null);
  if (error) throw error;
  return data ?? [];
}

export interface CityLocation {
  city: City;
  department: Department;
  region: Region;
}

// Resolves the full region/department/city chain for a city — used to build
// breadcrumbs, canonical paths and cross-links. Returns null if any link in
// the chain is missing or unpublished, so callers can 404 cleanly.
export async function resolveCityLocation(citySlug: string): Promise<CityLocation | null> {
  const city = await getCityBySlug(citySlug);
  if (!city || !city.published) return null;
  const { data: department, error: deptError } = await supabase
    .from("evcharge_departments")
    .select("*")
    .eq("id", city.department_id)
    .maybeSingle();
  if (deptError) throw deptError;
  if (!department || !department.published) return null;
  const region = await getRegionById(department.region_id);
  if (!region || !region.published) return null;
  return { city, department, region };
}

export interface DepartmentLocation {
  department: Department;
  region: Region;
}

export async function resolveDepartmentLocation(
  departmentSlug: string,
): Promise<DepartmentLocation | null> {
  const department = await getDepartmentBySlug(departmentSlug);
  if (!department || !department.published) return null;
  const region = await getRegionById(department.region_id);
  if (!region || !region.published) return null;
  return { department, region };
}

export function cityPath(location: CityLocation): string {
  return `/installation-borne-recharge/${location.region.slug}/${location.department.slug}/${location.city.slug}`;
}

export function departmentPath(region: Region, department: Department): string {
  return `/installation-borne-recharge/${region.slug}/${department.slug}`;
}

export function regionPath(region: Region): string {
  return `/installation-borne-recharge/${region.slug}`;
}
