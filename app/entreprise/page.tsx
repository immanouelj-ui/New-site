import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";
import { ScaleVisualization } from "@/components/entreprise/ScaleVisualization";
import { BorneCard } from "@/components/bornes/BorneCard";
import { FinalCTA } from "@/components/home/FinalCTA";
import { bornes } from "@/lib/content/bornes";
import { FLAGSHIP_CITY_NAME, FLAGSHIP_CITY_PROJECT_PATHS } from "@/lib/geo/constants";

export const metadata: Metadata = {
  title: "Borne de recharge pour entreprise",
  description:
    "Transformez votre parking en infrastructure de recharge : flotte électrique, salariés, visiteurs, multisites et supervision.",
};

const useCases = [
  { title: "Parking entreprise", description: "Équipez les places de votre parking pour vos salariés." },
  { title: "Flotte électrique", description: "Dimensionnez la recharge selon vos véhicules d'entreprise." },
  { title: "Salariés", description: "Une solution de recharge disponible au quotidien sur site." },
  { title: "Visiteurs", description: "Des bornes dédiées, avec accès simplifié." },
  { title: "Multisites", description: "Une supervision centralisée sur l'ensemble de vos implantations." },
  { title: "Maintenance", description: "Un suivi technique pour limiter les interruptions de service." },
];

const entrepriseBornes = bornes.filter((b) => b.audience.includes("entreprise"));

export default function EntreprisePage() {
  return (
    <>
      <PageHero
        eyebrow="Entreprise"
        title="Transformez votre parking en infrastructure de recharge."
        description="De la première borne au réseau multisite : étude, installation, supervision et maintenance pour votre flotte, vos salariés et vos visiteurs."
        secondaryCta={{ label: "Parler à un expert", href: "/contact" }}
      />

      <Section id="cas-usage">
        <SectionHeading eyebrow="Cas d'usage" title="Une solution pour chaque configuration." />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u) => (
            <RevealItem key={u.title}>
              <div className="flex h-full flex-col gap-3 rounded-[var(--radius-lg)] border border-ink/8 p-7 transition-all duration-300 hover:border-ink/20 hover:shadow-md">
                <h3 className="font-medium text-ink">{u.title}</h3>
                <p className="text-sm text-muted">{u.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <ScaleVisualization />

      <Section id="bornes-entreprise">
        <SectionHeading
          eyebrow="Nos bornes"
          title="Recharge rapide et supervision multi-bornes."
          description="Des solutions pensées pour une utilisation intensive et une gestion centralisée."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {entrepriseBornes.map((b) => (
            <BorneCard key={b.slug} borne={b} />
          ))}
        </div>
      </Section>

      <Section id="exemple-local" className="bg-paper-dim">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Voir un exemple local
          </p>
          <Link
            href={FLAGSHIP_CITY_PROJECT_PATHS.entreprise}
            className="link-underline mt-3 inline-block font-display text-xl font-semibold tracking-tight text-ink"
          >
            Borne de recharge entreprise à {FLAGSHIP_CITY_NAME} →
          </Link>
          <p className="mt-2 max-w-md text-sm text-muted">
            Découvrez comment nous adaptons cette solution à un contexte local précis, ou{" "}
            <Link href="/installation-borne-recharge" className="link-underline text-ink">
              explorez toutes nos zones d&apos;intervention
            </Link>
            .
          </p>
        </Reveal>
      </Section>

      <FinalCTA />
    </>
  );
}
