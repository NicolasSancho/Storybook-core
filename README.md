# Storybook-core

[![npm version](https://img.shields.io/npm/v/@nicolassancho/storybook-core)](https://www.npmjs.com/package/@nicolassancho/storybook-core)
[![CI](https://github.com/NicolasSancho/Storybook-core/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/NicolasSancho/Storybook-core/actions/workflows/main.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

An accessible React component library styled with Tailwind CSS v4 and `tailwind-variants`, and
documented in Storybook. It is published to npm as `@nicolassancho/storybook-core`.

**[Browse the live Storybook](https://nicolassancho.github.io/Storybook-core/)**

![A responsive product grid built with the library](https://raw.githubusercontent.com/NicolasSancho/Storybook-core/main/docs/product-grid.png)

## Highlights

- **Built with accessibility in mind.** Semantic HTML, visible keyboard focus, accessible names, and
  `prefers-reduced-motion` support. [axe](https://github.com/dequelabs/axe-core) runs on every story
  in CI, and a violation fails the build. Automated checks catch only part of what matters, so this
  is a safety net, not a claim of WCAG conformance.
- **Server Components first.** Presentational components are stateless, so they carry no
  `"use client"` directive and render on the server with no client JavaScript. A component that needs
  interaction marks itself as a client component, and the package check verifies that the directive
  survives the build.
- **Bring your own router and image component.** Navigation uses `href` and renders a plain `<a>`
  by default. Pass `LinkComponent` (e.g. `next/link`) or `ImageComponent` (e.g. `next/image`) to
  plug in your framework.
- **Design tokens, not compiled CSS.** Colors, font sizes and breakpoints ship as a Tailwind v4
  `@theme` file, and your app's Tailwind generates the classes.
- **Light and dark themes.** The dark theme follows the operating system, a `data-theme` attribute
  on `<html>` overrides it, and every story is checked with axe and its `play` test in both themes.
- **Typed and documented.** TypeScript strict, every prop documented in JSDoc, and interaction
  tests written as Storybook `play` functions.

## Components

| Layer     | Components                                                                          |
| --------- | ----------------------------------------------------------------------------------- |
| Atoms     | Button, ButtonLink, Card, Chip, ChipLink, Icon, Image, Label, RadioButton, SearchInput (deprecated), Spinner, Text |
| Molecules | Alert, Breadcrumbs, CartIcon, Input, Popover, ProductCard, ProductDetails, RadioGroup, SidebarNav |
| Organisms | Footer, Header, ProductGrid                                                         |
| Layouts   | Container, Grid                                                                     |

The palette and the contrast of each text color are documented under **Foundations / Colors** in
Storybook.

![The color palette, with the text contrast of each step](https://raw.githubusercontent.com/NicolasSancho/Storybook-core/main/docs/colors.png)

![The same palette in the dark theme](https://raw.githubusercontent.com/NicolasSancho/Storybook-core/main/docs/colors-dark.png)

## Using the library

Install the package, then add the design tokens and the source scan to your Tailwind v4 stylesheet:

```bash
npm install @nicolassancho/storybook-core
```

```css
@import "tailwindcss";
@import "@nicolassancho/storybook-core/styles/theme.css";
@source "../node_modules/@nicolassancho/storybook-core/dist";
```

The library ships its design tokens (colors, font sizes, breakpoints), not compiled CSS: your app's
Tailwind generates the classes, and `@source` is what makes it scan the library. `react`, `react-dom`
(19), `tailwindcss` (v4), `tailwind-variants` (v3) and `tailwind-merge` (v3) are
peer dependencies.

```tsx
import { Button } from "@nicolassancho/storybook-core";

const App = () => <Button variant="primary">Click Me</Button>;
```

The full guide (install, links and images, the Next.js App Router) is the **Consumers** page in
[Storybook](https://nicolassancho.github.io/Storybook-core/).

## Development

```bash
npm install          # also builds the library (the `prepare` script)
npm run storybook    # dev server on http://localhost:6006
npm test             # runs every story in headless Chromium, in both themes, with axe and the play tests
npm run build        # compiles the library to dist/
```

The first `npm test` run needs the browser: `npx playwright install chromium`.

### Creating components

Components are created by hand. Copy an existing component folder in `src/components/<Layer>/` as the
starting point: it holds the component, its story and a mock file. Then export the component from
`src/index.js`.

Tests are `play` functions in the component's story file, not separate test files.

## Contributing

1. Branch from `main` (`feat/<description>` or `fix/<description>`) and open a pull request.
2. Run `npx tsc --noEmit`, `npm run lint`, `npx prettier --check ./src ./.storybook` and `npm test`
   before pushing. CI runs the same checks plus a Storybook build. Run `npm run test:package` too
   when you change exports, styles or imports: it installs the packed package and renders it in
   plain Node.
3. Bump the version as the last commit (`npm version <patch|minor> --no-git-tag-version`). CI fails
   a pull request that keeps the version of `main`, and every push to `main` publishes to npm.

## License

[MIT](LICENSE)
