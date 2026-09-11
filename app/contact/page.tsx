import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { brand } from "@/lib/content/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: "Parlez à un expert de votre projet de borne de recharge.",
};

export default function ContactPage() {
  return (
    <div className="pb-28 pt-36 md:pt-44">
      <div className="container-edge">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Contact
            </span>
            <h1 className="font-display mt-4 max-w-lg text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              Parlez à un expert.
            </h1>
            <p className="mt-6 max-w-md text-balance text-lg text-muted">
              Une question sur votre projet, un devis en cours, ou une installation existante ?
              Écrivez-nous, nous vous répondons rapidement.
            </p>
            <dl className="mt-10 flex flex-col gap-3 text-sm text-muted">
              <div className="flex gap-2">
                <dt className="font-medium text-ink">Téléphone</dt>
                <dd>{brand.phone ?? "À venir"}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium text-ink">Email</dt>
                <dd>{brand.email ?? "À venir"}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium text-ink">Zones d&apos;intervention</dt>
                <dd>{brand.addressLabel}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
