"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CardArt } from "./CardArt";
import { COLLECTIONS, searchProducts } from "@/lib/catalog";
import { money } from "@/lib/format";
import { useScrollLock } from "@/lib/useScrollLock";

export function SearchDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchProducts(query), [query]);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close search"
        className="absolute inset-0 bg-ink/50"
        onClick={onClose}
      />

      <div className="absolute inset-x-0 top-0 max-h-[85vh] overflow-y-auto bg-white">
        <div className="wrap py-5">
          <div className="flex items-center gap-3 border-b border-line pb-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="shrink-0 text-ink-faint"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>

            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for boxes, singles, sets…"
              className="flex-1 bg-transparent py-2 text-lg outline-none placeholder:text-ink-faint"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-sm text-ink-muted hover:text-ink"
              >
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="grid h-9 w-9 place-items-center rounded-[3px] hover:bg-surface"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {!query && (
            <div className="py-6">
              <p className="eyebrow mb-3">Browse collections</p>
              <div className="flex flex-wrap gap-2">
                {COLLECTIONS.map((c) => (
                  <Link
                    key={c.handle}
                    href={`/collections/${c.handle}`}
                    onClick={onClose}
                    className="rounded-[3px] border border-line px-3 py-2 text-sm hover:bg-surface"
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <p className="py-10 text-center text-ink-muted">
              No matches for “{query}”. Try a set name, a sport, or a brand.
            </p>
          )}

          {results.length > 0 && (
            <div className="py-5">
              <p className="eyebrow mb-3">Products</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {results.map((p) => (
                  <li key={p.handle}>
                    <Link
                      href={`/products/${p.handle}`}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-card border border-line p-2 hover:bg-surface"
                    >
                      <CardArt
                        theme={p.art}
                        title={p.title}
                        className="h-14 w-14 shrink-0 rounded-[3px]"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-2 block text-sm font-medium">
                          {p.title}
                        </span>
                        <span className="mt-0.5 block font-display text-base tracking-wide">
                          {money(p.price)}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href="/collections/all"
                onClick={onClose}
                className="mt-4 inline-block text-sm font-medium text-accent-deep underline underline-offset-4"
              >
                View all products →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
