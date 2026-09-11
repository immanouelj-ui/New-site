export interface CityPage {
  slug: string;
  city: string;
  intro: string;
  context: string;
  housingNote: string;
}

export const cities: CityPage[] = [
  {
    slug: "borne-recharge-paris",
    city: "Paris",
    intro:
      "Installation de bornes de recharge à Paris : appartements, copropriétés et parkings d'entreprise, avec une attention particulière aux contraintes propres à l'habitat parisien.",
    context:
      "À Paris, la majorité des installations concerne des copropriétés et des parkings souterrains, avec des infrastructures électriques souvent partagées entre plusieurs occupants. Une étude technique précise est particulièrement importante dans ce contexte.",
    housingNote:
      "Studio, appartement en copropriété ou place de parking en sous-sol : chaque configuration parisienne appelle une étude spécifique avant tout devis.",
  },
  {
    slug: "borne-recharge-lyon",
    city: "Lyon",
    intro:
      "Installation de bornes de recharge à Lyon et son agglomération : maisons individuelles, copropriétés et sites d'entreprise.",
    context:
      "L'agglomération lyonnaise combine des maisons individuelles en périphérie et des copropriétés denses en centre-ville, deux configurations qui nécessitent des approches différentes pour l'installation d'une borne de recharge.",
    housingNote:
      "Maison avec garage en périphérie ou copropriété en hypercentre : nous adaptons notre étude technique à votre type de logement.",
  },
];
