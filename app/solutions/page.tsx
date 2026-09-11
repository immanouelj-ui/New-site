import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectSelector } from "@/components/home/ProjectSelector";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Nos solutions",
  description: "Maison, copropriété, entreprise, recharge rapide : découvrez la solution adaptée à votre projet.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Une solution pour chaque projet."
        description="Quel que soit votre profil, nous étudions votre installation et vous accompagnons de bout en bout."
      />
      <ProjectSelector />
      <FinalCTA />
    </>
  );
}
