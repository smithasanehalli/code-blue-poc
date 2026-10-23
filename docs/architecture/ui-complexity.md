---
generated_by: sdd-ui-complexity
generated_on: 2026-10-22
constitution_date: 2026-10-22
overall_score: 1.7
overall_rating: Low
scores: { D1: 1, D2: 1, D3: 1, D4: 2, D5: 1, D6: 4 }
---

# UI Complexity Report: my-react-sdd

- **Generated**: 2026-10-22   **Source**: `sdd-ui-complexity`
- **Based on constitution**: 2026-10-22 (`.specify/memory/constitution.md`)
- **Previous score**: first run   **Change**: n/a

## Overall: Low (1.7 / 5)

This is a small, single-package React 19 + Vite prototype: 12 source files and about 1,500 lines, with only 2 runtime dependencies and a default build setup. Size and tooling are not the challenge. The risk is a missing safety net: there are no tests, no CI, no type checking and no formatter, so every change is verified by hand. A newcomer should be careful with `src/patients.js` and `src/App.jsx`, which hold all the data rules and app state.

## Scorecard

| Dimension | Score | Key numbers |
|---|---|---|
| D1 Size | 1 | 12 files (band 1: under 50); 1,549 lines (band 1: under 5k) |
| D2 Dependency footprint | 1 | 2 prod + 9 dev = 11 (band 1: under 30) |
| D3 Stack breadth and overlap | 1 | 6 categories in use, 0 overlaps, 0 legacy signals |
| D4 Structure and modularity | 2 | largest file 328 lines (`src/App.css`, band 2: 300–499); depth 1; 1 package; flat but clear layout |
| D5 Tooling and build | 1 | 2 root config files; default Vite config (react plugin only) |
| D6 Quality safeguards | 4 | test ratio 0.00; TS 0%, no tsconfig; no CI; lint yes, format no; 0 TODO markers (the only point subtracted) |
| **Overall** | **1.7** | (1 + 1 + 1 + 2 + 1 + 4) / 6 = 1.67 |

## Raw Measurements

| ID | Measurement | Value | Method |
|---|---|---|---|
| M1 | Source files | 12 (5 css, 5 jsx, 1 js, 1 html) | reference command (`git ls-files` list) |
| M2 | Lines of code | 1,549 physical lines | reference command |
| M3 | Production dependencies | 2 (`react`, `react-dom`) | count of `package.json > dependencies` |
| M4 | Dev dependencies | 9 | count of `package.json > devDependencies` |
| M5 | Stack categories in use | 6 (language, UI framework, build tool, styling, lint, other notable) | constitution Tech Stack table |
| M6 | Competing libraries | 0 | constitution "Overlaps" line |
| M7 | Workspaces / packages | 1 | constitution (no workspaces) |
| M8 | Test files / ratio | 0 / 0.00 | reference command |
| M9 | TypeScript share / strict | 0 of 6 script files (0%) / no `tsconfig.json` | reference command |
| M10 | Root config files | 2 (`eslint.config.js`, `vite.config.js`) | root listing |
| M11 | Largest file | `src/App.css`, 328 lines (top 10 below) | reference command |
| M12 | Max nesting depth | 1 (`src/<file>`) | reference command |
| M13 | Feature areas / routes | 3 screens: Login, plus 2 modules (`triage`, `profile`) declared in `src/AppLayout.jsx`; no router | declared modules (no feature folders exist) |
| M14 | Automation | CI workflow: no · CI runs tests/lint: no · pre-commit hook: no · lint config: yes · format config: no | file listing (`.github/` has only `prompts/`) |
| M15 | TODO/FIXME/HACK markers | 0 | reference command |
| M16 | Duplicate / legacy signals | none. One styling approach (plain CSS), function components only, JS only | constitution + file listing |

**Excluded from counts**: `node_modules/`, `dist/`, `.git/`, `package-lock.json`, root config files (counted in M10), dotfiles, non-source assets (`public/*.svg`, `src/assets/*`), Markdown and YAML (`specs/`, `.specify/`, `.claude/`, `.github/prompts/`, `README.md`)
**Not measurable**: none. All dimensions scored.

## Hotspots

| File | Lines | Appears to do |
|---|---|---|
| `src/App.css` | 328 | Login screen styles (`login-*`, `aside-*`, form fields, sign-in button) |
| `src/patients.js` | 279 | Demo patient records (most of the file), column config, `localStorage` load/save/clear, field validation |
| `src/PatientDetails.jsx` | 187 | Patient selector and edit form with draft state, dirty check, validation and save |
| `src/App.jsx` | 179 | Login component, plus top-level app state (sign-in, active module, patients) and screen switching |
| `src/AppLayout.css` | 132 | Header, module nav and sign-out styles |
| `src/PatientDetails.css` | 119 | Profile form styles |
| `src/index.css` | 111 | Global CSS variables and base element styles (includes Vite starter rules such as `.counter`, which no component uses) |
| `src/TriageBoard.css` | 93 | Scrollable triage table styles |
| `src/TriageBoard.jsx` | 60 | Read-only patient table; Patient ID opens the profile |
| `src/AppLayout.jsx` | 38 | App shell: brand, module nav buttons, sign out |

## Risk Flags

- **No automated tests** (M8): 0 test files and no test framework. Behaviour such as validation in `validatePatient` and saving to `localStorage` is verified only by hand.
- **No CI or pre-commit checks** (M14): nothing runs lint or a build on push. `npm run lint` exists but is optional.
- **No type checking** (M9): 0% TypeScript and no `jsconfig.json` checking. Prop and data-shape mistakes surface only at runtime.
- **No formatter configured** (M14): there is no Prettier or similar, so formatting consistency depends on each editor.
- **Logic concentrated in two files** (M11, M13): `src/App.jsx` holds all app state and the login screen, and `src/patients.js` holds all data rules. Most feature changes will touch one or both.
- **Unused starter styles** (M11, `src/index.css`): `.counter` in `src/index.css` and `.prototype-notice` in `src/App.css` are not referenced by any component, which can mislead when restyling.

## Versions Worth Verifying

These are not claimed to be outdated. They are listed for a human to check against current releases:
`react` / `react-dom` `^19.2.8`, `vite` `^8.3.0`, `@vitejs/plugin-react` `^6.1.1`, `eslint` `^10.10.0`, `eslint-plugin-react-hooks` `^7.1.1`

## Onboarding Reading Path

1. `README.md`: how to install, run, and sign in to the prototype.
2. `.specify/memory/constitution.md`: the stack, conventions, and open questions in one place.
3. `src/main.jsx`: the entry point (10 lines) that mounts `App`.
4. `src/App.jsx`: all top-level state, the login screen, and how screens switch (there is no router).
5. `src/patients.js`: the patient data model, persistence, and validation rules.
6. `src/AppLayout.jsx`: the shell and module navigation.
7. `src/TriageBoard.jsx`: the simplest feature, and a good template for new modules.
8. `src/PatientDetails.jsx`: the most involved feature (form state, dirty check, save).

(No test or CI file exists to add to this list.)

## Limitations

This report counts files, lines, and configuration. It cannot tell you about runtime behaviour, whether the app builds or lint passes (nothing was run), performance, accessibility in practice, security posture, or the clinical and business complexity of the triage domain. Line counts are physical lines, including blanks and the large block of demo data in `src/patients.js`.
