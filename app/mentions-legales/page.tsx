import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <div className="pb-28 pt-36 md:pt-44">
      <div className="container-edge max-w-2xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight">Mentions légales</h1>
        <p className="mt-6 text-muted">
          Cette page sera complétée avec les informations légales officielles de
          l&apos;entreprise (raison sociale, SIRET, hébergeur, directeur de publication, etc.)
          avant la mise en ligne du site.
        </p>
      </div>
    </div>
  );
}
