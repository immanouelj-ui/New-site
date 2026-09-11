"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/Section";

const flow = [
  { label: "Compteur", description: "Point de départ de votre installation électrique." },
  { label: "Tableau", description: "Distribution vers vos différents circuits." },
  { label: "Protection", description: "Disjoncteur et différentiel dédiés à la borne." },
  { label: "Borne", description: "Votre point de recharge, connecté ou non." },
  { label: "Voiture", description: "Votre véhicule électrique ou hybride rechargeable." },
];

export function FlowDiagram() {
  return (
    <Section id="parcours-electrique">
      <SectionHeading
        eyebrow="Le parcours électrique"
        title="De votre compteur à votre voiture."
        description="Une installation cohérente, dimensionnée à chaque étape pour votre sécurité."
      />

      <div className="relative mt-16 flex flex-col gap-8 md:flex-row md:items-center md:gap-0">
        {flow.map((item, i) => (
          <div key={item.label} className="relative flex flex-1 flex-col items-start md:items-center">
            {i < flow.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-6 top-6 hidden h-px w-full origin-left bg-ink/15 md:left-1/2 md:block"
                style={{ width: "100%" }}
              />
            )}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-paper font-display text-sm font-semibold"
            >
              {i + 1}
            </motion.div>
            <div className="mt-4 md:text-center">
              <p className="font-medium text-ink">{item.label}</p>
              <p className="mt-1 max-w-[180px] text-sm text-muted">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
