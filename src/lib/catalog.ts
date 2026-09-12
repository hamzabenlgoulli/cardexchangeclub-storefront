/**
 * Demo catalog. Everything here is invented sample data for the storefront
 * shell — swap this module for a real commerce API when wiring up a backend.
 */

export type Category =
  | "sports-cards"
  | "pokemon"
  | "magic"
  | "boxes-cases"
  | "singles-autographs"
  | "pre-orders";

export type Product = {
  handle: string;
  title: string;
  brand: string;
  price: number;
  /** Original price, present only when the item is discounted. */
  compareAt?: number;
  categories: Category[];
  /** Drives the generated cover art palette. */
  art: ArtTheme;
  badge?: "Pre-Order" | "Hot" | "Last One" | "New";
  stock: number;
  sku: string;
  releasedAt: string;
  blurb: string;
  configuration: string;
  highlights: string[];
  description: string;
  specs: { label: string; value: string }[];
};

export type ArtTheme =
  | "gridiron"
  | "hardwood"
  | "diamond"
  | "pitch"
  | "ember"
  | "tide"
  | "verdant"
  | "void"
  | "relic"
  | "prism";

export type Collection = {
  handle: string;
  title: string;
  tagline: string;
  description: string;
  category: Category;
};

export const COLLECTIONS: Collection[] = [
  {
    handle: "sports-cards",
    title: "Sports Cards",
    tagline: "Baseball, basketball, football & more",
    description:
      "Sealed product and single cards across every major sport, from current-season rookies to vintage cardboard.",
    category: "sports-cards",
  },
  {
    handle: "pokemon",
    title: "Pokémon TCG",
    tagline: "Booster boxes, trainer boxes & singles",
    description:
      "Modern sets, premium collections and chase singles, all stored sleeved and shipped in rigid protection.",
    category: "pokemon",
  },
  {
    handle: "magic",
    title: "Magic & Trading Card Games",
    tagline: "Play boosters, collector boxes & commander decks",
    description:
      "Draft night staples, collector boosters and preconstructed decks for the kitchen table or the competitive seat.",
    category: "magic",
  },
  {
    handle: "boxes-cases",
    title: "Boxes & Cases",
    tagline: "Hobby boxes, blasters & sealed cases",
    description:
      "Factory-sealed configurations for rippers and long-term holders. Case quantities ship double-boxed.",
    category: "boxes-cases",
  },
  {
    handle: "singles-autographs",
    title: "Singles & Autographs",
    tagline: "Rookie cards, autographs & graded slabs",
    description:
      "Hand-checked singles with honest condition notes. Every autograph ships with its certification details.",
    category: "singles-autographs",
  },
  {
    handle: "pre-orders",
    title: "Pre-Orders",
    tagline: "Lock in upcoming releases at launch pricing",
    description:
      "Reserve upcoming product before street date. Cards ship the day the set releases and nothing is charged twice.",
    category: "pre-orders",
  },
];

const SPECS_SEALED = [
  { label: "Condition", value: "Factory sealed" },
  { label: "Language", value: "English" },
  { label: "Packaging", value: "Double-boxed with corner protection" },
  { label: "Ships", value: "Same or next business day" },
];

const SPECS_SINGLE = [
  { label: "Condition", value: "Near Mint" },
  { label: "Authentication", value: "Third-party certified" },
  { label: "Language", value: "English" },
  { label: "Packaging", value: "Sleeved, toploaded, team-bagged" },
];

