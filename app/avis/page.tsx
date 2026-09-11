import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Avis clients",
  description: "Les avis de nos clients sur leur installation de borne de recharge.",
};

export default function AvisPage() {
  return (
    <>
      <PageHero
        eyebrow="Avis clients"
        title="Ce qu'en disent nos clients."
        description="Des avis authentiques, jamais inventés. Cette page se connecte à une source vérifiée dès qu'elle est disponible."
      />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
