import { buildUrlset, xmlResponse } from "@/lib/sitemap-xml";

export const revalidate = 3600;

const servicePaths = [
  "/",
  "/solutions",
  "/maison",
  "/copropriete",
  "/entreprise",
  "/recharge-rapide",
  "/bornes",
  "/borne-7kw",
  "/borne-11kw",
  "/borne-22kw",
  "/prix",
  "/aides",
  "/realisations",
  "/avis",
  "/simulateur",
  "/contact",
];

export async function GET() {
  return xmlResponse(buildUrlset(servicePaths.map((loc) => ({ loc }))));
}
