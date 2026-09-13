"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

const DISMISS_KEY = "evcharge-location-banner-dismissed";

interface NearestMatch {
  name: string;
  path: string;
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function LocationBanner() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"prompt" | "locating" | "found" | "none">("prompt");
  const [match, setMatch] = useState<NearestMatch | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      // localStorage unavailable — treat as not dismissed
    }
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
  }

  function useMyLocation() {
    if (!navigator.geolocation) return;
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const { data: cities } = await supabase
          .from("evcharge_cities")
          .select("id, slug, name, lat, lng, department_id")
          .eq("published", true)
          .not("lat", "is", null)
          .not("lng", "is", null);

        let nearest: { name: string; departmentId: string; slug: string; dist: number } | null =
          null;
        for (const c of cities ?? []) {
          const dist = haversineKm(latitude, longitude, c.lat, c.lng);
          if (dist <= 40 && (!nearest || dist < nearest.dist)) {
            nearest = { name: c.name, departmentId: c.department_id, slug: c.slug, dist };
          }
        }

        if (!nearest) {
          setStatus("none");
          return;
        }

        const { data: department } = await supabase
          .from("evcharge_departments")
          .select("slug, region_id")
          .eq("id", nearest.departmentId)
          .maybeSingle();
        if (!department) {
          setStatus("none");
          return;
        }
        const { data: region } = await supabase
          .from("evcharge_regions")
          .select("slug")
          .eq("id", department.region_id)
          .maybeSingle();
        if (!region) {
          setStatus("none");
          return;
        }

        setMatch({
          name: nearest.name,
          path: `/installation-borne-recharge/${region.slug}/${department.slug}/${nearest.slug}`,
        });
        setStatus("found");
      },
      () => setStatus("none"),
      { timeout: 8000 },
    );
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-sm rounded-[var(--radius-lg)] border border-ink/10 bg-paper p-4 shadow-lg sm:left-4 sm:right-auto">
      <button
        onClick={dismiss}
        aria-label="Fermer"
        className="absolute right-3 top-3 text-ink/40 transition-colors hover:text-ink"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      {status === "prompt" && (
        <>
          <p className="pr-6 text-sm font-medium text-ink">Vous cherchez une solution près de chez vous ?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={useMyLocation}
              className="rounded-full bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-accent"
            >
              Utiliser ma position
            </button>
            <Link
              href="/installation-borne-recharge"
              onClick={dismiss}
              className="rounded-full border border-ink/15 px-4 py-2 text-xs font-medium text-ink/75 transition-colors hover:border-ink/30"
            >
              Choisir ma ville
            </Link>
          </div>
        </>
      )}

      {status === "locating" && <p className="pr-6 text-sm text-muted">Recherche en cours…</p>}

      {status === "found" && match && (
        <>
          <p className="pr-6 text-sm text-ink">
            Vous êtes proche de <strong className="font-semibold">{match.name}</strong> ?
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={match.path}
              onClick={dismiss}
              className="rounded-full bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-accent"
            >
              Voir les solutions locales
            </Link>
            <button
              onClick={() => setStatus("prompt")}
              className="rounded-full border border-ink/15 px-4 py-2 text-xs font-medium text-ink/75 transition-colors hover:border-ink/30"
            >
              Ce n&apos;est pas ma ville
            </button>
          </div>
        </>
      )}

      {status === "none" && (
        <>
          <p className="pr-6 text-sm text-muted">
            Nous ne couvrons pas encore votre secteur de façon documentée.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/contact"
              onClick={dismiss}
              className="rounded-full bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-accent"
            >
              Nous contacter
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
