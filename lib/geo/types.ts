export type ProjectType = "maison" | "copropriete" | "entreprise";

export interface Region {
  id: string;
  slug: string;
  name: string;
  insee_code: string;
  intro: string | null;
  context: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published: boolean;
  sort_order: number;
}

export interface Department {
  id: string;
  region_id: string;
  slug: string;
  name: string;
  code: string;
  prefecture: string | null;
  subprefectures: string[] | null;
  population: number | null;
  intro: string | null;
  context: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published: boolean;
}

export interface City {
  id: string;
  department_id: string;
  slug: string;
  name: string;
  insee_code: string | null;
  postal_codes: string[];
  population: number | null;
  population_note: string | null;
  lat: number | null;
  lng: number | null;
  urban_context: string | null;
  tier: 1 | 2 | 3;
  project_types: ProjectType[];
  published: boolean;
}

export interface CityContent {
  city_id: string;
  local_title: string | null;
  meta_description: string | null;
  local_intro: string | null;
  why_install: string | null;
  installation_process: string | null;
  local_constraints: string | null;
  service_area: string | null;
  published: boolean;
}

export interface CityProjectPage {
  id: string;
  city_id: string;
  project_type: ProjectType;
  meta_title: string | null;
  meta_description: string | null;
  intro: string | null;
  content: string | null;
  published: boolean;
}

export interface Faq {
  id: string;
  scope_type: "region" | "department" | "city";
  scope_id: string;
  question: string;
  answer: string;
  sort_order: number;
}

export interface Installer {
  id: string;
  name: string;
  department_id: string | null;
  city_id: string | null;
  phone: string | null;
  email: string | null;
  verified: boolean;
}
