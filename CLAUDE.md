# Storybook-core

React + Tailwind component library published as `@nicolassancho/storybook-core`
on npm (public). Storybook is the development and documentation environment.

## Working rules

- Read this file before making changes.
- Do not change architecture, conventions or tooling unless explicitly requested. If a
  requested change conflicts with a convention, explain the conflict before proceeding.
- Do not fix items under "Known limitations" unless explicitly requested.
- Prefer existing project patterns over new dependencies or abstractions.
- Inspect only the files relevant to the task; do not scan or summarize the whole repo
  unless asked.
- Never edit `dist/` (generated, git-ignored).
- Only commit when asked. A conditional request ("commit if it's OK") approves only the
  clean case: if you find any issue, report it and wait for a decision instead of
  committing and mentioning it afterwards. Never push unless asked.
- Before considering a task done, run `npx tsc --noEmit`, `npm run lint` and
  `npx prettier --check` on the changed files (plus `npm run build` and `npm run test:package`
  when touching exports, styles, config or imports in shipped code).

## Commands

- `npm run storybook`: dev server on :6006. Restart it after editing `src/styles/theme.css` or
  adding a file whose classes are used nowhere else; the compiled CSS can be stale until then.
- `npm run build-storybook`: static Storybook build (CI runs this)
- `npm run build`: cleans `dist/`, `tsc -p tsconfig.build.json` → `dist/` (stories and
  mocks excluded), then copies `src/styles/theme.css` → `dist/styles/theme.css` (tokens only; the library
  ships no compiled CSS).
  `tsconfig.json` (used by typecheck, lint and Storybook) still covers stories and mocks.
- `npx tsc --noEmit`: typecheck (no dedicated script)
- `npm run lint` / `npm run format`
- `npm test`: Vitest with `@storybook/addon-vitest`; runs every story in headless Chromium
  (Playwright) as a smoke test, plus any `play` functions. Config in `vitest.config.ts`.
  Every story runs twice, once per theme: a second Vitest project sets `STORYBOOK_THEME=dark`,
  which `.storybook/theme.ts` turns into the initial `theme` global. A dark-only failure is a
  real contrast bug, not test noise.
  `@storybook/addon-a11y` runs axe on every story (`a11y.test: "error"` in `.storybook/preview.ts`), so a
  violation fails the story. Opt a story out with `parameters.a11y.test = "todo"` and a comment saying why.
- `npm run test:package`: builds, then checks the package as a consumer installs it: `publint`,
  `attw` (types and module resolution; the CSS entry point is excluded because attw reads only JS
  and types) and `scripts/test-package.mjs`. The script packs the tarball, installs it with the
  peer dependencies in a temp project and, in plain Node, renders Button, Header (`LinkComponent`),
  ProductGrid (`ImageComponent`) and an uncontrolled RadioGroup, asserts `dist/` has no
  `"use client"`, and compiles the Consumers-guide Tailwind setup. It cannot test Next.js
  Server/Client behavior: that needs a real Next app. Add a check there only for a packaging risk
  that a story cannot see; the checks live in `scripts/package-fixture/`, outside the ESLint and
  Prettier globs, so run `npx prettier --write scripts` after editing them.
- Component tests are `play` functions in the stories (see "Tests" under Stories). Don't add test
  tooling (other test libraries, addons, CI steps) unless explicitly asked.

## Architecture

- Atomic design: `src/components/{Atoms,Molecules,Organisms,Layouts}/<Name>/`
- Each component folder has 3 files:
  - `<Name>.tsx`: `export interface <Name>Props` + `export const <Name>: React.FC<<Name>Props>`
  - `<Name>.stories.tsx`: `title: "<Type>/<Name>"`, `tags: ["autodocs"]`, args from the mock
  - `<camelName>Mock.ts`: `mocked<Name>...` objects typed as `<Name>Props`
