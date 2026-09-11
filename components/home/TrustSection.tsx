import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { certifications, trustNumbers } from "@/lib/content/certifications";

export function TrustSection() {
  const hasNumbers = trustNumbers.installationsCount || trustNumbers.yearsActive;

  return (
    <Section id="confiance">
      <SectionHeading eyebrow="Confiance" title="Une entreprise que vous pouvez vérifier." />

      {hasNumbers ? (
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {trustNumbers.installationsCount ? (
            <Stat value={trustNumbers.installationsCount} label="Installations réalisées" />
          ) : null}
          {trustNumbers.yearsActive ? (
            <Stat value={trustNumbers.yearsActive} label="Années d'activité" />
          ) : null}
        </div>
      ) : null}

      <Reveal className="mt-12">
        {certifications.length === 0 ? (
          <div className="rounded-[var(--radius-lg)] border border-dashed border-ink/15 bg-paper-dim p-10">
            <p className="max-w-md text-balance text-muted">
              Nos certifications IRVE, assurances et partenaires seront affichés ici dès que les
              justificatifs officiels seront fournis.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-8">
            {certifications.map((c) => (
              <div key={c.slug} className="flex items-center gap-3">
                <span className="text-sm font-medium text-ink/70">{c.name}</span>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </Section>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col gap-1 border-t border-ink/8 pt-4">
      <span className="font-display text-4xl font-semibold tracking-tight">{value}+</span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
