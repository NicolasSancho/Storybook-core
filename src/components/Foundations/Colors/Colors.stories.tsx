import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { tv } from "tailwind-variants";

/**
 * Documentation-only story that previews the palette in both themes. It has no color data of its
 * own: every value is read from the `--color-*` variables in `src/styles/theme.css`, so it cannot
 * drift from them. The one list kept here is the pairings (which color is used on which), and the
 * `play` function asserts that every pairing reaches its contrast target in both themes.
 *
 * Both themes are shown at once whatever the toolbar says. The browser resolves each color for a
 * theme (by briefly setting `data-theme` on <html>), and the swatches are painted with the
 * resolved values. The "Neutral in use" demo uses real classes, so it follows the toolbar.
 */

type Theme = "light" | "dark";

/** Token name (without `--color-`) to resolved `#rrggbb`, per theme. */
type Resolved = Record<Theme, Record<string, string>>;

interface Ramp {
  title: string;
  description: string;
  tokens: string[];
}

interface SemanticColor {
  title: string;
  message: string;
  strong: string;
  subtle: string;
}

interface OnColor {
  title: string;
  fill: string;
  on: string;
}

interface Pairing {
  label: string;
  foreground: string;
  background: string;
  /** Minimum contrast ratio: 4.5 for text, 3 for UI such as borders and focus rings. */
  min: number;
}

const THEMES: Theme[] = ["light", "dark"];
const THEME_LABEL: Record<Theme, string> = { light: "Light", dark: "Dark" };
const AA_TEXT = 4.5;
const AA_UI = 3;

const BRAND_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const NEUTRAL_STEPS = [25, ...BRAND_STEPS];

const steps = (prefix: string, values: number[]): string[] =>
  values.map((step) => `${prefix}-${step}`);

const ramps: Ramp[] = [
  {
    title: "Primary",
    description:
      "Brand blue, used for actions, links and focus. 800 is `primary`. Steps 500 and lighter are for backgrounds and borders, not for text on the surface. In dark mode the steps are inverted, so 600 and up are the readable ones there too.",
    tokens: steps("primary", BRAND_STEPS),
  },
  {
    title: "Secondary",
    description:
      "Brand orange, used sparingly (one call to action per screen). 700 is `secondary`, the lightest step that is safe for button text in light mode, and 800 is `secondary-darker`. `secondary-lighter` is the original brand orange: decorative only, and the same in both themes.",
    tokens: [...steps("secondary", BRAND_STEPS), "secondary-lighter"],
  },
  {
    title: "Neutral",
    description:
      "Grays for text, borders and backgrounds. Jobs: 900 body text, 600 secondary text, 500 placeholder, 400 input borders, 200 dividers, 50 page background. 100 to 300 are never text. The jobs are the same in dark mode, where the scale is inverted.",
    tokens: steps("neutral", NEUTRAL_STEPS),
  },
];

const semantic: SemanticColor[] = [
  {
    title: "Danger",
    message: "Your payment could not be processed.",
    strong: "danger",
    subtle: "danger-subtle",
  },
  {
    title: "Success",
    message: "Your order has been placed.",
    strong: "success",
    subtle: "success-subtle",
  },
  {
    title: "Warning",
    message: "Only 2 items left in stock.",
    strong: "warning",
    subtle: "warning-subtle",
  },
];

const onColors: OnColor[] = [
  { title: "primary", fill: "primary", on: "on-primary" },
  { title: "secondary", fill: "secondary", on: "on-secondary" },
  { title: "danger", fill: "danger", on: "on-danger" },
];

