import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Alert } from "../../Molecules/Alert/Alert";
import { Button } from "../../Atoms/Button/Button";
import { Input } from "../../Molecules/Input/Input";
import { SidebarNav } from "../../Molecules/SidebarNav/SidebarNav";
import { Text } from "../../Atoms/Text/Text";
import { brandStyle, mockedBrands } from "./brandsMock";

/**
 * Documentation-only story. A brand overrides some of the brand tokens (`brandTokenNames`): colors,
 * radius roles and fonts. Components read them through classes such as `bg-primary` and
 * `rounded-button`, so an override on any element re-themes everything inside it. Each column below
 * scopes one example brand to its own element; "Example warm" overrides every brand token (the
 * `radius-sm` and `radius-lg` steps only take effect on the root, so here only the roles change).
 * Axe checks every column in both themes, and the `play` function asserts that each brand color
 * reaches the button. The `validateBrand` unit test checks that every example is valid.
 *
 * Outside this story, use the **Brand** control in the toolbar to see any story under an example brand.
 * Apps set the same variables on `<html>`; see the Consumers guide.
 */
const meta = {
  title: "Foundations/Brands",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Examples: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {mockedBrands.map((brand) => (
        <section
          key={brand.id}
          aria-label={brand.title}
          style={brandStyle(brand)}
          className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-surface p-4"
        >
          <Text color="darker" weight="semibold" font="display">
            {brand.title}
          </Text>
          <div className="flex gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>
          <Input label="Email" name={`email-${brand.id}`} defaultValue="ana@example.com" />
          <Alert title="Sign in failed">Check your email and password.</Alert>
          <SidebarNav
            label={`${brand.title} navigation`}
            items={[
              { label: "Products", href: "#products", current: true },
              { label: "Settings", href: "#settings" },
            ]}
          />
        </section>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fill = (brand: string) =>
      getComputedStyle(
        within(canvas.getByRole("region", { name: brand })).getByRole("button", { name: "Primary" })
      ).backgroundColor;

    const fills = mockedBrands.map((brand) => fill(brand.title));
    await expect(new Set(fills).size).toBe(mockedBrands.length);
  },
};