export const PRODUCTS: Product[] = [
  // ---------- Sealed sports product ----------
  {
    handle: "apex-flagship-football-hobby-box",
    title: "2026 Apex Flagship Football Hobby Box",
    brand: "Apex",
    price: 119.78,
    categories: ["sports-cards", "boxes-cases"],
    art: "gridiron",
    badge: "Hot",
    stock: 14,
    sku: "APX-FB-26-HOB",
    releasedAt: "2026-08-14",
    blurb: "20 packs · 12 cards per pack · one autograph or relic per box on average.",
    configuration: "12 cards per pack, 20 packs per box",
    highlights: [
      "Flagship football returns with a full rookie class and a redesigned base set.",
      "Average of one autograph or memorabilia card per hobby box.",
      "Hobby-exclusive parallels numbered as low as 1/1.",
    ],
    description:
      "The flagship football release is the backbone of the modern hobby — a deep base set, a full rookie class, and a parallel rainbow that runs from common foils all the way down to one-of-one plates. Hobby boxes carry exclusive inserts you will not find at retail, plus the best odds at on-card rookie autographs.",
    specs: SPECS_SEALED,
  },
  {
    handle: "apex-flagship-football-jumbo-box",
    title: "2026 Apex Flagship Football Jumbo Box",
    brand: "Apex",
    price: 269.97,
    categories: ["sports-cards", "boxes-cases"],
    art: "gridiron",
    stock: 8,
    sku: "APX-FB-26-JMB",
    releasedAt: "2026-08-14",
    blurb: "10 packs · 46 cards per pack · three autographs or relics per box on average.",
    configuration: "46 cards per pack, 10 packs per box",
    highlights: [
      "Three hits per box on average, up from one in the standard hobby configuration.",
      "Jumbo-only parallels and an exclusive box-topper pack.",
      "Best per-card value for set builders working the full checklist.",
    ],
    description:
      "Jumbo configurations trade pack count for pack depth. Each of the ten packs runs 46 cards deep, which makes this the most efficient way to build the base set while still chasing three hits per box on average.",
    specs: SPECS_SEALED,
  },
  {
    handle: "apex-flagship-football-hobby-case",
    title: "2026 Apex Flagship Football Hobby 12-Box Case",
    brand: "Apex",
    price: 1379.5,
    compareAt: 1620.0,
    categories: ["sports-cards", "boxes-cases"],
    art: "gridiron",
    stock: 3,
    sku: "APX-FB-26-CASE12",
    releasedAt: "2026-08-14",
    blurb: "Sealed 12-box hobby case · case-hit odds intact · ships double-boxed.",
    configuration: "12 hobby boxes per sealed case",
    highlights: [
      "Untouched factory case with the shrink and case code intact.",
      "Case-level collation gives the strongest shot at short-printed hits.",
      "Ships double-boxed with full insurance included.",
    ],
    description:
      "A sealed case is the only way to guarantee the collation the manufacturer intended — nothing searched, nothing weighed, nothing resealed. Case codes remain intact so you can verify the seal before you break it.",
    specs: SPECS_SEALED,
  },
  {
    handle: "meridian-select-basketball-hobby-box",
    title: "2025/26 Meridian Select Basketball Hobby Box",
    brand: "Meridian",
    price: 384.95,
    compareAt: 449.95,
    categories: ["sports-cards", "boxes-cases"],
    art: "hardwood",
    badge: "Hot",
    stock: 11,
    sku: "MRD-BK-26-HOB",
    releasedAt: "2026-01-22",
    blurb: "12 packs · 5 cards per pack · two autographs per box on average.",
    configuration: "5 cards per pack, 12 packs per box",
    highlights: [
      "Three-tier base design with premium die-cut prizms throughout.",
      "Two autographs per box on average, including rookie signatures.",
      "Tiered parallels numbered from /199 down to one-of-one.",
    ],
    description:
      "A premium basketball release built around a tiered base set, where each tier carries its own design language and parallel structure. The chase runs through die-cut prizms and on-card rookie autographs from the incoming class.",
    specs: SPECS_SEALED,
  },
  {
    handle: "obsidian-noir-basketball-hobby-box",
    title: "2025/26 Obsidian Noir Basketball Hobby Box",
    brand: "Obsidian",
    price: 612.4,
    categories: ["sports-cards", "boxes-cases"],
    art: "void",
    stock: 4,
    sku: "OBS-BK-26-HOB",
    releasedAt: "2026-02-19",
    blurb: "One pack · 8 cards · every card numbered, five autographs or relics.",
    configuration: "8 cards per pack, 1 pack per box",
    highlights: [
      "Every single card in the box is serial numbered.",
      "Five autographs or memorabilia cards per box, guaranteed.",
      "Black-on-black photography with heavy foil treatment.",
    ],
    description:
      "A high-end, low-count release where the entire box is a single eight-card pack and every card carries a serial number. The guarantee of five hits per box puts it firmly in case-break territory.",
    specs: SPECS_SEALED,
  },
  {
    handle: "summit-chrome-baseball-hobby-box",
    title: "2026 Summit Chrome Baseball Hobby Box",
    brand: "Summit",
    price: 188.7,
    categories: ["sports-cards", "boxes-cases"],
    art: "diamond",
    stock: 22,
    sku: "SMT-BB-26-HOB",
    releasedAt: "2026-04-03",
    blurb: "24 packs · 4 cards per pack · two autographs per box on average.",
    configuration: "4 cards per pack, 24 packs per box",
    highlights: [
      "Chrome refractor rainbow running through eleven numbered tiers.",
      "Two autographs per box on average from the rookie class.",
      "Includes the annual retro-design insert set.",
    ],
    description:
      "Chrome baseball is the annual rookie-card benchmark. The refractor rainbow gives every base card a dozen collectible versions, and the rookie autograph checklist is the one the market watches each spring.",
    specs: SPECS_SEALED,
  },
  {
    handle: "summit-heritage-baseball-blaster",
    title: "2026 Summit Heritage Baseball Blaster Box",
    brand: "Summit",
    price: 34.99,
    compareAt: 42.99,
    categories: ["sports-cards", "boxes-cases"],
    art: "diamond",
    stock: 40,
    sku: "SMT-BB-26-BLS",
    releasedAt: "2026-03-11",
    blurb: "8 packs · 9 cards per pack · retail-exclusive parallels included.",
    configuration: "9 cards per pack, 8 packs per box",
    highlights: [
      "Retro design reissued from the original 1970s template.",
      "Retail-exclusive colour parallels not available in hobby.",
      "An affordable entry point for set builders.",
    ],
    description:
      "Heritage recreates a classic vintage design with the current season's players. Blaster configurations carry retail-only parallels, making them a necessary stop for anyone chasing a master set.",
    specs: SPECS_SEALED,
  },
  {
    handle: "pinnacle-world-cup-soccer-hobby-box",
    title: "2026 Pinnacle World Series Soccer Hobby Box",
    brand: "Pinnacle",
    price: 587.96,
    compareAt: 759.95,
    categories: ["sports-cards", "boxes-cases"],
    art: "pitch",
    badge: "Hot",
    stock: 6,
    sku: "PIN-SC-26-HOB",
    releasedAt: "2026-05-28",
    blurb: "12 packs · 12 cards per pack · tournament-year release.",
    configuration: "12 cards per pack, 12 packs per box",
    highlights: [
      "Tournament-year release covering every qualified national squad.",
      "Autograph checklist spans current stars and retired legends.",
      "Numbered parallels down to one-of-one gold.",
    ],
    description:
      "Released to coincide with the international tournament, this set covers every qualified squad with a base card run, then layers on a deep autograph checklist that reaches back through past tournament winners.",
    specs: SPECS_SEALED,
  },
  {
    handle: "halo-cosmic-football-hobby-case",
    title: "2026 Halo Cosmic Football Hobby 8-Box Case",
    brand: "Halo",
    price: 1671.35,
    categories: ["sports-cards", "boxes-cases"],
    art: "prism",
    stock: 2,
    sku: "HAL-FB-26-CASE8",
    releasedAt: "2026-06-23",
    blurb: "Sealed 8-box case · one case hit guaranteed · ships insured.",
    configuration: "8 hobby boxes per sealed case",
    highlights: [
      "Guaranteed case hit exclusive to sealed case purchases.",
      "Holographic base stock across the entire checklist.",
      "Ships fully insured with signature confirmation.",
    ],
    description:
      "Cosmic uses a holographic base stock across the entire checklist, so every card in the box has the refractor look. Sealed cases carry an additional guaranteed case hit that cannot be pulled from single boxes.",
    specs: SPECS_SEALED,
  },
  {
    handle: "vertex-immaculate-baseball-hobby-box",
    title: "2026 Vertex Immaculate Baseball Hobby Box",
    brand: "Vertex",
    price: 387.96,
    compareAt: 499.95,
    categories: ["sports-cards", "boxes-cases"],
    art: "relic",
    stock: 7,
    sku: "VTX-BB-26-HOB",
    releasedAt: "2026-07-10",
    blurb: "One pack · 5 cards · patch autographs and jumbo relics.",
    configuration: "5 cards per pack, 1 pack per box",
    highlights: [
      "Every card is either an autograph, a relic, or serial numbered.",
      "Jumbo patch autographs are the headline chase.",
      "Low print run across the entire checklist.",
    ],
    description:
      "A memorabilia-first release where the five-card pack is entirely hits. Jumbo patches, laundry tags and on-card autographs carry the checklist, with print runs kept deliberately low.",
    specs: SPECS_SEALED,
  },

  // ---------- Pokémon ----------
  {
    handle: "ember-dynasty-booster-box",
    title: "Ember Dynasty Booster Box",
    brand: "Card TCG Exchange",
    price: 347.96,
    compareAt: 444.95,
    categories: ["pokemon", "boxes-cases"],
    art: "ember",
    badge: "Hot",
    stock: 18,
    sku: "CEC-PK-EMD-BB",
    releasedAt: "2026-05-23",
    blurb: "36 packs · 10 cards per pack · illustration rares throughout.",
    configuration: "10 cards per pack, 36 packs per box",
    highlights: [
      "Full 36-pack display with the factory seal intact.",
      "Special illustration rares fall roughly once per box.",
      "Includes the complete set of reverse-holo commons.",
    ],
    description:
      "A full display of the Ember Dynasty set. Thirty-six packs is enough to build most of the base set in one sitting while chasing the special illustration rares that anchor the top of the checklist.",
    specs: SPECS_SEALED,
  },
  {
    handle: "ember-dynasty-elite-trainer-box",
    title: "Ember Dynasty Elite Trainer Box",
    brand: "Card TCG Exchange",
    price: 54.99,
    categories: ["pokemon"],
    art: "ember",
    stock: 26,
    sku: "CEC-PK-EMD-ETB",
    releasedAt: "2026-05-23",
    blurb: "9 packs · 65 card sleeves · dice, counters and a storage box.",
    configuration: "9 booster packs plus accessories",
    highlights: [
      "Nine booster packs alongside a full accessory kit.",
      "Includes 65 matching card sleeves and condition counters.",
      "Exclusive promo card only available in this configuration.",
    ],
    description:
      "The trainer box bundles nine packs with the accessories you actually use at the table — sleeves, counters, dice and a storage box — plus a promo card that is exclusive to this configuration.",
    specs: SPECS_SEALED,
  },
  {
    handle: "celestial-rift-booster-bundle",
    title: "Celestial Rift Booster Bundle",
    brand: "Card TCG Exchange",
    price: 28.5,
    categories: ["pokemon"],
    art: "tide",
    stock: 34,
    sku: "CEC-PK-CRF-BND",
    releasedAt: "2026-03-07",
    blurb: "6 packs · sealed bundle · ideal as a gift or a light rip.",
    configuration: "6 booster packs per sealed bundle",
    highlights: [
      "Six sealed packs in retail-ready packaging.",
      "The lowest-cost way to sample a new set.",
      "Same pull rates as loose packs from the display.",
    ],
    description:
      "Six packs in a sealed bundle. Pull rates match the full display exactly, so this is simply a smaller, cheaper way into the set without committing to a booster box.",
    specs: SPECS_SEALED,
  },
  {
    handle: "celestial-rift-ultra-premium-collection",
    title: "Celestial Rift Ultra Premium Collection",
    brand: "Card TCG Exchange",
    price: 367.49,
    categories: ["pokemon", "pre-orders"],
    art: "prism",
    badge: "Pre-Order",
    stock: 9,
    sku: "CEC-PK-CRF-UPC",
    releasedAt: "2026-11-06",
    blurb: "Pre-order · 16 packs · metal card, playmat and collector binder.",
    configuration: "16 booster packs plus premium accessories",
    highlights: [
      "Sixteen packs, the largest count of any sealed collection this set.",
      "Includes an etched metal card and a full-size playmat.",
      "Ships on release day — nothing is charged twice.",
    ],
    description:
      "The largest sealed collection of the set: sixteen packs, an etched metal card, a full-size playmat and a collector binder. Pre-orders ship on release day at the price locked in at checkout.",
    specs: SPECS_SEALED,
  },
  {
    handle: "verdant-hollow-booster-box",
    title: "Verdant Hollow Booster Box",
    brand: "Card TCG Exchange",
    price: 303.96,
    compareAt: 499.95,
    categories: ["pokemon", "boxes-cases"],
    art: "verdant",
    stock: 12,
    sku: "CEC-PK-VDH-BB",
    releasedAt: "2025-11-14",
    blurb: "36 packs · previous-set pricing · sealed display.",
    configuration: "10 cards per pack, 36 packs per box",
    highlights: [
      "Previous-set pricing on a sealed factory display.",
      "Strong long-term hold now that print runs have ended.",
      "Checklist includes three chase illustration rares.",
    ],
    description:
      "Now that printing has stopped on this set, sealed displays trade on scarcity rather than pull rates. Priced below the current release while the supply lasts.",
    specs: SPECS_SEALED,
  },
  {
    handle: "tidecaller-premium-collection",
    title: "Tidecaller Premium Collection",
    brand: "Card TCG Exchange",
    price: 142.49,
    categories: ["pokemon", "pre-orders"],
    art: "tide",
    badge: "Pre-Order",
    stock: 15,
    sku: "CEC-PK-TDC-PRM",
    releasedAt: "2026-11-06",
    blurb: "Pre-order · 8 packs · oversized foil promo and display stand.",
    configuration: "8 booster packs plus an oversized promo",
    highlights: [
      "Eight packs with an oversized foil promo card.",
      "Includes an acrylic display stand for the promo.",
      "Reserved stock — shipped the day the set releases.",
    ],
    description:
      "A mid-size sealed collection built around an oversized foil promo and its display stand. Reserved stock ships on release day.",
    specs: SPECS_SEALED,
  },

  // ---------- Magic & other TCG ----------
  {
    handle: "reality-fracture-collector-booster-box",
    title: "Reality Fracture Collector Booster Box",
    brand: "Card TCG Exchange",
    price: 262.49,
    categories: ["magic", "boxes-cases"],
    art: "void",
    badge: "Hot",
    stock: 10,
    sku: "CEC-MG-RFR-CBB",
    releasedAt: "2026-02-06",
    blurb: "12 collector packs · foil-heavy · extended-art rares throughout.",
    configuration: "15 cards per pack, 12 packs per box",
    highlights: [
      "Every pack carries at least one foil rare or mythic.",
      "Extended-art and borderless treatments exclusive to collector packs.",
      "Includes a foil box-topper card.",
    ],
    description:
      "Collector boosters concentrate the premium treatments — extended art, borderless frames and serialised foils — into twelve packs. If you are chasing the alternate-art versions rather than playables, this is the configuration to open.",
    specs: SPECS_SEALED,
  },
  {
    handle: "reality-fracture-play-booster-box",
    title: "Reality Fracture Play Booster Box",
    brand: "Card TCG Exchange",
    price: 84.09,
    categories: ["magic", "boxes-cases"],
    art: "void",
    stock: 21,
    sku: "CEC-MG-RFR-PBB",
    releasedAt: "2026-02-06",
    blurb: "36 play boosters · built for drafting · eight-player pods.",
    configuration: "14 cards per pack, 36 packs per box",
    highlights: [
      "Enough packs to draft an eight-player pod with spares.",
      "Every pack has a chance at a borderless mythic.",
      "The standard configuration for limited play.",
    ],
    description:
      "Thirty-six play boosters is exactly what you need to run an eight-player draft pod with packs left over. Play boosters carry a wildcard slot, so borderless and extended-art cards show up here too.",
    specs: SPECS_SEALED,
  },
  {
    handle: "ironroot-commander-deck-bundle",
    title: "Ironroot Commander Deck Bundle",
    brand: "Card TCG Exchange",
    price: 148.49,
    categories: ["magic"],
    art: "verdant",
    stock: 13,
    sku: "CEC-MG-IRT-CMD4",
    releasedAt: "2026-01-16",
    blurb: "All four decks · 100 cards each · ready to play out of the box.",
    configuration: "Four 100-card decks with accessories",
    highlights: [
      "All four commander decks from the set in one bundle.",
      "Each deck is 100 cards and playable straight out of the box.",
      "Includes foil commanders and collector tokens.",
    ],
    description:
      "The complete set of four preconstructed commander decks. Each is a legal 100-card singleton deck with a foil commander, so a group of four can sit down and play immediately.",
    specs: SPECS_SEALED,
  },
  {
    handle: "lorewright-draft-night-kit",
    title: "Lorewright Draft Night Kit",
    brand: "Card TCG Exchange",
    price: 131.39,
    compareAt: 164.99,
    categories: ["magic"],
    art: "relic",
    stock: 9,
    sku: "CEC-MG-LWR-DNK",
    releasedAt: "2025-12-05",
    blurb: "12 play boosters · 1 collector booster · 90 lands and 10 tokens.",
    configuration: "13 boosters plus lands and tokens",
    highlights: [
      "Twelve play boosters plus one collector booster.",
      "Ninety basic lands and ten token cards included.",
      "Everything needed to host a draft night for four.",
    ],
    description:
      "A self-contained draft night in a box: twelve play boosters, a collector booster, and the lands and tokens you would otherwise have to dig out of a bulk bin.",
    specs: SPECS_SEALED,
  },
  {
    handle: "starfall-league-collector-box",
    title: "Starfall League Collector Booster Box",
    brand: "Card TCG Exchange",
    price: 405.74,
    categories: ["magic", "boxes-cases"],
    art: "prism",
    stock: 5,
    sku: "CEC-MG-SFL-CBB",
    releasedAt: "2025-10-24",
    blurb: "12 collector packs · crossover set · foil box topper included.",
    configuration: "15 cards per pack, 12 packs per box",
    highlights: [
      "Crossover set with fully illustrated character cards.",
      "Serialised cards seeded through collector packs only.",
      "Foil box-topper card included with every sealed box.",
    ],
    description:
      "A crossover release where the entire checklist is reimagined with new character art. Collector boosters are the only place the serialised cards appear.",
    specs: SPECS_SEALED,
  },
  {
    handle: "driftwood-fables-booster-box",
    title: "Driftwood Fables Booster Box",
    brand: "Card TCG Exchange",
    price: 52.5,
    categories: ["magic"],
    art: "tide",
    stock: 28,
    sku: "CEC-MG-DWF-BB",
    releasedAt: "2026-04-18",
    blurb: "24 packs · 12 cards per pack · approachable entry set.",
    configuration: "12 cards per pack, 24 packs per box",
    highlights: [
      "Designed as an entry point for newer players.",
      "Simplified mechanics with a shallow, collectible checklist.",
      "One foil card in every pack.",
    ],
    description:
      "A deliberately approachable set with a shallow checklist and a foil in every pack. A good first box for someone new to the game or for handing out at a casual table.",
    specs: SPECS_SEALED,
  },

  // ---------- Singles & autographs ----------
  {
    handle: "marcus-webb-rookie-auto-1965",
    title: "Marcus Webb Signed 1965 Rookie Card #85 — Certified",
    brand: "Vintage",
    price: 289.08,
    categories: ["singles-autographs", "sports-cards"],
    art: "diamond",
    badge: "Last One",
    stock: 1,
    sku: "SGL-170406",
    releasedAt: "1965-01-01",
    blurb: "Blue ballpoint signature · third-party certified · sharp corners.",
    configuration: "Single card, certified autograph",
    highlights: [
      "Bold blue ballpoint signature across the photo area.",
      "Third-party certified with the serial recorded on the holder.",
      "Corners remain sharp with strong original gloss.",
    ],
    description:
      "A signed rookie card from the mid-sixties with a bold, unfaded signature. The card presents well for its age: sharp corners, strong gloss and centring that sits slightly left.",
    specs: SPECS_SINGLE,
  },
  {
    handle: "dale-hartman-signed-1962-264",
    title: "Dale Hartman Signed 1962 Card #264 — Certified",
    brand: "Vintage",
    price: 163.24,
    categories: ["singles-autographs", "sports-cards"],
    art: "diamond",
    stock: 1,
    sku: "SGL-165177",
    releasedAt: "1962-01-01",
    blurb: "On-card signature · certified · light corner wear.",
    configuration: "Single card, certified autograph",
    highlights: [
      "Clean on-card signature in black ink.",
      "Certification serial matches the encapsulation.",
      "Light corner wear consistent with the era.",
    ],
    description:
      "An honest vintage single with a clean signature and the wear you would expect from a card of this age. Condition notes are accurate — no surprises on arrival.",
    specs: SPECS_SINGLE,
  },
  {
    handle: "coaches-triple-signed-1963",
    title: "Triple-Signed 1963 Coaches Card #39 — Certified",
    brand: "Vintage",
    price: 372.68,
    categories: ["singles-autographs", "sports-cards"],
    art: "relic",
    badge: "Last One",
    stock: 1,
    sku: "SGL-11481640",
    releasedAt: "1963-01-01",
    blurb: "Three signatures on one card · certified · rare multi-signed vintage.",
    configuration: "Single card, three certified autographs",
    highlights: [
      "Three separate signatures on a single vintage card.",
      "All three authenticated together under one certification.",
      "Multi-signed vintage cards rarely surface in this condition.",
    ],
    description:
      "Multi-signed vintage cards are difficult to find in any condition, and harder still with all signatures legible. All three are authenticated under a single certification.",
    specs: SPECS_SINGLE,
  },
  {
    handle: "volcanic-shoreline-revised",
    title: "Volcanic Shoreline — Revised Edition",
    brand: "Vintage TCG",
    price: 1249.6,
    categories: ["singles-autographs", "magic"],
    art: "ember",
    stock: 1,
    sku: "SGL-MTG-1608",
    releasedAt: "1994-04-01",
    blurb: "Lightly played · original print run · centred well for the era.",
    configuration: "Single card",
    highlights: [
      "Original early-nineties print run.",
      "Lightly played with no creasing or edge whitening.",
      "Centring is strong relative to the print run.",
    ],
    description:
      "One of the format-defining dual lands from the original print run. Lightly played: minor surface wear under angled light, but no creases and no edge whitening.",
    specs: SPECS_SINGLE,
  },
  {
    handle: "wheel-of-fate-revised",
    title: "Wheel of Fate — Revised Edition",
    brand: "Vintage TCG",
    price: 578.6,
    compareAt: 649.0,
    categories: ["singles-autographs", "magic"],
    art: "ember",
    stock: 2,
    sku: "SGL-MTG-1732",
    releasedAt: "1994-04-01",
    blurb: "Near mint · sleeved since purchase · strong corners.",
    configuration: "Single card",
    highlights: [
      "Near mint and sleeved continuously since purchase.",
      "All four corners sharp with no whitening.",
      "Surface is clean under direct light.",
    ],
    description:
      "A near mint copy that has been sleeved since it left the pack. Corners are sharp, the surface is clean under direct light, and centring is comfortably within tolerance.",
    specs: SPECS_SINGLE,
  },
  {
    handle: "arcane-tutor-revised-fbb",
    title: "Arcane Tutor — Revised Edition (Foreign Black Border)",
    brand: "Vintage TCG",
    price: 112.2,
    categories: ["singles-autographs", "magic"],
    art: "void",
    stock: 3,
    sku: "SGL-MTG-1188",
    releasedAt: "1994-04-01",
    blurb: "Foreign black border printing · moderately played · scarcer run.",
    configuration: "Single card",
    highlights: [
      "Foreign black border printing with a far smaller run.",
      "Moderately played with visible but even edge wear.",
      "Black borders make condition easy to assess honestly.",
    ],
    description:
      "The foreign black border printing had a much smaller run than the standard release. This copy is moderately played — the edge wear is visible but even, and the card sits flat.",
    specs: SPECS_SINGLE,
  },
  {
    handle: "ray-callahan-signed-1961-184",
    title: "Ray Callahan Signed 1961 Card #184 — Certified",
    brand: "Vintage",
    price: 2088.68,
    categories: ["singles-autographs", "sports-cards"],
    art: "gridiron",
    badge: "Last One",
    stock: 1,
    sku: "SGL-10378341",
    releasedAt: "1961-01-01",
    blurb: "Scarce signed example · certified · population under ten.",
    configuration: "Single card, certified autograph",
    highlights: [
      "Fewer than ten certified signed examples are known.",
      "Signature is bold and fully legible.",
      "Encapsulated with the certification serial visible.",
    ],
    description:
      "A genuinely scarce signed example with a certified population in the single digits. The signature is bold and fully legible across the card face.",
    specs: SPECS_SINGLE,
  },
  {
    handle: "harold-pike-signed-1958-179",
    title: "Harold Pike Signed 1958 Card #179 — Certified",
    brand: "Vintage",
    price: 121.44,
    categories: ["singles-autographs", "sports-cards"],
    art: "diamond",
    stock: 2,
    sku: "SGL-165405",
    releasedAt: "1958-01-01",
    blurb: "Certified signature · honest vintage condition · well centred.",
    configuration: "Single card, certified autograph",
    highlights: [
      "Certified signature with the serial recorded.",
      "Well centred for a card of this vintage.",
      "Honest wear, accurately described.",
    ],
    description:
      "An affordable entry into certified vintage autographs. Centring is better than most surviving examples and the signature has not faded.",
    specs: SPECS_SINGLE,
  },

  // ---------- Pre-orders ----------
  {
    handle: "apex-prime-football-hobby-box-preorder",
    title: "2027 Apex Prime Football Hobby Box",
    brand: "Apex",
    price: 249.99,
    categories: ["pre-orders", "sports-cards", "boxes-cases"],
    art: "gridiron",
    badge: "Pre-Order",
    stock: 30,
    sku: "APX-FB-27-HOB-PRE",
    releasedAt: "2027-01-15",
    blurb: "Pre-order · ships on release day · launch pricing locked in.",
    configuration: "8 cards per pack, 12 packs per box",
    highlights: [
      "Launch pricing is locked in at checkout.",
      "Ships the day the product releases.",
      "Cancel any time before the release date for a full refund.",
    ],
    description:
      "Reserve the upcoming Prime football release at launch pricing. Nothing ships until release day, and pre-orders can be cancelled for a full refund at any point before then.",
    specs: SPECS_SEALED,
  },
  {
    handle: "summit-finest-baseball-hobby-box-preorder",
    title: "2027 Summit Finest Baseball Hobby Box",
    brand: "Summit",
    price: 329.95,
    categories: ["pre-orders", "sports-cards", "boxes-cases"],
    art: "prism",
    badge: "Pre-Order",
    stock: 24,
    sku: "SMT-BB-27-HOB-PRE",
    releasedAt: "2027-02-26",
    blurb: "Pre-order · two autographs per box · refractor-heavy checklist.",
    configuration: "12 cards per pack, 6 packs per box",
    highlights: [
      "Two autographs per box on average.",
      "Refractor parallels across the full checklist.",
      "Reserved allocation — quantities are limited.",
    ],
    description:
      "Finest is the premium chrome release of the baseball calendar, built around refractors and a tight two-hits-per-box guarantee. Allocation is limited, so reserved quantities are capped.",
    specs: SPECS_SEALED,
  },
  {
    handle: "glasswing-ascent-booster-box-preorder",
    title: "Glasswing Ascent Booster Box",
    brand: "Card TCG Exchange",
    price: 129.99,
    categories: ["pre-orders", "magic"],
    art: "tide",
    badge: "Pre-Order",
    stock: 40,
    sku: "CEC-MG-GWA-BB-PRE",
    releasedAt: "2027-03-19",
    blurb: "Pre-order · 30 packs · new mechanic set · ships on release.",
    configuration: "13 cards per pack, 30 packs per box",
    highlights: [
      "Introduces a new evergreen mechanic to the format.",
      "Thirty packs per sealed display.",
      "Pre-order pricing held even if retail rises at launch.",
    ],
    description:
      "The spring set introduces a new evergreen mechanic, which historically drives strong early demand. Pre-order pricing is held even if retail moves up at launch.",
    specs: SPECS_SEALED,
  },
];

/* ------------------------------------------------------------------ */
/* Lookups                                                             */
/* ------------------------------------------------------------------ */

export function getProduct(handle: string): Product | undefined {
  return PRODUCTS.find((p) => p.handle === handle);
}

export function getCollection(handle: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.handle === handle);
}

export function productsIn(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.categories.includes(category));
}

export function relatedTo(product: Product, limit = 8): Product[] {
  const primary = product.categories[0];
  return PRODUCTS.filter(
    (p) => p.handle !== product.handle && p.categories.includes(primary),
  ).slice(0, limit);
}

export function searchProducts(query: string, limit = 6): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.categories.some((c) => c.includes(q)),
  ).slice(0, limit);
}

export function isOnSale(product: Product): boolean {
  return typeof product.compareAt === "number" && product.compareAt > product.price;
}

export function discountPercent(product: Product): number | null {
  if (!isOnSale(product) || !product.compareAt) return null;
  return Math.round((1 - product.price / product.compareAt) * 100);
}
