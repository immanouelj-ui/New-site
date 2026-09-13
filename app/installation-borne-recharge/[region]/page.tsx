import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/geo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";
import {
  getDepartmentsByRegion,
  getFaqs,
  getPublishedRegions,
  getRegionBySlug,
  departmentPath,
} from "@/lib/geo/queries";
import { JsonLd, serviceJsonLd, faqJsonLd } from "@/lib/geo/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  const regions = await getPublishedRegions();
  return regions.map((r) => ({ region: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region: regionSlug } = await params;
  const region = await getRegionBySlug(regionSlug);
  if (!region || !region.published) return {};
  return {
    title: region.meta_title ?? `Installation de borne de recharge en ${region.name}`,
    description: region.meta_description ?? undefined,
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region: regionSlug } = await params;
  const region = await getRegionBySlug(regionSlug);
  if (!region || !region.published) notFound();

  const [departments, faqs] = await Promise.all([
    getDepartmentsByRegion(region.id),
    getFaqs("region", region.id),
  ]);
  const publishedDepartments = departments.filter((d) => d.published);
  const otherDepartments = departments.filter((d) => !d.published);

  return (
    <div className="pb-28 pt-32 md:pt-40">
      <div className="container-edge">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Installation borne de recharge", href: "/installation-borne-recharge" },
            { label: region.name },
          ]}
        />
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Région
          </span>
          <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
            Installation de borne de recharge en {region.name}
          </h1>
          {region.intro ? (
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted">
              {region.intro}
            </p>
          ) : null}
        </Reveal>
      </div>

      <Section id="departements">
        <SectionHeading eyebrow="Départements" title="Notre couverture dans la région" />
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {publishedDepartments.map((d) => (
            <Link
              key={d.id}
              href={departmentPath(region, d)}
              className="group flex items-center justify-between rounded-[var(--radius-md)] border border-ink/8 px-5 py-4 transition-all duration-300 hover:border-ink/25 hover:shadow-sm"
            >
              <span className="font-medium text-ink">{d.name}</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-ink/40 transition-transform duration-300 group-hover:translate-x-1">
                <path d="M3 8h10m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>

        {otherDepartments.length > 0 ? (
          <div className="mt-10 border-t border-ink/8 pt-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Couverture à venir
            </p>
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
              {otherDepartments.map((d) => (
                <span key={d.id} className="text-sm text-ink/50">
                  {d.name}
                </span>
              ))}
            </div>
            <p className="mt-4 max-w-xl text-sm text-muted">
              Vous ne trouvez pas votre département ? Contactez-nous pour vérifier notre
              disponibilité dans votre secteur.
            </p>
          </div>
        ) : null}
      </Section>

      {faqs.length > 0 ? (
        <Section id="faq" className="bg-paper-dim">
          <SectionHeading eyebrow="Questions fréquentes" title={`Vos questions sur la ${region.name}`} />
          <div className="mt-12">
            <Accordion items={faqs} />
          </div>
        </Section>
      ) : null}

      <FinalCTA />

      <JsonLd
        data={serviceJsonLd({
          name: `Installation de borne de recharge en ${region.name}`,
          description:
            region.meta_description ??
            `Installation de bornes de recharge pour véhicules électriques en ${region.name}.`,
          areaServed: region.name,
        })}
      />
      {faqJsonLd(faqs) ? <JsonLd data={faqJsonLd(faqs)!} /> : null}
    </div>
  );
}
