import type { BrandColor, PairingColorToken, TranslucentColor } from "./brand.js";

/**
 * Internal (not exported from `src/index.js`): the default colors and the pairings that
 * `validateBrand` checks. The Colors story renders the same list.
 */

/**
 * The `theme.css` value of every color token a pairing reads, as `[light, dark]` hex pairs. A unit
 * test compares them with `theme.css`, so the two cannot drift.
 */
export const defaultColors: Record<PairingColorToken, BrandColor> = {
  "color-primary": ["#00548a", "#73b0e6"],
  "color-primary-darker": ["#003366", "#96c9f6"],
  "color-secondary": ["#3d3d3d", "#d4d4d4"],
  "color-secondary-darker": ["#303030", "#e8e8e8"],
  "color-surface": ["#ffffff", "#141414"],
  "color-neutral-25": ["#fafafa", "#181818"],
  "color-neutral-50": ["#f6f6f6", "#1b1b1b"],
  "color-neutral-100": ["#e7e7e7", "#272727"],
  "color-neutral-200": ["#d1d1d1", "#363636"],
  "color-neutral-300": ["#b0b0b0", "#4c4c4c"],
  "color-neutral-400": ["#888888", "#6c6c6c"],
  "color-neutral-500": ["#6d6d6d", "#878787"],
  "color-neutral-600": ["#5d5d5d", "#9b9b9b"],
  "color-neutral-700": ["#4f4f4f", "#b0b0b0"],
  "color-neutral-800": ["#454545", "#c2c2c2"],
  "color-neutral-900": ["#3d3d3d", "#d4d4d4"],
  "color-neutral-950": ["#303030", "#e8e8e8"],
  "color-danger": ["#b91c1c", "#f47a70"],
  "color-danger-subtle": ["#fef2f2", "#2a1a1a"],
  "color-success": ["#15803d", "#4cb06b"],
  "color-success-subtle": ["#f0fdf4", "#16221a"],
  "color-warning": ["#92400e", "#e0a23a"],
  "color-warning-subtle": ["#fef3c7", "#2a2210"],
  "color-on-primary": ["#ffffff", "#141414"],
  "color-on-secondary": ["#ffffff", "#141414"],
  "color-on-danger": ["#ffffff", "#141414"],
};

export const AA_TEXT = 4.5;
export const AA_UI = 3;

export interface Pairing {
  /** Stable identifier, reported in a contrast failure. Never reword it; add a new pairing instead. */
  id: string;
  /** English description, for the Colors story and for logs. */
  label: string;
  foreground: PairingColorToken;
  background: PairingColorToken | TranslucentColor;
  /** Minimum contrast ratio: 4.5 for text, 3 for UI such as borders and focus rings. */
  min: number;
}

/**
 * Every color pairing the components use. Each must pass in both themes, for the defaults and for
 * every brand. Add one when a component starts using a color on a new background.
 */
export const pairings: Pairing[] = [
  {
    id: "body-text",
    label: "Body text",
    foreground: "color-neutral-900",
    background: "color-surface",
    min: AA_TEXT,
  },
  {
    id: "body-text-on-page-background",
    label: "Body text on page background",
    foreground: "color-neutral-900",
    background: "color-neutral-50",
    min: AA_TEXT,
  },
  {
    id: "text-component-default-color",
    label: "Text component, default color",
    foreground: "color-neutral-700",
    background: "color-surface",
    min: AA_TEXT,
  },
  {
    id: "secondary-text",
    label: "Secondary text",
    foreground: "color-neutral-600",
    background: "color-surface",
    min: AA_TEXT,
  },
  {
    id: "secondary-text-on-page-background",
    label: "Secondary text on page background",
    foreground: "color-neutral-600",
    background: "color-neutral-50",
    min: AA_TEXT,
  },
  {
    id: "placeholder",
    label: "Placeholder",
    foreground: "color-neutral-500",
    background: "color-surface",
    min: AA_TEXT,
  },
  {
    id: "icon-dark",
    label: "Icon, dark",
    foreground: "color-neutral-950",
    background: "color-surface",
    min: AA_TEXT,
  },
  {
    id: "input-border",
    label: "Input border",
    foreground: "color-neutral-400",
    background: "color-surface",
    min: AA_UI,
  },
  {
    id: "primary-text-and-links",
    label: "Primary text and links",
    foreground: "color-primary",
    background: "color-surface",
    min: AA_TEXT,
  },
  {
    id: "primary-focus-ring",
    label: "Primary focus ring",
    foreground: "color-primary",
    background: "color-surface",
    min: AA_UI,
  },
  {
    id: "secondary-color-as-text",
    label: "Secondary color as text",
    foreground: "color-secondary",
    background: "color-surface",
    min: AA_TEXT,
  },
  {
    id: "danger-text",
    label: "Danger text",
    foreground: "color-danger",
    background: "color-surface",
    min: AA_TEXT,
  },
  {
    id: "success-text",
    label: "Success text",
    foreground: "color-success",
    background: "color-surface",
    min: AA_TEXT,
  },
  {
    id: "warning-text",
    label: "Warning text",
    foreground: "color-warning",
    background: "color-surface",
    min: AA_TEXT,
  },
  {
    id: "danger-on-its-subtle-background",
    label: "Danger on its subtle background",
    foreground: "color-danger",
    background: "color-danger-subtle",
    min: AA_TEXT,
  },
  {
    id: "success-on-its-subtle-background",
    label: "Success on its subtle background",
    foreground: "color-success",
    background: "color-success-subtle",
    min: AA_TEXT,
  },
  {
    id: "warning-on-its-subtle-background",
    label: "Warning on its subtle background",
    foreground: "color-warning",
    background: "color-warning-subtle",
    min: AA_TEXT,
  },
  {
    id: "primary-button-text",
    label: "Primary button text",
    foreground: "color-on-primary",
    background: "color-primary",
    min: AA_TEXT,
  },
  {
    id: "primary-button-text-hover",
    label: "Primary button text, hover",
    foreground: "color-on-primary",
    background: "color-primary-darker",
    min: AA_TEXT,
  },
  {
    id: "secondary-button-text",
    label: "Secondary button text",
    foreground: "color-on-secondary",
    background: "color-secondary",
    min: AA_TEXT,
  },
  {
    id: "secondary-button-text-hover",
    label: "Secondary button text, hover",
    foreground: "color-on-secondary",
    background: "color-secondary-darker",
    min: AA_TEXT,
  },
  {
    id: "danger-badge-text",
    label: "Danger badge text",
    foreground: "color-on-danger",
    background: "color-danger",
    min: AA_TEXT,
  },
  {
    id: "product-tag-text",
    label: "Product tag text",
    foreground: "color-neutral-25",
    background: "color-neutral-950",
    min: AA_TEXT,
  },
  {
    id: "current-sidebar-item",
    label: "Current sidebar item",
    foreground: "color-neutral-900",
    background: { color: "color-primary", alpha: 0.1, over: "color-surface" },
    min: AA_TEXT,
  },
  {
    id: "outline-hover-text",
    label: "Outline button and sidebar item text, hover",
    foreground: "color-neutral-900",
    background: "color-neutral-100",
    min: AA_TEXT,
  },
  {
    id: "header-text-on-page-background",
    label: "Table header and neutral badge text",
    foreground: "color-neutral-700",
    background: "color-neutral-50",
    min: AA_TEXT,
  },
  {
    id: "alert-body-text",
    label: "Alert body text",
    foreground: "color-neutral-900",
    background: "color-danger-subtle",
    min: AA_TEXT,
  },
];
