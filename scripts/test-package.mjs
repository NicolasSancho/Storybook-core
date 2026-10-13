// Smoke test for the package as a consumer receives it: pack the tarball, install it in a
// throwaway project with the peer dependencies, then run the checks in `package-fixture/`.
// Usage: npm run test:package (it builds first, so it checks the current source).
import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const fixture = fileURLToPath(new URL("./package-fixture", import.meta.url));

const run = (command, args, cwd) => execFileSync(command, args, { cwd, stdio: "inherit" });

// The version this repo tests against, so the result does not change when a peer releases.
const installedVersion = (name) =>
  JSON.parse(readFileSync(join(root, "node_modules", name, "package.json"), "utf8")).version;

const peers = Object.keys(
  JSON.parse(readFileSync(join(root, "package.json"), "utf8")).peerDependencies
);
// Not peers, but the documented Tailwind setup needs them to compile the CSS.
const toolchain = ["@tailwindcss/postcss", "postcss"];

const workDir = mkdtempSync(join(tmpdir(), "storybook-core-package-"));

try {
  const [{ filename }] = JSON.parse(
    execFileSync("npm", ["pack", "--ignore-scripts", "--json", "--pack-destination", workDir], {
      cwd: root,
      encoding: "utf8",
    })
  );

  writeFileSync(join(workDir, "package.json"), JSON.stringify({ private: true, type: "module" }));
  run(
    "npm",
    [
      "install",
      "--no-audit",
      "--no-fund",
      join(workDir, filename),
      ...[...peers, "react-dom", ...toolchain].map((name) => `${name}@${installedVersion(name)}`),
    ],
    workDir
  );

  cpSync(fixture, workDir, { recursive: true });
  run("node", ["render.mjs"], workDir);
  run("node", ["styles.mjs"], workDir);
  console.log("Package smoke test passed.");
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
