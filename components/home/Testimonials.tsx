import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { avis, avisSummary } from "@/lib/content/avis";
import Link from "next/link";

export function Testimonials() {
  return (
    <Section id="avis">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow="Avis clients" title="Ce qu'en disent nos clients." />
        {avisSummary.averageRating ? (
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-semibold">
              {avisSummary.averageRating}
            </span>
            <span className="text-muted">/5 · {avisSummary.totalCount} avis</span>
          </div>
        ) : null}
      </div>

      {avis.length === 0 ? (
        <Reveal className="mt-14">
          <div className="flex flex-col items-start gap-4 rounded-[var(--radius-lg)] border border-dashed border-ink/15 bg-paper-dim p-10">
            <p className="max-w-md text-balance text-lg text-muted">
              Les avis clients seront affichés ici dès leur connexion (Google Reviews ou saisie
              vérifiée). Aucun avis n&apos;est publié tant qu&apos;il n&apos;est pas authentique.
            </p>
            <Link href="/contact" className="link-underline text-sm font-medium text-ink">
              Vous êtes client et souhaitez partager votre avis ?
            </Link>
          </div>
        </Reveal>
      ) : (
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {avis.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.06}>
              <div className="flex h-full flex-col justify-between gap-6 rounded-[var(--radius-lg)] border border-ink/8 p-7">
                <p className="text-balance leading-relaxed text-ink/85">&ldquo;{a.quote}&rdquo;</p>
                <div>
                  <p className="text-sm font-medium text-ink">
                    {a.firstName}
                    {a.city ? ` — ${a.city}` : ""}
                  </p>
                  <p className="text-xs text-muted">{"★".repeat(a.rating)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
