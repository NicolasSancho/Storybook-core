# Changelog

All notable changes to `@nicolassancho/storybook-core` are listed here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/).

## 3.3.0 - 2026-10-13

### Added

- A `Chip` atom for choosing a category or filter. With `href` it is a link (it takes a
  `LinkComponent` and sets `aria-current="true"` when selected). Without it, it is a button that sets
  `aria-pressed`. A `type="submit"` chip with a `name` and `value` submits a native form.
- A "Forms and filters without JavaScript" section in the Consumers guide.

### Changed

- `RadioGroup`, `RadioButton` and `SearchInput` work uncontrolled. `value`, `checked` and `onChange` are
  now optional, and `defaultValue` (`defaultChecked` on `RadioButton`) sets the starting state. A Server
  Component can render them inside a native `<form>` with no handler. Controlled use is unchanged.

## 3.2.0 - 2026-10-12

### Added

- Two larger sizes, `text-3xl` (40px) and `text-4xl`, a fluid display size that goes from 36px on
  phones to 64px on wide screens, with a tighter line-height and letter-spacing.
- A `--font-display` token for headings. It defaults to the body font, and an app sets it to use a
  second font. The Consumers guide has a Fonts section with the `next/font` setup.
- `Text` has two new sizes, `heading` and `display`, a `font` prop (`body` or `display`) and a
  `medium` weight.
- A Typography page under Foundations that shows the scale, read from the tokens. Its test fails on
  a size that is missing, is not in rem or has no line-height.

### Changed

- Font sizes are now in rem, so they follow the browser's font-size setting. The sizes at the
  default setting are the same as before.
- Every size now sets its own line-height (for example `text-sm` is 14px on 20px). Text that was
  using the page's line-height changes height slightly.

## 3.1.0 - 2026-10-12

### Added

- A dark theme. Every color token is one `light-dark(light, dark)` value, so the library follows the
  operating system by default. Set `data-theme="light"` or `data-theme="dark"` on `<html>` to force
  one. The dark values keep the contrast of their light twins, and every pairing is asserted in the
  Colors story.
- `surface` token for the page and control background, and `on-primary`, `on-secondary` and
  `on-danger` tokens for text on filled backgrounds. Use them instead of `bg-white` and
  `text-white`, which stay white in dark.
- A theme switch (Light, Dark, System) in the Storybook toolbar. `npm test` runs every story in both
  themes.

### Changed

- Because dark follows the OS by default, consumers on a dark OS get the dark theme without any
  change. Set `data-theme="light"` on `<html>` to opt out.
- SearchInput now sets its text color (`text-neutral-900`) and uses `bg-surface`.
- The Colors story reads its values from the page, and lists the contrast pairings for both themes.

## 3.0.13 - 2026-10-12

### Added

- A Welcome landing page in Storybook, with a short intro, the install command, a color strip
  and links to Consumers and Colors.

### Changed

- The Storybook sidebar now lists Welcome, Consumers and Foundations before the components.

## 3.0.12 - 2026-10-12

### Fixed

- ProductGrid no longer overwrites a product's own `onProductClick` with the result of
  `getOnProductClick`. The product's handler wins, and `getOnProductClick` is the fallback.

## 3.0.11 - 2026-10-12

### Changed

- SearchInput uses the `rounded-sm` control radius instead of `rounded-md`.
- SearchInput no longer sets a default `name="search"`. Pass `name` to include it in a form.

### Fixed

- SearchInput's "Search" fallback label no longer treats `id` alone as a label. Name it with
  `aria-label`, or point `aria-labelledby` at a visible `Label`.

## 3.0.10 - 2026-10-12

### Changed

- Updated ESLint to 9.39, Prettier to 3.9 and TypeScript to 5.9 (development tooling only).

## 3.0.9 - 2026-10-12

### Changed

- Updated the lockfile and typescript-eslint to fix audited vulnerabilities (development
  dependencies only).

### Removed

- Plop, the component generator. Components are created by copying an existing folder.

## 3.0.8 - 2026-10-12

### Added

- This changelog.

## 3.0.7 - 2026-10-12

### Changed

- Rewrote the README: badges, screenshots, a highlights list, a components table and contributing
  notes.

## 3.0.6 - 2026-10-12

### Added

- `play` tests for Button, SearchInput, RadioButton and Header.

## 3.0.5 - 2026-10-12

### Added

- `@storybook/addon-a11y`: axe runs on every story in `npm test`, and a violation fails it.

## 3.0.4 - 2026-10-12

### Changed

- Removed the unused `sass` and `@vitest/coverage-v8` development dependencies.
- Prettier now also checks `.storybook`.

## 3.0.3 - 2026-10-11

### Added

- The Storybook is deployed to GitHub Pages: https://nicolassancho.github.io/Storybook-core/

## 3.0.2 - 2026-10-11

### Changed

- Removed the onboarding and Chromatic Storybook addons, the Storybook template comments and the
  third-party photos and brand from the mocks.

## 3.0.1 - 2026-10-11

### Changed

- The package is published to npm as `@nicolassancho/storybook-core`.

## 3.0.0 - 2026-10-11

Prepares the library for Next.js (App Router) and publishing.

### Added

- `ImageComponent` (on `Image`, `ProductCard` and `ProductGrid`) and `LinkComponent` (on
  `Breadcrumbs`, `ProductCard` and `ProductGrid`), so a framework image or link (e.g. `next/image`,
  `next/link`) can be passed in. They default to a plain `<img>` and `<a>`.
- `ProductCard` renders its title as a real link stretched over the card when `href` is set.
- `imageProps` on `ProductCard` for `srcSet`, `sizes`, `width`, `height` and `loading`.
- An `exports` map and `sideEffects` in `package.json`.
- A Consumers guide in Storybook, and `play` tests for the link and image injection.

### Changed

- **Breaking:** the Breadcrumbs `LinkComponent` receives `href` instead of `to`.
- **Breaking:** deep imports into `dist/` are blocked by the `exports` map. Use the package root and
  `styles/theme.css`.
- Components stay free of `"use client"` so they render from Server Components.

## 2.1.0 - 2026-10-11

### Changed

- Migrated to Tailwind CSS v4. `tailwindcss` (v4), `tailwind-variants` (v3) and `tailwind-merge` (v3)
  are now peer dependencies, replacing `tailwindcss` v3 and `tailwind-variants` v0.2.
- The package ships its design tokens (`dist/styles/theme.css`) instead of a compiled stylesheet.
  Consumers import the tokens and add `@source` for the library.

## 2.0.0 - 2026-10-10

### Changed

- **Breaking:** the `Text` colors `light` and `lighter` were removed. Every remaining `Text` color
  reaches 4.5:1 contrast on white.
- Components use the `neutral` and `danger` tokens instead of Tailwind's `gray-*` and `red-*`.

## 1.x

Early releases, before the palette and the Next.js work.
