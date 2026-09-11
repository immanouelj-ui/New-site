import Link from "next/link";
import { brand } from "@/lib/content/brand";
import { cn } from "@/lib/utils";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight",
        dark ? "text-paper" : "text-ink",
        className,
      )}
      aria-label={`${brand.name} — accueil`}
    >
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full",
          dark ? "bg-paper text-ink" : "bg-ink text-paper",
        )}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="currentColor" />
        </svg>
      </span>
      {brand.name}
    </Link>
  );
}
