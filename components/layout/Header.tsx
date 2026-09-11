"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { mainNav, solutionsNav } from "@/lib/content/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "relative z-50 mx-auto flex items-center justify-between transition-all duration-500 ease-[var(--ease-out)]",
          scrolled || open
            ? "mt-3 max-w-[1120px] rounded-full border border-ink/8 bg-paper/80 px-5 py-2.5 shadow-md backdrop-blur-xl"
            : "mt-0 max-w-[1360px] px-5 py-5 md:px-10",
        )}
        style={{ marginInline: "auto" }}
      >
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) =>
            item.label === "Solutions" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:text-ink"
                >
                  {item.label}
                  <svg width="10" height="10" viewBox="0 0 12 12" className="mt-px opacity-60">
                    <path d="m2 4 4 4 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" />
                  </svg>
                </Link>
                <AnimatePresence>
                  {solutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3"
                    >
                      <div className="rounded-2xl border border-ink/8 bg-paper p-2 shadow-lg">
                        {solutionsNav.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            className="flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-colors hover:bg-paper-dim"
                          >
                            <span className="text-sm font-medium text-ink">{s.label}</span>
                            <span className="text-xs text-muted">{s.description}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden md:block">
          <Button href="/simulateur" className="!px-5 !py-2.5 text-sm">
            Estimer mon projet
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          <div className="relative h-3.5 w-4">
            <span
              className={cn(
                "absolute left-0 top-0 h-[1.5px] w-full bg-ink transition-all duration-300",
                open && "top-1/2 -translate-y-1/2 rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-[1.5px] w-full bg-ink transition-all duration-300",
                open && "bottom-1/2 translate-y-1/2 -rotate-45",
              )}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-40 flex h-dvh flex-col bg-paper px-6 pb-10 pt-28 md:hidden"
          >
            <nav className="flex flex-1 flex-col gap-1">
              {mainNav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-ink/8 py-5 font-display text-3xl font-semibold tracking-tight"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-col gap-3"
            >
              <Button href="/simulateur" className="w-full" onClick={() => setOpen(false)}>
                Estimer mon projet
              </Button>
              <Button href="/contact" variant="secondary" className="w-full" onClick={() => setOpen(false)}>
                Parler à un expert
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
