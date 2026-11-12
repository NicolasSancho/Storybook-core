# Changelog

All notable changes to `@nicolassancho/ui` are listed here. Up to 4.11.0 it was published as
`@nicolassancho/storybook-core`. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/).

## 5.1.1 - 2026-11-12

### Changed

- Story tests query by role and accessible name instead of CSS classes and DOM structure (Select,
  Breadcrumbs, ProductDetails, TableSkeleton), and CartIcon's accessible name is tested for an empty cart
  and a single item. The package contents do not change.

## 5.1.0 - 2026-11-11

A brand contract: the package now says which tokens a brand may override, and checks a brand before an
app applies it.

### Added

- `brandTokenNames` and the `Brand` and `BrandToken` types: the tokens a brand may override. Colors:
  `primary`, `primary-darker`, `secondary`, `secondary-darker`, `surface` and `neutral-25` to
  `neutral-950`. Radius: `radius-button`, `radius-field`, `radius-card`, `radius-sm` and `radius-lg`.
  Fonts: `font-sans` and `font-display`. Every other token is fixed.
- `validateBrand(brand)`: rejects values that are not `[light, dark]` hex pairs, lengths or font-family
  lists, then checks the library's list of contrast pairings in both themes, with the brand laid over
  the defaults. It returns the failures as data, with a stable id for each pairing. It is not a client
  module, so server code can call it.
- `brandToCssVariables(brand)`: a brand as CSS custom properties. It throws on a brand whose format is
  invalid.
- Contrast checks for the current SidebarNav item (`neutral-900` on `primary/10` over `surface`), the
  hover background of outline buttons and sidebar items (`neutral-900` on `neutral-100`), table headers
  and neutral badges (`neutral-700` on `neutral-50`), and the Alert body (`neutral-900` on
  `danger-subtle`).

### Deprecated

- The primary ramp (`primary-50` to `primary-950`) and `primary-lighter`. No component reads them, and
  a brand that overrides `primary` leaves them blue. Use `primary`, `primary-darker` or a translucent
  `primary` (`bg-primary/10`). They are removed in 6.0.

## 5.0.0 - 2026-11-11

The package is renamed `@nicolassancho/ui`: it is a design system, and Storybook is only where it is
documented. The version line continues from `@nicolassancho/storybook-core` 4.11.0, which is the last
release under the old name. This release is breaking, so it also removes what 4.x deprecated and
fixes two contracts that were too loose for theming.

`Icon`, the `SidebarNav` icon names and the old `LinkComponent` type change here without the
deprecation release the versioning policy asks for. The rename already makes every consumer change
its install and its imports, and the only 4.x consumers stay on 4.x, so a 4.12 warning would reach
nobody who could act on it. The rest of the removals were deprecated in 4.x as the policy says.

### Removed

- `SearchInput`, deprecated in 4.3.0. Use `Input` with `type="search"` and `hideLabel`.
- The `secondary-50` to `secondary-950` ramp and `secondary-lighter`, deprecated and used by no
  component. `secondary` and `secondary-darker` stay.
- `Icon` is no longer exported. The library's components still draw their own icons; apps use an icon
  library such as `lucide-react`.

### Changed

- The package name, the repository (`NicolasSancho/ui`) and the Storybook URL
  (https://nicolassancho.github.io/ui/).
- `SidebarNav` items take `icon` as a `React.ReactNode` instead of an icon name. It is drawn at 16px
  and hidden from screen readers.
- `LinkComponent` is typed `LinkComponentType`: `"a"` or a component that takes `LinkComponentProps`
  (`href`, `className`, `children` and the `<a>` attributes). The old type accepted any element,
  including ones that are not links, such as `"button"`.
- Buttons, fields and cards are rounded by role (see Added). The default values are the same as
  before, so nothing changes on screen.

### Added

- `ButtonLink`, `ChipLink` and `TextLink` take every `<a>` attribute (`aria-*`, `data-*`, `target`,
  `rel`, `lang`, `hrefLang`, `ref`) and pass it to the link. On `ChipLink`, `selected` sets
  `aria-current` and a passed `aria-current` is ignored.
- `LinkComponentType`, `LinkComponentProps` and `LinkAttributes` types, to type an app's own link
  wrapper.
- Radius roles: `--radius-button`, `--radius-field` and `--radius-card`, defaulting to
  `var(--radius-sm)`, `var(--radius-sm)` and `var(--radius-lg)`. A brand overrides one to reshape that
  kind of element only. A `rounded-*` class in `className` still wins.
- `dot` on `Badge`: a small dot before the text, for a live status such as "Open now".

### Migrating

- Install the new name and update the imports and the CSS setup:

  ```sh
  npm uninstall @nicolassancho/storybook-core
  npm install @nicolassancho/ui
  ```

  ```css
  @import "@nicolassancho/ui/styles/theme.css";
  @source "../node_modules/@nicolassancho/ui/dist";
  ```

- `SearchInput`: `<Input type="search" label="Search" hideLabel name="q" />`.
- `Icon`: install `lucide-react` and import the icon by name. The names the library had map to
  `ChevronDown`, `Menu`, `ArrowLeft`, `Package`, `House` (Home), `ShoppingCart`, `ArrowDown`, `X`,
  `Sun`, `Moon`, `CircleAlert` (AlertCircle), `OctagonAlert` (AlertOctagon) and `TriangleAlert`
  (AlertTriangle). Lucide draws at 24px: `size="small"` becomes `size={16}` and `size="large"`
  becomes `size={32}`. It takes the text color like `color="current"`; for a token color, set a
  class such as `className="text-primary"`. It is hidden from screen readers unless it gets an
  accessible name, so `ariaLabel="Cart"` becomes `aria-label="Cart"`. `IconProps` is gone with it.
- `SidebarNav`: `icon: "Package"` becomes `icon: <Package />` (from `lucide-react`).
- `LinkComponent`: a component typed with narrower props than `<a>` (for example
  `"aria-current"?: "page"`) no longer type-checks. Type its props as `LinkComponentProps`. A string
  other than `"a"` is no longer accepted.
- An app that themed `--radius-sm` or `--radius-lg` on `:root` keeps its shapes. One that set them on a
  nested element to reshape the library's components now sets the role instead (`--radius-button`,
  `--radius-field`, `--radius-card`).

