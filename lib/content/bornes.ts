import type { Borne } from "./types";

// Placeholder product catalogue. Replace `imageSrc` with the real supplied
// photo for each reference and fill `priceFrom` only once a verified price
// exists — until then the UI renders "Sur devis".
export const bornes: Borne[] = [
  {
    slug: "borne-7-4kw-essentielle",
    name: "Borne 7,4 kW — Essentielle",
    brand: "Partenaire fabricant à confirmer",
    audience: ["maison"],
    powerKw: 7.4,
    connected: false,
    solarCompatible: false,
    loadManagement: false,
    warrantyYears: null,
    priceFrom: null,
    imagePlaceholderLabel: "Photo réelle à venir — Borne 7,4 kW",
    features: ["Recharge monophasée", "Câble type 2 intégré", "Montage mural"],
    compatibility: ["Tous véhicules électriques et hybrides rechargeables"],
  },
  {
    slug: "borne-7-4kw-connectee",
    name: "Borne 7,4 kW — Connectée",
    brand: "Partenaire fabricant à confirmer",
    audience: ["maison", "copropriete"],
    powerKw: 7.4,
    connected: true,
    solarCompatible: true,
    loadManagement: true,
    warrantyYears: null,
    priceFrom: null,
    imagePlaceholderLabel: "Photo réelle à venir — Borne 7,4 kW connectée",
    features: [
      "Pilotage via application",
      "Compatible recharge solaire",
      "Délestage / gestion de puissance",
      "Suivi de consommation",
    ],
    compatibility: ["Tous véhicules électriques et hybrides rechargeables"],
  },
  {
    slug: "borne-11kw-connectee",
    name: "Borne 11 kW — Connectée",
    brand: "Partenaire fabricant à confirmer",
    audience: ["maison", "copropriete", "entreprise"],
    powerKw: 11,
    connected: true,
    solarCompatible: true,
    loadManagement: true,
    warrantyYears: null,
    priceFrom: null,
    imagePlaceholderLabel: "Photo réelle à venir — Borne 11 kW connectée",
    features: [
      "Recharge triphasée",
      "Pilotage via application",
      "Supervision à distance",
      "Gestion dynamique de puissance",
    ],
    compatibility: ["Véhicules compatibles charge triphasée jusqu'à 11 kW"],
  },
  {
    slug: "borne-22kw-entreprise",
    name: "Borne 22 kW — Entreprise",
    brand: "Partenaire fabricant à confirmer",
    audience: ["entreprise", "recharge-rapide"],
    powerKw: 22,
    connected: true,
    solarCompatible: false,
    loadManagement: true,
    warrantyYears: null,
    priceFrom: null,
    imagePlaceholderLabel: "Photo réelle à venir — Borne 22 kW",
    features: [
      "Recharge rapide triphasée",
      "Supervision multi-bornes",
      "Authentification par badge",
      "Facturation et suivi flotte",
    ],
    compatibility: ["Véhicules compatibles charge triphasée jusqu'à 22 kW"],
  },
];

export const bornesFilters = {
  powers: [7.4, 11, 22] as const,
  audiences: [
    { key: "maison", label: "Maison" },
    { key: "copropriete", label: "Copropriété" },
    { key: "entreprise", label: "Entreprise" },
    { key: "recharge-rapide", label: "Recharge rapide" },
  ] as const,
};
