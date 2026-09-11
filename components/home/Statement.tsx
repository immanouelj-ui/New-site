"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Statement({
  text,
  dark = false,
}: {
  text: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const blur = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <section className={dark ? "bg-ink text-paper" : "bg-paper text-ink"}>
      <div className="container-edge flex min-h-[60vh] items-center py-24 md:min-h-[70vh]">
        <motion.p
          ref={ref}
          style={{ opacity, filter }}
          className="max-w-3xl text-balance font-display text-3xl font-medium leading-[1.25] tracking-tight md:text-5xl"
        >
          {text}
        </motion.p>
      </div>
    </section>
  );
}
