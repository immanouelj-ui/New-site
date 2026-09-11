import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ArticleLayout({
  eyebrow,
  title,
  intro,
  children,
  relatedLinks,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
  relatedLinks?: { label: string; href: string }[];
}) {
  return (
    <div className="pb-28 pt-36 md:pt-44">
      <div className="container-edge">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </span>
          <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted">{intro}</p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-[1fr_300px]">
          <div className="prose-article flex max-w-2xl flex-col gap-10">{children}</div>

          <aside className="h-fit flex flex-col gap-6 rounded-[var(--radius-lg)] border border-ink/8 p-7">
            <div>
              <p className="font-display text-lg font-semibold tracking-tight">
                Un projet en tête ?
              </p>
              <p className="mt-2 text-sm text-muted">
                Estimez votre installation en quelques minutes.
              </p>
            </div>
            <Button href="/simulateur" className="w-full">
              Estimer mon projet
            </Button>
            {relatedLinks && relatedLinks.length > 0 ? (
              <div className="flex flex-col gap-2 border-t border-ink/8 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  À lire aussi
                </p>
                {relatedLinks.map((l) => (
                  <Link key={l.href} href={l.href} className="link-underline text-sm text-ink/80">
                    {l.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </div>
  );
}

export function ArticleSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 leading-relaxed text-ink/80">{children}</div>
    </section>
  );
}
