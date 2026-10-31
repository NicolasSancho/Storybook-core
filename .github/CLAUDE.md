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
  in that same commit: the GitHub Release notes are taken from it, and CI fails without it.
  Group the lines under `### Added`, `### Changed`, `### Fixed` or `### Removed` (and `### Migrating`
  for upgrade steps), as earlier entries do. A change that touches no package code (a workflow
  edit) still needs the bump, because every push to `main` publishes.
- `.github/workflows/ci.yml` runs on every PR and is called by `main.yml` on every push to
  `main` (it has no push trigger of its own, so the checks do not run twice). Keep it green
  before merging. It has two jobs that run in parallel, and publishing waits for both, because
  `main.yml` calls the whole workflow:
  - `checks`, in order. On PRs only: fails if the `package.json` version equals the one on the
    base branch, and fails if `CHANGELOG.md` has no `## <version>` section. Then `npm ci` (which
    triggers `prepare` → `npm run build`), `npx tsc --noEmit`, `npm run lint`,
    `npx prettier --check ./src ./.storybook`, `npm run build-storybook` and `npm test`.
  - `package` (no browser): `npm ci` and `npm run test:package`. On pushes to `main` it then packs the
    tarball (`npm pack`) and uploads it as the `package` artifact.
- After the checks pass, the publish job downloads that artifact and publishes the file with provenance. It
  installs and builds nothing, so the file that reaches npm is the one the package check verified. npm records
  the workflow run and commit that published it. The path is `./package/*.tgz`: without the `./`, npm reads
  `package/x.tgz` as a GitHub `owner/repo` shorthand and fails.
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
