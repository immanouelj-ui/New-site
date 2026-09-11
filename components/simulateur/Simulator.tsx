"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OptionCard } from "./OptionCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  housingTypesByProject,
  initialSimulatorState,
  type SimDistance,
  type SimElectricalSetup,
  type SimPower,
  type SimProjectType,
  type SimulatorState,
} from "@/lib/simulateur/types";

const groups = ["Votre projet", "Votre véhicule", "Votre installation", "Votre estimation"];
const stepToGroup = [0, 0, 1, 1, 2, 2, 3, 3];
const TOTAL_STEPS = 8;

const projectOptions: { key: SimProjectType; label: string; description: string }[] = [
  { key: "maison", label: "Maison", description: "Recharge à domicile" },
  { key: "copropriete", label: "Copropriété", description: "Infrastructure collective" },
  { key: "entreprise", label: "Entreprise", description: "Parking ou flotte" },
  { key: "recharge-rapide", label: "Recharge rapide", description: "Point de recharge haute puissance" },
];

const powerOptions: { key: SimPower; label: string; description: string }[] = [
  { key: "7.4", label: "7,4 kW", description: "Recharge standard, monophasée" },
  { key: "11", label: "11 kW", description: "Recharge accélérée, triphasée" },
  { key: "22", label: "22 kW", description: "Recharge rapide, triphasée" },
  { key: "ne-sait-pas", label: "Je ne sais pas", description: "Nous vous conseillons" },
];

const electricalOptions: { key: SimElectricalSetup; label: string; description: string }[] = [
  { key: "recent-aux-normes", label: "Récente et aux normes", description: "Tableau électrique conforme, mis à jour" },
  { key: "ancien-a-verifier", label: "Ancienne, à vérifier", description: "Tableau électrique ancien ou incertain" },
  { key: "je-ne-sais-pas", label: "Je ne sais pas", description: "Notre étude technique le déterminera" },
];

const distanceOptions: { key: SimDistance; label: string }[] = [
  { key: "moins-5", label: "Moins de 5 mètres" },
  { key: "5-15", label: "Entre 5 et 15 mètres" },
  { key: "15-30", label: "Entre 15 et 30 mètres" },
  { key: "plus-30", label: "Plus de 30 mètres" },
];

