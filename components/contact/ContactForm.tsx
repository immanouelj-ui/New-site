"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-[var(--radius-lg)] border border-ink/8 p-8">
        <h3 className="font-display text-xl font-semibold">Message envoyé.</h3>
        <p className="mt-2 text-muted">Notre équipe revient vers vous rapidement.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <Field label="Nom complet">
        <input
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className={inputClass}
        />
      </Field>
      <Field label="Email">
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className={inputClass}
        />
      </Field>
      <Field label="Téléphone (facultatif)">
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className={inputClass}
        />
      </Field>
      <Field label="Votre message">
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={cn(inputClass, "resize-none")}
        />
      </Field>
      {status === "error" ? (
        <p className="text-sm text-red-600">Une erreur est survenue. Merci de réessayer.</p>
      ) : null}
      <Button type="submit" className={cn(status === "submitting" && "pointer-events-none opacity-60")}>
        {status === "submitting" ? "Envoi…" : "Envoyer le message"}
      </Button>
    </form>
  );
}

const inputClass =
  "rounded-[var(--radius-md)] border border-ink/15 bg-paper px-4 py-3.5 text-ink outline-none transition-colors focus:border-ink/40";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">{label}</span>
      {children}
    </label>
  );
}
