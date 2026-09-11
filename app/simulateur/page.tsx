import type { Metadata } from "next";
import { Simulator } from "@/components/simulateur/Simulator";

export const metadata: Metadata = {
  title: "Estimez votre installation en 2 minutes",
  description:
    "Décrivez votre projet de borne de recharge et recevez une proposition adaptée à votre installation.",
};

export default function SimulateurPage() {
  return (
    <div className="pb-28 pt-36 md:pt-44">
      <div className="container-edge">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Simulateur
          </span>
          <h1 className="font-display mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Estimez votre installation en 2 minutes
          </h1>
        </div>
        <Simulator />
      </div>
    </div>
  );
}
