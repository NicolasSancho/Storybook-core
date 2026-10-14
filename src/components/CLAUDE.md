# Component rules

Rules for code in `src/components/`. The root `CLAUDE.md` still applies.

## Server and client components

The library is consumed from Next.js (App Router), so keep it usable from Server Components.

- Components are presentational and stateless: no `useState`, `useEffect`, context or browser
  APIs, and therefore no `"use client"` directive. Verified in a Next.js smoke test when this
  was set up: every component rendered from a Server Component, and `useId` (RadioGroup) works on
  the server. `npm run test:package` keeps checking the injection props and an uncontrolled
  RadioGroup in plain Node.
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

## Styling with `tv()`

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
  Footer, ChipLink) use plain `hover:`, because `:enabled` never matches an `<a>`. `Chip`, which is a
  button, sets `pointer-events-none` when disabled instead.
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
  `within` from `storybook/test`. No `*.test.tsx` files and no other test library, unless an approved
  change adds one (see the root `CLAUDE.md`).
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
