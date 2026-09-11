import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import { aides } from "@/lib/content/aides";

export const metadata: Metadata = {
  title: "Aides financières pour une borne de recharge",
  description: "Quelles aides pour l'installation de votre borne de recharge ? Dispositifs applicables selon votre situation.",
};

export default function AidesPage() {
  return (
    <>
      <PageHero
        eyebrow="Aides"
        title="Quelles aides pour votre borne ?"
        description="Plusieurs dispositifs peuvent réduire le coût de votre installation, selon votre situation. Nous vous aidons à identifier ceux qui s'appliquent réellement à votre projet."
        primaryCta={{ label: "Calculer mes aides", href: "/simulateur" }}
      />

      <Section id="dispositifs">
        <SectionHeading
          eyebrow="Dispositifs"
          title="Les aides potentiellement mobilisables."
          description="Chaque montant et chaque condition d'éligibilité doit être vérifié pour votre situation précise avant toute décision."
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {aides.map((aide) => (
            <RevealItem key={aide.slug}>
              <div className="flex h-full flex-col gap-4 rounded-[var(--radius-lg)] border border-ink/8 p-7">
                <h3 className="font-display text-lg font-semibold tracking-tight">{aide.name}</h3>
                <p className="text-sm text-muted">{aide.description}</p>
                <div className="mt-auto flex flex-col gap-2 border-t border-ink/8 pt-4">
                  <span className="text-xs font-medium uppercase tracking-wide text-ink/40">
                    {aide.amountLabel ?? "Montant à confirmer"}
                  </span>
                  <p className="text-xs text-muted">{aide.eligibility}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <FinalCTA />
    </>
  );
}
