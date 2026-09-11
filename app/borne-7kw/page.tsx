import type { Metadata } from "next";
import { PowerPageTemplate } from "@/components/bornes/PowerPageTemplate";

export const metadata: Metadata = {
  title: "Borne de recharge 7,4 kW",
  description: "La borne 7,4 kW : la puissance de référence pour une recharge quotidienne à domicile en monophasé.",
};

export default function Borne7kwPage() {
  return (
    <PowerPageTemplate
      power={7.4}
      title="La borne 7,4 kW : la référence pour un usage quotidien."
      description="Compatible avec la majorité des installations électriques monophasées, la borne 7,4 kW couvre l'essentiel des besoins de recharge à domicile."
      idealFor={[
        "Vous rechargez principalement la nuit, sur plusieurs heures.",
        "Votre logement dispose d'une installation électrique monophasée standard.",
        "Vous recherchez une solution simple et éprouvée.",
        "Votre véhicule ne nécessite pas de recharge très rapide au quotidien.",
      ]}
      advantages={[
        {
          title: "Compatibilité large",
          description: "Adaptée à la quasi-totalité des véhicules électriques et hybrides rechargeables.",
        },
        {
          title: "Installation simple",
          description: "Généralement compatible avec une installation électrique standard, sans renforcement lourd.",
        },
        {
          title: "Coût maîtrisé",
          description: "Une puissance suffisante pour l'usage quotidien, sans surdimensionner l'installation.",
        },
      ]}
      faqIntro="Le temps de charge réel dépend de la capacité de la batterie de votre véhicule et de sa puissance de charge acceptée. Notre étude technique vous permet d'obtenir une estimation adaptée à votre véhicule."
    />
  );
}
