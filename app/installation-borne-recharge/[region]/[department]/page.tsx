import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/geo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";
import {
  cityPath,
  getCitiesByDepartment,
  getFaqs,
  getPublishedDepartments,
  resolveDepartmentLocation,
} from "@/lib/geo/queries";
import { JsonLd, serviceJsonLd, faqJsonLd } from "@/lib/geo/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  const departments = await getPublishedDepartments();
  const withRegion = await Promise.all(
    departments.map(async (d) => {
      const location = await resolveDepartmentLocation(d.slug);
      return location ? { region: location.region.slug, department: d.slug } : null;
    }),
  );
  return withRegion.filter((x): x is { region: string; department: string } => !!x);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string; department: string }>;
}): Promise<Metadata> {
  const { department: departmentSlug } = await params;
  const location = await resolveDepartmentLocation(departmentSlug);
  if (!location) return {};
  const { department } = location;
  return {
    title: department.meta_title ?? `Installation de borne de recharge dans le ${department.name}`,
    description: department.meta_description ?? undefined,
  };
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ region: string; department: string }>;
}) {
  const { region: regionSlug, department: departmentSlug } = await params;
  const location = await resolveDepartmentLocation(departmentSlug);
  if (!location || location.region.slug !== regionSlug) notFound();
  const { department, region } = location;

  const [cities, faqs] = await Promise.all([
    getCitiesByDepartment(department.id),
    getFaqs("department", department.id),
  ]);
  const publishedCities = cities.filter((c) => c.published);

  return (
    <div className="pb-28 pt-32 md:pt-40">
      <div className="container-edge">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Installation borne de recharge", href: "/installation-borne-recharge" },
            { label: region.name, href: `/installation-borne-recharge/${region.slug}` },
            { label: department.name },
          ]}
        />
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Département
          </span>
          <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
            Installation de borne de recharge dans le {department.name}
          </h1>
          {department.intro ? (
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted">
              {department.intro}
            </p>
          ) : null}
        </Reveal>

        <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
          {department.prefecture ? (
            <div className="flex gap-1.5">
              <dt className="font-medium text-ink">Préfecture</dt>
              <dd>{department.prefecture}</dd>
            </div>
          ) : null}
          {department.subprefectures && department.subprefectures.length > 0 ? (
            <div className="flex gap-1.5">
              <dt className="font-medium text-ink">Sous-préfectures</dt>
              <dd>{department.subprefectures.join(", ")}</dd>
            </div>
          ) : null}
        </dl>
      </div>

      {department.context ? (
        <Section id="contexte">
          <SectionHeading eyebrow="Contexte local" title="Le bâti et les besoins du département" />
          <p className="mt-6 max-w-2xl text-muted">{department.context}</p>
        </Section>
      ) : null}

      <Section id="villes" className={department.context ? "bg-paper-dim" : undefined}>
        <SectionHeading eyebrow="Villes couvertes" title="Nos installations dans le département" />
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {publishedCities.map((c) => (
            <Link
              key={c.id}
              href={cityPath({ city: c, department, region })}
              className="group flex items-center justify-between rounded-[var(--radius-md)] border border-ink/8 bg-paper px-5 py-4 transition-all duration-300 hover:border-ink/25 hover:shadow-sm"
            >
              <span className="font-medium text-ink">{c.name}</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-ink/40 transition-transform duration-300 group-hover:translate-x-1">
                <path d="M3 8h10m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>
        {publishedCities.length === 0 ? (
          <p className="mt-6 max-w-xl text-sm text-muted">
            Nous documentons progressivement nos interventions ville par ville dans ce
            département. Contactez-nous pour vérifier notre disponibilité dans votre commune.
          </p>
        ) : null}
      </Section>

      {faqs.length > 0 ? (
        <Section id="faq">
          <SectionHeading eyebrow="Questions fréquentes" title={`Vos questions sur le ${department.name}`} />
          <div className="mt-12">
            <Accordion items={faqs} />
          </div>
        </Section>
      ) : null}

      <FinalCTA />

      <JsonLd
        data={serviceJsonLd({
          name: `Installation de borne de recharge dans le ${department.name}`,
          description:
            department.meta_description ??
            `Installation de bornes de recharge pour véhicules électriques dans le ${department.name}.`,
          areaServed: department.name,
        })}
      />
      {faqJsonLd(faqs) ? <JsonLd data={faqJsonLd(faqs)!} /> : null}
    </div>
  );
}
