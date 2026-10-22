---
generated_by: sdd-ui-init
generated_on: 2026-10-22
status: draft
project_type: ui
project_name: my-react-sdd
shape: app
language: javascript
framework: react ^19.2.8
meta_framework: none
build_tool: vite
package_manager: npm
legacy_signals: false
---

# Project Constitution: my-react-sdd

> **Status: DRAFT (auto-generated, not yet human-reviewed)**
> **Generated**: 2026-10-22   **Source**: `sdd-ui-init`   **Project type**: UI (React)
> Facts are labeled **[Detected]** (stated in a file) or **[Inferred]** (concluded from patterns).
> Section 4 contains *proposed* rules. Confirm, edit, or delete them before relying on this file.

## 1. Project Snapshot

- **Name / version**: `my-react-sdd` 0.0.0, `private: true`, `type: module` [Detected: `package.json`]. README title is `code-blue-poc`; the page title is "ABC Hospital" [Detected: `README.md`, `index.html`]
- **Shape**: app   **Workspaces**: none [Detected: no `workspaces` field and no workspace config files]
- **Entry point**: `index.html` loads `/src/main.jsx`, which renders `App` from `src/App.jsx` inside `StrictMode` [Detected]
- **Runtime**: Not found (no `engines`, `.nvmrc`, `.node-version`, `.tool-versions`, or `volta`)
- **Package manager**: npm [Detected from `package-lock.json`; single lockfile]
- **Environment variables expected**: none found (no `.env*` files)
- **Files read**: `package.json`, `vite.config.js`, `eslint.config.js`, `index.html`, `README.md`, `.gitignore`; lockfile identified only
- **Other packages found**: none

## 2. Tech Stack

| Category | Choice | Version (as declared) | Evidence | Certainty |
|---|---|---|---|---|
| Language | JavaScript (ESM, JSX) | n/a | `.js`/`.jsx` files only; no `tsconfig.json` or `typescript` dependency | [Detected] |
| UI framework | React + React DOM | `^19.2.8` / `^19.2.8` | `package.json > dependencies.react`, `dependencies.react-dom` | [Detected] |
| Meta-framework | Not found | | | |
| Build tool | Vite with `@vitejs/plugin-react` | `^8.3.0` / `^6.1.1` | `package.json > devDependencies.vite`; `vite.config.js` (default config, react plugin only) | [Detected] |
| Routing | Not found (no router library). Screens switch on an `activeModule` state value | | `src/App.jsx` (`activeModule === 'triage'`) | [Inferred] |
| State management | Not found (no library). Local `useState`, lifted to `App` and passed down as props; no context | | `src/App.jsx`; no `createContext` in `src/` | [Inferred] |
| Data fetching | Not found. Data is bundled demo records, saved to `localStorage` | | `src/patients.js` (`loadPatients`, `savePatients`, `clearSavedPatients`) | [Detected] |
| Styling | Plain global CSS, one stylesheet per component, CSS custom properties | | `src/*.css` imported from components; `:root` variables in `src/index.css` | [Detected] |
| Component library | Not found | | | |
| Forms / validation | Not found (no library). Native forms with hand-written validation | | `src/App.jsx` (`handleSubmit`), `src/patients.js` (`validatePatient`) | [Detected] |
| Unit testing | Not found | | no test dependencies, configs, or test files | |
| E2E testing | Not found | | | |
| Lint / format | ESLint (flat config) with `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`. No formatter | `^10.10.0` (eslint) | `package.json > devDependencies`; `eslint.config.js` | [Detected] |
| i18n | Not found | | | |
| Other notable | `@types/react`, `@types/react-dom` (type definitions, used by the editor; no TypeScript in the project) | `^19.2.18` / `^19.2.7` | `package.json > devDependencies` | [Detected] |

**Overlaps or competing choices**: none
**Legacy signals**: none
**Versions worth verifying** (not claimed outdated, just worth a human check): `react`/`react-dom` `^19.2.8`, `vite` `^8.3.0`, `@vitejs/plugin-react` `^6.1.1`, `eslint` `^10.10.0`, `eslint-plugin-react-hooks` `^7.1.1`

## 3. Structure and Observed Conventions

- **Organization**: flat. All components and modules sit directly in `src/`, with no feature, layer, or domain folders (evidence: `src/` has one subfolder, `assets/`). This fits none of the feature/layer/domain/mixed categories; see Open Questions.
- **Directory map** (top two levels):
  ```
  index.html
  public/          favicon.svg, icons.svg
  src/
    main.jsx       entry
    App.jsx        login screen + top-level state + module switch
    AppLayout.jsx  header, module nav, sign out
    TriageBoard.jsx
    PatientProfile.jsx
    patients.js    demo data, column config, localStorage, validation
    *.css          one per component, plus App.css and index.css
    assets/        hero.png, react.svg, vite.svg
  specs/           SDD feature specs
  .specify/        SDD templates, scripts, memory
  ```
