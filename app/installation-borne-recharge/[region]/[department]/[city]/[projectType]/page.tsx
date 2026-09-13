import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/geo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import {
  cityPath,
  getCityProjectPage,
  getPublishedCities,
  getPublishedCityProjectPages,
  resolveCityLocation,
} from "@/lib/geo/queries";
import { JsonLd, serviceJsonLd } from "@/lib/geo/jsonld";
import type { ProjectType } from "@/lib/geo/types";

export const revalidate = 3600;

const projectTypeLabels: Record<ProjectType, string> = {
  maison: "Maison",
  copropriete: "Copropriété",
  entreprise: "Entreprise",
};

const generalPageHref: Record<ProjectType, string> = {
  maison: "/maison",
  copropriete: "/copropriete",
  entreprise: "/entreprise",
};

export async function generateStaticParams() {
  const cities = await getPublishedCities();
  const params: { region: string; department: string; city: string; projectType: string }[] = [];
  for (const c of cities) {
    const location = await resolveCityLocation(c.slug);
    if (!location) continue;
    const pages = await getPublishedCityProjectPages(c.id);
    for (const p of pages) {
      params.push({
        region: location.region.slug,
        department: location.department.slug,
        city: c.slug,
        projectType: p.project_type,
      });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string; department: string; city: string; projectType: string }>;
}): Promise<Metadata> {
  const { city: citySlug, projectType } = await params;
  const location = await resolveCityLocation(citySlug);
  if (!location) return {};
  const page = await getCityProjectPage(location.city.id, projectType as ProjectType);
  if (!page) return {};
  return {
    title:
      page.meta_title ??
      `Borne de recharge ${projectTypeLabels[page.project_type]} à ${location.city.name}`,
    description: page.meta_description ?? undefined,
  };
}

export default async function CityProjectTypePage({
  params,
}: {
  params: Promise<{ region: string; department: string; city: string; projectType: string }>;
}) {
  const { region: regionSlug, department: departmentSlug, city: citySlug, projectType } =
    await params;
  const location = await resolveCityLocation(citySlug);
  if (
    !location ||
    location.region.slug !== regionSlug ||
    location.department.slug !== departmentSlug
  ) {
    notFound();
  }
  const { city, department, region } = location;

  const validTypes: ProjectType[] = ["maison", "copropriete", "entreprise"];
  if (!validTypes.includes(projectType as ProjectType)) notFound();

  const page = await getCityProjectPage(city.id, projectType as ProjectType);
  if (!page) notFound();

  const label = projectTypeLabels[page.project_type];

  return (
    <div className="pb-28 pt-32 md:pt-40">
      <div className="container-edge">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Installation borne de recharge", href: "/installation-borne-recharge" },
            { label: region.name, href: `/installation-borne-recharge/${region.slug}` },
            {
              label: department.name,
              href: `/installation-borne-recharge/${region.slug}/${department.slug}`,
            },
            { label: city.name, href: cityPath(location) },
            { label },
          ]}
        />
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {label} — {city.name}
          </span>
          <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
            Borne de recharge {label.toLowerCase()} à {city.name}
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted">
            {page.intro}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-9 flex flex-wrap gap-4">
          <div className="flex flex-wrap gap-4">
            <Button href="/simulateur">Estimer mon projet</Button>
            <Button href={generalPageHref[page.project_type]} variant="secondary">
              Solutions {label.toLowerCase()} en général
            </Button>
          </div>
        </Reveal>
      </div>

      {page.content ? (
        <Section id="details">
          <p className="max-w-2xl text-muted">{page.content}</p>
        </Section>
      ) : null}

      <Section id="retour" className="bg-paper-dim">
        <SectionHeading
          eyebrow="Voir aussi"
          title={`Toutes nos solutions à ${city.name}`}
        />
        <Link
          href={cityPath(location)}
          className="link-underline mt-6 inline-block text-sm font-medium text-ink"
        >
          Retour à la page {city.name} →
        </Link>
      </Section>

      <FinalCTA />

      <JsonLd
        data={serviceJsonLd({
          name: page.meta_title ?? `Borne de recharge ${label.toLowerCase()} à ${city.name}`,
          description:
            page.meta_description ??
            `Installation de borne de recharge ${label.toLowerCase()} à ${city.name}.`,
          areaServed: city.name,
        })}
      />
    </div>
  );
}
