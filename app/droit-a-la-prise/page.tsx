import type { Metadata } from "next";
import { ArticleLayout, ArticleSection } from "@/components/ui/ArticleLayout";

export const metadata: Metadata = {
  title: "Le droit à la prise en copropriété",
  description: "Comprendre le droit à la prise : qui peut en bénéficier, quelle procédure suivre, et comment nous accompagnons votre démarche.",
};

export default function DroitALaPrisePage() {
  return (
    <ArticleLayout
      eyebrow="Conseils"
      title="Le droit à la prise, expliqué simplement."
      intro="En copropriété, la loi facilite l'installation d'une solution de recharge individuelle sur une place de stationnement. Voici les grands principes à connaître."
      relatedLinks={[
        { label: "Solutions pour copropriété", href: "/copropriete" },
        { label: "Aides financières", href: "/aides" },
      ]}
    >
      <ArticleSection title="Le principe">
        <p>
          Tout occupant d&apos;un immeuble collectif disposant d&apos;une place de stationnement
          peut, sous certaines conditions, faire réaliser à ses frais l&apos;installation d&apos;un
          point de recharge pour véhicule électrique, sans que la copropriété puisse s&apos;y
          opposer sans motif sérieux et légitime.
        </p>
      </ArticleSection>

      <ArticleSection title="Qui est concerné">
        <p>
          Les propriétaires occupants, les propriétaires bailleurs et les locataires disposant
          d&apos;une place de stationnement peuvent engager la démarche, selon des modalités qui
          diffèrent légèrement selon leur statut.
        </p>
      </ArticleSection>

      <ArticleSection title="La procédure, dans les grandes lignes">
        <p>
          La demande est notifiée au syndic, accompagnée d&apos;une description technique des
          travaux envisagés. Le syndic inscrit la question à l&apos;ordre du jour de la prochaine
          assemblée générale, qui ne peut s&apos;opposer au projet que dans des cas précis prévus
          par la réglementation.
        </p>
      </ArticleSection>

      <ArticleSection title="Notre rôle dans votre démarche">
        <p>
          Nous préparons le dossier technique à présenter à votre syndic : description de
          l&apos;installation, schéma de raccordement et éléments nécessaires à l&apos;instruction
          de votre demande. Les modalités précises dépendent de la situation de chaque
          copropriété — un échange avec notre équipe permet de clarifier votre cas.
        </p>
      </ArticleSection>
    </ArticleLayout>
  );
}
