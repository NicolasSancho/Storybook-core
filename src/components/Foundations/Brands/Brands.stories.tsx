import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Alert } from "../../Molecules/Alert/Alert";
import { Button } from "../../Atoms/Button/Button";
import { Input } from "../../Molecules/Input/Input";
import { SidebarNav } from "../../Molecules/SidebarNav/SidebarNav";
import { Text } from "../../Atoms/Text/Text";
import { brandStyle, mockedBrands } from "./brandsMock";

/**
 * Documentation-only story. A tenant's brand is two tokens, `--color-primary` and
 * `--color-primary-darker`. Components read them through classes such as `bg-primary`, so an override on
 * any element re-themes everything inside it. Each column below scopes one example brand to its own
 * element and renders the components that use the brand color. Axe checks all three in both themes,
 * and the `play` function asserts that the brand color really reaches the button.
 *
 * Outside this story, use the **Brand** control in the toolbar to see any story under an example brand.
 * Apps set the same two variables on `<html>`; see the Consumers guide.
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
    <div className="grid gap-6 md:grid-cols-3">
      {mockedBrands.map((brand) => (
        <section
          key={brand.id}
          aria-label={brand.title}
          style={brandStyle(brand)}
          className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-surface p-4"
        >
          <Text color="darker" weight="semibold">
            {brand.title}
          </Text>
          <div className="flex gap-2">
            <Button>Primary</Button>
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

    const [library, green, violet] = mockedBrands.map((brand) => fill(brand.title));
    await expect(new Set([library, green, violet]).size).toBe(3);
  },
};
