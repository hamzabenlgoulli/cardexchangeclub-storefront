import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { Stars } from "@/components/Stars";
import { TrustRow } from "@/components/TrustRow";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { getProduct, PRODUCTS, relatedTo } from "@/lib/catalog";

type Params = { params: Promise<{ handle: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return { title: "Product not found" };
  return { title: product.title, description: product.blurb };
}

const PRODUCT_REVIEWS = [
  {
    quote: "Shipped the same day and the seal was untouched. Exactly as described.",
    name: "J. Martinez",
    place: "Dallas",
  },
  {
    quote: "Fair price against what I see elsewhere, and the packaging was solid.",
    name: "T. Williams",
    place: "Chicago",
  },
  {
    quote: "Third order from here. Consistent on condition notes and turnaround.",
    name: "R. Johnson",
    place: "Atlanta",
  },
];

export default async function ProductPage({ params }: Params) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  const related = relatedTo(product);

  return (
    <>
      <div className="wrap pb-24 pt-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/collections/all" className="hover:text-ink">
            All Products
          </Link>
          <span className="mx-2">/</span>
          <span className="line-clamp-1 inline text-ink-muted">{product.title}</span>
        </nav>

        <ProductPurchase product={product} />

        <section className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="display text-3xl">Product Details</h2>

            <h3 className="mt-6 font-display text-lg tracking-[0.08em]">
              Configuration
            </h3>
            <p className="mt-1 text-ink-muted">{product.configuration}</p>

            <h3 className="mt-6 font-display text-lg tracking-[0.08em]">Highlights</h3>
            <ul className="mt-2 space-y-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-ink-muted">
                  <span className="mt-0.5 shrink-0 text-accent-deep" aria-hidden>
                    ◆
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 font-display text-lg tracking-[0.08em]">Description</h3>
            <p className="mt-2 leading-relaxed text-ink-muted">{product.description}</p>
          </div>

          <aside className="space-y-4">
            <div className="rounded-card border border-line bg-surface p-6">
              <h3 className="font-display text-xl tracking-[0.06em]">
                Questions about this product?
              </h3>
              <p className="mt-2 text-sm text-ink-muted">
                Our team can help with grading questions, shipping timelines, or
                anything else before you buy.
              </p>
              <Link href="/pages/contact" className="btn-solid mt-4 w-full">
                GET IN TOUCH
              </Link>
            </div>

            <ul className="space-y-3">
              {PRODUCT_REVIEWS.map((r) => (
                <li key={r.name} className="rounded-card border border-line p-4">
                  <Stars />
                  <p className="mt-2 text-sm text-ink-muted">“{r.quote}”</p>
                  <p className="mt-2 text-xs text-ink-faint">
                    {r.name}, {r.place} ·{" "}
                    <span className="text-accent-deep">✓ Verified</span>
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </section>
      </div>

      <TrustRow />

      {related.length > 0 && (
        <section className="wrap py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="display text-[clamp(1.9rem,4vw,3rem)]">You May Also Like</h2>
            <Link
              href="/collections/all"
              className="shrink-0 text-sm font-medium text-accent-deep underline underline-offset-4"
            >
              View all →
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
