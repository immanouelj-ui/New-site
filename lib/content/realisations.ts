import type { Realisation } from "./types";

// EXAMPLE STRUCTURE ONLY. These entries demonstrate the page layout and must
// be replaced with real completed projects, real photos and real figures
// before publishing. Nothing below should be presented to a visitor as a
// verified client story until swapped for real content.
export const realisations: Realisation[] = [
  {
    slug: "exemple-maison-individuelle-7kw",
    title: "Exemple — Installation d'une borne 7,4 kW",
    audience: "maison",
    city: "Ville à préciser",
    context: "Modèle de fiche projet pour une maison individuelle avec garage.",
    solution: "Structure de présentation à remplacer par un projet réel.",
    powerKw: 7.4,
    distanceMeters: undefined,
    material: "À préciser",
    durationDays: undefined,
    result: "Contenu d'exemple — à remplacer par le résultat réel du projet.",
    coverPlaceholderLabel: "Photo réelle à venir — Maison individuelle",
    galleryPlaceholderCount: 3,
  },
  {
    slug: "exemple-copropriete-infrastructure-collective",
    title: "Exemple — Infrastructure collective en copropriété",
    audience: "copropriete",
    city: "Ville à préciser",
    context: "Modèle de fiche projet pour une copropriété avec parking commun.",
    solution: "Structure de présentation à remplacer par un projet réel.",
    material: "À préciser",
    result: "Contenu d'exemple — à remplacer par le résultat réel du projet.",
    coverPlaceholderLabel: "Photo réelle à venir — Copropriété",
    galleryPlaceholderCount: 3,
  },
  {
    slug: "exemple-parking-entreprise-multi-bornes",
    title: "Exemple — Parking entreprise multi-bornes",
    audience: "entreprise",
    city: "Ville à préciser",
    context: "Modèle de fiche projet pour un parking d'entreprise.",
    solution: "Structure de présentation à remplacer par un projet réel.",
    material: "À préciser",
    result: "Contenu d'exemple — à remplacer par le résultat réel du projet.",
    coverPlaceholderLabel: "Photo réelle à venir — Parking entreprise",
    galleryPlaceholderCount: 4,
  },
];
