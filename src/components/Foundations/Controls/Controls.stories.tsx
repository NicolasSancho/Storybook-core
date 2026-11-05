import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Button } from "../../Atoms/Button/Button";
import { ButtonLink } from "../../Atoms/ButtonLink/ButtonLink";
import { Chip } from "../../Atoms/Chip/Chip";
import { ChipLink } from "../../Atoms/ChipLink/ChipLink";
import { SearchInput } from "../../Atoms/SearchInput/SearchInput";
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
  { name: "Controls", className: "rounded-sm" },
  { name: "Surfaces", className: "rounded-lg" },
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
          <div className="w-56">
            <SearchInput aria-label="Search products" />
          </div>
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
    await expect(height(canvas.getByRole("searchbox", { name: "Search products" }))).toBe(40);
  },
};
