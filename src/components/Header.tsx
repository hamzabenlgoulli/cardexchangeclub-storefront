"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useScrollLock } from "@/lib/useScrollLock";
import { BrandMark } from "./BrandMark";
import { SearchDrawer } from "./SearchDrawer";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const NAV: NavItem[] = [
  {
    label: "Pokémon",
    href: "/collections/pokemon",
    children: [
      { label: "All Pokémon", href: "/collections/pokemon" },
      { label: "Booster Boxes", href: "/collections/boxes-cases" },
      { label: "Pre-Orders", href: "/collections/pre-orders" },
    ],
  },
  {
    label: "Magic & TCG",
    href: "/collections/magic",
    children: [
      { label: "All Magic", href: "/collections/magic" },
      { label: "Collector Boosters", href: "/collections/boxes-cases" },
      { label: "Singles", href: "/collections/singles-autographs" },
    ],
  },
  {
    label: "Sports Cards",
    href: "/collections/sports-cards",
    children: [
      { label: "All Sports Cards", href: "/collections/sports-cards" },
      { label: "Boxes & Cases", href: "/collections/boxes-cases" },
      { label: "Singles & Autographs", href: "/collections/singles-autographs" },
    ],
  },
  { label: "Pre-Orders", href: "/collections/pre-orders" },
  { label: "All Products", href: "/collections/all" },
  { label: "Contact", href: "/pages/contact" },
];

export function Header() {
  const { count, open } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useScrollLock(mobileOpen);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="wrap flex h-16 items-center gap-4">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="-ml-2 grid h-10 w-10 shrink-0 place-items-center lg:hidden"
          >
            <MenuIcon />
          </button>

          <Link href="/" className="flex min-w-0 items-center gap-2">
            <BrandMark compact />
          </Link>

          <nav className="ml-6 hidden flex-1 items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-[3px] px-3 py-2 text-sm font-medium transition-colors hover:bg-surface"
                >
                  {item.label}
                  {item.children && <ChevronIcon className="h-3 w-3 opacity-50" />}
                </Link>

                {item.children && (
                  <div className="invisible absolute left-0 top-full w-60 translate-y-1 rounded-card border border-line bg-white p-2 opacity-0 shadow-[0_14px_40px_rgba(22,24,29,0.12)] transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href + child.label}
                        href={child.href}
                        className="block rounded-[3px] px-3 py-2 text-sm hover:bg-surface hover:text-accent-deep"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-[3px] hover:bg-surface"
            >
              <SearchIcon />
            </button>

            <Link
              href="/pages/contact"
              aria-label="Account"
              className="hidden h-10 w-10 place-items-center rounded-[3px] hover:bg-surface sm:grid"
            >
              <UserIcon />
            </Link>

            <button
              type="button"
              aria-label={`Cart, ${count} items`}
              onClick={open}
              className="relative grid h-10 w-10 place-items-center rounded-[3px] hover:bg-surface"
            >
              <BagIcon />
              {count > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-ink">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-ink/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-white">
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <BrandMark compact />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="grid h-10 w-10 place-items-center"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-2">
              {NAV.map((item) => (
                <div key={item.label} className="border-b border-line/60">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 px-3 py-4 font-display text-lg tracking-[0.06em]"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        aria-label={`Show ${item.label} submenu`}
                        onClick={() =>
                          setExpanded(expanded === item.label ? null : item.label)
                        }
                        className="grid h-12 w-12 place-items-center"
                      >
                        <ChevronIcon
                          className={`h-4 w-4 transition-transform ${
                            expanded === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {item.children && expanded === item.label && (
                    <div className="pb-2 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href + child.label}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2.5 text-sm text-ink-muted"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

/* ---- Icons ---- */

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 8h14l-1 12H6L5 8z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
