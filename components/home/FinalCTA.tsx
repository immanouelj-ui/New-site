import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-paper md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(182,255,92,0.08),transparent_60%)]" />
      <div className="container-edge relative flex flex-col items-center gap-8 text-center">
        <Reveal>
          <h2 className="font-display text-balance text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
            Prêt à passer à la recharge électrique ?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-xl text-balance text-lg text-paper/65">
            Estimez votre projet en quelques minutes, ou échangez directement avec un expert.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/simulateur" className="!bg-paper !text-ink hover:!bg-accent hover:!text-paper">
              Estimer mon projet
            </Button>
            <Button href="/contact" variant="secondary" className="!border-paper/20 !text-paper hover:!border-paper/50">
              Parler à un expert
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
