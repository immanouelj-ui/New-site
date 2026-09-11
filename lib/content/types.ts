// Shared content types for the CMS-ready data layer.
// Every list here is meant to be swapped for a real CMS / database query later —
// keep the shapes stable and the UI tolerant of empty arrays.

export type ProjectAudience = "maison" | "copropriete" | "entreprise" | "recharge-rapide";

export interface Borne {
  slug: string;
  name: string;
  brand: string;
  audience: ProjectAudience[];
  powerKw: 7.4 | 11 | 22;
  connected: boolean;
  solarCompatible: boolean;
  loadManagement: boolean;
  warrantyYears: number | null;
  priceFrom: number | null; // null = "sur devis", never invent a figure
  imagePlaceholderLabel: string;
  imageSrc?: string; // set once a real asset is supplied
  features: string[];
  compatibility: string[];
}

export interface Realisation {
  slug: string;
  title: string;
  audience: ProjectAudience;
  city?: string;
  context: string;
  solution: string;
  powerKw?: number;
  distanceMeters?: number;
  material?: string;
  durationDays?: number;
  result: string;
  coverPlaceholderLabel: string;
  coverImageSrc?: string;
  galleryPlaceholderCount: number;
}

export interface Avis {
  id: string;
  firstName: string;
  city?: string;
  audience: ProjectAudience;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  source: "google" | "site";
  date: string; // ISO
}

export interface AidePlaceholder {
  slug: string;
  name: string;
  audience: ProjectAudience[];
  description: string;
  amountLabel: string | null; // null until a verified figure is supplied
  eligibility: string;
  verified: boolean;
  sourceLabel?: string;
}

export interface PriceFactor {
  key: string;
  label: string;
  description: string;
  rangeLabel: string | null;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Certification {
  slug: string;
  name: string;
  description: string;
  logoPlaceholderLabel: string;
  logoSrc?: string;
}
