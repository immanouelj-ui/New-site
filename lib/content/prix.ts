import type { PriceFactor, FaqItem } from "./types";

// Ranges are intentionally left null. Fill `rangeLabel` only with verified,
// current pricing — this file is the single source of truth for all pricing
// copy across the site.
export const priceFactors: PriceFactor[] = [
  {
    key: "borne",
    label: "La borne",
    description: "Le matériel choisi : puissance, connectivité, pilotage solaire.",
    rangeLabel: null,
  },
  {
    key: "protection",
    label: "La protection électrique",
    description: "Disjoncteur dédié et protection différentielle adaptés à la borne.",
    rangeLabel: null,
  },
  {
    key: "cablage",
    label: "Le câblage",
    description: "Câble et gaine entre le tableau électrique et la borne.",
    rangeLabel: null,
  },
  {
    key: "distance",
    label: "La distance",
    description: "Distance entre le tableau électrique et l'emplacement de la borne.",
    rangeLabel: null,
  },
  {
    key: "travaux",
    label: "Les travaux annexes",
    description: "Percements, saignées, chemin de câble selon la configuration.",
    rangeLabel: null,
  },
  {
    key: "installation",
    label: "La pose et la mise en service",
    description: "Intervention d'un installateur qualifié IRVE et mise en service.",
    rangeLabel: null,
  },
];

export const prixFaq: FaqItem[] = [
  {
    question: "Pourquoi le prix n'est-il pas fixe ?",
    answer:
      "Chaque installation dépend de la configuration électrique existante, de la distance entre le tableau et la borne, et du niveau de puissance souhaité. C'est pourquoi nous établissons un devis après étude de votre projet plutôt que d'afficher un prix unique.",
  },
  {
    question: "Le devis est-il gratuit ?",
    answer: "Les modalités du devis vous sont communiquées avant toute étude technique.",
  },
  {
    question: "Puis-je financer mon installation ?",
    answer:
      "Des aides peuvent exister selon votre situation. Consultez la page dédiée aux aides pour en savoir plus.",
  },
];
