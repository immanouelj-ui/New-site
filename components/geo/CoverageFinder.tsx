"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import type { City } from "@/lib/geo/types";

interface ResultCity extends City {
  path?: string;
}

export function CoverageFinder() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [results, setResults] = useState<ResultCity[]>([]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setStatus("loading");

    const { data: cities } = await supabase
      .from("evcharge_cities")
      .select("*")
      .eq("published", true)
      .or(`name.ilike.%${trimmed}%,postal_codes.cs.{${trimmed}}`)
      .limit(6);

    const withPaths: ResultCity[] = [];
    for (const city of cities ?? []) {
      const { data: department } = await supabase
        .from("evcharge_departments")
        .select("slug, region_id")
        .eq("id", city.department_id)
        .maybeSingle();
      if (!department) continue;
      const { data: region } = await supabase
        .from("evcharge_regions")
        .select("slug")
        .eq("id", department.region_id)
        .maybeSingle();
      if (!region) continue;
      withPaths.push({
        ...city,
        path: `/installation-borne-recharge/${region.slug}/${department.slug}/${city.slug}`,
      });
    }

    setResults(withPaths);
    setStatus("done");
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-ink/8 bg-paper-dim p-6 md:p-10">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">
        Trouver mon installateur
      </p>
      <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
        Vérifiez notre couverture dans votre secteur
      </h2>
      <form onSubmit={handleSearch} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ville ou code postal"
          className="flex-1 rounded-[var(--radius-md)] border border-ink/15 bg-paper px-5 py-3.5 text-ink outline-none transition-colors focus:border-ink/40"
        />
        <Button type="submit" className={status === "loading" ? "pointer-events-none opacity-60" : undefined}>
          {status === "loading" ? "Recherche…" : "Rechercher"}
        </Button>
      </form>

      {status === "done" ? (
        <div className="mt-6">
          {results.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {results.map((r) => (
                <li key={r.id}>
                  <Link
                    href={r.path!}
                    className="flex items-center justify-between rounded-[var(--radius-sm)] border border-ink/8 bg-paper px-4 py-3 text-sm transition-colors hover:border-ink/25"
                  >
                    <span className="font-medium text-ink">{r.name}</span>
                    <span className="text-muted">Voir la page locale →</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-[var(--radius-sm)] border border-dashed border-ink/15 bg-paper px-5 py-4 text-sm text-muted">
              Nous ne couvrons pas encore ce secteur de façon documentée. Contactez-nous pour
              vérifier notre disponibilité —{" "}
              <Link href="/contact" className="link-underline text-ink">
                parler à un expert
              </Link>
              .
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
