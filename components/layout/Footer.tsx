import Link from "next/link";
import { Logo } from "./Logo";
import { footerNav } from "@/lib/content/nav";
import { brand } from "@/lib/content/brand";

export function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-paper">
      <div className="container-edge py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {brand.tagline}. Installation clé en main de bornes de recharge pour véhicules
              électriques — maison, copropriété et entreprise.
            </p>
            <p className="text-xs text-muted">{brand.addressLabel}</p>
          </div>

          <FooterColumn title="Solutions" items={footerNav.solutions} />
          <FooterColumn title="Entreprise" items={footerNav.entreprise} />
          <FooterColumn title="Conseils" items={footerNav.conseils} />
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink/8 pt-8 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="link-underline">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="link-underline">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: readonly { label: string; href: string; description?: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink/50">{title}</span>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="link-underline text-sm text-ink/75">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