- Components are created by hand: copy an existing component folder as the starting point.
- `src/components/Foundations/<Topic>/` holds documentation-only stories (e.g. `Colors`): a
  `<Topic>.stories.tsx` with no component, no mock, no `src/index.js` export. Colors reads
  its values from the `--color-*` variables on the page, so it needs no edit when a token changes.
  Its list of pairings is asserted by its `play` function. A token the story shows must also be
  listed in the `@source inline` safelist in `src/styles/tailwind.css` (Tailwind emits only the
  variables a utility uses), or the story throws. `Typography` works the same way for the type
  scale: it reads `--text-*` and `--text-*--line-height` from the page, and its `play` function
  fails on a size that is missing, is not in rem or has no line-height.
- `docs/` holds the README screenshots (not published: `files` is only `dist`). The README links them
  by absolute `raw.githubusercontent.com` URLs, because npm cannot see repo files. Retake them when the
  look of the library changes.
- `src/components/Welcome/Welcome.mdx` is the Storybook landing page: a docs-only MDX page with no
  component. Its swatches use the token classes, so they follow `theme.css`. The sidebar order is
  set by `storySort` in `.storybook/preview.ts` (Welcome, Consumers, Foundations, Atoms,
  Molecules, Organisms, Layouts): add a new top-level group there.
- `src/components/Consumers/Consumers.mdx` is the consumer guide: a docs-only MDX page with no
  component. Update it in the same pass whenever a consumer-facing convention changes (CSS setup,
  injection props, server/client rules, package exports, theming).
- The Storybook toolbar has a `theme` switch (Light, Dark, System). `.storybook/theme.ts` holds the
  helpers, a decorator in `preview.ts` applies the choice to `<html>` for stories, and
  `.storybook/ThemedDocsContainer.tsx` does the same for docs pages (which skip decorators) and
  gives them the matching Storybook theme. Light stays the default.
- Every new component must be exported manually from `src/index.js`.
  `src/index.js` is plain JS (`allowJs`) and imports no CSS.
- Components import each other via relative paths that end in `.js`
  (`../../Atoms/Button/Button.js`), also in `src/index.js`. `tsc` keeps the path as written and
  Node's native ESM needs the extension, so `dist/` loads in plain Node and not only in bundlers.
  TypeScript, Vite and Storybook resolve the `.js` to the `.tsx` source. Stories and mocks are not
  shipped and keep extensionless imports.
- Named exports only; no default exports from component files.
- Page width lives in `Layouts/Container` only (`max-w-6xl`, `px-4 sm:px-6`). A full-width organism
  (Header, Footer) keeps its bar full-bleed and puts its content in a `Container`, with no
  `max-w-*` or horizontal padding of its own.
- React: the library supports and is tested on React 19 only (`peerDependencies` `^19.0.0`,
  `devDependencies` 19.3), because its only consumer runs 19. Keep the two in sync, and do not
  widen the peer range without testing the older version.

## Server and client components

The library is consumed from Next.js (App Router), so keep it usable from Server Components.

- Components are presentational and stateless: no `useState`, `useEffect`, context or browser
  APIs, and therefore no `"use client"` directive. Verified in a Next.js smoke test: every
  component renders from a Server Component, and `useId` (RadioGroup) works on the server.
- Add `"use client"` (as the first statement of the file) only when a component starts using
  state, effects, context or browser APIs. Do not add it just because a component accepts a
  handler: a directive does not let a Server Component pass functions, and it ships
  JavaScript for components that would otherwise render with none.
- Prefer slot props (`brand`, `actions` on Header) over static sub-components (`Header.Left`):
  dotting into a client module from a Server Component returns `undefined`, so a component with
  static parts can never become a client component. If one is ever needed, export the parts as
  separate named exports.
- Event handlers (`onClick`, `onChange`) cannot be passed from a Server Component. Consumers
  wrap them in their own `"use client"` file. Keep every handler prop optional so the static
  usage still renders on the server. A form control also takes its state as optional `value` plus
  `defaultValue` (RadioGroup, SearchInput): without `value` it is uncontrolled and a native form
  submits it with no handler.
