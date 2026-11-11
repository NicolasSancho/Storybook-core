# Design tokens and theming

Rules for `src/styles/`. The root `CLAUDE.md` still applies. The `tv()` and tailwind-merge rules are in `src/components/CLAUDE.md`.

## Tokens

- Use the tokens in `src/styles/theme.css` (Tailwind v4 `@theme`; there is no
  `tailwind.config.js`). It is the source of truth for every value, and the Colors and Typography
  stories show and assert them. Read the number there; do not copy values into this file, where
  they would drift:
  - Brand tokens: what a brand may override is `brandTokenNames` in `src/brand/brand.ts` (primary and
    secondary with their `-darker` steps, `surface`, the neutral scale, the radius roles and steps, and
    the font families). Everything else is fixed. Components read only `primary` and `primary-darker`
    from the primary family.
  - Brand colors:
    - `primary`. The ramp `-50..950` and `primary-lighter` are deprecated (5.1.0, removed in 6.0): no
      component reads them, and a brand leaves them blue.
    - `secondary` and `secondary-darker` are neutral, so they sit beside any brand. An app sets its own
      second color through these two variables. There is no secondary ramp.
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
  - Radius roles: `rounded-button` (Button, ButtonLink), `rounded-field` (Input, Select) and
    `rounded-card` (Card, Alert, ProductCard and its focus ring). They are `--radius-button`,
    `--radius-field` and `--radius-card`, defaulting to `var(--radius-sm)` (4px) and
    `var(--radius-lg)` (8px), so a brand can reshape one kind of element. Everything else uses
    Tailwind's scale: `rounded-sm` for focus shapes, nav items and small tags, `rounded-lg` for
    Popover, `rounded-full` for pills and chips. A new role needs its name in `twMergeConfig` in
    `src/components/styles/tv.ts` and a row in the Controls story's `RadiusRoles` test.
  - Shadow and icon sizes use Tailwind's scale: `shadow-xs` for cards, icons `w/h-4`, `w/h-6`,
    `w/h-8` (see Icon).
  - Font sizes are a closed scale (only these exist): `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`
    and `4xl`, the fluid display size. Avoid `xs` on interactive text. Sizes are written in rem, and every size has its own
    `--text-*--line-height` (`4xl` also has a letter-spacing), so `text-sm` sets both. Keep the
    t-shirt names: tailwind-merge reads a name like `text-display` as a color and would drop it
    next to a text color. The library loads no fonts: components use `font-sans` (body) and `font-display`
    (headings, via `Text font="display"`), and the consumer sets `--font-sans` and optionally
    `--font-display` (with `next/font` in Next.js). `--font-display` defaults to `var(--font-sans)`.
  - Breakpoints: `xs`, `sm`, `md`, `lg`, `xl`. **`md` is 940px**, not Tailwind's 768.
- Tokens are `--color-*` / `--text-*` / `--breakpoint-*` variables in `@theme`, so opacity
  works on every color (e.g. `bg-neutral-900/50`). Form controls are transparent by default
  in v4: give inputs an explicit background (`bg-surface`) and text color (`text-neutral-900`).
- Dark theme: every color in `theme.css` is one `light-dark(light, dark)` declaration, and the
  root's `color-scheme` picks the side. It follows the operating system, and `data-theme` `"dark"`
  or `"light"` on `<html>` overrides it (on `<html>` only: Tailwind compiles `light-dark()` to
  toggles resolved at the root, so a nested `data-theme` does nothing). Components never use `dark:`
  classes. The color names keep their jobs and only their values change: the `neutral` and `primary`
  ramps are inverted (900 is still body text), and `DEFAULT`, `-darker` (the hover
  step, lighter in dark), semantic and `on-*` colors have a dark side. Rules for editing it:
  - A new color token is written once, as `light-dark(...)`. Never add a second dark-only block.
  - Each dark step keeps the contrast its light twin has against white, measured against the dark
    `surface` color with the same hue; tints use less chroma. Do not pick dark values by eye.
  - Every pairing must pass in both themes: 4.5:1 for text (neutral 900, 700, 600 and the 500
    placeholder, brand and semantic colors, all on `surface`), 3:1 for the 400 input border and
    the focus ring, and 4.5:1 for each `on-*` color on its fill and on the hover step. The list is
    `pairings` in `src/brand/pairings.ts`: the Colors story's `play` function fails `npm test` on a miss
    against the page, and `validateBrand` runs the same list on every brand. Add a pairing there when a
    component starts using a color on a new background (a translucent fill such as `bg-primary/10` is
    written as `{ color, alpha, over }`). Each pairing has an `id` that apps use to translate a
    failure: never rename one, add a new pairing instead. `defaultColors` in the same file must match `theme.css`; a unit
    test compares them.
  - Focus rings that use an offset also set `focus-visible:ring-offset-surface`, or the gap is
    white in dark mode.
- Every `Text` color option must reach 4.5:1 on the surface of both themes; don't add pale shades
  as text colors.
