"use client";

import { cn } from "@/lib/utils";

export function OptionCard({
  label,
  description,
  selected,
  onClick,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group flex w-full flex-col items-start gap-1 rounded-[var(--radius-md)] border p-5 text-left transition-all duration-300 ease-[var(--ease-out)]",
        selected
          ? "border-ink bg-ink text-paper shadow-md"
          : "border-ink/12 bg-paper hover:border-ink/30 hover:-translate-y-0.5",
      )}
    >
      <span className="flex w-full items-center justify-between gap-3">
        <span className="font-medium">{label}</span>
        <span
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
            selected ? "border-paper bg-paper" : "border-ink/25",
          )}
        >
          {selected ? (
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8.5 6.2 11.5 13 4.5"
                stroke="var(--ink)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </span>
      </span>
      {description ? (
        <span className={cn("text-sm", selected ? "text-paper/70" : "text-muted")}>
          {description}
        </span>
      ) : null}
    </button>
  );
}
