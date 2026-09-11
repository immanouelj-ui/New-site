import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Gallery } from "@/components/realisations/Gallery";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Nos réalisations",
  description: "Maison, copropriété, entreprise, recharge rapide : découvrez nos installations de bornes de recharge.",
};

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        title="Nos installations, projet par projet."
        description="Chaque réalisation présentée ici est documentée : contexte, solution, matériel et résultat."
      />
      <Section id="galerie" className="pt-0 md:pt-0">
        <div className="mb-10 rounded-[var(--radius-md)] border border-dashed border-ink/15 bg-paper-dim p-5 text-sm text-muted">
          Les fiches ci-dessous illustrent la structure de présentation de nos réalisations. Elles
          seront remplacées par nos projets réels au fur et à mesure de leur documentation.
        </div>
        <Gallery />
      </Section>
      <FinalCTA />
    </>
  );
}
