# Storybook-core

This is a Storybook components library that is going to be consumed by other internal projects. It uses Tailwind CSS for styling.

## Using the library

Install `@NicolasSancho/storybook-core` from GitHub Packages, then add the tokens and the source
scan to your Tailwind v4 stylesheet:

```css
@import "tailwindcss";
@import "@NicolasSancho/storybook-core/styles/theme.css";
@source "../node_modules/@NicolasSancho/storybook-core/dist";
```

The full guide (install, links and images, the Next.js App Router) is the **Consumers** page in
Storybook.

## Installation

To install the dependencies, run:

```bash
npm install
```

## Running Storybook

To start the Storybook server, run:

```bash
npm run storybook
```

This will start the Storybook server and open it in your default browser.

## Building the Library

To build the component library, run:

```bash
npm run build
```

This will create a production build of the library in the `dist` folder.

## Creating Components

You can create new components using Plop. To generate a new component, run:

```bash
npm run generate
```

Follow the prompts to specify the component name and type (Atoms, Molecules, Organisms). This will create the component files, including the component itself, a Storybook story, and a mock file.

## Using the Components

To use the components in your project, import them as needed. For example:

```tsx
import { Button } from 'storybook-core';

const App = () => (
  <Button variant="primary">Click Me</Button>
);
```

## Tailwind CSS

The library uses Tailwind CSS v4. The design tokens (colors, font sizes, breakpoints) live in an `@theme` block in `src/styles/theme.css`, which is published as `dist/styles/theme.css`. The library ships no compiled CSS: the consuming app's Tailwind generates the classes. In the app's global stylesheet:

```css
@import "tailwindcss";
@import "@NicolasSancho/storybook-core/dist/styles/theme.css";
@source "../node_modules/@NicolasSancho/storybook-core/dist";
```

`tailwindcss` (v4), `tailwind-variants` (v3) and `tailwind-merge` (v3) are peer dependencies.

## Contributing

If you would like to contribute to this project, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
