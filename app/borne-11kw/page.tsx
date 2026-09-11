import type { Metadata } from "next";
import { PowerPageTemplate } from "@/components/bornes/PowerPageTemplate";

export const metadata: Metadata = {
  title: "Borne de recharge 11 kW",
  description: "La borne 11 kW : une recharge accélérée en triphasé, pour réduire le temps de charge à domicile ou en copropriété.",
};

export default function Borne11kwPage() {
  return (
    <PowerPageTemplate
      power={11}
      title="La borne 11 kW : une recharge accélérée en triphasé."
      description="Si votre logement dispose d'une installation triphasée et que votre véhicule accepte cette puissance, la borne 11 kW réduit sensiblement le temps de charge."
      idealFor={[
        "Votre logement dispose d'une installation électrique triphasée.",
        "Votre véhicule accepte une charge triphasée jusqu'à 11 kW.",
        "Vous souhaitez réduire le temps de charge par rapport à une borne 7,4 kW.",
        "Vous équipez une copropriété avec plusieurs utilisateurs à servir.",
      ]}
      advantages={[
        {
          title: "Charge plus rapide",
          description: "Un temps de charge réduit par rapport à une installation monophasée, à véhicule compatible.",
        },
        {
          title: "Adaptée au collectif",
          description: "Une puissance pertinente lorsque plusieurs véhicules doivent se recharger sur une même infrastructure.",
        },
        {
          title: "Gestion de puissance",
          description: "Compatible avec des systèmes de répartition dynamique entre plusieurs points de charge.",
        },
      ]}
      faqIntro="Toutes les installations ne disposent pas d'une arrivée triphasée : une vérification de votre installation électrique est nécessaire avant de confirmer la faisabilité d'une borne 11 kW."
    />
  );
}
