import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { BornesComparateur } from "@/components/bornes/BornesComparateur";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Nos bornes de recharge",
  description: "Comparez nos bornes de recharge par puissance, profil et fonctionnalités : connectée, solaire, pilotage.",
};

export default function BornesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos bornes"
        title="Quelle borne vous correspond ?"
        description="Plutôt que de choisir une marque, choisissez ce dont vous avez besoin : puissance, connectivité, pilotage solaire."
        secondaryCta={{ label: "Quelle borne choisir ?", href: "/quelle-borne-recharge-choisir" }}
      />
      <Section id="comparateur" className="pt-0 md:pt-0">
        <BornesComparateur />
      </Section>
      <FinalCTA />
    </>
  );
}
