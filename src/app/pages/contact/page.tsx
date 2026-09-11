"use client";

import { useState } from "react";

const REASONS = [
  "Order status",
  "Product question",
  "Returns & refunds",
  "Authentication",
  "Something else",
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="wrap py-12">
          <h1 className="display text-[clamp(2.5rem,6vw,4.5rem)]">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-ink-muted">
            Questions about an order, a product, or grading? Send a note and a real
            collector will get back to you, usually within one business day.
          </p>
        </div>
      </section>

      <div className="wrap grid gap-12 py-14 lg:grid-cols-[1.3fr_1fr]">
        <div>
          {sent ? (
            <div className="rounded-card border border-line bg-surface p-8 text-center">
              <p className="font-display text-5xl text-accent">✓</p>
              <h2 className="display mt-3 text-3xl">Message sent</h2>
              <p className="mt-2 text-ink-muted">
                This demo form does not deliver mail, but in a live build your message
                would land with the support team here.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="btn-outline mt-5"
              >
                SEND ANOTHER
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" htmlFor="name">
                  <input id="name" name="name" required className="field" />
                </Field>
                <Field label="Email" htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="field"
                  />
                </Field>
              </div>

              <Field label="Order number (optional)" htmlFor="order">
                <input id="order" name="order" className="field" placeholder="CEC-00000" />
              </Field>

              <Field label="What can we help with?" htmlFor="reason">
                <select id="reason" name="reason" className="field">
                  {REASONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </Field>

              <Field label="Message" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="field resize-y"
                  placeholder="Tell us a bit more…"
                />
              </Field>

              <button type="submit" className="btn-solid">
                SEND MESSAGE
              </button>
            </form>
          )}
        </div>

        <aside className="space-y-4">
          <InfoCard title="Email">
            <a
              href="mailto:hello@cardexchangeclub.test"
              className="text-accent-deep hover:underline"
            >
              hello@cardexchangeclub.test
            </a>
            <p className="mt-1 text-sm text-ink-muted">Replies within one business day.</p>
          </InfoCard>

          <InfoCard title="Phone">
            <a href="tel:+15550142200" className="text-accent-deep hover:underline">
              +1 (555) 014-2200
            </a>
            <p className="mt-1 text-sm text-ink-muted">Mon–Fri, 9am–6pm CT.</p>
          </InfoCard>

          <InfoCard title="Address">
            <p className="text-ink-muted">
              1420 Collector Way
              <br />
              Kansas City, KS 66106
            </p>
          </InfoCard>

          <InfoCard title="Before you write">
            <ul className="space-y-1.5 text-sm text-ink-muted">
              <li>· Tracking emails land within 24 hours of dispatch.</li>
              <li>· Unopened items can be returned for 30 days.</li>
              <li>· Pre-orders ship on the set&apos;s release date.</li>
            </ul>
          </InfoCard>
        </aside>
      </div>
    </>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-card border border-line bg-surface p-5">
      <h2 className="font-display text-lg tracking-[0.08em]">{title}</h2>
      <div className="mt-2">{children}</div>
    </div>
  );
}
