"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section, Eyebrow } from "@/components/ui/Section";

const projects = [
  {
    label: "Maison",
    href: "/maison",
    description: "Recharge à domicile, garage ou extérieur.",
  },
  {
    label: "Copropriété",
    href: "/copropriete",
    description: "Infrastructure collective, droit à la prise.",
  },
  {
    label: "Entreprise",
    href: "/entreprise",
    description: "Parking, flotte, salariés et visiteurs.",
  },
  {
    label: "Recharge rapide",
    href: "/recharge-rapide",
    description: "Points de recharge haute puissance.",
  },
];

export function ProjectSelector() {
  return (
    <Section id="votre-projet">
      <Eyebrow>Votre projet</Eyebrow>
      <h2 className="font-display mt-4 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-[2.75rem]">
        Quel est votre projet ?
      </h2>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((p, i) => (
          <motion.div
            key={p.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={p.href}
              className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[var(--radius-lg)] border border-ink/8 bg-paper-dim p-6 transition-all duration-500 ease-[var(--ease-out)] hover:border-ink/20 hover:shadow-lg"
              style={{ perspective: "1000px" }}
            >
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-ink/90 via-ink/0 to-transparent opacity-0 transition-all duration-500 ease-[var(--ease-out)] group-hover:scale-y-100 group-hover:opacity-100" />
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/0 blur-3xl transition-all duration-500 group-hover:bg-accent/15" />

              <span className="relative z-10 mb-2 text-xs font-medium uppercase tracking-wide text-muted transition-colors duration-300 group-hover:text-paper/70">
                0{projects.indexOf(p) + 1}
              </span>
              <span className="relative z-10 font-display text-2xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-paper">
                {p.label}
              </span>
              <span className="relative z-10 mt-2 text-sm text-muted transition-colors duration-300 group-hover:text-paper/70">
                {p.description}
              </span>
              <span className="relative z-10 mt-5 flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-300 group-hover:text-paper">
                Découvrir
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M3 8h10m0 0-4-4m4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
