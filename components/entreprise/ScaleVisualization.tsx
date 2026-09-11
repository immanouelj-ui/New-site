"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/Section";

const stages = [
  { count: "1", label: "borne", description: "Un premier point de recharge pour démarrer." },
  { count: "5", label: "bornes", description: "Les premiers salariés équipés s'organisent." },
  { count: "20", label: "bornes", description: "Un parking structuré, avec supervision centralisée." },
  { count: "100", label: "bornes", description: "Une flotte entière accompagnée au quotidien." },
  { count: "∞", label: "réseau multisite", description: "Plusieurs sites supervisés depuis une même plateforme." },
];

export function ScaleVisualization() {
  return (
    <Section id="evolution" dark>
      <SectionHeading
        dark
        eyebrow="Évolution"
        title="Une infrastructure qui grandit avec vous."
        description="D'une première borne à un réseau multisite, la même exigence technique."
      />

      <div className="mt-16 flex flex-col gap-3">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.count}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 border-t border-paper/10 py-6 first:border-t-0"
          >
            <div className="flex w-28 items-baseline gap-2 shrink-0 md:w-40">
              <span className="font-display text-3xl font-semibold text-volt md:text-4xl">
                {stage.count}
              </span>
              <span className="text-sm text-paper/50">{stage.label}</span>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: i * 0.1 + 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-px flex-1 origin-left bg-gradient-to-r from-paper/30 to-transparent"
            />
            <p className="hidden max-w-xs text-sm text-paper/60 md:block">{stage.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