const pairings: Pairing[] = [
  { label: "Body text", foreground: "neutral-900", background: "surface", min: AA_TEXT },
  {
    label: "Body text on page background",
    foreground: "neutral-900",
    background: "neutral-50",
    min: AA_TEXT,
  },
  {
    label: "Text component, default color",
    foreground: "neutral-700",
    background: "surface",
    min: AA_TEXT,
  },
  { label: "Secondary text", foreground: "neutral-600", background: "surface", min: AA_TEXT },
  {
    label: "Secondary text on page background",
    foreground: "neutral-600",
    background: "neutral-50",
    min: AA_TEXT,
  },
  { label: "Placeholder", foreground: "neutral-500", background: "surface", min: AA_TEXT },
  { label: "Icon, dark", foreground: "neutral-950", background: "surface", min: AA_TEXT },
  { label: "Input border", foreground: "neutral-400", background: "surface", min: AA_UI },
  { label: "Primary text and links", foreground: "primary", background: "surface", min: AA_TEXT },
  {
    label: "Primary 600, lightest text step",
    foreground: "primary-600",
    background: "surface",
    min: AA_TEXT,
  },
  { label: "Primary focus ring", foreground: "primary", background: "surface", min: AA_UI },
  { label: "Secondary brand text", foreground: "secondary", background: "surface", min: AA_TEXT },
  { label: "Secondary focus ring", foreground: "secondary", background: "surface", min: AA_UI },
  { label: "Danger text", foreground: "danger", background: "surface", min: AA_TEXT },
  { label: "Success text", foreground: "success", background: "surface", min: AA_TEXT },
  { label: "Warning text", foreground: "warning", background: "surface", min: AA_TEXT },
  {
    label: "Danger on its subtle background",
    foreground: "danger",
    background: "danger-subtle",
    min: AA_TEXT,
  },
  {
    label: "Success on its subtle background",
    foreground: "success",
    background: "success-subtle",
    min: AA_TEXT,
  },
  {
    label: "Warning on its subtle background",
    foreground: "warning",
    background: "warning-subtle",
    min: AA_TEXT,
  },
  { label: "Primary button text", foreground: "on-primary", background: "primary", min: AA_TEXT },
  {
    label: "Primary button text, hover",
    foreground: "on-primary",
    background: "primary-darker",
    min: AA_TEXT,
  },
  {
    label: "Secondary button text",
    foreground: "on-secondary",
    background: "secondary",
    min: AA_TEXT,
  },
  {
    label: "Secondary button text, hover",
    foreground: "on-secondary",
    background: "secondary-darker",
    min: AA_TEXT,
  },
  { label: "Danger badge text", foreground: "on-danger", background: "danger", min: AA_TEXT },
  { label: "Product tag text", foreground: "neutral-25", background: "neutral-950", min: AA_TEXT },
];

const tokenNames = (): string[] => [
  ...new Set([
    "surface",
    ...ramps.flatMap((ramp) => ramp.tokens),
    ...semantic.flatMap((item) => [item.strong, item.subtle]),
    ...onColors.flatMap((item) => [item.fill, item.on]),
    ...pairings.flatMap((pairing) => [pairing.foreground, pairing.background]),
  ]),
];

/** "rgb(0, 84, 138)" or "rgb(0 84 138)" (what getComputedStyle returns) to "#00548a". */
const toHex = (color: string): string =>
  `#${(color.match(/\d+(\.\d+)?/g) ?? [])
    .slice(0, 3)
    .map((value) => Math.round(Number(value)).toString(16).padStart(2, "0"))
    .join("")}`;

/**
 * Asks the browser for every token in both themes. The theme is the `color-scheme` that
 * `data-theme` on <html> sets, so the attribute is switched for the reads and then restored.
 * A token the page does not define throws, so a typo or a missing variable cannot pass silently.
 */
const resolveTokens = (): Resolved => {
  const root = document.documentElement;
  const previous = root.getAttribute("data-theme");
  const probe = document.createElement("span");
  document.body.append(probe);
  const resolved: Resolved = { light: {}, dark: {} };

  try {
    THEMES.forEach((theme) => {
      root.setAttribute("data-theme", theme);
      tokenNames().forEach((name) => {
        const variable = `--color-${name}`;
        if (!getComputedStyle(root).getPropertyValue(variable).trim()) {
          throw new Error(`${variable} is not defined on the page`);
        }
        probe.style.color = `var(${variable})`;
        resolved[theme][name] = toHex(getComputedStyle(probe).color);
      });
    });
  } finally {
    probe.remove();
    if (previous === null) {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", previous);
    }
  }

  return resolved;
};

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
  contrastRatio("#000000", background) >= contrastRatio("#ffffff", background)
    ? "#000000"
    : "#ffffff";

