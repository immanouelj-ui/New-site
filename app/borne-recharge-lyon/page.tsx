import type { Metadata } from "next";
import { LocalPageTemplate } from "@/components/local/LocalPageTemplate";
import { cities } from "@/lib/content/cities";

const city = cities.find((c) => c.slug === "borne-recharge-lyon")!;

export const metadata: Metadata = {
  title: `Borne de recharge à ${city.city}`,
  description: city.intro,
};

export default function BorneRechargeLyonPage() {
  return <LocalPageTemplate city={city} />;
}
