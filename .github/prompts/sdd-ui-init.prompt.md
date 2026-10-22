---
description: Analyze an existing UI project (package.json, configs, folder structure) and generate a draft constitution recording the tech stack and observed conventions. Runs once per project.
---

# sdd-ui-init

## Usage

```
/sdd-ui-init [path] [-force]   # Copilot, Claude Code

Optional arguments:
  path        Project root to analyze (default: current directory)
  -force      Regenerate even if a constitution already exists
              (the old file is kept as constitution.previous.md)
```

Arguments for this run: `$ARGUMENTS`
(If the line above still shows a literal `$ARGUMENTS` placeholder, take the arguments from the user's message instead. If there are none, use the defaults.)

## Purpose

Point this at an **existing** JavaScript/TypeScript UI project and get a first-draft constitution: a factual record of what the project is built with and how it is written today. It is the onboarding step that later SDD commands (specify, plan, review, fix, and `sdd-ui-complexity`) read for context.

This constitution is **descriptive first**. It records what the codebase *does*, not what it *should* do. Proposed rules are clearly marked so a human can confirm or reject them.

## Operating Rules

1. **Run once.** If `.specify/memory/constitution.md` already exists and `-force` is not set, stop and tell the user. Do not overwrite.
2. **Read-only except one file.** Write only `.specify/memory/constitution.md` (plus `constitution.previous.md` when `-force` replaces an existing one). Never modify project files.
3. **Evidence or it did not happen.** Every stack fact must cite the file it came from, for example `package.json > dependencies.react`. If you cannot find evidence, write `Not found`. Never guess.
4. **Label certainty.** Mark each item **[Detected]** (stated directly in a file) or **[Inferred]** (concluded from patterns). Prefer Detected. Keep Inferred items few and explain the basis.
5. **Do not claim a version is outdated or vulnerable.** Your knowledge may be stale and you are not checking a registry. Record versions exactly as written and list "versions worth verifying" for a human.
6. **No invented conventions.** A convention requires at least 3 consistent examples in the sampled files. Otherwise list it under Open Questions.
7. **No secrets.** Never copy values from `.env*` files, `.npmrc` auth lines, or tokens in configs. Record only that such files exist.
8. **Do not run the project.** No install, build, test, or dev-server commands. Listing and reading files only.
9. **Exclude noise.** Never read or count `node_modules`, `bower_components`, `dist`, `build`, `out`, `.next`, `.nuxt`, `.angular`, `coverage`, or vendored/minified files.
10. **Stay simple.** One file out, no scoring, no recommendations. Complexity analysis belongs to `sdd-ui-complexity`.

## Execution Steps

### Step 0: Parse arguments and check preconditions

1. Resolve `path` (default `.`) and the `-force` flag.
2. If `.specify/memory/constitution.md` exists under the project root:
   - without `-force`: stop with "Constitution already exists at <path>. Re-run with -force to regenerate." Do nothing else.
   - with `-force`: plan to rename it to `.specify/memory/constitution.previous.md` before writing the new one, and carry its Amendment Log rows forward.

### Step 1: Locate the project

From `path`, find `package.json` (do not search inside excluded folders). Then:

- **Monorepo** if the root `package.json` has a `workspaces` field, or any of `pnpm-workspace.yaml`, `lerna.json`, `nx.json`, `turbo.json`, `rush.json` exists. Analyze the root in full and each workspace package at summary level (name, framework, role: app or library).
- **Single project** otherwise. Analyze the nearest `package.json` to `path` and list any others under "Other packages found".
- **Legacy without package.json**: if there is no `package.json` but `bower.json` or a `Gruntfile.js` / `gulpfile.js` exists, continue, use that file as the manifest, and note it in the snapshot.
- If none of these exist, stop and say this does not look like a JS/TS UI project.

### Step 2: Read manifests and configs

Read whichever of these exist (skip silently if absent, but list every file you read):

- **Manifest**: `package.json` (name, version, `private`, `scripts`, `dependencies`, `devDependencies`, `peerDependencies`, `engines`, `workspaces`, `type`, `packageManager`, `browserslist`), `bower.json`
- **Lockfile** (identify only, do not read contents): `package-lock.json`, `npm-shrinkwrap.json`, `yarn.lock`, `pnpm-lock.yaml`, `bun.lockb`, `bun.lock`. More than one lockfile is a finding.
- **Runtime**: `.nvmrc`, `.node-version`, `.tool-versions`, `engines`, `volta` field
- **Language**: `tsconfig*.json` (note `strict`, `target`, `module`, `paths`, `jsx`), `jsconfig.json`
- **Build**: `vite.config.*`, `webpack.config.*` (and `config/webpack*`), `next.config.*`, `nuxt.config.*`, `angular.json`, `svelte.config.*`, `astro.config.*`, `remix.config.*`, `rollup.config.*`, `craco.config.*`, `babel.config.*`, `.babelrc`, `postcss.config.*`, `tailwind.config.*`, `Gruntfile.js`, `gulpfile.js`
- **Quality**: `.eslintrc*`, `eslint.config.*`, `.prettierrc*`, `prettier.config.*`, `.stylelintrc*`, `.editorconfig`, `.husky/`, `lint-staged` config, `commitlint` config, `tslint.json`
- **Testing**: `jest.config.*`, `vitest.config.*`, `karma.conf.*`, `protractor.conf.*`, `playwright.config.*`, `cypress.config.*`, `cypress.json`, `.storybook/`
- **CI/CD and deploy**: `.github/workflows/*`, `.gitlab-ci.yml`, `Jenkinsfile`, `azure-pipelines.yml`, `bitbucket-pipelines.yml`, `Dockerfile`, `nginx.conf`, `vercel.json`, `netlify.toml`
- **Environment** (existence and variable *names* only): `.env.example`, `.env.sample`, `.env*`
- **Docs**: `README.md`, `CONTRIBUTING.md`, `docs/`

### Step 3: Classify the stack from dependencies

Using only what appears in the manifest and configs, fill in each category (or `Not found`):

| Category | Look for |
|---|---|
| Language | TypeScript vs JavaScript (tsconfig, `typescript` dep, file extensions) |
| UI framework | react, vue, @angular/core, svelte, solid-js, preact, lit; **legacy**: `angular` (AngularJS 1.x), jquery, backbone, ember-source, knockout |
| Meta-framework | next, nuxt, @remix-run/*, gatsby, astro, @sveltejs/kit |
| Build tool / bundler | vite, webpack, rollup, parcel, esbuild, turbopack, CRA (`react-scripts`), @angular-devkit/build-angular; **legacy**: grunt, gulp, browserify, bower |
| Package manager | from lockfile and `packageManager` |
| Routing | react-router(-dom), @tanstack/router, vue-router, @angular/router, framework-native file routing, `angular-route` / `@uirouter/*` |
| State management | redux, @reduxjs/toolkit, zustand, mobx, recoil, jotai, pinia, vuex, @ngrx/store, xstate, context-only |
| Data fetching | axios, fetch wrappers, @tanstack/*-query, swr, @apollo/client, urql, RTK Query, `$http` / `HttpClient` |
| Styling | tailwindcss, styled-components, @emotion/*, sass, less, CSS modules, vanilla-extract |
| Component library | @mui/*, antd, @chakra-ui/*, @radix-ui/*, bootstrap, primeng / primereact, @angular/material, vuetify, shadcn (a `components/ui` dir) |
| Forms / validation | react-hook-form, formik, zod, yup, joi, vee-validate, @angular/forms |
| Unit / component testing | jest, vitest, @testing-library/*, karma, jasmine, mocha, enzyme |
| E2E testing | playwright, cypress, selenium-webdriver, webdriverio, protractor |
| Lint / format | eslint, prettier, stylelint, tslint |
| i18n | i18next, react-intl, vue-i18n, @angular/localize, @ngx-translate/* |
| Other notable | charting, date libs (moment, date-fns, dayjs), auth SDKs, analytics, feature flags, error tracking, micro-frontend (module federation, single-spa) |

Record the **declared version range exactly as written**. If two libraries compete in one category (for example redux and zustand, or moment and date-fns), note both; that is a finding, not an error. A framework present only in `devDependencies` or `peerDependencies` usually means a library, not an app; say so.

### Step 4: Sample the source

Keep this light.

1. List the top two levels of the source root (`src/`, `app/`, `pages/`, `lib/`, or `projects/` for Angular workspaces).
2. Identify the entry point (`main.*`, `index.*`, `app.*`, `_app.*`, `app/layout.*`, `main.ts` for Angular, the HTML file loading scripts for legacy apps).
3. Decide the folder organization: **feature-based**, **layer-based** (components/hooks/services/utils), **domain-based**, or **mixed**. State the evidence.
4. Sample up to **10 files** spread across areas (components, state, API access, tests). From them note, only if consistent across at least 3: file naming style, component style (function vs class, hooks, composition vs options API, standalone vs NgModule), export style, test file placement and naming, where API calls live, import style (aliases vs relative).

### Step 5: Extract commands

From `scripts` (or Grunt/Gulp tasks), list the commands for: install, dev server, build, unit test, e2e, lint, format, type-check, storybook. Use the detected package manager in the install command (`npm ci`, `yarn install --frozen-lockfile`, `pnpm install --frozen-lockfile`, and so on). Mark missing ones `Not found`. Do not run any of them.

### Step 6: Self-check before writing

Go through this list and fix the draft before writing it:

- [ ] Every row in the Tech Stack table has an Evidence value or says `Not found`.
- [ ] No version is described as old, outdated, deprecated, or vulnerable.
- [ ] Every convention in Section 3 cites 3 or more example files. Move any that don't to Open Questions.
- [ ] Every proposed principle in Section 4 has a basis.
- [ ] No secret values appear anywhere.
- [ ] The YAML front matter matches the tables.

### Step 7: Write the constitution

Create `.specify/memory/constitution.md` using `.specify/templates/ui-constitution-template.md` as the structure (create the folders if needed). Fill every `<placeholder>`, keep the section order and headings, and remove nothing except placeholder text. Then print a short chat summary:

```
Constitution draft written: .specify/memory/constitution.md
Stack: <framework> + <language> (<build tool>)
Inferred items: <n>   Open questions: <n>
Next: review Section 4, then run /sdd-ui-complexity
```

Remind the user the file is a **Draft** that needs review.

## Constitution Template

The output structure lives in `.specify/templates/ui-constitution-template.md`. Edit that file to change the report layout; edit this prompt to change how the analysis is done.