const evaluatePairings = (colors: Resolved) =>
  THEMES.flatMap((theme) =>
    pairings.map((pairing) => ({
      ...pairing,
      theme,
      ratio: contrastRatio(colors[theme][pairing.foreground], colors[theme][pairing.background]),
    }))
  );

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
    chips: "flex h-20 overflow-hidden rounded-lg ring-1 ring-neutral-950/10",
    chip: "flex flex-1 items-start p-3 text-sm font-bold",
    meta: "flex flex-col text-sm",
    name: "font-bold text-neutral-900",
    hex: "text-neutral-600",
    badges: "flex flex-wrap gap-1",
    badge: "mt-1 w-fit rounded-full bg-neutral-900 px-2 text-sm font-bold text-surface",
    cards: "grid gap-4 md:grid-cols-3",
    alert: "flex flex-col gap-1 rounded-lg border p-4",
    alertTitle: "text-base font-bold",
    alertText: "text-sm",
    alertMeta: "mt-2 text-sm font-bold",
    onFill: "flex flex-col gap-1 rounded-lg p-4",
    onTitle: "text-base font-bold",
    onMeta: "text-sm",
    table: "w-full max-w-4xl border-collapse text-left text-sm",
    tableHead: "border-b border-neutral-200 py-2 pr-4 font-bold text-neutral-900",
    tableCell: "border-b border-neutral-200 py-2 pr-4 text-neutral-600 tabular-nums",
    demo: "flex max-w-md flex-col gap-2 rounded-lg border border-neutral-200 p-6",
    demoTitle: "text-lg font-bold text-neutral-900",
    demoText: "text-sm text-neutral-600",
    demoLabel: "mt-2 text-sm font-bold text-neutral-900",
    demoInput:
      "rounded-sm border border-neutral-400 bg-surface px-3 py-2 text-base text-neutral-900 placeholder:text-neutral-500",
  },
});

const RampTile: React.FC<{ token: string; colors: Resolved }> = ({ token, colors }) => {
  const styles = colorsStyles();

  return (
    <li className={styles.tile()}>
      <div className={styles.chips()}>
        {THEMES.map((theme) => (
          <div
            key={theme}
            className={styles.chip()}
            style={{
              backgroundColor: colors[theme][token],
              color: readableTextOn(colors[theme][token]),
            }}
          >
            {token.split("-").pop()}
          </div>
        ))}
      </div>
      <div className={styles.meta()}>
        <span className={styles.name()}>{token}</span>
        {THEMES.map((theme) => (
          <span key={theme} className={styles.hex()}>
            {THEME_LABEL[theme]} {colors[theme][token]}
          </span>
        ))}
        <div className={styles.badges()}>
          {THEMES.map((theme) => {
            const onSurface = contrastRatio(colors[theme][token], colors[theme].surface);
            return onSurface >= AA_TEXT ? (
              <span key={theme} className={styles.badge()}>
                Text, {theme} {onSurface.toFixed(1)}:1
              </span>
            ) : null;
          })}
        </div>
      </div>
    </li>
  );
};

const RampSection: React.FC<{ item: Ramp; colors: Resolved }> = ({ item, colors }) => {
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
        {item.tokens.map((token) => (
          <RampTile key={token} token={token} colors={colors} />
        ))}
      </ul>
    </section>
  );
};

