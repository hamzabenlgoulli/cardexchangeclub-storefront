import Link from "next/link";
import { BrandMark } from "./BrandMark";
import {
  ADDRESS,
  EMAIL,
  LEGAL_NAME,
  PHONE,
  PHONE_DISPLAY,
  SITE_NAME,
  SUPPORT_HOURS,
} from "@/lib/site";

const COLLECTION_LINKS = [
  { label: "Sports Cards", href: "/collections/sports-cards" },
  { label: "Pokémon TCG", href: "/collections/pokemon" },
  { label: "Magic & TCG", href: "/collections/magic" },
  { label: "Singles & Autographs", href: "/collections/singles-autographs" },
  { label: "Boxes & Cases", href: "/collections/boxes-cases" },
  { label: "All Products", href: "/collections/all" },
];

const SERVICE_LINKS = [
  { label: "Contact Us", href: "/pages/contact" },
  { label: "Track Order", href: "/pages/track-order" },
  { label: "Shipping Policy", href: "/pages/shipping-policy" },
  { label: "Returns & Refunds", href: "/pages/returns" },
  { label: "Terms & Conditions", href: "/pages/terms" },
  { label: "Privacy Policy", href: "/pages/privacy" },
];

const PAYMENTS = ["VISA", "Mastercard", "AmEx", "Discover", "PayPal"];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <BrandMark />
          <p className="mt-4 max-w-xs text-ink-muted">
            Authentic sports cards and gaming collectibles. Competitive prices, fast
            shipping, and dedicated service for collectors.
          </p>
          <p className="mt-3 max-w-xs text-xs text-ink-faint">
            {SITE_NAME} is managed by {LEGAL_NAME}.
          </p>
        </div>

        <FooterColumn title="Collections" links={COLLECTION_LINKS} />
        <FooterColumn title="Customer Service" links={SERVICE_LINKS} />

        <div>
          <h3 className="font-display text-xl tracking-[0.08em]">Contact</h3>
          <ul className="mt-4 space-y-2 text-ink-muted">
            <li>
              <a href={`tel:${PHONE}`} className="hover:text-accent-deep">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="hover:text-accent-deep">
                {EMAIL}
              </a>
            </li>
            <li>{ADDRESS}</li>
            <li className="pt-1 text-sm text-ink-faint">Support: {SUPPORT_HOURS}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-col items-center justify-between gap-4 py-5 sm:flex-row">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} {SITE_NAME}. Managed by {LEGAL_NAME}.
          </p>
          <ul className="flex flex-wrap items-center gap-2">
            {PAYMENTS.map((p) => (
              <li
                key={p}
                className="rounded-[3px] border border-line bg-white px-2.5 py-1 text-[10px] font-semibold tracking-wide text-ink-muted"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-xl tracking-[0.08em]">{title}</h3>
      <ul className="mt-4 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-ink-muted hover:text-accent-deep">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