- **Naming**: components use PascalCase `.jsx` files (`App.jsx`, `AppLayout.jsx`, `TriageBoard.jsx`, `PatientProfile.jsx`). Each component has a matching `.css` file with the same name. Non-component modules use lowercase `.js` (`patients.js`; only one example). [Detected]
- **Component style**: function components declared as `function Name({ ...props })`, with props destructured in the signature and `export default` at the end of the file (`App.jsx`, `AppLayout.jsx`, `TriageBoard.jsx`, `PatientProfile.jsx`). Event handlers are named `handleX`, and callback props are named `onX` (`App.jsx`, `AppLayout.jsx`, `PatientProfile.jsx`). [Detected]
- **CSS classes**: kebab-case, prefixed with the component or area name (`login-*` in `App.jsx`, `app-*` in `AppLayout.jsx`, `triage-*` in `TriageBoard.jsx`). [Detected]
- **Accessibility**: ARIA attributes are used throughout: `aria-labelledby`, `aria-current`, `aria-invalid`, `aria-describedby`, `aria-live`, table `scope` (`App.jsx`, `AppLayout.jsx`, `TriageBoard.jsx`, `PatientProfile.jsx`). [Detected]
- **API access lives in**: no network API. Data access and persistence are centralized in `src/patients.js` (`localStorage`). [Detected]
- **Tests live in**: no tests found
- **Import style**: relative imports with explicit extensions (`./App.jsx`, `./patients.js`); no path aliases (`main.jsx`, `App.jsx`, `TriageBoard.jsx`, `PatientProfile.jsx`). [Detected]

## 4. Proposed Principles (REQUIRES HUMAN CONFIRMATION)

Rules derived from the observed conventions above. Each is marked with the evidence behind it.

- [ ] **MUST** write components as function components with destructured props and a default export (basis: 4 of 4 component files)
- [ ] **MUST** name component files in PascalCase `.jsx`, each with a same-named `.css` file imported at the top (basis: 4 of 4 component files)
- [ ] **MUST** use relative imports with explicit `.js`/`.jsx` extensions (basis: 5 of 5 sampled source files)
- [ ] **MUST** pass `npm run lint` before merge (basis: `lint` script and `eslint.config.js`; no CI enforces it today)
- [ ] **MUST** keep patient data access, persistence, and validation in `src/patients.js`, not in components (basis: all `localStorage` calls and `validatePatient` live there)
- [ ] **SHOULD** prefix CSS class names with the component or area name (basis: 3 of 3 checked components)
- [ ] **SHOULD** give interactive and dynamic elements ARIA labelling (`aria-labelledby`, `aria-invalid` with `aria-describedby`, `aria-live` for errors) (basis: 4 of 4 component files)
- [ ] **SHOULD** name handlers `handleX` and callback props `onX` (basis: 3 of 3 files with handlers)
- [ ] **MUST** label demo data clearly as non-clinical (basis: the demo-data notice in `TriageBoard.jsx`; this is a healthcare-themed prototype)

## 5. Commands

| Task | Command | Source |
|---|---|---|
| Install | `npm ci` | `package-lock.json` (README uses `npm install`) |
| Dev server | `npm run dev` | `package.json > scripts.dev` (`vite`) |
| Build | `npm run build` | `package.json > scripts.build` (`vite build`, output `dist/`) |
| Unit test | Not found | |
| E2E test | Not found | |
| Lint | `npm run lint` | `package.json > scripts.lint` (`eslint .`) |
| Format | Not found | |
| Type-check | Not found | |
| Storybook | Not found | |
| Preview build | `npm run preview` | `package.json > scripts.preview` (`vite preview`) |

## 6. Quality Gates Detected

None detected. There is no CI workflow (`.github/` contains only `prompts/`), no pre-commit hook, no lint-staged or commitlint config, and no test coverage requirement. ESLint is available but runs only manually.

## 7. Open Questions

1. **Two constitutions.** The project already has a split constitution in `.specify/memory/constitution/` (`core.md`, `architecture.md`, `testing.md`, `security.md`, `observability.md`, `user-interface.md`) used by the other `sdd-*` commands. Should this file be merged into it, replace it, or stay separate?
2. **Folder organization.** Should `src/` stay flat, or move to feature folders (for example `src/triage/`, `src/profile/`) as modules are added?
3. **Testing.** No test framework is set up. Is one planned (for example Vitest with Testing Library, since this is a Vite project)?
4. **Unused scaffold assets** [Inferred]: `src/assets/hero.png`, `react.svg`, and `vite.svg` are not referenced anywhere in `src/` or `index.html`. Can they be removed? Some `src/index.css` variables (for example `--social-bg`, `--code-bg`) also look like leftovers from the Vite starter.
5. **Non-component module naming.** Only one example exists (`patients.js`), so the lowercase `.js` convention is not confirmed.
6. **Project name.** The project uses three names: `my-react-sdd` (`package.json`), `code-blue-poc` (README and Git remote), and "ABC Hospital" (UI). Which is canonical?
7. **Demo credentials.** `src/App.jsx` contains hard-coded demo sign-in values (not copied here). Confirm these must never be real credentials and that a real sign-in is out of scope.
8. **Node version.** No Node version is pinned. Should `engines` or `.nvmrc` be added?

## 8. Amendment Log

| Date | Change | By |
|---|---|---|
| 2026-10-22 | Initial draft generated by sdd-ui-init | auto |
