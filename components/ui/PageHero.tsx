import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta = { label: "Estimer mon projet", href: "/simulateur" },
  secondaryCta,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-48">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,91,253,0.07),transparent_60%)]" />
      <div className="container-edge relative">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-display mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted">
            {description}
          </p>
        </Reveal>
        <Reveal delay={0.24} className="mt-9 flex flex-wrap gap-4">
          <div className="flex flex-wrap gap-4">
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            {secondaryCta ? (
              <Button href={secondaryCta.href} variant="secondary">
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
