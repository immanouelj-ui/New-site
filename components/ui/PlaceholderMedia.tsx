import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Renders the real asset when `src` is supplied. Otherwise renders a
 * clearly-labelled placeholder so nobody mistakes it for a real photo.
 * Swap in a real asset by passing `src` — the layout does not change.
 */
export function PlaceholderMedia({
  src,
  alt,
  label,
  className,
  ratio = "4/5",
  icon = "image",
}: {
  src?: string;
  alt: string;
  label: string;
  className?: string;
  ratio?: string;
  icon?: "image" | "video";
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)} style={{ aspectRatio: ratio }}>
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Placeholder : ${label}`}
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 overflow-hidden border border-dashed border-ink/15 bg-[repeating-linear-gradient(135deg,rgba(10,11,13,0.035)_0px,rgba(10,11,13,0.035)_1px,transparent_1px,transparent_12px)] bg-paper-dim px-6 text-center",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <PlaceholderIcon kind={icon} />
      <span className="max-w-[220px] text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </span>
    </div>
  );
}

function PlaceholderIcon({ kind }: { kind: "image" | "video" }) {
  if (kind === "video") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-ink/25">
        <path d="M8 6.5v11l9-5.5-9-5.5Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-ink/25">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M21 15.5 16 10.5 6 20" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