const SemanticSection: React.FC<{ colors: Resolved }> = ({ colors }) => {
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
      {THEMES.map((theme) => (
        <div key={theme} className={styles.cards()}>
          {semantic.map((item) => {
            const strong = colors[theme][item.strong];
            const subtle = colors[theme][item.subtle];
            return (
              <div
                key={item.title}
                className={styles.alert()}
                style={{ backgroundColor: subtle, borderColor: strong, color: strong }}
              >
                <span className={styles.alertTitle()}>
                  {item.title} ({theme})
                </span>
                <span className={styles.alertText()}>{item.message}</span>
                <span className={styles.alertMeta()}>
                  {strong} on {subtle} · {contrastRatio(strong, subtle).toFixed(1)}:1
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </section>
  );
};

const OnColorSection: React.FC<{ colors: Resolved }> = ({ colors }) => {
  const styles = colorsStyles();
  const headingId = React.useId();

  return (
    <section aria-labelledby={headingId} className={styles.section()}>
      <div>
        <h2 id={headingId} className={styles.sectionTitle()}>
          Surface and on-colors
        </h2>
        <p className={styles.sectionText()}>
          `surface` is the default background (light {colors.light.surface}, dark{" "}
          {colors.dark.surface}). Text on a filled brand or danger background uses its `on-` color:
          `bg-primary text-on-primary`. Never `text-white`, which would fail in dark mode.
        </p>
      </div>
      {THEMES.map((theme) => (
        <div key={theme} className={styles.cards()}>
          {onColors.map((item) => {
            const fill = colors[theme][item.fill];
            const on = colors[theme][item.on];
            return (
              <div
                key={item.title}
                className={styles.onFill()}
                style={{ backgroundColor: fill, color: on }}
              >
                <span className={styles.onTitle()}>
                  on-{item.title} ({theme})
                </span>
                <span className={styles.onMeta()}>
                  {on} on {fill} · {contrastRatio(on, fill).toFixed(1)}:1
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </section>
  );
};

const PairingsSection: React.FC<{ colors: Resolved }> = ({ colors }) => {
  const styles = colorsStyles();
  const headingId = React.useId();
  const results = evaluatePairings(colors);

  return (
    <section aria-labelledby={headingId} className={styles.section()}>
      <div>
        <h2 id={headingId} className={styles.sectionTitle()}>
          Contrast pairings
        </h2>
        <p className={styles.sectionText()}>
          Every pair the components use, in both themes. Text needs 4.5:1, and borders and focus
          rings need 3:1. This table is asserted by the story's test, so a failing pair fails `npm
          test`.
        </p>
      </div>
      <table className={styles.table()}>
        <thead>
          <tr>
            <th scope="col" className={styles.tableHead()}>
              Pairing
            </th>
            <th scope="col" className={styles.tableHead()}>
              Colors
            </th>
            <th scope="col" className={styles.tableHead()}>
              Needs
            </th>
            {THEMES.map((theme) => (
              <th key={theme} scope="col" className={styles.tableHead()}>
                {THEME_LABEL[theme]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pairings.map((pairing) => (
            <tr key={`${pairing.label}-${pairing.foreground}-${pairing.background}`}>
              <th scope="row" className={styles.tableHead()}>
                {pairing.label}
              </th>
              <td className={styles.tableCell()}>
                {pairing.foreground} on {pairing.background}
              </td>
              <td className={styles.tableCell()}>{pairing.min}:1</td>
              {THEMES.map((theme) => {
                const result = results.find(
                  (item) =>
                    item.theme === theme &&
                    item.label === pairing.label &&
                    item.foreground === pairing.foreground &&
                    item.background === pairing.background
                );
                const ratio = result?.ratio ?? 0;
                return (
                  <td key={theme} className={styles.tableCell()}>
                    {ratio.toFixed(1)}:1 {ratio >= pairing.min ? "pass" : "FAIL"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
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
          How the jobs look together: 900 for headings, 600 for helper text, 400 for the input
          border and 500 for the placeholder. This demo uses real classes, so it follows the theme
          switch in the toolbar.
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
  const colors = React.useMemo(resolveTokens, []);

  return (
    <div className={styles.page()}>
      <header className={styles.intro()}>
        <h1 className={styles.title()}>Colors</h1>
        <p className={styles.lead()}>
          The palette: two brand colors, one neutral scale and three semantic colors, in light and
          dark. Every swatch shows both values (light on the left, dark on the right), read from the
          design tokens. The chips under a swatch mark the steps that are safe to use as text on the
          surface of their theme (WCAG AA, 4.5:1). Switch the theme in the toolbar to see the
          components in dark.
        </p>
      </header>
      {ramps.map((item) => (
        <RampSection key={item.title} item={item} colors={colors} />
      ))}
      <SemanticSection colors={colors} />
      <OnColorSection colors={colors} />
      <PairingsSection colors={colors} />
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

export const Palette: Story = {
  play: () => {
    const failures = evaluatePairings(resolveTokens())
      .filter((result) => result.ratio < result.min)
      .map(
        (result) =>
          `${result.theme}: ${result.label} (${result.foreground} on ${result.background}) is ${result.ratio.toFixed(2)}:1, needs ${result.min}:1`
      );
    expect(failures).toEqual([]);
  },
};
