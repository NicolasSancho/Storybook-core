# Storybook-core

An accessible React component library styled with Tailwind CSS v4 and `tailwind-variants`, and
documented in Storybook. It is published to npm as `@nicolassancho/storybook-core`.

The live Storybook is at https://nicolassancho.github.io/Storybook-core/.

## Using the library

Install `@nicolassancho/storybook-core` from npm, then add the design tokens and the
source scan to your Tailwind v4 stylesheet:

```css
@import "tailwindcss";
@import "@nicolassancho/storybook-core/styles/theme.css";
@source "../node_modules/@nicolassancho/storybook-core/dist";
```

The library ships its design tokens (colors, font sizes, breakpoints), not compiled CSS: your app's
Tailwind generates the classes, and `@source` is what makes it scan the library. `react`, `react-dom`,
`tailwindcss` (v4), `tailwind-variants` (v3) and `tailwind-merge` (v3) are peer dependencies.

```tsx
import { Button } from "@nicolassancho/storybook-core";

const App = () => <Button variant="primary">Click Me</Button>;
```

The full guide (install, links and images, the Next.js App Router) is the **Consumers** page in
Storybook.

## Development

### Installation

To install the dependencies, run:

```bash
npm install
```

### Running Storybook

To start the Storybook server, run:

```bash
npm run storybook
```

This will start the Storybook server and open it in your default browser.

### Building the Library

To build the component library, run:

```bash
npm run build
```

This will create a production build of the library in the `dist` folder.

### Creating Components

You can create new components using Plop. To generate a new component, run:

```bash
npm run generate
```

Follow the prompts to specify the component name and type (Atoms, Molecules, Organisms). This will create the component files, including the component itself, a Storybook story, and a mock file.