- `LinkComponent` may be passed from a Server Component as long as the receiving component
  stays server-safe (no `"use client"`). A client component such as `next/link` is always safe
  to pass.
- Prefer real links (`href`) over handlers for navigation: they need no JavaScript.

## Links and images

- Navigation uses `href`, never a router-specific prop such as `to`.
- A component that renders links takes an optional `LinkComponent` prop, defaulting to `"a"`,
  and passes it `href`, `className` and `children` (and `aria-current` on `ChipLink`, which
  `next/link` forwards). Consumers pass a framework link (e.g. `next/link`) to get
  client-side navigation.
- Images render through the `Image` atom, which takes an optional `ImageComponent`, defaulting
  to `"img"`, and forwards `src`, `alt`, `className` and any other `<img>` attribute
  (`srcSet`, `sizes`, `width`, `height`, `loading`). Components that show images expose those
  attributes through an `imageProps` prop. `ImageComponent` is typed as a minimal contract
  (`src`, `alt`, `className`), like `LinkComponent`: extra attributes are forwarded but not
  type-checked against it, because `next/image` narrows some (e.g. `width`).
- Define `LinkComponent` and `ImageComponent` outside the render function: an inline definition
  remounts them.
- Purely decorative images use `alt=""` (e.g. the ProductCard image, since the title names the
  card).
- Document these props in JSDoc, including the props the component passes to them.

## Styling

- Always define classes with `tv()` from `tailwind-variants` (variants / slots /
  defaultVariants). Never build class strings by concatenation or template literals;
  pass `className` into `tv()`:
  ```tsx
  // single element
  className={buttonStyles({ variant, size, className })}
  // slots: always call them, never interpolate `styles.base`
  const styles = cardStyles();
  className={styles.base({ className })}
  ```
- `tv()` runs tailwind-merge, which resolves conflicts by class prefix. Watch for:
  - Order matters: a later `border-primary` drops an earlier `border-t-transparent`.
    Put side-specific classes after the general ones in the same variant (see Spinner).
  - Custom class names starting with a Tailwind prefix (`text-button`, `border-card`)
    are read as utilities and can silently remove real ones. Avoid them in mocks and
    `className` props.
  - tailwind-merge only knows Tailwind's own scales, so custom radius, shadow or size
    names (`rounded-btn`, `shadow-card`, `w-icon-small`) would not be overridden by a
    consumer's `className` (both classes stay). Don't add them; colors are safe.
