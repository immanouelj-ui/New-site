"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BorneCard } from "./BorneCard";
import { bornes, bornesFilters } from "@/lib/content/bornes";
import { cn } from "@/lib/utils";
import type { ProjectAudience } from "@/lib/content/types";

type PowerFilter = (typeof bornesFilters.powers)[number] | "all";
type AudienceFilter = ProjectAudience | "all";

export function BornesComparateur() {
  const [power, setPower] = useState<PowerFilter>("all");
  const [audience, setAudience] = useState<AudienceFilter>("all");
  const [connectedOnly, setConnectedOnly] = useState(false);
  const [solarOnly, setSolarOnly] = useState(false);

  const filtered = useMemo(() => {
    return bornes.filter((b) => {
      if (power !== "all" && b.powerKw !== power) return false;
      if (audience !== "all" && !b.audience.includes(audience)) return false;
      if (connectedOnly && !b.connected) return false;
      if (solarOnly && !b.solarCompatible) return false;
      return true;
    });
  }, [power, audience, connectedOnly, solarOnly]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <FilterGroup label="Puissance">
          <Chip active={power === "all"} onClick={() => setPower("all")}>
            Toutes
          </Chip>
          {bornesFilters.powers.map((p) => (
            <Chip key={p} active={power === p} onClick={() => setPower(p)}>
              {p} kW
            </Chip>
          ))}
        </FilterGroup>

        <FilterGroup label="Profil">
          <Chip active={audience === "all"} onClick={() => setAudience("all")}>
            Tous
          </Chip>
          {bornesFilters.audiences.map((a) => (
            <Chip key={a.key} active={audience === a.key} onClick={() => setAudience(a.key)}>
              {a.label}
            </Chip>
          ))}
        </FilterGroup>

        <FilterGroup label="Fonctionnalités">
          <Chip active={connectedOnly} onClick={() => setConnectedOnly((v) => !v)}>
            Connectée
          </Chip>
          <Chip active={solarOnly} onClick={() => setSolarOnly((v) => !v)}>
            Solaire
          </Chip>
        </FilterGroup>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((b) => (
            <motion.div
              key={b.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <BorneCard borne={b} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted">
          Aucune borne ne correspond à ces critères pour le moment.
        </p>
      ) : null}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-full border border-ink/8 bg-paper-dim p-1.5">
      <span className="pl-3 text-xs font-medium uppercase tracking-wide text-muted">{label}</span>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
        active ? "bg-ink text-paper" : "text-ink/70 hover:bg-ink/5",
      )}
    >
      {children}
    </button>
  );
}
