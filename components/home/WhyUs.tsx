import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const points = [
  {
    n: "01",
    title: "Installateurs qualifiés IRVE",
    description: "Chaque intervention est réalisée par un installateur certifié IRVE.",
  },
  {
    n: "02",
    title: "Étude technique",
    description: "Votre installation électrique est analysée avant toute proposition.",
  },
  {
    n: "03",
    title: "Prix transparents",
    description: "Un devis détaillé, sans frais cachés, adapté à votre projet réel.",
  },
  {
    n: "04",
    title: "Installation clé en main",
    description: "De l'étude à la mise en service, nous coordonnons l'ensemble du projet.",
  },
  {
    n: "05",
    title: "Assistance après installation",
    description: "Un accompagnement reste disponible une fois votre borne installée.",
  },
];

export function WhyUs() {
  return (
    <Section id="pourquoi-nous" dark>
      <SectionHeading
        eyebrow="Pourquoi nous"
        dark
        title="Une exigence à chaque étape."
        description="Cinq engagements qui structurent chacun de nos projets."
      />

      <RevealGroup className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-lg)] bg-paper/10 sm:grid-cols-2 lg:grid-cols-5">
        {points.map((point) => (
          <RevealItem key={point.n}>
            <div className="flex h-full flex-col gap-4 bg-ink p-7">
              <span className="font-display text-sm font-semibold text-volt">{point.n}</span>
              <h3 className="font-display text-lg font-semibold tracking-tight text-paper">
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed text-paper/60">{point.description}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
