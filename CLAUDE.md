# Storybook-core

React + Tailwind component library published as `@nicolassancho/storybook-core`
on npm (public). Storybook is the development and documentation environment.

## Working rules

- Read this file before making changes.
- Do not change architecture, conventions or tooling unless requested. If a requested change
  conflicts with a convention, explain the conflict before proceeding. A question about best
  practice gets an honest answer, even when it differs from a convention here.
- Prefer existing project patterns over new dependencies or abstractions.
- Inspect only the files relevant to the task; do not scan or summarize the whole repo
  unless asked.
- Never edit `dist/` (generated, git-ignored).
- Only commit when asked. A conditional request ("commit if it's OK") approves only the
  clean case: if you find any issue, report it and wait for a decision instead of
  committing and mentioning it afterwards. Never push unless asked.
- Before considering a task done, run `npx tsc --noEmit`, `npm run lint`, `npm test` and
  `npx prettier --check` on the changed files (plus `npm run build` and `npm run test:package`
  when touching exports, styles, config or imports in shipped code).

## Commands

Use Node 24, the version CI runs.

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
- Component tests are `play` functions in the stories (see "Tests" in `src/components/CLAUDE.md`).
  Add other test tooling (test libraries, addons, CI steps) only when it is the best option for
  the problem and the change is approved. Update this file in the same change.

## Architecture

- Atomic design: `src/components/{Atoms,Molecules,Organisms,Layouts}/<Name>/`
- Each component folder has 3 files:
  - `<Name>.tsx`: `export interface <Name>Props` + `export const <Name>: React.FC<<Name>Props>`
  - `<Name>.stories.tsx`: `title: "<Type>/<Name>"`, `tags: ["autodocs"]`, args from the mock
  - `<camelName>Mock.ts`: `mocked<Name>...` objects typed as `<Name>Props`
- Components are created by hand: copy an existing component folder as the starting point.
  A new component also needs: the export in `src/index.js`, a `play` test when it has behavior,
  a row in the README components table, a note in `Consumers.mdx` if it changes what a consumer
  must do, and a `minor` version bump.
- `scripts/` holds the package check (`test-package.mjs` and its fixture). It is not shipped.
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

## Icons

- Icons: inline SVGs from Feather (MIT), registered in `Atoms/Icon/iconsMap.tsx`, so the library has
  no runtime dependencies. To add one, paste the shapes of its Feather SVG into a `createIcon` call
  and register it in `IconsMap`; the license notice at the top of the file already covers it. Keep
  `Icon`'s props the same.

## Packaging

- The library has no runtime `dependencies`; keep it that way. What it needs at runtime is a peer
  dependency, or is small enough to copy in with its license notice (the icons).
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

## Git workflow

- Branches: `fix/<kebab-description>` or `feat/<kebab-description>`, PRs to `main`.
- One concern per commit; imperative subject ≤72 chars (e.g. "Fix className merging
  in components"), body explains _why_ when not obvious.
- Keep unrelated changes (lockfile sync, docs, version bump, design tokens) in separate
  commits. Stage files by name, not `git add .`.

## Rules by area

More rules load when you work in these folders; read them before changing the area:

- `src/components/CLAUDE.md`: server and client components, links and images, accessibility,
  stories and tests, styling classes with `tv()`, code style.
- `src/styles/CLAUDE.md`: design tokens, dark theme, editing `theme.css`.
- `.github/CLAUDE.md`: publishing, CI, versioning, the package check.
