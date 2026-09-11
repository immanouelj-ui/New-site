import Link from "next/link";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import type { Borne } from "@/lib/content/types";

export function BorneCard({ borne }: { borne: Borne }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-ink/8 transition-all duration-300 hover:border-ink/20 hover:shadow-md">
      <PlaceholderMedia
        src={borne.imageSrc}
        alt={borne.name}
        label={borne.imagePlaceholderLabel}
        ratio="4/3"
        className="w-full transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.02]"
      />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">{borne.brand}</p>
          <h3 className="font-display mt-1 text-xl font-semibold tracking-tight">{borne.name}</h3>
        </div>

        <ul className="flex flex-wrap gap-2">
          {borne.features.slice(0, 3).map((f) => (
            <li
              key={f}
              className="rounded-full border border-ink/10 px-3 py-1 text-xs text-ink/70"
            >
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between border-t border-ink/8 pt-4">
          <span className="text-sm font-medium text-ink">
            {borne.priceFrom ? `À partir de ${borne.priceFrom} €` : "Sur devis"}
          </span>
          <Link
            href={`/simulateur`}
            className="link-underline text-sm font-medium text-ink"
          >
            Choisir cette borne →
          </Link>
        </div>
      </div>
    </div>
  );
}
