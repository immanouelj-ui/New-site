import type { Metadata } from "next";

export const metadata: Metadata = { title: "Confidentialité" };

export default function ConfidentialitePage() {
  return (
    <div className="pb-28 pt-36 md:pt-44">
      <div className="container-edge max-w-2xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight">
          Politique de confidentialité
        </h1>
        <p className="mt-6 text-muted">
          Cette page sera complétée avec la politique de confidentialité officielle de
          l&apos;entreprise (traitement des données, durée de conservation, droits des
          utilisateurs) avant la mise en ligne du site.
        </p>
      </div>
    </div>
  );
}