export function Simulator() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<SimulatorState>(initialSimulatorState);
  const [direction, setDirection] = useState(1);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const housingOptions = state.projectType ? housingTypesByProject[state.projectType] : [];

  const canGoNext = useMemo(() => {
    switch (step) {
      case 0:
        return !!state.projectType;
      case 1:
        return !!state.housingType;
      case 2:
        return state.vehicle !== null && state.vehicle.trim().length > 0;
      case 3:
        return !!state.desiredPower;
      case 4:
        return !!state.electricalSetup;
      case 5:
        return !!state.distance;
      case 6:
        return true;
      case 7:
        return (
          state.contact.firstName.trim().length > 1 &&
          state.contact.email.includes("@") &&
          state.contact.postalCode.trim().length >= 4
        );
      default:
        return false;
    }
  }, [step, state]);

  function goNext() {
    if (!canGoNext) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }
  function goBack() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    setStatus("submitting");
    try {
      const fd = new FormData();
      fd.append("projectType", state.projectType ?? "");
      fd.append("housingType", state.housingType ?? "");
      fd.append("vehicle", state.vehicle ?? "");
      fd.append("desiredPower", state.desiredPower ?? "");
      fd.append("electricalSetup", state.electricalSetup ?? "");
      fd.append("distance", state.distance ?? "");
      fd.append("firstName", state.contact.firstName);
      fd.append("lastName", state.contact.lastName);
      fd.append("email", state.contact.email);
      fd.append("phone", state.contact.phone);
      fd.append("postalCode", state.contact.postalCode);
      photoFiles.forEach((f) => fd.append("photos", f));

      const res = await fetch("/api/simulateur", { method: "POST", body: fd });
      if (!res.ok) throw new Error("submit-failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <SimulatorResult state={state} />;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <ProgressHeader currentStep={step} />

      <div className="relative mt-10 min-h-[420px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && (
              <StepShell title="Quel est votre projet ?">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {projectOptions.map((o) => (
                    <OptionCard
                      key={o.key}
                      label={o.label}
                      description={o.description}
                      selected={state.projectType === o.key}
                      onClick={() =>
                        setState((s) => ({ ...s, projectType: o.key, housingType: null }))
                      }
                    />
                  ))}
                </div>
              </StepShell>
            )}

            {step === 1 && (
              <StepShell title="Précisez votre situation">
                <div className="flex flex-col gap-3">
                  {housingOptions.map((h) => (
                    <OptionCard
                      key={h}
                      label={h}
                      selected={state.housingType === h}
                      onClick={() => setState((s) => ({ ...s, housingType: h }))}
                    />
                  ))}
                </div>
              </StepShell>
            )}

            {step === 2 && (
              <StepShell title="Quel est votre véhicule ?" description="Marque et modèle, ou une estimation.">
                <input
                  type="text"
                  placeholder="Ex. Peugeot e-208, Tesla Model 3…"
                  value={state.vehicle ?? ""}
                  onChange={(e) => setState((s) => ({ ...s, vehicle: e.target.value }))}
                  className="w-full rounded-[var(--radius-md)] border border-ink/15 bg-paper px-5 py-4 text-ink outline-none transition-colors focus:border-ink/40"
                />
                <button
                  type="button"
                  onClick={() => setState((s) => ({ ...s, vehicle: "Je ne sais pas encore" }))}
                  className="mt-3 text-sm text-muted link-underline"
                >
                  Je ne sais pas encore
                </button>
              </StepShell>
            )}

            {step === 3 && (
              <StepShell title="Quelle puissance souhaitez-vous ?">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {powerOptions.map((o) => (
                    <OptionCard
                      key={o.key}
                      label={o.label}
                      description={o.description}
                      selected={state.desiredPower === o.key}
                      onClick={() => setState((s) => ({ ...s, desiredPower: o.key }))}
                    />
                  ))}
                </div>
              </StepShell>
            )}

            {step === 4 && (
              <StepShell title="Votre installation électrique">
                <div className="flex flex-col gap-3">
                  {electricalOptions.map((o) => (
                    <OptionCard
                      key={o.key}
                      label={o.label}
                      description={o.description}
                      selected={state.electricalSetup === o.key}
                      onClick={() => setState((s) => ({ ...s, electricalSetup: o.key }))}
                    />
                  ))}
                </div>
              </StepShell>
            )}

            {step === 5 && (
              <StepShell title="Distance entre le tableau électrique et la borne">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {distanceOptions.map((o) => (
                    <OptionCard
                      key={o.key}
                      label={o.label}
                      selected={state.distance === o.key}
                      onClick={() => setState((s) => ({ ...s, distance: o.key }))}
                    />
                  ))}
                </div>
              </StepShell>
            )}

            {step === 6 && (
              <StepShell
                title="Photos du site (facultatif)"
                description="Tableau électrique, emplacement souhaité : elles aident à affiner votre proposition."
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files ?? []);
                    setPhotoFiles((prev) => [...prev, ...files]);
                    setState((s) => ({ ...s, photosCount: s.photosCount + files.length }));
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-[var(--radius-md)] border border-dashed border-ink/20 bg-paper-dim py-12 text-center transition-colors hover:border-ink/40"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-ink/40">
                    <path
                      d="M12 16V4m0 0-4 4m4-4 4 4M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm font-medium text-ink">Ajouter des photos</span>
                  <span className="text-xs text-muted">
                    {photoFiles.length > 0 ? `${photoFiles.length} photo(s) ajoutée(s)` : "JPG, PNG"}
                  </span>
                </button>
              </StepShell>
            )}

            {step === 7 && (
              <StepShell title="Vos coordonnées" description="Pour vous envoyer votre proposition.">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <TextField
                    label="Prénom"
                    value={state.contact.firstName}
                    onChange={(v) => setState((s) => ({ ...s, contact: { ...s.contact, firstName: v } }))}
                  />
                  <TextField
                    label="Nom"
                    value={state.contact.lastName}
                    onChange={(v) => setState((s) => ({ ...s, contact: { ...s.contact, lastName: v } }))}
                  />
                  <TextField
                    label="Email"
                    type="email"
                    value={state.contact.email}
                    onChange={(v) => setState((s) => ({ ...s, contact: { ...s.contact, email: v } }))}
                  />
                  <TextField
                    label="Téléphone"
                    type="tel"
                    value={state.contact.phone}
                    onChange={(v) => setState((s) => ({ ...s, contact: { ...s.contact, phone: v } }))}
                  />
                  <TextField
                    label="Code postal"
                    value={state.contact.postalCode}
                    onChange={(v) => setState((s) => ({ ...s, contact: { ...s.contact, postalCode: v } }))}
                    className="sm:col-span-2"
                  />
                </div>
                {status === "error" ? (
                  <p className="mt-4 text-sm text-red-600">
                    Une erreur est survenue. Merci de réessayer.
                  </p>
                ) : null}
              </StepShell>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-ink/8 pt-6">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="text-sm font-medium text-ink/60 transition-colors hover:text-ink disabled:opacity-0"
        >
          Retour
        </button>
        {step < TOTAL_STEPS - 1 ? (
          <Button
            onClick={goNext}
            className={cn(!canGoNext && "pointer-events-none opacity-40")}
          >
            Continuer
          </Button>
        ) : (
          <Button onClick={handleSubmit} className={cn((!canGoNext || status === "submitting") && "pointer-events-none opacity-40")}>
            {status === "submitting" ? "Envoi…" : "Recevoir mon estimation"}
          </Button>
        )}
      </div>
    </div>
  );
}

