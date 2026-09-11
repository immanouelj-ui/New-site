import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Conseils",
  description: "Nos guides pour comprendre l'installation, le prix, les aides et le choix d'une borne de recharge.",
};

const articles = [
  { title: "Combien coûte l'installation d'une borne ?", description: "Les facteurs qui influencent le prix, expliqués simplement.", href: "/prix" },
  { title: "Quelle borne de recharge choisir ?", description: "7,4 kW, 11 kW ou 22 kW : comment décider.", href: "/quelle-borne-recharge-choisir" },
  { title: "Borne 7,4 kW", description: "La puissance de référence pour un usage quotidien.", href: "/borne-7kw" },
  { title: "Borne 11 kW", description: "Une recharge accélérée en triphasé.", href: "/borne-11kw" },
  { title: "Borne 22 kW", description: "Pour un usage intensif en entreprise.", href: "/borne-22kw" },
  { title: "Quelles aides pour votre borne ?", description: "Les dispositifs potentiellement mobilisables.", href: "/aides" },
  { title: "Le droit à la prise", description: "Ce que la loi permet en copropriété.", href: "/droit-a-la-prise" },
  { title: "Installer une borne de recharge", description: "Le guide complet, étape par étape.", href: "/installation-borne-recharge" },
];

export default function ConseilsPage() {
  return (
    <>
      <PageHero
        eyebrow="Conseils"
        title="Comprendre avant d'installer."
        description="Des guides clairs pour prendre les bonnes décisions concernant votre projet de recharge."
      />
      <Section id="articles" className="pt-0 md:pt-0">
        <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {articles.map((a) => (
            <RevealItem key={a.href}>
              <Link
                href={a.href}
                className="group flex h-full flex-col gap-2 rounded-[var(--radius-lg)] border border-ink/8 p-7 transition-all duration-300 hover:border-ink/20 hover:shadow-md"
              >
                <h2 className="font-display text-lg font-semibold tracking-tight">{a.title}</h2>
                <p className="text-sm text-muted">{a.description}</p>
                <span className="mt-3 flex items-center gap-2 text-sm font-medium text-ink">
                  Lire
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M3 8h10m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
