// Stable paths to the flagship worked example (Arnouville, Val-d'Oise) used
// for cross-links from the general audience pages. Kept as constants rather
// than a query so /maison, /copropriete and /entreprise stay simple sync
// pages — update if the flagship example city ever changes.
export const FLAGSHIP_CITY_NAME = "Arnouville";
export const FLAGSHIP_CITY_PROJECT_PATHS = {
  maison: "/installation-borne-recharge/ile-de-france/val-doise/arnouville/maison",
  copropriete: "/installation-borne-recharge/ile-de-france/val-doise/arnouville/copropriete",
  entreprise: "/installation-borne-recharge/ile-de-france/val-doise/arnouville/entreprise",
} as const;
