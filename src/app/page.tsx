import { CategoryTabs } from "@/components/home/CategoryTabs";
import { FeatureSplit } from "@/components/home/FeatureSplit";
import { Hero } from "@/components/home/Hero";
import { Newsletter } from "@/components/home/Newsletter";
import { Reviews } from "@/components/home/Reviews";
import { TrustRow } from "@/components/TrustRow";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustRow />

      <FeatureSplit
        eyebrow="New Releases Weekly"
        headingLines={["Sports Card", "Boxes &", "Cases"]}
        body="Rip the latest releases or hold sealed product. Hobby boxes, blasters and full cases, packed and ready to ship the day you order."
        links={[{ label: "Browse Boxes", href: "/collections/boxes-cases" }]}
        art={[
          { theme: "gridiron", title: "Flagship Football Hobby" },
          { theme: "hardwood", title: "Select Basketball Hobby" },
          { theme: "diamond", title: "Chrome Baseball Hobby" },
        ]}
      />

      <FeatureSplit
        tone="dark"
        flip
        eyebrow="TCG Singles In Stock"
        headingLines={["Pokémon", "& Magic", "TCG"]}
        body="Chase a favourite, build a commander deck, or hunt vintage holos. Singles, sealed product and booster boxes across every current set."
        links={[
          { label: "Shop Pokémon", href: "/collections/pokemon" },
          { label: "Magic & TCG", href: "/collections/magic" },
        ]}
        art={[
          { theme: "ember", title: "Ember Dynasty Display" },
          { theme: "tide", title: "Celestial Rift Bundle" },
          { theme: "void", title: "Reality Fracture Collector" },
        ]}
      />

      <FeatureSplit
        eyebrow="Members Only"
        headingLines={["Join The", "Club Box", "Membership"]}
        body="One sealed box every month, chosen from the shop and shipped straight to you. Skip a month or cancel any time — no lock-in."
        links={[{ label: "Join The Club", href: "/collections/all" }]}
        art={[
          { theme: "relic", title: "Club Box Relic Drop" },
          { theme: "prism", title: "Club Box Prism Drop" },
          { theme: "verdant", title: "Club Box Verdant Drop" },
        ]}
      />

      <CategoryTabs />
      <Reviews />
      <Newsletter />
    </>
  );
}
