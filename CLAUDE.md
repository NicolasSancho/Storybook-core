# Storybook-core

React + Tailwind component library published as `@NicolasSancho/storybook-core`
on GitHub Packages (restricted). Storybook is the development and documentation environment.

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
  `npx prettier --check` on the changed files (plus `npm run build` when touching exports,
  styles or config).

## Commands

- `npm run storybook`: dev server on :6006
- `npm run build-storybook`: static Storybook build (CI runs this)
- `npm run build`: cleans `dist/`, `tsc -p tsconfig.build.json` → `dist/` (stories and
  mocks excluded), then Tailwind CLI → `dist/styles/tailwind.css`.
  `tsconfig.json` (used by typecheck, lint and Storybook) still covers stories and mocks.
- `npx tsc --noEmit`: typecheck (no dedicated script)
- `npm run lint` / `npm run format`
- `npm run generate`: Plop scaffold (Atoms / Molecules / Organisms only)
- `npm test`: Vitest with `@storybook/addon-vitest`; runs every story in headless Chromium
  (Playwright) as a smoke test, plus any `play` functions. Config in `vitest.config.ts`.
- Tests are `play` functions in the stories (see "Tests" under Stories). Don't add test
  tooling (other test libraries, addons, CI steps) unless explicitly asked.

## Architecture

- Atomic design: `src/components/{Atoms,Molecules,Organisms,Layouts}/<Name>/`
- Each component folder has 3 files:
  - `<Name>.tsx`: `export interface <Name>Props` + `export const <Name>: React.FC<<Name>Props>`
  - `<Name>.stories.tsx`: `title: "<Type>/<Name>"`, `tags: ["autodocs"]`, args from the mock
  - `<camelName>Mock.ts`: `mocked<Name>...` objects typed as `<Name>Props`
- Layouts components are created by hand (Plop doesn't offer that type).
- Every new component must be exported manually from `src/index.js` (Plop doesn't do it).
  `src/index.js` is plain JS (`allowJs`) and also imports `./styles/tailwind.css`.
- Components import each other via relative paths (`../../Atoms/Button/Button`).
- Named exports only; no default exports from component files.

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
- Use the tokens in `tailwind.config.js`:
  - Colors: `primary` / `secondary` (+ `-darker`). `secondary-lighter` is the original
    brand orange and fails contrast with white text: decorative use only.
  - Radius: `rounded-btn`, `rounded-card` (existing components still use `rounded` /
    `rounded-lg`; use tokens in new code, don't migrate old code unless asked)
  - Shadow: `shadow-card`; icon sizes: `w/h-icon-{small,medium,large}`
  - Font sizes are overridden: `sm` 14px, `base` 16px, `lg` 20px, `xl` 24px
  - Breakpoints: `xs` 0, `sm` 640, **`md` 940** (not Tailwind's 768), `lg` 1024, `xl` 1280
- Don't use `text-{25..950}` yet: they point to `--gray-*` CSS variables that are not
  loaded (see Known limitations), so they render no color.
- Icons: react-feather, registered in `Atoms/Icon/iconsMap.ts`.
- `tailwindcss` and `tailwind-variants` are peerDependencies; keep them there.
  Consumers must import `@NicolasSancho/storybook-core/dist/styles/tailwind.css`.

## Accessibility

Accessibility is a design goal. Follow the practices below for all new and modified
components. These practices support WCAG 2.1 AA, but do not by themselves establish
conformance. Do not claim WCAG conformance without appropriate testing.

- Interactive elements must use semantic HTML elements such as `<button>` and `<a>`, never
  `onClick` on a `<div>`. Buttons default to `type="button"`. For a fully clickable card,
  use the stretched button pattern (see ProductCard).
- Visible keyboard focus: use
  `focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`
  (as in Button). Never remove the default outline without providing a visible alternative.
- Hover styles use `enabled:hover:*` so disabled controls do not react to hover.
- Icons are decorative (`aria-hidden`) by default. Pass `ariaLabel` when an icon conveys
  meaning on its own. Accessible-name props are named `ariaLabel` in Icon and CartIcon.
- Icon-only controls must have an accessible name using `aria-label` or visually hidden
  (`sr-only`) text when the element is controlled by the consumer (e.g. Breadcrumbs'
  `LinkComponent` may not forward `aria-*` props).
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

- Every push to `main` publishes (`.github/workflows/main.yml`, Node 24, `NPM_TOKEN`),
  but only after the `checks` job (the reusable `ci.yml`, described below) passes on
  that commit.
- Bump the version as the last commit on the branch before merging, or the publish
  fails on a duplicate version:
  `npm version <patch|minor> --no-git-tag-version` (updates package.json and the lockfile).
  Use at least `minor` when a change is visible to consumers (colors, behavior, new props).
- `.github/workflows/ci.yml` runs on every PR and is called by `main.yml` on every push
  to `main` (it has no push trigger of its own, so the checks do not run twice). On PRs
  it fails if the `package.json` version equals the one on the base branch, then
  `npm ci` (which triggers `prepare` → `npm run build`), `npx tsc --noEmit`,
  `npm run lint`, `npx prettier --check ./src`, `npm run build-storybook` and `npm test`.
  Keep it green before merging.
- After the checks pass, the publish job runs `npm ci`, `npm run build-storybook` and
  `npm publish`.

## Known limitations (do not fix unless requested)

- `--gray-*` CSS variables (`src/components/styles/variables.scss`) are not imported
  anywhere, so the `text-{25..950}` tokens render no color.
- Array-index keys in ProductGrid, ProductDetails and Breadcrumbs.
- Header builds `className` by string concatenation instead of passing it to `tv()`.
- RadioButton's `form-radio` class has no effect (`@tailwindcss/forms` isn't installed).
- `eslint-plugin-react-hooks` is registered but none of its rules are enabled.
- `.eslintrc.json` is an unused leftover; `eslint.config.js` is the real config.
- `plop-templates/componentMock.tsx.hbs` generates a `.ts` file despite its name.
- `Button.stories.ts` is `.ts` while all other stories are `.tsx`.
