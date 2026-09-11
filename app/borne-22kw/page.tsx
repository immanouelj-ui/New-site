import type { Metadata } from "next";
import { PowerPageTemplate } from "@/components/bornes/PowerPageTemplate";

export const metadata: Metadata = {
  title: "Borne de recharge 22 kW",
  description: "La borne 22 kW : la recharge la plus rapide en courant alternatif, pour un usage intensif en entreprise ou en parking partagé.",
};

export default function Borne22kwPage() {
  return (
    <PowerPageTemplate
      power={22}
      title="La borne 22 kW : pour un usage intensif."
      description="Réservée aux installations triphasées renforcées et aux véhicules compatibles, la borne 22 kW offre la recharge la plus rapide en courant alternatif."
      idealFor={[
        "Vous équipez un parking d'entreprise à forte rotation de véhicules.",
        "Votre flotte comprend des véhicules compatibles avec une charge triphasée 22 kW.",
        "Vous gérez un site nécessitant une disponibilité rapide des véhicules.",
        "Votre installation électrique peut supporter cette puissance.",
      ]}
      advantages={[
        {
          title: "Recharge rapide",
          description: "La puissance la plus élevée disponible en courant alternatif pour un usage professionnel.",
        },
        {
          title: "Adaptée au multi-usage",
          description: "Pertinente pour des points de recharge partagés entre plusieurs conducteurs dans la journée.",
        },
        {
          title: "Supervision avancée",
          description: "Généralement associée à des fonctions de pilotage, badge et facturation pour un usage professionnel.",
        },
      ]}
      faqIntro="Une puissance de 22 kW nécessite une installation électrique dimensionnée en conséquence. Notre étude technique valide la faisabilité avant tout devis."
    />
  );
}
