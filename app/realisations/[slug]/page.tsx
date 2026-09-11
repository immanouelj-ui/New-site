import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { FinalCTA } from "@/components/home/FinalCTA";
import { realisations } from "@/lib/content/realisations";

export function generateStaticParams() {
  return realisations.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const realisation = realisations.find((r) => r.slug === slug);
  if (!realisation) return {};
  return { title: realisation.title, description: realisation.context };
}

export default async function RealisationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const realisation = realisations.find((r) => r.slug === slug);
  if (!realisation) notFound();

  const facts = [
    realisation.powerKw ? { label: "Puissance", value: `${realisation.powerKw} kW` } : null,
    realisation.distanceMeters ? { label: "Distance", value: `${realisation.distanceMeters} m` } : null,
    realisation.material ? { label: "Matériel", value: realisation.material } : null,
    realisation.durationDays ? { label: "Durée", value: `${realisation.durationDays} j` } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <div className="pb-0 pt-36 md:pt-44">
        <div className="container-edge">
          <div className="rounded-[var(--radius-md)] border border-dashed border-ink/15 bg-paper-dim p-4 text-sm text-muted">
            Fiche d&apos;exemple — à remplacer par le projet réel et ses photos.
          </div>
          <Reveal className="mt-8">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {realisation.city ?? "Réalisation"}
            </span>
            <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              {realisation.title}
            </h1>
          </Reveal>
        </div>
      </div>

      <Section id="cover" className="pt-14">
        <PlaceholderMedia
          src={realisation.coverImageSrc}
          alt={realisation.title}
          label={realisation.coverPlaceholderLabel}
          ratio="16/9"
          className="rounded-[var(--radius-lg)]"
        />
      </Section>

      <Section id="details" className="pt-0">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight">Contexte</h2>
              <p className="mt-3 text-muted">{realisation.context}</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight">Solution</h2>
              <p className="mt-3 text-muted">{realisation.solution}</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight">Résultat</h2>
              <p className="mt-3 text-muted">{realisation.result}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3">
              {Array.from({ length: realisation.galleryPlaceholderCount }).map((_, i) => (
                <PlaceholderMedia
                  key={i}
                  alt={`${realisation.title} — photo ${i + 1}`}
                  label="Photo réelle à venir"
                  ratio="1/1"
                  className="rounded-[var(--radius-sm)]"
                />
              ))}
            </div>
          </div>

          {facts.length > 0 ? (
            <aside className="h-fit rounded-[var(--radius-lg)] border border-ink/8 p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
                En bref
              </h3>
              <dl className="mt-4 flex flex-col gap-4">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-center justify-between border-t border-ink/8 pt-3 first:border-t-0 first:pt-0">
                    <dt className="text-sm text-muted">{f.label}</dt>
                    <dd className="text-sm font-medium text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          ) : null}
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
