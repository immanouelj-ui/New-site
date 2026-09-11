import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProjectSelector } from "@/components/home/ProjectSelector";
import { FinalCTA } from "@/components/home/FinalCTA";
import type { CityPage } from "@/lib/content/cities";

export function LocalPageTemplate({ city }: { city: CityPage }) {
  return (
    <>
      <PageHero
        eyebrow={`Borne de recharge — ${city.city}`}
        title={`Installation de bornes de recharge à ${city.city}`}
        description={city.intro}
      />

      <Section id="contexte-local">
        <SectionHeading eyebrow="Votre logement" title={`Votre projet à ${city.city}`} />
        <div className="mt-8 max-w-2xl text-muted">
          <p>{city.context}</p>
          <p className="mt-4">{city.housingNote}</p>
        </div>
      </Section>

      <ProjectSelector />
      <FinalCTA />
    </>
  );
}
