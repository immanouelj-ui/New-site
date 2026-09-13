import { brand } from "@/lib/content/brand";
import type { Faq } from "./types";

const SITE_URL = "https://example.com";

// Only real, non-fabricated fields are included. No LocalBusiness schema is
// emitted anywhere — that would require a real verifiable address/phone we
// don't have yet.

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: SITE_URL,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: SITE_URL,
  };
}

export function serviceJsonLd({
  name,
  description,
  areaServed,
}: {
  name: string;
  description: string;
  areaServed: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Installation de borne de recharge pour véhicule électrique",
    name,
    description,
    areaServed,
    provider: {
      "@type": "Organization",
      name: brand.name,
      url: SITE_URL,
    },
  };
}

// Only emit FAQPage when every question genuinely has a real, non-empty
// answer — never generated from a template with placeholder text.
export function faqJsonLd(faqs: Faq[]) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
