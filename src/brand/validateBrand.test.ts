/// <reference types="vite/client" />
import { describe, expect, it } from "vitest";
import { mockedBrands } from "../components/Foundations/Brands/brandsMock";
import { brandTokenNames, type Brand } from "./brand";
import { defaultColors } from "./pairings";
import { validateBrand } from "./validateBrand";
import themeCss from "../styles/theme.css?raw";

/** `#00548a` or `rgb(0 84 138)` to `#00548a`. */
const normalize = (value: string): string => {
  const trimmed = value.trim().toLowerCase();
  if (trimmed.startsWith("#")) return trimmed;
  return `#${(trimmed.match(/\d+/g) ?? [])
    .slice(0, 3)
    .map((channel) => Number(channel).toString(16).padStart(2, "0"))
    .join("")}`;
};

/** Every `--color-*: light-dark(light, dark)` declaration in `theme.css`. */
const themeColors = new Map(
  [
    ...themeCss.matchAll(
      /--(color-[a-z0-9-]+):\s*light-dark\(\s*(#[0-9a-f]+|rgb\([^)]*\)),\s*(#[0-9a-f]+|rgb\([^)]*\))\s*\)/gi
    ),
  ].map(([, token, light, dark]) => [token, [normalize(light), normalize(dark)]])
);

describe("defaults", () => {
  it("match theme.css", () => {
    expect(themeColors.size).toBeGreaterThan(0);
    Object.entries(defaultColors).forEach(([token, value]) => {
      expect(themeColors.get(token), token).toEqual(value);
    });
  });

  it("pass every pairing", () => {
    expect(validateBrand({})).toEqual([]);
  });
});

describe("validateBrand format", () => {
  it("accepts every kind of token", () => {
    expect(
      validateBrand({
        "color-primary": ["#1f5f4a", "#62a088"],
        "radius-button": "9999px",
        "radius-card": "1rem",
        "font-sans": '"Inter", ui-sans-serif, system-ui',
        "font-display": "'Lora', serif",
      })
    ).toEqual([]);
  });

  it("accepts a length without a leading zero", () => {
    expect(validateBrand({ "radius-card": ".5rem" })).toEqual([]);
  });

  it("treats an undefined value as not set", () => {
    expect(validateBrand({ "color-primary": undefined, "radius-card": undefined })).toEqual([]);
  });

  it("rejects a key that is not a brand token", () => {
    const brand = { "color-danger": ["#000000", "#ffffff"] } as unknown as Brand;
    expect(validateBrand(brand)).toEqual([{ kind: "unknown-token", token: "color-danger" }]);
  });

  it("rejects a key from JSON that would reach the prototype", () => {
    const brand = JSON.parse('{"__proto__": {"color-primary": ["#000000", "#000000"]}}') as Brand;
    expect(validateBrand(brand)).toEqual([{ kind: "unknown-token", token: "__proto__" }]);
  });

  it.each([
    ["color-primary", "#1f5f4a"],
    ["color-primary", ["#1f5f4a"]],
    ["color-primary", ["#1f5f4a", "#62a088", "#000000"]],
    ["color-primary", ["#1f5", "#62a088"]],
    ["color-primary", ["red", "#62a088"]],
    ["color-primary", ["#1f5f4a; color: red", "#62a088"]],
    ["color-primary", ["var(--x)", "#62a088"]],
    ["radius-button", "9999"],
    ["radius-button", "50%"],
    ["radius-button", "calc(1px + 1px)"],
    ["radius-button", "4px; background: url(x)"],
    ["radius-button", 4],
    ["font-sans", "Inter; color: red"],
    ["font-sans", "Inter} body { color: red"],
    ["font-sans", 'url("x")'],
    ["font-sans", "var(--font-mono)"],
    ["font-sans", '"Inter\\"; x'],
    ["font-sans", ""],
    ["font-sans", "a".repeat(201)],
    // A newline (or any control character) ends a CSS string early, so the rest of the stylesheet
    // would be swallowed into it.
    ["font-sans", '"Inter\n", serif'],
    ["font-sans", '"Inter\r", serif'],
    ["font-sans", "'Inter\f', serif"],
    ["font-sans", '"Inter\u0000", serif'],
    ["font-sans", "initial"],
    ["font-sans", "Inter, inherit"],
    ["font-sans", "UNSET"],
    ["font-sans", "revert-layer"],
    ["font-display", "default"],
  ])("rejects %s = %j", (token, value) => {
    const brand = { [token]: value } as unknown as Brand;
    expect(validateBrand(brand)).toEqual([{ kind: "format", token, value }]);
  });

  it.each([null, undefined, [], "brand", 4])("rejects %j, which is not a brand", (value) => {
    expect(validateBrand(value)).toEqual([{ kind: "invalid-brand", value }]);
  });

  it("rejects a sparse color array without throwing", () => {
    const sparse: string[] = [];
    sparse.length = 2;
    expect(validateBrand({ "color-primary": sparse })).toEqual([
      { kind: "format", token: "color-primary", value: sparse },
    ]);
  });

  it("skips the contrast checks while the format is invalid", () => {
    const brand = {
      "color-primary": ["#ffff00", "#ffff00"],
      "radius-card": "big",
    } as unknown as Brand;
    expect(validateBrand(brand).map((failure) => failure.kind)).toEqual(["format"]);
  });
});

describe("validateBrand contrast", () => {
  it("rejects a light brand under white button text", () => {
    const failures = validateBrand({ "color-primary": ["#ffd84d", "#73b0e6"] });
    expect(failures).toContainEqual(
      expect.objectContaining({
        kind: "contrast",
        pairing: "primary-button-text",
        theme: "light",
        foreground: "color-on-primary",
        background: "color-primary",
      })
    );
    expect(
      failures.every((failure) => failure.kind === "contrast" && failure.theme === "light")
    ).toBe(true);
  });

  it("checks the dark side on its own", () => {
    const failures = validateBrand({ "color-primary": ["#00548a", "#00548a"] });
    expect(failures.length).toBeGreaterThan(0);
    expect(
      failures.every((failure) => failure.kind === "contrast" && failure.theme === "dark")
    ).toBe(true);
  });

  it("checks the current sidebar item, a translucent brand fill", () => {
    // #6e6e6e text passes on white (5.1:1) and on the other light backgrounds set here, but the 10%
    // tint of the default primary drops it to 4.35:1.
    const failures = validateBrand({
      "color-neutral-50": ["#ffffff", "#1b1b1b"],
      "color-neutral-100": ["#f6f6f6", "#272727"],
      "color-neutral-900": ["#6e6e6e", "#d4d4d4"],
    });
    expect(failures).toEqual([
      expect.objectContaining({
        kind: "contrast",
        pairing: "current-sidebar-item",
        theme: "light",
        background: { color: "color-primary", alpha: 0.1, over: "color-surface" },
      }),
    ]);
  });

  it("checks text on the hover background of outline buttons and sidebar items", () => {
    const failures = validateBrand({ "color-neutral-100": ["#3d3d3d", "#272727"] });
    expect(failures.map((failure) => failure.kind === "contrast" && failure.pairing)).toEqual([
      "outline-hover-text",
    ]);
  });

  it("checks the Alert body on its fixed danger background", () => {
    // Passes on a black surface, but the fixed dark danger-subtle is lighter than black.
    const failures = validateBrand({
      "color-surface": ["#ffffff", "#000000"],
      "color-neutral-50": ["#f6f6f6", "#000000"],
      "color-neutral-100": ["#e7e7e7", "#000000"],
      "color-neutral-900": ["#3d3d3d", "#5f5f5f"],
      "color-neutral-950": ["#303030", "#5f5f5f"],
      "color-neutral-700": ["#4f4f4f", "#8a8a8a"],
      "color-neutral-600": ["#5d5d5d", "#8a8a8a"],
      "color-neutral-500": ["#6d6d6d", "#7a7a7a"],
    });
    expect(failures.map((failure) => failure.kind === "contrast" && failure.pairing)).toContain(
      "alert-body-text"
    );
  });
});

describe("example brands", () => {
  it.each(mockedBrands.map((brand) => [brand.title, brand.brand]))("%s is valid", (_, brand) => {
    expect(validateBrand(brand)).toEqual([]);
  });

  it("one example overrides every brand token", () => {
    expect(
      mockedBrands.some((brand) => brandTokenNames.every((token) => token in brand.brand))
    ).toBe(true);
  });
});
