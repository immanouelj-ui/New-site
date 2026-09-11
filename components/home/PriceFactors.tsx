"use client";

import { motion } from "framer-motion";
import { priceFactors } from "@/lib/content/prix";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function PriceFactors({ showCta = true }: { showCta?: boolean }) {
  return (
    <Section id="prix">
      <SectionHeading
        eyebrow="Prix"
        title="Combien coûte l'installation d'une borne ?"
        description="Le prix dépend de plusieurs facteurs propres à votre installation. Nous établissons un devis après étude — jamais un tarif générique."
      />

      <div className="mt-16 flex flex-wrap items-stretch gap-3 md:flex-nowrap">
        {priceFactors.map((factor, i) => (
          <motion.div
            key={factor.key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-1 flex-col gap-3 rounded-[var(--radius-md)] border border-ink/8 bg-paper-dim p-5"
          >
            <span className="font-display text-sm font-semibold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-medium text-ink">{factor.label}</span>
            <span className="text-sm leading-relaxed text-muted">{factor.description}</span>
            <span className="mt-auto pt-2 text-xs font-medium uppercase tracking-wide text-ink/40">
              {factor.rangeLabel ?? "Variable selon le projet"}
            </span>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 max-w-xl text-sm text-muted">
        Aucune fourchette de prix n&apos;est affichée tant qu&apos;elle n&apos;est pas confirmée.
        Estimez votre projet pour recevoir une proposition adaptée à votre situation.
      </p>

      {showCta ? (
        <div className="mt-8">
          <Button href="/simulateur">Estimer mon projet</Button>
        </div>
      ) : null}
    </Section>
  );
}