## 4.11.0 - 2026-11-09

### Added

- `Text` and `Container` pass HTML attributes (`id`, `aria-*`, `data-*` and so on) and `ref` to the element they render,
  so a `Text` heading can name a section and a `Container` section can have an accessible name.

## 4.10.0 - 2026-11-05

### Added

- `TextLink`: a link in content, such as a sentence or a table cell. It is always underlined and takes `LinkComponent`.

## 4.9.0 - 2026-11-05

Visual consistency across the library. No prop changes.

### Changed

- Control heights follow one scale: 32px small, 40px medium, 48px large. `Button` and `ButtonLink` have all three (from
  24, 36 and 52px). `SearchInput` has all three (from 26, 38 and 50px). `Chip`, `ChipLink`, `Input` and `Select` have one
  size, which is 40px (from 38 or 39px).
- `Button` and `ButtonLink` labels are medium weight instead of bold, and `small` uses `text-sm` instead of `text-xs`, as
  does `SearchInput`. `ProductCard` and `EmptyState` titles are
  semibold.
- Keyboard focus is one ring. `Input` and `SearchInput` show it through `focus-visible`, and an invalid field shows danger
  through its border and message. `RadioButton` and `Breadcrumbs` gain the ring, and `secondary` buttons lose their own
  color.
- `Breadcrumbs` links are neutral with an underline on hover, like `Header` and `Footer`, and the current page is darker.
- `Pagination` links use the light underline that goes dark on hover.
- `RadioButton` follows the brand color.
- `secondary` is now a neutral fill, so it sits beside any brand. To keep a second color, set `--color-secondary` and
  `--color-secondary-darker` in your stylesheet. The previous values were `light-dark(#c2410c, #d9653e)` and
  `light-dark(#9a3412, #ec886b)`.

### Fixed

- The focus ring of a `ProductCard` link is visible. The card clipped it.

### Deprecated

- The `secondary-50` to `secondary-950` tokens and `secondary-lighter`. They are removed in 5.0.0.

### Added

- Foundations / Controls in Storybook shows the rules above.

## 4.8.0 - 2026-11-05

### Added

- `Table`, built from `TableHead`, `TableBody`, `TableRow`, `TableHeaderCell` and `TableCell`: a labelled, focusable
  scroll region. A sortable header is a link, with `href`, `sort` and `LinkComponent`.
- `Pagination`: previous and next links, the page and the range, from `previousHref` and `nextHref` strings. A link
  without an href is left out, and with neither link only the range shows.
- `Select`: a native `<select>` with a label, styled like `Input`.
- `Badge`, with `neutral` and `success` variants.
- `TableSkeleton`, a placeholder for tabular content with a status label.
- `EmptyState`, with a title, a description and an `action` slot.

## 4.7.0 - 2026-11-04

### Changed

- `Popover` closes when focus reaches an element outside the panel and the trigger, in every placement, so
  the panel does not stay over the page while the keyboard moves on. Focus on the trigger keeps it open. When
  focus leaves the page, the panel stays open until focus reaches such an element.

## 4.6.0 - 2026-11-01

### Added

- `Icon` has a `ChevronDown` icon (`name="ChevronDown"`), for a button that opens a menu or a list.

## 4.5.0 - 2026-10-31

### Changed

