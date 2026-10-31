// Runs in plain Node against the installed package: no bundler, no browser, no JSX.
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { createElement as h } from "react";
import { renderToString } from "react-dom/server";
import {
  Button,
  Header,
  Input,
  Popover,
  ProductGrid,
  RadioGroup,
} from "@nicolassancho/storybook-core";

const distDir = new URL("./node_modules/@nicolassancho/storybook-core/dist/", import.meta.url);

// Presentational components are stateless, so they stay server-safe: a directive would stop a Server
// Component from passing them functions and would ship JavaScript for nothing. A component that needs
// state or browser APIs is a client component on purpose, with "use client" as the first statement of
// its own source file. The build must keep that directive on exactly those files, and React ignores it
// anywhere but first, so a misplaced one is an error too.
assert.ok(
  process.env.PACKAGE_SRC_DIR,
  "PACKAGE_SRC_DIR is not set (run this through test-package.mjs)"
);
const srcDir = pathToFileURL(`${process.env.PACKAGE_SRC_DIR}/`);

const listFiles = (dir, keep) =>
  readdirSync(dir, { recursive: true })
    .map((file) => file.replaceAll("\\", "/"))
    .filter(keep);
const read = (dir, file) => readFileSync(new URL(file, dir), "utf8");
const isFirstStatement = (source) => /^\s*["']use client["']/.test(source);

// The same files tsconfig.build.json compiles.
const sourceFiles = listFiles(
  srcDir,
  (file) => /\.tsx?$/.test(file) && !/\.stories\.tsx?$|Mock\.tsx?$|\.d\.ts$/.test(file)
);
const jsFiles = listFiles(distDir, (file) => file.endsWith(".js"));
assert.ok(sourceFiles.length > 0, "src/ has no source files");
assert.ok(jsFiles.length > 0, "dist/ has no JavaScript files");

const sourceClientFiles = sourceFiles
  .filter((file) => isFirstStatement(read(srcDir, file)))
  .map((file) => file.replace(/\.tsx?$/, ".js"));
const builtClientFiles = [];
for (const file of jsFiles) {
  const source = read(distDir, file);
  assert.equal(
    /["']use client["']/.test(source),
    isFirstStatement(source),
    `${file} has a "use client" that is not the first statement`
  );
  if (isFirstStatement(source)) builtClientFiles.push(file);
}
assert.deepEqual(
  builtClientFiles.sort(),
  sourceClientFiles.sort(),
  'the files with "use client" in dist/ differ from the source files that start with it'
);

// A plain component renders on the server.
assert.match(
  renderToString(h(Button, null, "Add to cart")),
  /<button[^>]*type="button"[^>]*>Add to cart/
);

// LinkComponent receives href, className and children and its output is what renders.
const Link = ({ href, className, children }) =>
  h("a", { href, className, "data-injected": "link" }, children);
const header = renderToString(
  h(Header, {
    brand: "Shop",
    navItems: [{ label: "Women", href: "/women" }],
    LinkComponent: Link,
  })
);
assert.match(header, /<nav[^>]*aria-label="Main"/);
assert.match(header, /<a[^>]*href="\/women"[^>]*data-injected="link"[^>]*>Women<\/a>/);

// ImageComponent output is used for every product image.
const Img = ({ src, alt, className }) =>
  h("img", { src, alt, className, "data-injected": "image" });
const products = ["a", "b"].map((id) => ({
  id,
  imageUrl: `/${id}.jpg`,
  title: `Product ${id}`,
  brand: "Brand",
  price: "$10",
}));
const grid = renderToString(h(ProductGrid, { products, ImageComponent: Img }));
assert.equal(grid.match(/data-injected="image"/g)?.length, products.length);

// An uncontrolled RadioGroup needs useId on the server and no handler: the default is checked
// and all inputs share one generated name.
const radios = renderToString(
  h(RadioGroup, {
    label: "Size",
    options: [
      { label: "Small", value: "s" },
      { label: "Medium", value: "m" },
    ],
    defaultValue: "m",
  })
);
const inputs = radios.match(/<input[^>]*>/g) ?? [];
assert.equal(inputs.length, 2);
assert.ok(inputs.every((input) => input.includes('type="radio"')));
assert.equal(new Set(inputs.map((input) => input.match(/name="([^"]+)"/)?.[1])).size, 1);
assert.equal(inputs.filter((input) => /\schecked(=|\s|>)/.test(input)).length, 1);
assert.match(
  inputs.find((input) => input.includes('value="m"')),
  /\schecked/
);

// Input wires its label, description and error with ids from useId, which must match on the server.
const field = renderToString(
  h(Input, { label: "Email", name: "email", description: "Help text", error: "Bad email" })
);
const fieldId = field.match(/<label[^>]*\sfor="([^"]+)"/)?.[1];
assert.ok(fieldId, "the label has no for attribute");
const fieldInput = field.match(/<input[^>]*>/)?.[0] ?? "";
assert.ok(fieldInput.includes(`id="${fieldId}"`), "the input id does not match the label");
assert.ok(fieldInput.includes('aria-invalid="true"'));
assert.match(fieldInput, new RegExp(`aria-describedby="${fieldId}-description ${fieldId}-error"`));
assert.ok(field.includes(`id="${fieldId}-error"`) && field.includes(`id="${fieldId}-description"`));

// Popover is a client component that still renders on the server: the trigger points at the panel
// by id, the panel is a native popover, and its children are in the HTML.
const popover = renderToString(h(Popover, { trigger: "Menu" }, h("a", { href: "/x" }, "Inside")));
const popoverId = popover.match(/<button[^>]*\spopovertarget="([^"]+)"/i)?.[1];
assert.ok(popoverId, "the trigger has no popovertarget");
assert.match(popover, new RegExp(`<div[^>]*\\sid="${popoverId}"[^>]*\\spopover="auto"`));
assert.match(popover, /aria-expanded="false"/);
assert.ok(popover.includes('<a href="/x">Inside</a>'));

console.log("Server render checks passed.");
