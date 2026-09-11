export const mainNav = [
  { label: "Solutions", href: "/solutions" },
  { label: "Bornes", href: "/bornes" },
  { label: "Prix", href: "/prix" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Conseils", href: "/conseils" },
] as const;

export const solutionsNav = [
  { label: "Maison", href: "/maison", description: "Recharge à domicile" },
  { label: "Copropriété", href: "/copropriete", description: "Infrastructure collective" },
  { label: "Entreprise", href: "/entreprise", description: "Parking & flotte" },
  { label: "Recharge rapide", href: "/recharge-rapide", description: "Points de recharge rapide" },
] as const;

export const footerNav = {
  solutions: solutionsNav,
  entreprise: [
    { label: "Nos bornes", href: "/bornes" },
    { label: "Nos réalisations", href: "/realisations" },
    { label: "Avis clients", href: "/avis" },
    { label: "Contact", href: "/contact" },
  ],
  conseils: [
    { label: "Prix d'une borne", href: "/prix" },
    { label: "Quelle borne choisir ?", href: "/quelle-borne-recharge-choisir" },
    { label: "Aides financières", href: "/aides" },
    { label: "Droit à la prise", href: "/droit-a-la-prise" },
  ],
} as const;
