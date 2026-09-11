import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Recharge rapide",
  description: "Points de recharge rapide haute puissance pour parkings publics, sites commerciaux et aires de service.",
};

const useCases = [
  { title: "Parking public", description: "Des points de recharge accessibles à tous, pensés pour un passage court." },
  { title: "Site commercial", description: "Recharge rapide pendant le temps d'un achat ou d'une visite." },
  { title: "Aire de service", description: "Une solution haute puissance pour les longs trajets." },
];

export default function RechargeRapidePage() {
  return (
    <>
      <PageHero
        eyebrow="Recharge rapide"
        title="Des points de recharge haute puissance, là où vous en avez besoin."
        description="Nos solutions de recharge rapide s'adressent aux parkings publics, sites commerciaux et aires de service. Chaque projet fait l'objet d'une étude dédiée."
        secondaryCta={{ label: "Parler à un expert", href: "/contact" }}
      />

      <Section id="cas-usage">
        <SectionHeading eyebrow="Cas d'usage" title="Une infrastructure pensée pour l'intensif." />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {useCases.map((u) => (
            <RevealItem key={u.title}>
              <div className="flex h-full flex-col gap-3 rounded-[var(--radius-lg)] border border-ink/8 p-7">
                <h3 className="font-medium text-ink">{u.title}</h3>
                <p className="text-sm text-muted">{u.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <FinalCTA />
    </>
  );
}
