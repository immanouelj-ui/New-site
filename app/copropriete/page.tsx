import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { AudienceTabs } from "@/components/copropriete/AudienceTabs";
import { FinalCTA } from "@/components/home/FinalCTA";
import { droitALaPriseSummary } from "@/lib/content/aides";

export const metadata: Metadata = {
  title: "Borne de recharge en copropriété",
  description:
    "Infrastructure collective de recharge en copropriété : droit à la prise, installation évolutive, maintenance et accompagnement administratif.",
};

const points = [
  { title: "Infrastructure collective", description: "Une colonne électrique dimensionnée pour l'ensemble du parking." },
  { title: "Droit à la prise", description: "Un cadre légal qui permet à chaque occupant de faire installer sa solution." },
  { title: "Évolutivité", description: "L'installation s'adapte à mesure que de nouveaux résidents s'équipent." },
  { title: "Maintenance", description: "Un suivi technique pour garantir le bon fonctionnement dans la durée." },
  { title: "Supervision", description: "Répartition de la puissance disponible entre les différents points de charge." },
  { title: "Accompagnement administratif", description: "Préparation des dossiers pour l'assemblée générale." },
];

export default function CoproprietePage() {
  return (
    <>
      <PageHero
        eyebrow="Copropriété"
        title="Une infrastructure de recharge pour tout le parking."
        description="Installation collective, droit à la prise individuel, ou accompagnement du syndic : nous nous adaptons à votre situation."
        primaryCta={{ label: "Étudier notre copropriété", href: "/simulateur" }}
        secondaryCta={{ label: "Le droit à la prise", href: "/droit-a-la-prise" }}
      />

      <Section id="votre-profil">
        <SectionHeading eyebrow="Votre profil" title="Qui êtes-vous dans cette copropriété ?" />
        <div className="mt-12">
          <AudienceTabs />
        </div>
      </Section>

      <Section id="infrastructure" dark>
        <SectionHeading
          dark
          eyebrow="Infrastructure"
          title="Une solution complète, pensée pour durer."
          description="De l'étude technique à la maintenance, nous accompagnons chaque étape du projet collectif."
        />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-lg)] bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p) => (
            <RevealItem key={p.title}>
              <div className="flex h-full flex-col gap-3 bg-ink p-7">
                <h3 className="font-display text-lg font-semibold tracking-tight text-paper">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-paper/60">{p.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="droit-a-la-prise">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {droitALaPriseSummary.title}
          </h2>
          <p className="mt-4 text-muted">{droitALaPriseSummary.description}</p>
          <a href="/droit-a-la-prise" className="link-underline mt-4 inline-block text-sm font-medium text-ink">
            En savoir plus sur le droit à la prise →
          </a>
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
