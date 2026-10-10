import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { tv } from "tailwind-variants";

/**
 * Documentation-only story that previews the palette. The hex values mirror
 * `tailwind.config.js` (primary, neutral, semantic); keep them in sync when the config changes.
 * Swatch colors are data, so they are applied with inline styles (Tailwind cannot generate
 * classes for runtime values).
 */

interface Swatch {
  name: string;
  hex: string;
}

interface Ramp {
  title: string;
  description: string;
  swatches: Swatch[];
}

interface SemanticColor {
  title: string;
  message: string;
  strong: string;
  subtle: string;
}

const WHITE = "#ffffff";
const AA_TEXT = 4.5;

const rgbToHex = (rgb: string): string =>
  `#${rgb
    .split(" ")
    .map((value) => Number(value).toString(16).padStart(2, "0"))
    .join("")}`;

const channelToLinear = (value: number): number => {
  const normalized = value / 255;
  return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex: string): number => {
  const [r, g, b] = [1, 3, 5].map((start) =>
    channelToLinear(parseInt(hex.slice(start, start + 2), 16))
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrastRatio = (foreground: string, background: string): number => {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
};

const readableTextOn = (background: string): string =>
  contrastRatio("#000000", background) >= contrastRatio(WHITE, background) ? "#000000" : WHITE;

const ramp = (prefix: string, values: Record<number, string>): Swatch[] =>
  Object.entries(values).map(([step, rgb]) => ({ name: `${prefix}-${step}`, hex: rgbToHex(rgb) }));

const ramps: Ramp[] = [
  {
    title: "Primary",
    description:
      "Brand blue, used for actions, links and focus. 800 is today's `primary`. Steps 500 and lighter are for backgrounds and borders, not for text on white.",
    swatches: ramp("primary", {
      50: "249 251 252",
      100: "241 247 250",
      200: "217 231 239",
      300: "184 211 228",
      400: "144 181 210",
      500: "107 152 193",
      600: "69 122 176",
      700: "0 96 171",
      800: "0 84 138",
      900: "0 66 108",
      950: "0 48 84",
    }),
  },
  {
    title: "Secondary",
    description:
      "Brand orange, used sparingly (one call to action per screen). `c2410c` is today's `secondary` and the lightest step that is safe for white button text. The current ramp is irregular: 300 is darker than 400, and 700 lighter than 600.",
    swatches: [
      ...ramp("secondary", {
        50: "255 249 244",
        100: "254 234 208",
        200: "253 218 176",
        300: "236 175 103",
        400: "251 167 90",
        500: "246 151 85",
        600: "244 133 53",
        700: "242 139 45",
        800: "226 117 29",
        900: "209 96 12",
        950: "191 75 0",
      }),
      { name: "config default", hex: "#c2410c" },
    ],
  },
  {
    title: "Neutral",
    description:
      "Grays for text, borders and backgrounds. Proposed jobs: 900 body text, 600 secondary text, 500 placeholder, 400 input borders, 200 dividers, 50 page background. 100 to 300 are never text.",
    swatches: ramp("neutral", {
      25: "250 250 250",
      50: "246 246 246",
      100: "231 231 231",
      200: "209 209 209",
      300: "176 176 176",
      400: "136 136 136",
      500: "109 109 109",
      600: "93 93 93",
      700: "79 79 79",
      800: "69 69 69",
      900: "61 61 61",
      950: "48 48 48",
    }),
  },
];

const semantic: SemanticColor[] = [
  {
    title: "Danger",
    message: "Your payment could not be processed.",
    strong: "#b91c1c",
    subtle: "#fef2f2",
  },
  {
    title: "Success",
    message: "Your order has been placed.",
    strong: "#15803d",
    subtle: "#f0fdf4",
  },
  {
    title: "Warning",
    message: "Only 2 items left in stock.",
    strong: "#92400e",
    subtle: "#fef3c7",
  },
];

const colorsStyles = tv({
  slots: {
    page: "mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12",
    intro: "flex flex-col gap-3",
    title: "text-xl font-bold text-neutral-900",
    lead: "max-w-2xl text-base text-neutral-600",
    section: "flex flex-col gap-4",
    sectionTitle: "text-lg font-bold text-neutral-900",
    sectionText: "max-w-2xl text-sm text-neutral-600",
    ramp: "grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-4 lg:grid-cols-6",
    tile: "flex flex-col gap-2",
    chip: "flex h-20 items-start rounded-lg p-3 text-sm font-bold ring-1 ring-inset ring-neutral-950/10",
    meta: "flex flex-col text-sm",
    name: "font-bold text-neutral-900",
    hex: "text-neutral-600",
    badge: "mt-1 w-fit rounded-full px-2 text-sm font-bold",
    badgeOk: "bg-neutral-900 text-white",
    cards: "grid gap-4 md:grid-cols-3",
    alert: "flex flex-col gap-1 rounded-lg border p-4",
    alertTitle: "text-base font-bold",
    alertText: "text-sm",
    alertMeta: "mt-2 text-sm font-bold",
    demo: "flex max-w-md flex-col gap-2 rounded-lg border border-neutral-200 p-6",
    demoTitle: "text-lg font-bold text-neutral-900",
    demoText: "text-sm text-neutral-600",
    demoLabel: "mt-2 text-sm font-bold text-neutral-900",
    demoInput:
      "rounded border border-neutral-400 px-3 py-2 text-base text-neutral-900 placeholder:text-neutral-500",
  },
});

const RampTile: React.FC<{ swatch: Swatch }> = ({ swatch }) => {
  const styles = colorsStyles();
  const onWhite = contrastRatio(swatch.hex, WHITE);

  return (
    <li className={styles.tile()}>
      <div
        className={styles.chip()}
        style={{ backgroundColor: swatch.hex, color: readableTextOn(swatch.hex) }}
      >
        {swatch.name.split("-").pop()}
      </div>
      <div className={styles.meta()}>
        <span className={styles.name()}>{swatch.name}</span>
        <span className={styles.hex()}>{swatch.hex}</span>
        {onWhite >= AA_TEXT ? (
          <span className={styles.badge({ className: styles.badgeOk() })}>
            Text on white {onWhite.toFixed(1)}:1
          </span>
        ) : null}
      </div>
    </li>
  );
};

const RampSection: React.FC<{ item: Ramp }> = ({ item }) => {
  const styles = colorsStyles();
  const headingId = React.useId();

  return (
    <section aria-labelledby={headingId} className={styles.section()}>
      <div>
        <h2 id={headingId} className={styles.sectionTitle()}>
          {item.title}
        </h2>
        <p className={styles.sectionText()}>{item.description}</p>
      </div>
      <ul className={styles.ramp()}>
        {item.swatches.map((swatch) => (
          <RampTile key={swatch.name} swatch={swatch} />
        ))}
      </ul>
    </section>
  );
};

const SemanticSection: React.FC = () => {
  const styles = colorsStyles();
  const headingId = React.useId();

  return (
    <section aria-labelledby={headingId} className={styles.section()}>
      <div>
        <h2 id={headingId} className={styles.sectionTitle()}>
          Semantic
        </h2>
        <p className={styles.sectionText()}>
          Colors that carry meaning. Each has a strong shade for text and icons and a subtle shade
          for the background. Always pair color with words or an icon, never color alone.
        </p>
      </div>
      <div className={styles.cards()}>
        {semantic.map((item) => (
          <div
            key={item.title}
            className={styles.alert()}
            style={{ backgroundColor: item.subtle, borderColor: item.strong, color: item.strong }}
          >
            <span className={styles.alertTitle()}>{item.title}</span>
            <span className={styles.alertText()}>{item.message}</span>
            <span className={styles.alertMeta()}>
              {item.strong} on {item.subtle} · {contrastRatio(item.strong, item.subtle).toFixed(1)}
              :1
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

const NeutralDemo: React.FC = () => {
  const styles = colorsStyles();
  const headingId = React.useId();
  const inputId = React.useId();

  return (
    <section aria-labelledby={headingId} className={styles.section()}>
      <div>
        <h2 id={headingId} className={styles.sectionTitle()}>
          Neutral in use
        </h2>
        <p className={styles.sectionText()}>
          How the proposed jobs look together: 900 for headings, 600 for helper text, 400 for the
          input border and 500 for the placeholder.
        </p>
      </div>
      <div className={styles.demo()}>
        <span className={styles.demoTitle()}>Find a product</span>
        <span className={styles.demoText()}>Search by name or brand.</span>
        <label htmlFor={inputId} className={styles.demoLabel()}>
          Search
        </label>
        <input
          id={inputId}
          readOnly
          className={styles.demoInput()}
          placeholder="Basic T-Shirt"
          type="search"
        />
      </div>
    </section>
  );
};

const Colors: React.FC = () => {
  const styles = colorsStyles();

  return (
    <div className={styles.page()}>
      <header className={styles.intro()}>
        <h1 className={styles.title()}>Colors</h1>
        <p className={styles.lead()}>
          The palette: two brand colors, one neutral scale and three semantic colors. Dark chips
          under a swatch show which steps are safe to use as text on white (WCAG AA, 4.5:1).
        </p>
      </header>
      {ramps.map((item) => (
        <RampSection key={item.title} item={item} />
      ))}
      <SemanticSection />
      <NeutralDemo />
    </div>
  );
};

const meta = {
  title: "Foundations/Colors",
  component: Colors,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Colors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {};
