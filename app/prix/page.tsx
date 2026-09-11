import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PriceFactors } from "@/components/home/PriceFactors";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { FinalCTA } from "@/components/home/FinalCTA";
import { prixFaq } from "@/lib/content/prix";

export const metadata: Metadata = {
  title: "Prix d'une borne de recharge",
  description:
    "Comprendre le prix d'une installation de borne de recharge : les facteurs qui influencent le coût, sans tarif générique.",
};

export default function PrixPage() {
  return (
    <>
      <PageHero
        eyebrow="Prix"
        title="Combien coûte l'installation d'une borne ?"
        description="Le prix d'une installation dépend de votre configuration. Nous préférons vous expliquer les facteurs plutôt que d'afficher un chiffre générique et trompeur."
        secondaryCta={{ label: "Voir les aides disponibles", href: "/aides" }}
      />

      <PriceFactors />

      <Section id="faq-prix" className="bg-paper-dim">
        <SectionHeading eyebrow="Questions fréquentes" title="Tout comprendre sur le prix." />
        <div className="mt-12">
          <Accordion items={prixFaq} />
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
