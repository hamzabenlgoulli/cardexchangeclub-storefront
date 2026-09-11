# CardExchangeClub — storefront

A trading-card storefront built with Next.js 16 (App Router), React 19, TypeScript and
Tailwind CSS v4. Deploys to Vercel with no extra configuration.

## Running locally

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

To check the production output before deploying:

```bash
npm run build
npm start
```

## Deploying to Vercel

This is a standard Next.js app, so Vercel detects the framework, build command and
output directory automatically. There is nothing to configure and no environment
variables are required.

### Option A — Vercel CLI (no Git needed)

From inside this directory:

```bash
npx vercel          # first run: log in, then answer the setup prompts
npx vercel --prod   # promote to a production URL
```

### Option B — Git repository

Push this folder to GitHub, GitLab or Bitbucket, then import it at
[vercel.com/new](https://vercel.com/new).

> **Important:** if you push the *parent* folder rather than this one, set
> **Root Directory** to `cardclub` in the Vercel project settings, otherwise the build
> will not find `package.json`.

## Project structure

```
src/
  app/
    layout.tsx                  Root layout: fonts, cart provider, header/footer
    page.tsx                    Homepage
    cart/                       Cart page
    collections/[handle]/       Collection listings (SSG)
    products/[handle]/          Product detail pages (SSG)
    pages/contact/              Contact form
    pages/[slug]/               Policy pages (SSG)
  components/
    home/                       Homepage sections
    product/                    Product buy box and sticky bar
    CardArt.tsx                 Generated SVG cover art
    ...                         Header, footer, drawers, product card
  lib/
    catalog.ts                  Product and collection data
    cart.tsx                    Cart context, persisted to localStorage
    format.ts                   Currency helper and shipping threshold
```

All 51 pages are prerendered at build time.

## Swapping in real data

`src/lib/catalog.ts` is the single source of product and collection data, and the
current contents are invented sample records. Replace that module with calls to a real
commerce API (Shopify Storefront, Medusa, Stripe, etc.) and the rest of the app will
follow — every page reads through its `getProduct`, `getCollection`, `productsIn`,
`relatedTo` and `searchProducts` helpers.

Product imagery is generated at render time by `src/components/CardArt.tsx`, which
derives a deterministic card design from each product's `art` theme and title. Swap it
for `next/image` once you have real photography.

## Before going live

- Checkout is a stub: it clears the cart and shows a confirmation without taking
  payment. Wire it to a real payment provider.
- The policy pages under `/pages/*` contain placeholder text, not legal advice.
- The contact and newsletter forms update local state only; they do not send anything.