function ProgressHeader({ currentStep }: { currentStep: number }) {
  const activeGroup = stepToGroup[currentStep];
  const percent = ((currentStep + 1) / TOTAL_STEPS) * 100;

  return (
    <div>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {groups.map((g, i) => (
          <span
            key={g}
            className={cn(
              "flex items-center gap-2 text-xs font-semibold uppercase tracking-wide transition-colors duration-300",
              i === activeGroup ? "text-ink" : i < activeGroup ? "text-accent" : "text-ink/30",
            )}
          >
            {String(i + 1).padStart(2, "0")} — {g}
          </span>
        ))}
      </div>
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-ink/8">
        <motion.div
          className="h-full rounded-full bg-accent"
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function StepShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {description ? <p className="mt-2 text-muted">{description}</p> : null}
      <div className="mt-8">{children}</div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span className="text-xs font-medium uppercase tracking-wide text-muted">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-[var(--radius-md)] border border-ink/15 bg-paper px-4 py-3.5 text-ink outline-none transition-colors focus:border-ink/40"
      />
    </label>
  );
}

function SimulatorResult({ state }: { state: SimulatorState }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto flex max-w-xl flex-col items-center gap-6 py-10 text-center"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M4 12.5 9.5 18 20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h2 className="font-display text-3xl font-semibold tracking-tight">Demande bien reçue.</h2>
      <p className="text-balance text-muted">
        Merci {state.contact.firstName || ""}. Votre projet a été transmis à notre équipe. Un
        expert revient vers vous avec une proposition adaptée à votre installation
        {state.electricalSetup === "je-ne-sais-pas" ? " après une étude technique" : ""}.
      </p>
      <Button href="/">Retour à l&apos;accueil</Button>
    </motion.div>
  );
}
