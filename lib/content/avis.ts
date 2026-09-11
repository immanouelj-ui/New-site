import type { Avis } from "./types";

// Intentionally empty: no review is invented. Wire this array to Google
// Reviews (Places API) or another verified source, or populate it manually
// once real, authorized client reviews are supplied.
export const avis: Avis[] = [];

export const avisSummary = {
  averageRating: null as number | null,
  totalCount: 0,
  source: "en attente de connexion (Google Reviews ou saisie manuelle)",
};
