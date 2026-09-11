import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";
import { BorneCard } from "@/components/bornes/BorneCard";
import { FinalCTA } from "@/components/home/FinalCTA";
import { bornes } from "@/lib/content/bornes";
import type { Borne } from "@/lib/content/types";

export function PowerPageTemplate({
  power,
  title,
  description,
  idealFor,
  faqIntro,
  advantages,
}: {
  power: Borne["powerKw"];
  title: string;
  description: string;
  idealFor: string[];
  faqIntro: string;
  advantages: { title: string; description: string }[];
}) {
  const matching = bornes.filter((b) => b.powerKw === power);

  return (
    <>
      <PageHero
        eyebrow={`Borne ${power} kW`}
        title={title}
        description={description}
        secondaryCta={{ label: "Comparer toutes nos bornes", href: "/bornes" }}
      />

      <Section id="pour-qui">
        <SectionHeading eyebrow="Pour qui ?" title="Cette puissance est adaptée si…" />
        <Reveal className="mt-10">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {idealFor.map((item) => (
              <li key={item} className="flex gap-3 rounded-[var(--radius-md)] border border-ink/8 p-5 text-ink/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section id="avantages" className="bg-paper-dim">
        <SectionHeading eyebrow="Avantages" title="Ce que change cette puissance au quotidien." />
        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {advantages.map((a) => (
            <RevealItem key={a.title}>
              <div className="flex flex-col gap-3">
                <h3 className="font-medium text-ink">{a.title}</h3>
                <p className="text-sm text-muted">{a.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {matching.length > 0 ? (
        <Section id="produits">
          <SectionHeading eyebrow="Nos bornes" title={`Nos bornes ${power} kW`} />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {matching.map((b) => (
              <BorneCard key={b.slug} borne={b} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section id="faq">
        <p className="max-w-2xl text-balance text-lg text-muted">{faqIntro}</p>
      </Section>

      <FinalCTA />
    </>
  );
}
