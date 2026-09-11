import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
      <span className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-accent">
        404
      </span>
      <h1 className="font-display text-balance text-3xl font-semibold tracking-tight md:text-5xl">
        Cette page n&apos;existe pas.
      </h1>
      <p className="max-w-md text-muted">
        La page que vous cherchez a peut-être été déplacée ou n&apos;existe plus.
      </p>
      <Button href="/">Retour à l&apos;accueil</Button>
    </div>
  );
}