- `Button`, `ButtonLink` and the `Popover` trigger leave a gap between their children, so an icon no longer
  touches its label. The gap is half the horizontal padding: 4px small, 8px medium, 12px large. A button
  with a single child looks the same as before.
- `Icon` takes the text color of the element around it by default (the new `color="current"`), instead of
  `black`. An icon inside a filled button now matches its label instead of staying near-black on the brand
  color. Pass `color="black"` for the previous look. `SidebarNav` and the `Popover` close button change
  from neutral-950 to their text color (neutral-900); `Alert`, `Breadcrumbs` and `CartIcon` set their own
  color and do not change.

### Added

- **Molecules / SidebarNav** has two stories that place it in a responsive app layout: a side column from
  the `md` breakpoint up, and a `Popover` drawer below it. The docs explain why the navigation is rendered
  in both places.
- The README has a **Versioning** section: which changes are major, minor or patch, and how long a
  deprecated component or prop keeps working (`SearchInput` is removed in 5.0.0).
- The Consumers guide says that `secondary` is not part of a brand.

## 4.4.1 - 2026-10-30

### Changed

- Releases are published from the tarball that the package check verified, instead of rebuilding the
  same commit in the publish job. The package contents do not change. The publish job no longer installs
  dependencies or builds Storybook, which shortens the release by about a minute.

## 4.4.0 - 2026-10-30

### Added

- `Popover` is a button that opens a panel using the browser's native `popover`: the browser closes it on an
  outside click and on Esc, returns focus to the button and draws it above the page. It is the library's first
  client component (`"use client"` in its own file). It adds `aria-expanded` on the button, closes the panel when
  a link inside it is clicked or a form inside it is submitted, and places a dropdown under its button
  (`bottom-start` or `bottom-end`). `placement="drawer"` opens a full-height panel from the left edge with a close button (`closeLabel`), not modal.
  The panel content can be Server Components. Checked in a Next.js 16.4 production build with real input.
- `SidebarNav` is the navigation list for an app's side panel: a labelled `nav` with icon-and-text links, the
  current page marked with `aria-current="page"` and a brand tint, and a `header` slot. It has no layout of its
  own, takes `LinkComponent` and stays a server component.
- `Package`, `Menu` and `X` icons.
- The Storybook toolbar has a **Brand** control, and **Foundations / Brands** shows the components under three
  example brands with axe in both themes. Neither is part of the package.

### Changed

- `Button`, `ButtonLink` and `Chip` show the pointer cursor when enabled. Tailwind v4 leaves buttons with the
  default arrow, so an enabled button looked less clickable than a link. A disabled one still shows
  `not-allowed`.
- The Consumers guide documents `Popover` and `SidebarNav`, a wrapper for `next/link` in apps with `typedRoutes`
  (passing `Link` directly fails the type check there), and how to set a per-tenant brand.

## 4.3.0 - 2026-10-30

### Added

- `Button` and `ButtonLink` have an `outline` variant: a neutral bordered button for secondary actions.
  It uses the `neutral` and `surface` tokens, so it looks the same under any brand override.
- `Input` is a text field with a required `label` (which `hideLabel` hides visually), optional
  `description` and `error`. It links them with `aria-describedby`, sets `aria-invalid` when there is an
  error, and takes `type="search"` for a search box. Uncontrolled by default, so a native form submits it
  without a handler.
- `Card` is a bordered surface for grouping content. It renders a `div`, `section` or `article`.
- `Alert` shows a message with a title, optional detail and an optional `action`. The only variant is
  `error`, which uses the danger colors and `role="alert"`.
- `Icon` has an `AlertCircle` icon and a `danger` color.

### Deprecated

- `SearchInput` is deprecated. Use `Input` with `type="search"` and `hideLabel`, which adds a real label,
  help text and an error message. `SearchInput` keeps working and will be removed in the next major
  version.

## 4.2.2 - 2026-10-30

### Changed

- The library no longer requires every component to be a Server Component. Presentational components stay
  server-safe and carry no `"use client"` directive. A component that needs interaction (a menu, a dialog)
  will be a client component, with the directive at the top of its own file and a note in its documentation.
  No component changes in this release: every component is still presentational.
- The package check (`npm run test:package`) now compares the source with the build. It fails when a
  source file starts with `"use client"` and its compiled file does not, when a compiled file has the
  directive and its source does not, and when the directive is not the first statement.
- The README, the Consumers guide and the contributor rules describe the Server and Client boundary. A
  client component exported from the single entry point renders from a Server Component, and only its own
  file reaches the browser: this was checked in a real Next.js 16.4 app with a throwaway component.

## 4.2.1 - 2026-10-26

### Fixed

- `ProductDetails` renders a description list (`<dl>` with `<dt>` and `<dd>`) instead of a bulleted
  list, so screen readers announce each label with its value. Props and styling are unchanged.

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
