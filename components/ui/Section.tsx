import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("relative py-24 md:py-32", dark ? "bg-ink text-paper" : "", className)}
    >
      <div className="container-edge">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "font-display text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-[2.75rem]",
          dark ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("text-balance text-lg leading-relaxed", dark ? "text-paper/70" : "text-muted")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
