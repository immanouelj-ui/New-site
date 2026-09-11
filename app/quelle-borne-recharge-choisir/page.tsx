import type { Metadata } from "next";
import { ArticleLayout, ArticleSection } from "@/components/ui/ArticleLayout";

export const metadata: Metadata = {
  title: "Quelle borne de recharge choisir ?",
  description: "7,4 kW, 11 kW ou 22 kW : comment choisir la puissance et les fonctionnalités adaptées à votre projet.",
};

export default function QuelleBorneChoisirPage() {
  return (
    <ArticleLayout
      eyebrow="Conseils"
      title="Quelle borne de recharge choisir ?"
      intro="Le choix d'une borne dépend de votre installation électrique, de votre véhicule et de votre usage. Voici comment orienter votre décision."
      relatedLinks={[
        { label: "Borne 7,4 kW", href: "/borne-7kw" },
        { label: "Borne 11 kW", href: "/borne-11kw" },
        { label: "Borne 22 kW", href: "/borne-22kw" },
        { label: "Comparer nos bornes", href: "/bornes" },
      ]}
    >
      <ArticleSection title="1. Commencez par votre installation électrique">
        <p>
          La puissance disponible chez vous détermine ce qui est réellement possible. Une
          installation monophasée standard oriente généralement vers une borne 7,4 kW ; une
          arrivée triphasée ouvre la voie à des puissances supérieures.
        </p>
      </ArticleSection>

      <ArticleSection title="2. Regardez la puissance de charge acceptée par votre véhicule">
        <p>
          Chaque véhicule a une puissance de charge maximale en courant alternatif. Installer une
          borne plus puissante que ce que votre véhicule peut recevoir n&apos;apporte aucun
          bénéfice de vitesse de charge.
        </p>
      </ArticleSection>

      <ArticleSection title="3. Pensez à votre usage réel">
        <p>
          Si vous rechargez la nuit sur plusieurs heures, une puissance plus faible suffit
          largement. Si vous avez besoin de récupérer rapidement de l&apos;autonomie en journée,
          une puissance plus élevée devient pertinente.
        </p>
      </ArticleSection>

      <ArticleSection title="4. Choisissez les fonctionnalités utiles">
        <p>
          Une borne connectée permet de suivre votre consommation et de piloter la recharge à
          distance. La compatibilité solaire est pertinente si vous disposez d&apos;une
          production photovoltaïque. En copropriété ou en entreprise, la gestion dynamique de
          puissance devient importante dès que plusieurs bornes partagent la même installation.
        </p>
      </ArticleSection>

      <ArticleSection title="Vous hésitez encore ?">
        <p>
          Notre étude technique détermine ce qui est réellement possible et pertinent pour votre
          installation — la meilleure façon d&apos;éviter un choix par excès ou par défaut.
        </p>
      </ArticleSection>
    </ArticleLayout>
  );
}
