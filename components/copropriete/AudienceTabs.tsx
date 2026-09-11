"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Audience = "coproprietaire" | "syndic" | "conseil-syndical";

const tabs: { key: Audience; label: string }[] = [
  { key: "coproprietaire", label: "Je suis copropriétaire" },
  { key: "syndic", label: "Je suis syndic" },
  { key: "conseil-syndical", label: "Je suis membre du conseil syndical" },
];

const content: Record<Audience, { title: string; points: string[] }> = {
  coproprietaire: {
    title: "Faites valoir votre droit à la prise",
    points: [
      "Vous pouvez demander l'installation d'une borne à vos frais, sur votre place de stationnement.",
      "Nous préparons le dossier technique à présenter à votre syndic et à l'assemblée générale.",
      "L'installation reste évolutive si d'autres copropriétaires souhaitent se raccorder ensuite.",
    ],
  },
  syndic: {
    title: "Un interlocuteur unique pour votre copropriété",
    points: [
      "Nous accompagnons le syndic dans la présentation du projet en assemblée générale.",
      "Étude technique complète de l'infrastructure collective, en une seule fois.",
      "Une solution évolutive : de la première borne à l'équipement complet du parking.",
    ],
  },
  "conseil-syndical": {
    title: "Un projet clair à présenter aux copropriétaires",
    points: [
      "Un dossier pédagogique pour expliquer le projet et son financement au conseil syndical.",
      "Une infrastructure collective pensée pour anticiper les besoins futurs.",
      "Un accompagnement sur les aides mobilisables pour la copropriété.",
    ],
  },
};

export function AudienceTabs() {
  const [active, setActive] = useState<Audience>("coproprietaire");

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300",
              active === tab.key
                ? "border-ink bg-ink text-paper"
                : "border-ink/15 text-ink/70 hover:border-ink/30",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative mt-10 min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {content[active].title}
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {content[active].points.map((p) => (
                <li key={p} className="flex gap-3 text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
