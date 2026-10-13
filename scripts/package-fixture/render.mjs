// Runs in plain Node against the installed package: no bundler, no browser, no JSX.
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { createElement as h } from "react";
import { renderToString } from "react-dom/server";
import { Button, Header, ProductGrid, RadioGroup } from "@nicolassancho/storybook-core";

const distDir = new URL("./node_modules/@nicolassancho/storybook-core/dist/", import.meta.url);

// Components are stateless, so none may opt into the client: a directive would stop a Server
// Component from passing them functions and would ship JavaScript for nothing.
const jsFiles = readdirSync(distDir, { recursive: true }).filter((file) => file.endsWith(".js"));
assert.ok(jsFiles.length > 0, "dist/ has no JavaScript files");
for (const file of jsFiles) {
  const source = readFileSync(new URL(file, distDir), "utf8");
  assert.doesNotMatch(source, /["']use client["']/, `${file} has a "use client" directive`);
}

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

console.log("Server render checks passed.");
