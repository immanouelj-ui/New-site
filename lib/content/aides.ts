import type { AidePlaceholder } from "./types";

// Named schemes are real, publicly known French programme *names* only.
// Every amount is intentionally left null — figures change over time and
// must be confirmed and entered manually before publishing.
export const aides: AidePlaceholder[] = [
  {
    slug: "programme-advenir",
    name: "Programme ADVENIR",
    audience: ["copropriete", "entreprise"],
    description:
      "Dispositif national de soutien à l'installation de points de recharge pour les copropriétés et les entreprises, sous conditions d'éligibilité.",
    amountLabel: null,
    eligibility: "Conditions et montants à confirmer selon le profil du projet.",
    verified: false,
    sourceLabel: "À vérifier sur le site officiel du programme avant publication",
  },
  {
    slug: "tva-reduite",
    name: "TVA à taux réduit",
    audience: ["maison", "copropriete"],
    description:
      "Taux de TVA réduit pouvant s'appliquer aux travaux d'installation dans un logement achevé depuis plus de deux ans, sous conditions.",
    amountLabel: null,
    eligibility: "Éligibilité à vérifier au cas par cas avec un conseiller.",
    verified: false,
    sourceLabel: "À confirmer avec la réglementation fiscale en vigueur",
  },
  {
    slug: "credit-impot-borne",
    name: "Crédit d'impôt borne de recharge",
    audience: ["maison"],
    description:
      "Dispositif fiscal pouvant s'appliquer à l'installation d'une borne de recharge à domicile, sous conditions.",
    amountLabel: null,
    eligibility: "Conditions et montant à confirmer selon la réglementation en vigueur.",
    verified: false,
    sourceLabel: "À vérifier avant publication",
  },
];

export const droitALaPriseSummary = {
  title: "Le droit à la prise",
  description:
    "En copropriété, tout occupant (propriétaire ou locataire) disposant d'une place de stationnement peut, sous certaines conditions et procédures, faire valoir son droit à installer une solution de recharge. Les modalités précises dépendent de la situation de chaque copropriété.",
};
