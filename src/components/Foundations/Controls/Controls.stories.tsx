import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Button } from "../../Atoms/Button/Button";
import { Card } from "../../Atoms/Card/Card";
import { ButtonLink } from "../../Atoms/ButtonLink/ButtonLink";
import { Chip } from "../../Atoms/Chip/Chip";
import { ChipLink } from "../../Atoms/ChipLink/ChipLink";
import { Text } from "../../Atoms/Text/Text";
import { Input } from "../../Molecules/Input/Input";
import { Select } from "../../Molecules/Select/Select";
import { linkStyles } from "../../styles/linkStyles";

/**
 * Documentation-only story with the rules that make components read as one system. Its `play`
 * function measures the control heights, so a component that drifts from them fails `npm test`.
 */
const meta = {
  title: "Foundations/Controls",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="flex flex-col gap-3">
    <Text as="h2" size="small" weight="semibold" color="darker">
      {title}
    </Text>
    {children}
  </section>
);

const radii = [
  { name: "Buttons", className: "rounded-button" },
  { name: "Fields", className: "rounded-field" },
  { name: "Cards", className: "rounded-card" },
  { name: "Pills", className: "rounded-full" },
];

const weights = [
  { name: "400 body", className: "font-normal" },
  { name: "500 controls and labels", className: "font-medium" },
  { name: "600 titles and headings", className: "font-semibold" },
  { name: "700 display text", className: "font-bold" },
];

export const Rules: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Section title="Height: 32, 40 and 48px">
        <div className="flex flex-wrap items-center gap-2">
          <Button size="small">Small</Button>
          <Button>Medium</Button>
          <Button size="large">Large</Button>
        </div>
      </Section>
      <Section title="Controls side by side">
        <div className="flex flex-wrap items-end gap-2">
          <div className="w-56">
            <Input label="Search" hideLabel name="controls-search" placeholder="Search" />
          </div>
          <div className="w-40">
            <Select
              label="Status"
              hideLabel
              name="controls-status"
              options={[{ value: "active", label: "Active" }]}
            />
          </div>
          <Button>Search</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Chip>Filter</Chip>
          <ButtonLink href="#button-link">Button link</ButtonLink>
          <ChipLink href="#chip-link">Chip link</ChipLink>
        </div>
      </Section>
      <Section title="Radius">
        <div className="flex gap-3">
          {radii.map(({ name, className }) => (
            <div
              key={name}
              className={`flex h-16 w-28 items-center justify-center border border-neutral-400 text-sm text-neutral-900 ${className}`}
            >
              {name}
            </div>
          ))}
        </div>
      </Section>
      <Section title="Font weight">
        <ul className="flex flex-col gap-1 text-sm text-neutral-900">
          {weights.map(({ name, className }) => (
            <li key={name} className={className}>
              {name}
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Links and focus">
        <Text size="small">Press Tab to move through this page and see the focus ring.</Text>
        <div className="flex gap-6 text-sm">
          <a href="#inline" className={linkStyles({ variant: "inline" })}>
            Inline link
          </a>
          <a href="#nav" className={linkStyles({ variant: "nav" })}>
            Navigation link
          </a>
        </div>
      </Section>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const height = (element: HTMLElement) => element.getBoundingClientRect().height;

    await expect(height(canvas.getByRole("button", { name: "Small" }))).toBe(32);
    await expect(height(canvas.getByRole("button", { name: "Medium" }))).toBe(40);
    await expect(height(canvas.getByRole("button", { name: "Large" }))).toBe(48);
    await expect(height(canvas.getByRole("textbox", { name: "Search" }))).toBe(40);
    await expect(height(canvas.getByRole("combobox", { name: "Status" }))).toBe(40);
    await expect(height(canvas.getByRole("button", { name: "Search" }))).toBe(40);
    await expect(height(canvas.getByRole("button", { name: "Secondary" }))).toBe(40);
    await expect(height(canvas.getByRole("button", { name: "Outline" }))).toBe(40);
    await expect(height(canvas.getByRole("button", { name: "Filter" }))).toBe(40);
    await expect(height(canvas.getByRole("link", { name: "Button link" }))).toBe(40);
    await expect(height(canvas.getByRole("link", { name: "Chip link" }))).toBe(40);
  },
};

// One button, field and card per row, so each row can be measured on its own.
const RadiusRow = ({
  name,
  className,
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <section aria-label={name} style={style} className="flex items-center gap-2">
    <Button className={className}>Save</Button>
    <Input label="Name" hideLabel name={`radius-${name}`} className={className} />
    <Card as="article" aria-label="Card" className={`p-4 ${className ?? ""}`}>
      Card
    </Card>
  </section>
);

/**
 * Buttons, fields and cards are rounded by role (`--radius-button`, `--radius-field`,
 * `--radius-card`). The `play` function checks the three things the roles promise: the defaults
 * follow Tailwind's scale, a brand can override each role, and a consumer's `rounded-*` class
 * still wins over the role.
 */
export const RadiusRoles: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <RadiusRow name="Default" />
      <RadiusRow
        name="Brand"
        style={
          {
            "--radius-button": "9999px",
            "--radius-field": "12px",
            "--radius-card": "24px",
          } as React.CSSProperties
        }
      />
      <RadiusRow name="Class" className="rounded-2xl" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const radiiIn = (row: string) => {
      const section = within(within(canvasElement).getByRole("region", { name: row }));
      const radius = (element: HTMLElement) => getComputedStyle(element).borderTopLeftRadius;
      return [
        radius(section.getByRole("button", { name: "Save" })),
        radius(section.getByRole("textbox", { name: "Name" })),
        radius(section.getByRole("article", { name: "Card" })),
      ];
    };

    await expect(radiiIn("Default")).toEqual(["4px", "4px", "8px"]);
    // The roles default to `--radius-sm` and `--radius-lg`, so an app that set those on the root
    // (in its own `@theme`) keeps its shapes. A role resolves them where it is declared, the root, so
    // setting them on a nested element would do nothing.
    const root = document.documentElement.style;
    root.setProperty("--radius-sm", "2px");
    root.setProperty("--radius-lg", "6px");
    try {
      await expect(radiiIn("Default")).toEqual(["2px", "2px", "6px"]);
    } finally {
      root.removeProperty("--radius-sm");
      root.removeProperty("--radius-lg");
    }
    await expect(radiiIn("Brand")).toEqual(["9999px", "12px", "24px"]);
    // A consumer's class replaces each role (one component per role is measured). `rounded-2xl` comes before the role
    // names in the generated CSS, so without the tailwind-merge config in `tv.ts` both classes would
    // stay and the role would win.
    await expect(radiiIn("Class")).toEqual(["16px", "16px", "16px"]);
  },
};
