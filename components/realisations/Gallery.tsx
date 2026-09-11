"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { cn } from "@/lib/utils";
import { realisations } from "@/lib/content/realisations";
import type { ProjectAudience } from "@/lib/content/types";

const filters: { key: ProjectAudience | "all"; label: string }[] = [
  { key: "all", label: "Tout" },
  { key: "maison", label: "Maison" },
  { key: "copropriete", label: "Copropriété" },
  { key: "entreprise", label: "Entreprise" },
  { key: "recharge-rapide", label: "Recharge rapide" },
];

export function Gallery() {
  const [active, setActive] = useState<ProjectAudience | "all">("all");

  const filtered = useMemo(
    () => (active === "all" ? realisations : realisations.filter((r) => r.audience === active)),
    [active],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
              active === f.key ? "border-ink bg-ink text-paper" : "border-ink/15 text-ink/70 hover:border-ink/30",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((r) => (
            <motion.div
              key={r.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/realisations/${r.slug}`} className="group block">
                <PlaceholderMedia
                  src={r.coverImageSrc}
                  alt={r.title}
                  label={r.coverPlaceholderLabel}
                  ratio="4/3"
                  className="rounded-[var(--radius-lg)] transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.015]"
                />
                <div className="mt-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted">
                    {r.city ?? ""}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-ink">
                    {r.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
