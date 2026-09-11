"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { isOnSale, type Product } from "@/lib/catalog";

type Sort = "featured" | "price-asc" | "price-desc" | "title-asc" | "newest";

const SORTS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "title-asc", label: "Alphabetically, A–Z" },
  { value: "newest", label: "Newest First" },
];

const PAGE_SIZE = 12;

export function CollectionBrowser({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<Sort>("featured");
  const [brands, setBrands] = useState<string[]>([]);
  const [onlySale, setOnlySale] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allBrands = useMemo(
    () => [...new Set(products.map((p) => p.brand))].sort(),
    [products],
  );

  const priceCeiling = useMemo(
    () => Math.ceil(Math.max(...products.map((p) => p.price), 0) / 100) * 100,
    [products],
  );

  const filtered = useMemo(() => {
    const list = products.filter((p) => {
      if (brands.length && !brands.includes(p.brand)) return false;
      if (onlySale && !isOnSale(p)) return false;
      if (inStock && p.stock <= 0) return false;
      if (maxPrice !== null && p.price > maxPrice) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "title-asc":
        return [...list].sort((a, b) => a.title.localeCompare(b.title));
      case "newest":
        return [...list].sort((a, b) => b.releasedAt.localeCompare(a.releasedAt));
      default:
        return list;
    }
  }, [products, brands, onlySale, inStock, maxPrice, sort]);

  const activeCount =
    brands.length + (onlySale ? 1 : 0) + (inStock ? 1 : 0) + (maxPrice !== null ? 1 : 0);

  function toggleBrand(brand: string) {
    setVisible(PAGE_SIZE);
    setBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  }

  function clearAll() {
    setBrands([]);
    setOnlySale(false);
    setInStock(false);
    setMaxPrice(null);
    setVisible(PAGE_SIZE);
  }

  const filterPanel = (
    <div className="space-y-7">
      <FilterGroup title="Brand">
        <ul className="space-y-2">
          {allBrands.map((brand) => (
            <li key={brand}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={brands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="h-4 w-4 accent-[var(--color-accent)]"
                />
                <span>{brand}</span>
                <span className="ml-auto text-xs text-ink-faint">
                  {products.filter((p) => p.brand === brand).length}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </FilterGroup>

      <FilterGroup title="Availability">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => {
              setInStock(e.target.checked);
              setVisible(PAGE_SIZE);
            }}
            className="h-4 w-4 accent-[var(--color-accent)]"
          />
          In stock only
        </label>
        <label className="mt-2 flex cursor-pointer items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={onlySale}
            onChange={(e) => {
              setOnlySale(e.target.checked);
              setVisible(PAGE_SIZE);
            }}
            className="h-4 w-4 accent-[var(--color-accent)]"
          />
          On sale
        </label>
      </FilterGroup>

      <FilterGroup title="Max price">
        <input
          type="range"
          min={50}
          max={priceCeiling}
          step={50}
          value={maxPrice ?? priceCeiling}
          onChange={(e) => {
            const v = Number(e.target.value);
            setMaxPrice(v >= priceCeiling ? null : v);
            setVisible(PAGE_SIZE);
          }}
          className="w-full accent-[var(--color-accent)]"
        />
        <p className="mt-1 text-xs text-ink-muted">
          Up to{" "}
          <strong className="text-ink">
            ${(maxPrice ?? priceCeiling).toLocaleString()}
          </strong>
        </p>
      </FilterGroup>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="text-sm text-accent-deep underline underline-offset-4"
        >
          Clear all filters ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block">{filterPanel}</aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <p className="text-sm text-ink-muted">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="rounded-[3px] border border-line px-3 py-2 text-sm lg:hidden"
            >
              Filters{activeCount > 0 && ` (${activeCount})`}
            </button>

            <label htmlFor="sort" className="sr-only">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-[3px] border border-line bg-white px-3 py-2 text-sm outline-none focus:border-ink"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-3xl">No products match those filters</p>
            <button
              type="button"
              onClick={clearAll}
              className="btn-outline mt-4"
            >
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {filtered.slice(0, visible).map((p) => (
                <ProductCard key={p.handle} product={p} />
              ))}
            </div>

            {visible < filtered.length && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="btn-outline"
                >
                  LOAD MORE ({filtered.length - visible} LEFT)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile filter sheet */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close filters"
            className="absolute inset-0 bg-ink/50"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-white">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
              <h2 className="font-display text-2xl tracking-[0.04em]">Filters</h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
                className="grid h-9 w-9 place-items-center"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">{filterPanel}</div>
            <div className="shrink-0 border-t border-line p-4">
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="btn-solid w-full"
              >
                SHOW {filtered.length} RESULTS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-display text-lg tracking-[0.08em]">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}
