import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { tv } from "tailwind-variants";

/**
 * Documentation-only story for the type scale. It has no size data of its own: every size and
 * line-height is read from the `--text-*` variables in `src/styles/theme.css`, so it cannot drift
 * from them. The one list kept here is the sizes and what each is for. The `play` function fails
 * when a size is missing, is not in rem, or has no line-height of its own.
 */

interface Step {
  token: string;
  use: string;
  sample: string;
}

const steps: Step[] = [
  {
    token: "xs",
    use: "Badges and captions. Avoid it on interactive text.",
    sample: "Only 2 items left in stock",
  },
  { token: "sm", use: "Controls, card text and breadcrumbs.", sample: "Wool crewneck sweater" },
  { token: "base", use: "Body text.", sample: "Soft, warm and made to last for years." },
  { token: "lg", use: "Large body text and large buttons.", sample: "Free shipping over $50" },
  { token: "xl", use: "Page and section titles.", sample: "New arrivals" },
  { token: "2xl", use: "Headings.", sample: "Everything for the cold season" },
  { token: "3xl", use: "Large headings.", sample: "Built to last" },
  {
    token: "4xl",
    use: "Hero and display text. Fluid: 40px on phones, 64px from about 1000px wide.",
    sample: "Dress for the weather",
  },
];

interface Measured extends Step {
  size: string;
  lineHeight: string;
  letterSpacing: string;
}

/** Reads one token from the page, and throws when it is not defined. */
const readVariable = (name: string, optional = false): string => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!value && !optional) {
    throw new Error(`${name} is not defined on the page`);
  }
  return value;
};

const measure = (): Measured[] =>
  steps.map((step) => ({
    ...step,
    size: readVariable(`--text-${step.token}`),
    lineHeight: readVariable(`--text-${step.token}--line-height`),
    letterSpacing: readVariable(`--text-${step.token}--letter-spacing`, true),
  }));

const typographyStyles = tv({
  slots: {
    page: "mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12",
    intro: "flex flex-col gap-3",
    title: "text-xl font-bold text-neutral-900",
    lead: "max-w-2xl text-base text-neutral-600",
    list: "flex flex-col",
    row: "grid gap-2 border-b border-neutral-200 py-6 md:grid-cols-[14rem_1fr] md:gap-8",
    meta: "flex flex-col text-sm",
    name: "font-bold text-neutral-900",
    detail: "text-neutral-600 tabular-nums",
    use: "mt-2 text-neutral-600",
    sample: "font-sans text-neutral-900",
  },
});

const sampleClass: Record<string, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

const TypographyPage: React.FC = () => {
  const styles = typographyStyles();
  const [measured] = React.useState(measure);

  return (
    <div className={styles.page()}>
      <div className={styles.intro()}>
        <h1 className={styles.title()}>Typography</h1>
        <p className={styles.lead()}>
          A closed scale of eight sizes. Sizes are in rem, so they follow the browser's font-size
          setting, and each size sets its own line-height. The font family is the consumer's: the
          components use <code>font-sans</code>, so an app sets <code>--font-sans</code> once (with{" "}
          <code>next/font</code> in Next.js).
        </p>
      </div>
      <ul className={styles.list()} aria-label="Type scale">
        {measured.map((item) => (
          <li key={item.token} className={styles.row()}>
            <div className={styles.meta()}>
              <span className={styles.name()}>text-{item.token}</span>
              <span className={styles.detail()}>Size {item.size}</span>
              <span className={styles.detail()}>Line height {item.lineHeight}</span>
              {item.letterSpacing && (
                <span className={styles.detail()}>Tracking {item.letterSpacing}</span>
              )}
              <span className={styles.use()}>{item.use}</span>
            </div>
            <p className={styles.sample({ className: sampleClass[item.token] })}>{item.sample}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const meta: Meta<typeof TypographyPage> = {
  title: "Foundations/Typography",
  component: TypographyPage,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TypeScale: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const items = canvas.getAllByRole("listitem");
    await expect(items).toHaveLength(steps.length);

    measure().forEach((item) => {
      // rem follows the user's font-size setting; px does not. 4xl is a clamp() of rem values.
      expect(item.size, `${item.token} size`).toMatch(/rem/);
      expect(item.size, `${item.token} size`).not.toMatch(/\d(px)/);
      // A size without its own line-height falls back to the page's, which is too loose for headings.
      expect(item.lineHeight, `${item.token} line-height`).not.toBe("");
    });
  },
};