- Use the tokens in `src/styles/theme.css` (Tailwind v4 `@theme`; there is no
  `tailwind.config.js`):
  - Brand colors:
    - `primary` (also `-50..950`; `-600` is the lightest step usable as text on white).
    - `secondary` (also `-50..950`; `-700` is `DEFAULT` and the lightest step usable as text on
      white; `-800` is `darker`). `secondary-lighter` is the original brand orange and fails
      contrast with white text: decorative use only.
  - Semantic colors: `danger`, `success`, `warning`, each with `DEFAULT` (text/icons) and
    `subtle` (background). Use them instead of Tailwind's `red-*` / `green-*` / `yellow-*`,
    and never rely on color alone.
  - Neutrals: `neutral-{25..950}`; never Tailwind's default `gray-*`. Jobs: 900 body text,
    600 secondary text, 500 placeholder, 400 input borders (needs 3:1), 200 dividers and
    card borders, 50 page background. 100 to 300 are never text.
  - Surface and `on-*`: `surface` is the default background (inputs, header, the page). A filled
    brand or danger background pairs with its text color: `bg-primary text-on-primary`, also
    `on-secondary` and `on-danger`. Never `bg-white` or `text-white`: they stay white in dark mode.
    A dark chip that must stay a chip in both themes uses the ramp so it flips with the theme
    (`bg-neutral-950 text-neutral-25`, the ProductCard tag).
  - Radius, shadow and icon sizes use Tailwind's scale: `rounded-sm` (4px) for controls,
    `rounded-lg` (8px) for cards, `rounded-full` for pills, `shadow-xs` for cards, icons
    `w/h-4`, `w/h-6`, `w/h-8` (see Icon).
  - Font sizes are a closed scale (only these exist): `xs` 12px, `sm` 14px, `base` 16px,
    `lg` 20px, `xl` 24px, `2xl` 32px, `3xl` 40px and `4xl`, the fluid display size (36px up to 64px).
    Avoid `xs` on interactive text. Sizes are written in rem, and every size has its own
    `--text-*--line-height` (`4xl` also has a letter-spacing), so `text-sm` sets both. Keep the
    t-shirt names: tailwind-merge reads a name like `text-display` as a color and would drop it
    next to a text color. The library loads no fonts: components use `font-sans` (body) and `font-display`
    (headings, via `Text font="display"`), and the consumer sets `--font-sans` and optionally
    `--font-display` (with `next/font` in Next.js). `--font-display` defaults to `var(--font-sans)`.
  - Breakpoints: `xs` 0, `sm` 640, **`md` 940** (not Tailwind's 768), `lg` 1024, `xl` 1280
- Tokens are `--color-*` / `--text-*` / `--breakpoint-*` variables in `@theme`, so opacity
  works on every color (e.g. `bg-neutral-900/50`). Form controls are transparent by default
  in v4: give inputs an explicit background (`bg-surface`) and text color (`text-neutral-900`).
- Dark theme: every color in `theme.css` is one `light-dark(light, dark)` declaration, and the
  root's `color-scheme` picks the side. It follows the operating system, and `data-theme` `"dark"`
  or `"light"` on `<html>` overrides it (on `<html>` only: Tailwind compiles `light-dark()` to
  toggles resolved at the root, so a nested `data-theme` does nothing). Components never use `dark:`
  classes. The color names keep their jobs and only their values change: the `neutral`, `primary`
  and `secondary` ramps are inverted (900 is still body text), and `DEFAULT`, `-darker` (the hover
  step, lighter in dark), semantic and `on-*` colors have a dark side. Rules for editing it:
  - A new color token is written once, as `light-dark(...)`. Never add a second dark-only block.
  - Each dark step keeps the contrast its light twin has against white, measured against the dark
    surface (`#141414`) with the same hue; tints use less chroma. Do not pick dark values by eye.
  - Every pairing must pass in both themes: 4.5:1 for text (neutral 900, 700, 600 and the 500
    placeholder, brand and semantic colors, all on `surface`), 3:1 for the 400 input border and
    the focus ring, and 4.5:1 for each `on-*` color on its fill and on the hover step. The list is
    `pairings` in the Colors story, and its `play` function fails `npm test` on a miss. Add a
    pairing there when a component starts using a new color on a new background.
  - Focus rings that use an offset also set `focus-visible:ring-offset-surface`, or the gap is
    white in dark mode.
- Every `Text` color option must reach 4.5:1 on the surface of both themes; don't add pale shades
  as text colors.
- Icons: react-feather, registered in `Atoms/Icon/iconsMap.ts`.
- `tailwindcss` (v4), `tailwind-variants` (v3) and `tailwind-merge` (v3) are
  peerDependencies; keep them there. `tv()` only resolves class conflicts when
  `tailwind-merge` is installed.
- Consumers (Tailwind v4) import the tokens and scan the library's compiled JS for classes
  (auto-detection skips `node_modules`, so `@source` is required):
  ```css
  @import "tailwindcss";
  @import "@nicolassancho/storybook-core/styles/theme.css";
  @source "../node_modules/@nicolassancho/storybook-core/dist";
  ```
- `package.json` limits the public API with an `exports` map: `.` (components and types),
  `./styles/theme.css` and `./package.json`. Deep imports into `dist/` are blocked on purpose.
  `sideEffects` lists only CSS, so bundlers can drop unused components. Keep both in sync: a new
  entry point goes in `exports`, and a module that does something at import time (not just
  defines things) must be added to `sideEffects`.

## Accessibility

Accessibility is a design goal. Follow the practices below for all new and modified
components. These practices support WCAG 2.1 AA, but do not by themselves establish
conformance. Do not claim WCAG conformance without appropriate testing.

- Interactive elements must use semantic HTML elements such as `<button>` and `<a>`, never
  `onClick` on a `<div>`. Buttons default to `type="button"`. For a fully clickable card,
  use the stretched pattern (see ProductCard): a real link when there is an `href`, a button
  only when there is none.
- Visible keyboard focus: use
  `focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface`
  (as in Button). Never remove the default outline without providing a visible alternative.
- Hover styles use `enabled:hover:*` so disabled controls do not react to hover. Links (Header,
  Footer, ChipLink) use plain `hover:`, because `:enabled` never matches an `<a>`. Chip, the button,
  sets `pointer-events-none` when disabled instead.
- Icons are decorative (`aria-hidden`) by default. Pass `ariaLabel` when an icon conveys
  meaning on its own. Accessible-name props are named `ariaLabel` in Icon and CartIcon.
- Icon-only controls must have an accessible name: `aria-label`, or visually hidden (`sr-only`)
  text when the element is rendered by the consumer (e.g. Breadcrumbs' `LinkComponent` may not
  forward `aria-*` props).
- Inputs need an accessible name and must expose invalid states appropriately, including
  `aria-invalid` when applicable. Never hard-code `id` values; use `useId()` or another
  appropriate mechanism to ensure uniqueness.
- Groups of related controls use `<fieldset>` and `<legend>` when appropriate. Radio `name`
  values default to `useId()` (see RadioGroup). Duplicate names on the same page merge
  radio buttons into a single group; for example, the Autodocs page may render the primary
  story more than once.
- Check text and UI contrast when adding or modifying colors: target at least 4.5:1 for
  normal text and 3:1 for large text. Verify applicable contrast requirements for UI
  components and focus indicators as well.
- Animations must respect `prefers-reduced-motion`, using Tailwind's `motion-safe:` and
  `motion-reduce:` variants where appropriate.
- When modifying interactive components, verify keyboard navigation, focus visibility,
  accessible names, and relevant state announcements. Do not assume that following these
  conventions alone guarantees accessibility or WCAG conformance.

## Stories

- Controlled components (value + onChange) need a `render` with local `useState` so
  clicks update the story (see RadioGroup). Don't use `useArgs` for this: on the autodocs
  page it only updates the first story.
- Story args override meta args, so a mock's placeholder `onChange: () => {}` replaces
  the meta-level `action(...)`.

### Tests

- Tests are `play` functions in `<Name>.stories.tsx`, using `expect`, `fn`, `userEvent` and
  `within` from `storybook/test`. No `*.test.tsx` files and no other test library.
- Put the `play` on the existing story that already shows the state. Create a separate
  story only when the interaction changes what is rendered (see RadioGroup, where the
  selection moves), so the visual stories keep their documented state.
- Query by role and accessible name (`getByRole`), not by test id or class. Don't assert on
  Tailwind classes.
- Mock handlers are no-ops (`() => {}`). Pass `fn()` spies in the story's `args` when the
  test asserts on a handler.
- Test real behavior only: conditional rendering, generated accessible names, handlers,
  keyboard use. Skip presentational components and assertions that would pass for any
  implementation.
- Check that a new test can fail: break the code under test and confirm the story fails.
- Injection props (`LinkComponent`, `ImageComponent`): pass a spy component made with `fn()`,
  defined in the story file, and assert on the props it received (`spy.mock.calls`), not on
  classes. Also assert the rendered result by role, so the spy cannot be bypassed.
- Storybook wraps function `args` and `expect.any(...)` does not match here: do not compare
  function identity. Check `typeof` and call the handler (click) to prove the wiring.
- A synthetic click reaches the element directly, so it cannot prove layout behavior such as
  the stretched card link. Hit-test with `document.elementFromPoint` at the element's center.
- Stories have no router: `.storybook/preview.ts` cancels link navigation (handlers still
  run), so a clicked link never loads a missing page in the preview.

## Code style

Formatting is enforced by Prettier (double quotes, semicolons, printWidth 100,
trailingComma es5, 2 spaces). Beyond that, in new or modified code:

- TypeScript strict; no `any`, no non-null `!` unless justified in a comment.
- Every prop documented with JSDoc (it feeds autodocs).
- PascalCase for components/interfaces, camelCase for variables/functions/mocks.
- Prefer `const`, destructured props with defaults in the signature, early returns.
- Don't use array indexes as React `key` when items have a stable id.
- Unused args prefixed with `_` (lint rule). No `console.log` in committed code.

## Git workflow

- Branches: `fix/<kebab-description>` or `feat/<kebab-description>`, PRs to `main`.
- One concern per commit; imperative subject ≤72 chars (e.g. "Fix className merging
  in components"), body explains _why_ when not obvious.
- Keep unrelated changes (lockfile sync, docs, version bump, design tokens) in separate
  commits. Stage files by name, not `git add .`.

## Publishing / CI

- Every push to `main` publishes (`.github/workflows/main.yml`, Node 24, `NPM_TOKEN`, an npm access token),
  but only after the `checks` job (the reusable `ci.yml`, described below) passes on
  that commit.
- Bump the version as the last commit on the branch before merging, or the publish
  fails on a duplicate version:
  `npm version <patch|minor> --no-git-tag-version` (updates package.json and the lockfile).
  Use at least `minor` when a change is visible to consumers (colors, behavior, new props).
  Add the matching `CHANGELOG.md` entry (same version, today's date, heading `## <version> - <date>`)
  in that same commit: the GitHub Release notes are taken from it, and CI fails without it. A change
  that touches no package code (a workflow edit) still needs the bump, because every push to `main`
  publishes.
- `.github/workflows/ci.yml` runs on every PR and is called by `main.yml` on every push to
  `main` (it has no push trigger of its own, so the checks do not run twice). Keep it green
  before merging. It runs, in order:
  - On PRs only: fails if the `package.json` version equals the one on the base branch, and
    fails if `CHANGELOG.md` has no `## <version>` section.
  - `npm ci` (which triggers `prepare` → `npm run build`), `npx tsc --noEmit`, `npm run lint`,
    `npx prettier --check ./src ./.storybook`, `npm run build-storybook` and `npm test`.
  - In a parallel `package` job (no browser): `npm ci` and `npm run test:package`. Publishing waits
    for it, because `main.yml` calls the whole workflow.
- After the checks pass, the publish job runs `npm ci`, `npm run build-storybook` and
  `npm publish --provenance`: npm records the workflow run and commit that built the package.
- After `publish`, the `release` job creates the annotated tag `v<version>` (message `<version>`)
  on the published commit and a GitHub Release with that version's `CHANGELOG.md` section as its
  notes. CI creates tags, so nobody pushes them by hand. The job skips a tag that exists, and it is
  separate from `publish` so it can be re-run alone (re-running `publish` fails on the duplicate
  version).
- On `main` only, the last step of `ci.yml` uploads `storybook-static` as the Pages artifact.
  After the checks pass, the `deploy-docs` job in `main.yml` deploys it to GitHub Pages
  (https://nicolassancho.github.io/Storybook-core/). It builds nothing, so the site is exactly the
  build that passed the checks, and it does not wait for `publish`. The repo's Pages source must
  be set to "GitHub Actions".
