import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/geo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { PriceFactors } from "@/components/home/PriceFactors";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import {
  cityPath,
  getCityContent,
  getFaqs,
  getNeighboringCities,
  getPublishedCities,
  getPublishedCityProjectPages,
  resolveCityLocation,
} from "@/lib/geo/queries";
import { JsonLd, serviceJsonLd, faqJsonLd } from "@/lib/geo/jsonld";
import { aides } from "@/lib/content/aides";

export const revalidate = 3600;

const projectTypeLabels: Record<string, string> = {
  maison: "Maison",
  copropriete: "Copropriété",
  entreprise: "Entreprise",
};

export async function generateStaticParams() {
  const cities = await getPublishedCities();
  const withPath = await Promise.all(
    cities.map(async (c) => {
      const location = await resolveCityLocation(c.slug);
      return location
        ? { region: location.region.slug, department: location.department.slug, city: c.slug }
        : null;
    }),
  );
  return withPath.filter(
    (x): x is { region: string; department: string; city: string } => !!x,
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string; department: string; city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const location = await resolveCityLocation(citySlug);
  if (!location) return {};
  const content = await getCityContent(location.city.id);
  return {
    title: content?.local_title ?? `Installation de borne de recharge à ${location.city.name}`,
    description: content?.meta_description ?? undefined,
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ region: string; department: string; city: string }>;
}) {
  const { region: regionSlug, department: departmentSlug, city: citySlug } = await params;
  const location = await resolveCityLocation(citySlug);
  if (
    !location ||
    location.region.slug !== regionSlug ||
    location.department.slug !== departmentSlug
  ) {
    notFound();
  }
  const { city, department, region } = location;

  const [content, faqs, neighbors, projectPages] = await Promise.all([
    getCityContent(city.id),
    getFaqs("city", city.id),
    getNeighboringCities(city.id),
    getPublishedCityProjectPages(city.id),
  ]);

  if (!content) notFound();

  const relevantAides = aides.filter((a) =>
    city.tier === 1 ? true : a.audience.includes("maison") || a.audience.includes("copropriete"),
  );

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
            { label: city.name },
          ]}
        />
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {city.postal_codes[0] ? `${city.name} (${city.postal_codes[0]})` : city.name}
          </span>
          <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
            Installation de borne de recharge à {city.name}
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted">
            {content.local_intro}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-9">
          <Button href="/simulateur">Estimer mon installation</Button>
        </Reveal>
      </div>

      {content.why_install ? (
        <Section id="pourquoi">
          <SectionHeading eyebrow="Pourquoi nous" title={`Pourquoi installer une borne à ${city.name} ?`} />
          <p className="mt-6 max-w-2xl text-muted">{content.why_install}</p>
        </Section>
      ) : null}

      {projectPages.length > 0 ? (
        <Section id="solutions" className="bg-paper-dim">
          <SectionHeading eyebrow="Nos solutions" title={`Nos solutions à ${city.name}`} />
          <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {(["maison", "copropriete", "entreprise"] as const).map((type) => {
              const page = projectPages.find((p) => p.project_type === type);
              if (!page) return null;
              return (
                <RevealItem key={type}>
                  <Link
                    href={`${cityPath(location)}/${type}`}
                    className="group flex h-full flex-col gap-3 rounded-[var(--radius-lg)] border border-ink/8 bg-paper p-6 transition-all duration-300 hover:border-ink/25 hover:shadow-md"
                  >
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {projectTypeLabels[type]}
                    </h3>
                    <p className="text-sm text-muted">{page.intro}</p>
                    <span className="mt-auto flex items-center gap-2 text-sm font-medium text-ink">
                      Découvrir
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M3 8h10m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Section>
      ) : null}

      {content.installation_process ? (
        <Section id="installation">
          <SectionHeading eyebrow="Installation" title="Comment se déroule l'installation ?" />
          <p className="mt-6 max-w-2xl text-muted">{content.installation_process}</p>
        </Section>
      ) : null}

      <PriceFactors showCta={false} />

      <Section id="aides" className="bg-paper-dim">
        <SectionHeading eyebrow="Aides" title="Les aides disponibles" />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {relevantAides.map((a) => (
            <div key={a.slug} className="rounded-[var(--radius-md)] border border-ink/8 bg-paper p-5">
              <p className="font-medium text-ink">{a.name}</p>
              <p className="mt-2 text-sm text-muted">{a.description}</p>
              <p className="mt-3 text-xs font-medium uppercase tracking-wide text-ink/40">
                {a.amountLabel ?? "Montant à confirmer"}
              </p>
            </div>
          ))}
        </div>
        <Link href="/aides" className="link-underline mt-6 inline-block text-sm font-medium text-ink">
          Voir toutes les aides disponibles →
        </Link>
      </Section>

      {content.local_constraints ? (
        <Section id="contraintes">
          <SectionHeading eyebrow="À savoir" title="Points d'attention locaux" />
          <p className="mt-6 max-w-2xl text-muted">{content.local_constraints}</p>
        </Section>
      ) : null}

      {content.service_area ? (
        <Section id="zone-intervention" className="bg-paper-dim">
          <SectionHeading eyebrow="Zone d'intervention" title={`Notre zone autour de ${city.name}`} />
          <p className="mt-6 max-w-2xl text-muted">{content.service_area}</p>
        </Section>
      ) : null}

      {neighbors.length > 0 ? (
        <Section id="villes-proches">
          <SectionHeading eyebrow="Communes voisines" title="Nous intervenons également à proximité" />
          <div className="mt-8 flex flex-wrap gap-3">
            {neighbors.map((n) => (
              <Link
                key={n.id}
                href={cityPath({ city: n, department, region })}
                className="rounded-full border border-ink/12 px-4 py-2 text-sm font-medium text-ink/75 transition-all duration-300 hover:border-ink/30 hover:text-ink"
              >
                {n.name}
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      {faqs.length > 0 ? (
        <Section id="faq" className={neighbors.length > 0 ? "bg-paper-dim" : undefined}>
          <SectionHeading eyebrow="Questions fréquentes" title={`Vos questions sur ${city.name}`} />
          <div className="mt-12">
            <Accordion items={faqs} />
          </div>
        </Section>
      ) : null}

      <Section id="guides">
        <SectionHeading eyebrow="Guides utiles" title="Pour aller plus loin" />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/quelle-borne-recharge-choisir" className="link-underline text-sm font-medium text-ink">
            Quelle borne choisir ?
          </Link>
          <Link href="/prix" className="link-underline text-sm font-medium text-ink">
            Prix d&apos;une borne
          </Link>
          <Link href="/aides" className="link-underline text-sm font-medium text-ink">
            Aides financières
          </Link>
          <Link href="/droit-a-la-prise" className="link-underline text-sm font-medium text-ink">
            Droit à la prise
          </Link>
        </div>
      </Section>

      <FinalCTA />

      <JsonLd
        data={serviceJsonLd({
          name: content.local_title ?? `Installation de borne de recharge à ${city.name}`,
          description:
            content.meta_description ??
            `Installation de bornes de recharge pour véhicules électriques à ${city.name}.`,
          areaServed: city.name,
        })}
      />
      {faqJsonLd(faqs) ? <JsonLd data={faqJsonLd(faqs)!} /> : null}
    </div>
  );
}
