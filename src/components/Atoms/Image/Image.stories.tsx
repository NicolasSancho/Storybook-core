import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import { Image } from "./Image";
import { mockedImage, smallCircleImage, largeSquareImage } from "./imageMock";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Atoms/Image",
  component: Image,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

// Spy standing in for a framework image (e.g. next/image): records the props it receives.
const imageSpy = fn((props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />);

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Default: Story = {
  args: mockedImage,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // The alt text is the accessible name, and a plain <img> is rendered by default.
    await expect(canvas.getByRole("img", { name: args.alt })).toHaveAttribute("src", args.src);
  },
};

export const WithAttributes: Story = {
  args: { ...mockedImage, loading: "lazy", decoding: "async", width: 128, height: 128 },
  play: async ({ args, canvasElement }) => {
    const image = within(canvasElement).getByRole("img", { name: args.alt });

    // Standard <img> attributes are forwarded to the element.
    await expect(image).toHaveAttribute("loading", "lazy");
    await expect(image).toHaveAttribute("decoding", "async");
    await expect(image).toHaveAttribute("width", "128");
    await expect(image).toHaveAttribute("height", "128");
  },
};

export const CustomComponent: Story = {
  args: { ...mockedImage, ImageComponent: imageSpy, loading: "lazy", width: 128 },
  beforeEach: () => {
    imageSpy.mockClear();
  },
  play: async ({ args }) => {
    const received = imageSpy.mock.calls.map(([props]) => props);

    // The injected component gets src, alt, a class and every other attribute.
    await expect(received).toContainEqual(
      expect.objectContaining({ src: args.src, alt: args.alt, loading: "lazy", width: 128 })
    );
    await expect(received.every(({ className }) => Boolean(className))).toBe(true);
  },
};

export const SmallCircle: Story = {
  args: smallCircleImage,
};

export const LargeSquare: Story = {
  args: largeSquareImage,
};
