import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { FlowDiagram } from "@/components/maison/FlowDiagram";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";
import { BorneCard } from "@/components/bornes/BorneCard";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { FinalCTA } from "@/components/home/FinalCTA";
import { bornes } from "@/lib/content/bornes";
import { FLAGSHIP_CITY_NAME, FLAGSHIP_CITY_PROJECT_PATHS } from "@/lib/geo/constants";

export const metadata: Metadata = {
  title: "Borne de recharge à domicile",
  description:
    "Installation d'une borne de recharge à domicile : garage, extérieur, recharge solaire. Étude technique et installation par un professionnel qualifié IRVE.",
};

const installationTypes = [
  {
    title: "Installation garage",
    description: "Pose murale à proximité de votre tableau électrique, à l'abri.",
  },
  {
    title: "Installation extérieure",
    description: "Borne sur pied ou murale, protégée pour un usage en extérieur.",
  },
  {
    title: "Recharge solaire",
    description: "Pilotage intelligent pour recharger avec votre production solaire.",
  },
  {
    title: "Borne connectée",
    description: "Suivi de consommation et pilotage à distance depuis une application.",
  },
];

const maisonBornes = bornes.filter((b) => b.audience.includes("maison"));

export default function MaisonPage() {
  return (
    <>
      <PageHero
        eyebrow="Maison"
        title="Rechargez chez vous. Simplement."
        description="Une installation étudiée pour votre logement, du garage à l'extérieur, avec un accompagnement complet — de l'étude à la mise en service."
        secondaryCta={{ label: "Voir nos bornes", href: "/bornes" }}
      />

      <FlowDiagram />

      <Section id="bornes-maison">
        <SectionHeading
          eyebrow="Nos bornes"
          title="7,4 kW, 11 kW, 22 kW : la puissance adaptée à votre usage."
          description="Chaque borne peut être connectée, compatible recharge solaire, et installée en intérieur comme en extérieur."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {maisonBornes.map((b) => (
            <BorneCard key={b.slug} borne={b} />
          ))}
        </div>
      </Section>

      <Section id="types-installation" className="bg-paper-dim">
        <SectionHeading eyebrow="Types d'installation" title="Adaptée à votre configuration." />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {installationTypes.map((t) => (
            <RevealItem key={t.title}>
              <div className="flex flex-col gap-4">
                <PlaceholderMedia
                  alt={t.title}
                  label={`Photo réelle à venir — ${t.title}`}
                  ratio="4/5"
                  className="rounded-[var(--radius-md)]"
                />
                <div>
                  <p className="font-medium text-ink">{t.title}</p>
                  <p className="mt-1 text-sm text-muted">{t.description}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="pourquoi-nous-maison">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-[var(--radius-lg)] border border-ink/8 p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                Une étude technique avant toute proposition.
              </h2>
              <p className="mt-3 text-muted">
                Nous analysons votre installation électrique existante pour vous proposer une
                solution sûre, dimensionnée et conforme.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section id="exemple-local" className="bg-paper-dim">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Voir un exemple local
          </p>
          <Link
            href={FLAGSHIP_CITY_PROJECT_PATHS.maison}
            className="link-underline mt-3 inline-block font-display text-xl font-semibold tracking-tight text-ink"
          >
            Borne de recharge maison à {FLAGSHIP_CITY_NAME} →
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
