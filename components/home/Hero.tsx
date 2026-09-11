"use client";

import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ParticleField } from "./ParticleField";

const easeOut = [0.16, 1, 0.3, 1] as const;

const reassurance = [
  "Installateurs qualifiés IRVE",
  "Installation clé en main",
  "Devis transparent",
  "Garantie sur l'installation",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.1, ease: easeOut },
  }),
};

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-paper pb-16 pt-40 md:pb-24">
      <ParticleField className="pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,91,253,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />

      <div className="container-edge relative">
        <motion.p
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-muted"
        >
          Installation de bornes de recharge
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="font-display text-balance text-[2.75rem] font-semibold leading-[1.03] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          Votre recharge.
          <br />
          Pensée pour votre quotidien.
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-7 max-w-xl text-balance text-lg leading-relaxed text-muted md:text-xl"
        >
          Installation de bornes de recharge à domicile, en copropriété et en entreprise. Étude,
          matériel, installation et accompagnement : nous nous occupons de tout.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="/simulateur">Estimer mon projet</Button>
          <Button href="/solutions" variant="secondary">
            Découvrir nos solutions
          </Button>
        </motion.div>

        <motion.ul
          custom={4}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink/8 pt-7"
        >
          {reassurance.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-ink/70">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-accent">
                <path
                  d="M3 8.5 6.2 11.5 13 4.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {item}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
