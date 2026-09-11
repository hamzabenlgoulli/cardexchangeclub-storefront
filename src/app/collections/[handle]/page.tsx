import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionBrowser } from "@/components/CollectionBrowser";
import { COLLECTIONS, getCollection, PRODUCTS, productsIn } from "@/lib/catalog";

type Params = { params: Promise<{ handle: string }> };

const ALL = {
  handle: "all",
  title: "All Products",
  tagline: "Every sealed box, single and pre-order in the shop",
  description:
    "The full catalogue in one place. Filter by brand, availability or price to narrow things down.",
};

export function generateStaticParams() {
  return [{ handle: "all" }, ...COLLECTIONS.map((c) => ({ handle: c.handle }))];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { handle } = await params;
  const collection = handle === "all" ? ALL : getCollection(handle);
  if (!collection) return { title: "Collection not found" };
  return { title: collection.title, description: collection.description };
}

export default async function CollectionPage({ params }: Params) {
  const { handle } = await params;
  const collection = handle === "all" ? ALL : getCollection(handle);
  if (!collection) notFound();

  const products =
    handle === "all" ? PRODUCTS : productsIn(getCollection(handle)!.category);

  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="wrap py-12">
          <nav aria-label="Breadcrumb" className="text-xs text-ink-faint">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">{collection.title}</span>
          </nav>

          <h1 className="display mt-3 text-[clamp(2.5rem,6vw,4.5rem)]">
            {collection.title}
          </h1>
          <p className="mt-2 text-accent-deep">{collection.tagline}</p>
          <p className="mt-3 max-w-2xl text-ink-muted">{collection.description}</p>
        </div>
      </section>

      <div className="wrap py-10">
        <CollectionBrowser products={products} />
      </div>
    </>
  );
}
