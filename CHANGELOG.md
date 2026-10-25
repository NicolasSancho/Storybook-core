# Changelog

All notable changes to `@nicolassancho/storybook-core` are listed here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/).

## 4.2.0 - 2026-10-25

### Added

- `ButtonLink`: a link that looks like a `Button`, for a call to action that goes to another page. It
  takes `href`, `variant`, `size`, `className` and an optional `LinkComponent` (for example
  `next/link`), and has no `disabled` prop because a link cannot be disabled. `Button` is unchanged: the two
  share their styles.

## 4.1.4 - 2026-10-13

### Changed

- The contributor guidance in `CLAUDE.md` is split into one file per area (components, styles, CI),
  with stale statements fixed. The package did not change.

## 4.1.3 - 2026-10-13

### Changed

- The icons are now inline SVGs from Feather instead of the `react-feather` package, which was
  last published in 2022. The package has no runtime dependencies any more. The `Icon` props and the
  markup it renders are unchanged.

## 4.1.2 - 2026-10-13

### Changed

- CI now installs the packed package in a clean project and checks it with `publint`, `attw` and a
  Node render test before every publish. The package itself did not change.

## 4.1.1 - 2026-10-13

### Fixed

- The package now loads in Node's native ESM. Its files imported each other without the `.js`
  extension, which bundlers resolve but Node does not, so `import "@nicolassancho/storybook-core"`
  failed with `ERR_MODULE_NOT_FOUND` outside a bundler. The components and their API are unchanged.

## 4.1.0 - 2026-10-13

### Added

- A `Container` layout: page content at one width (`max-w-6xl`), centered, with side padding that
  grows from `px-4` to `px-6` at the `sm` breakpoint. It takes an `as` prop to render a landmark such
  as `main`.

### Changed

- `Header` and `Footer` keep their bar full-width and put their content in a `Container`, so on a wide
  screen the content is centered instead of stretching to the edges, and page content wrapped in a
  `Container` lines up with both. Their side padding is now the `Container`'s.

## 4.0.1 - 2026-10-13

### Changed

- Each release is now tagged and published as a GitHub Release by CI. The tag is `v<version>` and the
  notes are that version's section of this changelog.
- The package is published with npm provenance, so npm shows which workflow run and commit built it.
- A pull request now fails when this changelog has no section for the version in `package.json`.

No code changed: the package contents are identical to 4.0.0.

## 4.0.0 - 2026-10-13

This release is breaking, so it batches the API cleanups that the first real app needed. The
library has one consumer, a Next.js storefront, and each item below removes a mode or a prop that
neither the app nor a test used, or that a Server Component cannot use.

### Removed

- `Header.Left`, `Header.Center`, `Header.Right` and `HeaderSlotProps`. Static sub-components cannot
  be client components, and the header had a fixed height with three equal slots. See Changed.
- `onProductClick`, `onClick` and `buttonLabel` on `ProductCard`, and `getOnProductClick` on
  `ProductGrid`. A Server Component cannot pass handlers, so every card needed a Client Component
  just to add to the cart. See Added.
- `Chip` no longer renders a link. Use `ChipLink`.
- `onClick` is no longer part of the `LinkComponent` contract: a link component receives `href`,
  `className` and `children` (and `aria-current` on `ChipLink`).
- Support for React 18. The peer range is now `^19.0.0`.

### Changed

- `Header` takes `brand`, `actions`, `navItems`, `navLabel` and `LinkComponent` as props. It grows with
  its content (`min-h-16`, wrapping) instead of overflowing on a phone, and the navigation sits between
  the brand and the actions from `md` up and on a row of its own below.
- Tests run on React 19.3 (the version the app uses) and Storybook 10.6.2. The lockfile was
  regenerated to resolve the new peers.

### Added

- `ChipLink`: the link version of `Chip`, with a required `href`, `aria-current` and `LinkComponent`.
- `actions` on `ProductCard`: controls such as an add-to-cart `<form>` that sit above the stretched
  link, so pressing one does its own action and pressing anywhere else opens the product.
- `navItems` and `navLabel` on `Header`: a labelled `<nav>` landmark, rendered only when there are
  items.

### Migrating

```tsx
// Header
-(
  <Header>
    <Header.Left>{brand}</Header.Left>
    <Header.Right>{actions}</Header.Right>
  </Header>
) +
  <Header brand={brand} actions={actions} /> -
  (
    // Chip as a link
    <Chip href="/products" selected>
      All
    </Chip>
  ) +
  (
    <ChipLink href="/products" selected>
      All
    </ChipLink>
  ) -
  (
    // ProductCard button
    <ProductCard {...product} onClick={addToCart} buttonLabel="Add to cart" />
  ) +
  (
    <ProductCard
      {...product}
      actions={
        <form action={addToCart}>
          <Button type="submit">Add to cart</Button>
        </form>
      }
    />
  );
```

## 3.4.0 - 2026-10-13

### Added

- A `Footer` organism: a `contentinfo` landmark with an optional brand block, link columns and a legal
  line. The columns share one labelled `<nav>` (`navLabel`, "Footer" by default), each under an `<h2>`,
  and the links go through `LinkComponent` like `Breadcrumbs`. With no columns no navigation is
  rendered.
- `Sun` and `Moon` icons, for a theme toggle.

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
