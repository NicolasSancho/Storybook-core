# Design tokens and theming

Rules for `src/styles/`. The root `CLAUDE.md` still applies. The `tv()` and tailwind-merge rules are in `src/components/CLAUDE.md`.

## Tokens

- Use the tokens in `src/styles/theme.css` (Tailwind v4 `@theme`; there is no
  `tailwind.config.js`). It is the source of truth for every value, and the Colors and Typography
  stories show and assert them. Read the number there; do not copy values into this file, where
  they would drift:
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
  classes. The color names keep their jobs and only their values change: the `neutral`, `primary`
  and `secondary` ramps are inverted (900 is still body text), and `DEFAULT`, `-darker` (the hover
  step, lighter in dark), semantic and `on-*` colors have a dark side. Rules for editing it:
  - A new color token is written once, as `light-dark(...)`. Never add a second dark-only block.
  - Each dark step keeps the contrast its light twin has against white, measured against the dark
    `surface` color with the same hue; tints use less chroma. Do not pick dark values by eye.
  - Every pairing must pass in both themes: 4.5:1 for text (neutral 900, 700, 600 and the 500
    placeholder, brand and semantic colors, all on `surface`), 3:1 for the 400 input border and
    the focus ring, and 4.5:1 for each `on-*` color on its fill and on the hover step. The list is
    `pairings` in the Colors story, and its `play` function fails `npm test` on a miss. Add a
    pairing there when a component starts using a new color on a new background.
  - Focus rings that use an offset also set `focus-visible:ring-offset-surface`, or the gap is
    white in dark mode.
- Every `Text` color option must reach 4.5:1 on the surface of both themes; don't add pale shades
  as text colors.
