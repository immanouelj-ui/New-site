import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import { CoverageFinder } from "@/components/geo/CoverageFinder";
import { getPublishedRegions, regionPath } from "@/lib/geo/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Installation de borne de recharge",
  description: "Tout comprendre sur l'installation d'une borne de recharge pour véhicule électrique : étapes, acteurs, réglementation, couverture par région.",
};

const audiences = [
  { title: "À la maison", description: "Garage, extérieur, recharge solaire.", href: "/maison" },
  { title: "En copropriété", description: "Droit à la prise, infrastructure collective.", href: "/copropriete" },
  { title: "En entreprise", description: "Parking, flotte, supervision multisite.", href: "/entreprise" },
];

export default async function InstallationBorneRechargePage() {
  const regions = await getPublishedRegions();

  return (
    <>
      <PageHero
        eyebrow="Guide"
        title="Installer une borne de recharge : ce qu'il faut savoir."
        description="Que vous soyez particulier, copropriétaire ou entreprise, l'installation d'une borne de recharge suit une logique commune : étude, dimensionnement, installation qualifiée."
      />

      <Section id="trouver-installateur" className="pt-0 md:pt-0">
        <CoverageFinder />
      </Section>

      <Section id="etapes">
        <SectionHeading eyebrow="Les grandes étapes" title="Une méthode commune à tous les projets." />
        <div className="mt-14 flex flex-col gap-6">
          {[
            { n: "01", title: "Étude de votre installation électrique existante", description: "Un point de départ indispensable avant tout devis." },
            { n: "02", title: "Choix de la puissance et des fonctionnalités", description: "Adapté à votre véhicule, votre usage et votre budget." },
            { n: "03", title: "Devis détaillé et transparent", description: "Chaque poste de coût est expliqué, sans surprise." },
            { n: "04", title: "Installation par un professionnel qualifié IRVE", description: "Une exigence réglementaire et une garantie de sécurité." },
            { n: "05", title: "Mise en service et accompagnement", description: "Votre borne est testée, expliquée, et suivie dans la durée." },
          ].map((step) => (
            <div key={step.n} className="flex gap-6 border-t border-ink/8 pt-6">
              <span className="font-display text-2xl font-semibold text-accent">{step.n}</span>
              <div>
                <p className="font-medium text-ink">{step.title}</p>
                <p className="mt-1 text-sm text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="votre-situation" className="bg-paper-dim">
        <SectionHeading eyebrow="Votre situation" title="Choisissez votre profil pour aller plus loin." />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {audiences.map((a) => (
            <RevealItem key={a.href}>
              <Link
                href={a.href}
                className="group flex h-full flex-col gap-3 rounded-[var(--radius-lg)] border border-ink/8 bg-paper p-7 transition-all duration-300 hover:border-ink/20 hover:shadow-md"
              >
                <h3 className="font-display text-lg font-semibold tracking-tight">{a.title}</h3>
                <p className="text-sm text-muted">{a.description}</p>
                <span className="mt-auto flex items-center gap-2 text-sm font-medium text-ink">
                  Découvrir
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M3 8h10m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="regions">
        <SectionHeading
          eyebrow="France entière"
          title="Notre couverture, région par région."
          description="Nous développons notre couverture progressivement. Chaque région dispose de sa propre page, avec le détail des départements et des villes couverts."
        />
        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((r) => (
            <Link
              key={r.id}
              href={regionPath(r)}
              className="group flex items-center justify-between rounded-[var(--radius-md)] border border-ink/8 px-5 py-4 transition-all duration-300 hover:border-ink/25 hover:shadow-sm"
            >
              <span className="font-medium text-ink">{r.name}</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-ink/40 transition-transform duration-300 group-hover:translate-x-1">
                <path d="M3 8h10m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
