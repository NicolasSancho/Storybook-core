# CI and publishing

Rules for `.github/`. The root `CLAUDE.md` still applies.

## Publishing / CI

- Every push to `main` publishes (`.github/workflows/main.yml`, Node 24, `NPM_TOKEN`, an npm access token),
  but only after the `checks` job (the reusable `ci.yml`, described below) passes on
  that commit.
- Bump the version as the last commit on the branch before merging, or the publish
  fails on a duplicate version:
  `npm version <patch|minor> --no-git-tag-version` (updates package.json and the lockfile).
  Use at least `minor` when a change is visible to consumers (colors, behavior, new props).
  Add the matching `CHANGELOG.md` entry (same version, today's date, heading `## <version> - <date>`)
  in that same commit: the GitHub Release notes are taken from it, and CI fails without it. A change
  that touches no package code (a workflow edit) still needs the bump, because every push to `main`
  publishes.
- `.github/workflows/ci.yml` runs on every PR and is called by `main.yml` on every push to
  `main` (it has no push trigger of its own, so the checks do not run twice). Keep it green
  before merging. It runs, in order:
  - On PRs only: fails if the `package.json` version equals the one on the base branch, and
    fails if `CHANGELOG.md` has no `## <version>` section.
  - `npm ci` (which triggers `prepare` → `npm run build`), `npx tsc --noEmit`, `npm run lint`,
    `npx prettier --check ./src ./.storybook`, `npm run build-storybook` and `npm test`.
  - In a parallel `package` job (no browser): `npm ci` and `npm run test:package`. Publishing waits
    for it, because `main.yml` calls the whole workflow.
- After the checks pass, the publish job runs `npm ci`, `npm run build-storybook` and
  `npm publish --provenance`: npm records the workflow run and commit that built the package.
- After `publish`, the `release` job creates the annotated tag `v<version>` (message `<version>`)
  on the published commit and a GitHub Release with that version's `CHANGELOG.md` section as its
  notes. CI creates tags, so nobody pushes them by hand. The job skips a tag that exists, and it is
  separate from `publish` so it can be re-run alone (re-running `publish` fails on the duplicate
  version).
- On `main` only, the last step of `ci.yml` uploads `storybook-static` as the Pages artifact.
  After the checks pass, the `deploy-docs` job in `main.yml` deploys it to GitHub Pages
  (https://nicolassancho.github.io/Storybook-core/). It builds nothing, so the site is exactly the
  build that passed the checks, and it does not wait for `publish`. The repo's Pages source must
  be set to "GitHub Actions".
