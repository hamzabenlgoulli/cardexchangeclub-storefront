import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Section = { heading: string; body: string[] };
type Doc = { title: string; intro: string; sections: Section[] };

/**
 * Plain-language placeholder policies for the demo storefront. Replace these
 * with counsel-reviewed copy before running a real shop.
 */
const DOCS: Record<string, Doc> = {
  "shipping-policy": {
    title: "Shipping Policy",
    intro:
      "How and when orders leave our facility, what it costs, and what to expect once a parcel is moving.",
    sections: [
      {
        heading: "Processing time",
        body: [
          "In-stock orders are picked and packed within one business day. Orders placed after 2pm CT on a Friday begin processing the following Monday.",
          "Pre-orders are held until the product's release date and then ship in the order they were placed.",
        ],
      },
      {
        heading: "Rates",
        body: [
          "Shipping is free on orders over $75. Below that threshold a flat rate of $9.95 applies within the contiguous United States.",
          "Sealed cases ship double-boxed and are insured for their full value at no extra cost.",
        ],
      },
      {
        heading: "Tracking",
        body: [
          "A tracking number is emailed as soon as the label is scanned by the carrier. Tracking can take up to 24 hours to show its first movement.",
          "If tracking has not updated after three business days, contact us and we will open a trace with the carrier.",
        ],
      },
      {
        heading: "Damaged or lost parcels",
        body: [
          "Photograph the packaging and contents before unpacking further, then contact us within 48 hours of delivery so we can file a claim.",
        ],
      },
    ],
  },
  returns: {
    title: "Returns & Refunds",
    intro:
      "Unopened items can come back within thirty days. Here is how the process works and what is excluded.",
    sections: [
      {
        heading: "Return window",
        body: [
          "Sealed, unopened product can be returned within 30 days of delivery for a full refund of the item price.",
          "Return shipping is covered by us when the item arrived damaged, incorrect, or not as described. Otherwise the buyer covers return postage.",
        ],
      },
      {
        heading: "What cannot be returned",
        body: [
          "Opened sealed product cannot be returned, since pull rates cannot be verified once a box has been broken.",
          "Single cards are final sale unless the condition differs materially from the listing description.",
        ],
      },
      {
        heading: "Refund timing",
        body: [
          "Refunds are issued to the original payment method within three business days of the return arriving and passing inspection.",
          "Your bank may take a further five to ten days to post the credit.",
        ],
      },
    ],
  },
  "track-order": {
    title: "Track Your Order",
    intro: "Find out where your parcel is and what each tracking status means.",
    sections: [
      {
        heading: "Finding your tracking number",
        body: [
          "Your tracking number is in the dispatch email sent when the label is created. Check spam if you cannot find it.",
          "Entering that number on the carrier's site gives the most current status.",
        ],
      },
      {
        heading: "Understanding the statuses",
        body: [
          "Label created means we have packed the order and the carrier has not yet collected it.",
          "In transit means the parcel is moving between facilities. Gaps of a day or two between scans are normal.",
          "Out for delivery means it is on a vehicle and should arrive the same day.",
        ],
      },
      {
        heading: "Still stuck?",
        body: [
          "If nothing has changed for three business days, get in touch with your order number and we will chase it.",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro:
      "What information this site collects, why it is collected, and the choices you have.",
    sections: [
      {
        heading: "What we collect",
        body: [
          "Order details such as your name, delivery address, email and the items purchased, which are needed to fulfil and support your order.",
          "Basic analytics about how pages are used, which help us understand what needs improving.",
        ],
      },
      {
        heading: "How it is used",
        body: [
          "To process orders, provide support, and send transactional email about purchases.",
          "Marketing email is only sent if you opt in, and every message includes an unsubscribe link.",
        ],
      },
      {
        heading: "Sharing",
        body: [
          "Information is shared with payment processors and shipping carriers strictly as needed to complete your order. It is never sold.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "You can request a copy of your data or ask for it to be deleted by contacting us. Deletion requests are honoured except where records must be kept for tax purposes.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    intro: "The ground rules for buying from this store.",
    sections: [
      {
        heading: "Orders and pricing",
        body: [
          "Placing an order is an offer to buy. We accept it when the order ships. If an item is mispriced or out of stock we will contact you before charging.",
          "Prices are shown in US dollars and include tax where applicable.",
        ],
      },
      {
        heading: "Pre-orders",
        body: [
          "Pre-order pricing is locked at the time of purchase. Release dates are set by the manufacturer and can move.",
          "You may cancel a pre-order for a full refund any time before it ships.",
        ],
      },
      {
        heading: "Product condition",
        body: [
          "Sealed product is sold as received from distribution. We do not search, weigh, or reseal boxes.",
          "Single-card condition grades reflect our honest assessment, and photographs form part of the description.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "Our liability for any order is limited to the amount you paid for it. Nothing here limits rights you have under applicable consumer law.",
        ],
      },
    ],
  },
};

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(DOCS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const doc = DOCS[slug];
  if (!doc) return { title: "Page not found" };
  return { title: doc.title, description: doc.intro };
}

export default async function PolicyPage({ params }: Params) {
  const { slug } = await params;
  const doc = DOCS[slug];
  if (!doc) notFound();

  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="wrap py-12">
          <nav aria-label="Breadcrumb" className="text-xs text-ink-faint">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">{doc.title}</span>
          </nav>

          <h1 className="display mt-3 text-[clamp(2.5rem,6vw,4.5rem)]">{doc.title}</h1>
          <p className="mt-3 max-w-2xl text-ink-muted">{doc.intro}</p>
        </div>
      </section>

      <article className="wrap max-w-3xl py-14">
        {doc.sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="font-display text-2xl tracking-[0.06em]">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-relaxed text-ink-muted">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <div className="rounded-card border border-line bg-surface p-6">
          <p className="text-sm text-ink-muted">
            This is placeholder policy text for a demo storefront and is not legal
            advice. Still have a question?{" "}
            <Link
              href="/pages/contact"
              className="font-medium text-accent-deep underline underline-offset-4"
            >
              Contact us
            </Link>
            .
          </p>
        </div>
      </article>
    </>
  );
}
