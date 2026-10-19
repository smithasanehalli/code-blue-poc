# Constitutional Drift Report

**Detection Date**: 2026-10-19  
**Constitution Version**: core 1.1.0 (architecture, testing, security, observability, user-interface: unfilled template 1.0.0)  
**Project Status**: Partially Compliant  
**Drift Score**: 28.6% (4 of 14 principles with drift; severity-weighted 16.1%)  
**Input**: Project state at `.` compared against modular constitution files in `.specify/memory/constitution/`

---

## Assessment Scope

| Module              | State                                     | Assessed |
| ------------------- | ----------------------------------------- | -------- |
| `core.md`           | Project-specific (v1.1.0, amended 2026-10-16) | Yes  |
| `architecture.md`   | Unfilled template (38 placeholders)       | No: no project rules to compare against |
| `testing.md`        | Unfilled template (63 placeholders)       | No: no project rules to compare against |
| `security.md`       | Unfilled template (49 placeholders)       | No: `core.md` security references assessed instead |
| `observability.md`  | Unfilled template (31 placeholders)       | No: no project rules to compare against |
| `user-interface.md` | Unfilled template (124 placeholders)      | No: no project rules to compare against |

The five unfilled modules contain only `[PLACEHOLDER]` tokens. Drift against them can't be
measured, so the report records their incompleteness as a single governance item (Principle 14).
It does not invent requirements for them.

### Evidence Collected

- `npm run lint`: passes with 0 errors and 0 warnings.
- `npm audit`: 0 vulnerabilities.
- Installed: react 19.3.1, react-dom 19.3.1, vite 8.3.4, eslint 10.12.0 (all match the `core.md` stack).
- `src/` scan: no `eval`, `new Function`, `dangerouslySetInnerHTML`, deprecated React APIs,
  `console.*`, `fetch`, or unhandled promises.
- `src/App.jsx` contains `Login` and `App`. `src/PatientList.jsx` contains `PatientList`.
- `.github/workflows/`: not present (no CI). `core.md` does not require CI.

---

## Summary Statistics

### Overall Metrics

- **Total Principles**: 14
- **Principles with Drift**: 4
- **Drift Score**: 28.6% (severity-weighted 16.1%, using weights Critical 4 / High 3 / Medium 2 / Low 1 out of a maximum of 56)
- **Total Drift Items**: 4
  - Critical: 0
  - High: 2
  - Medium: 1
  - Low: 1

### Compliance Status

- ✅ **Compliant Principles**: 10 (Technology Stack, Technology Prohibitions, Language, Type Safety,
  Async Patterns, Error Handling, Logging, Validation, DTOs/Models, Versioning Policy)
- ⚠️ **Partially Compliant**: 3 (Modularity, Secrets, Enforcement & Validation)
- ❌ **Non-Compliant**: 1 (Constitution Completeness)

### Recommended Timeline

- **Critical items**: None
- **High priority items**: Within 1 week (both are documentation/governance, not code)
- **Medium priority items**: This sprint
- **Low priority items**: Backlog, or when the next feature touches `src/App.jsx`

---

## Principle 1: Technology Stack Standards

**Status**: Compliant  
**Drift Items**: 0

> Runtime: Evergreen browsers; React 19.x UI; Vite 8.x toolchain. Language: JavaScript ES modules and JSX.

React 19.3.1, Vite 8.3.4, JSX/ES modules, client-side only. No database. No drift.

---

## Principle 2: Technology Prohibitions

**Status**: Compliant  
**Drift Items**: 0

> Do not use `eval`, the `Function` constructor, or implicit global variables. Do not use deprecated React APIs.

None of these are present in `src/`. No drift.

---

## Principle 3: Coding Standards: Language

**Status**: Compliant  
**Drift Items**: 0

> Use JavaScript ES modules and JSX consistent with the existing Vite setup.

All source files are `.jsx` ES modules. No drift.

---

## Principle 4: Coding Standards: Type Safety

**Status**: Compliant  
**Drift Items**: 0

> Run ESLint; validate untrusted or externally supplied data at its boundary.

ESLint passes. The form validates the email and password fields before submitting (`src/App.jsx:11-32`). No drift.

---

## Principle 5: Coding Standards: Async Patterns

**Status**: Compliant (not exercised)  
**Drift Items**: 0

> Handle rejected promises; clean up subscriptions and asynchronous effects.

The code has no async operations, effects, or subscriptions. No drift.

---

## Principle 6: Coding Standards: Modularity

**Status**: Partially Compliant  
**Drift Items**: 1

### Constitutional Requirement

> **Modularity**: Keep components and modules focused; avoid layers without a concrete need. (MUST)

### Low Priority Drift

- [ ] **DRIFT-004**: `src/App.jsx` holds both the `Login` screen and the `App` screen switcher.
  - **Requirement**: `core.md` §2 Modularity
  - **Current State**: `Login` (form, validation, demo values) and `App` (signed-in state and screen selection)
    are in one file. `PatientList` is already in its own file, so the layout is inconsistent.
  - **Required State**: Each screen component is focused in its own module, and `App` only composes screens.
  - **Remediation**: Move `Login` and its demo constants into `src/Login.jsx`. Keep `App` in `src/App.jsx`
    as the screen switcher. Consider moving the login styles into `src/Login.css` to match `PatientList.css`.
  - **Effort**: 0.5 hours
  - **Files**: `src/App.jsx`, `src/App.css`

---

## Principle 7: Coding Standards: Error Handling

**Status**: Compliant  
**Drift Items**: 0

> Show actionable failure states; do not expose secrets or internal implementation details in user-visible messages.

The field errors ("Enter your email address.", "Enter a valid email address.", "Enter your password.")
tell the user what to fix and do not echo what they typed. No drift.

---

## Principle 8: Coding Standards: Logging

**Status**: Compliant (not exercised)  
**Drift Items**: 0

> Follow the project-specific observability standards when logging is added.

The app does no logging. No drift. Note: `observability.md` must be filled in before logging is added (see Principle 14).

---

## Principle 9: Coding Standards: Secrets

**Status**: Partially Compliant  
**Drift Items**: 1

### Constitutional Requirement

> **Secrets**: Follow security.md; never commit credentials or embed secrets in browser code. (MUST)

### Medium Priority Drift

- [ ] **DRIFT-003**: Hard-coded login values are built into the browser bundle.
  - **Requirement**: `core.md` §2 Secrets: "never commit credentials or embed secrets in browser code"
  - **Current State**: `src/App.jsx` defines `DEMO_EMAIL = 'demo@codeblue.com'` and
    `DEMO_PASSWORD = 'codeblue123'` and fills them into the form. Nothing authenticates against them,
    so they are not a real secret today. They still look like credentials and ship in `dist/`.
  - **Required State**: Browser code contains no values that are, or could be mistaken for, real credentials.
  - **Impact**: If someone later swaps in a real account, or reuses `codeblue123` in a real environment,
    the credential is published in the client bundle. Reviewers and scanners will also keep flagging the literal password.
  - **Remediation** (choose one):
    1. Use values that are obviously fake (for example `demo@example.com` / `not-a-real-password`) and add a
       one-line comment saying they are display-only demo values that never authenticate; or
    2. Record a documented exception for display-only demo values in `security.md` when that module is filled in.
  - **Effort**: 0.25 hours
  - **Files**: `src/App.jsx`

---

## Principle 10: Coding Standards: Validation

**Status**: Compliant  
**Drift Items**: 0

> Follow security.md for validation of untrusted input and rendered content.

Input is validated before use. React escapes everything it renders, and the code does not use raw HTML. No drift.

---

## Principle 11: Coding Standards: DTOs/Models

**Status**: Compliant  
**Drift Items**: 0

> No DTO layer is required; name and validate data shapes when a contract exists.

The app has no external data contract and no unneeded model layer. No drift.

---

## Principle 12: Enforcement and Validation

**Status**: Partially Compliant  
**Drift Items**: 1

### Constitutional Requirement

> | Architecture | Mandatory | Review against the feature plan | No |
>
> **Verification**: `npm run lint` MUST pass before changes are considered complete.

Lint passes. The code no longer matches its feature plan.

### High Priority Drift

- [ ] **DRIFT-002**: The login implementation contradicts the approved spec, plan, and tasks for `feat-create-login-page`.
  - **Requirement**: `core.md` §3: Architecture changes are reviewed against the feature plan (Mandatory)
  - **Current State**: A valid submit now sets a signed-in state and shows `PatientList`. The page title is
    "Welcome to Code Blue", the form and button say "Fake Sign in", and the fields come pre-filled.
    The spec artifacts still say the opposite:
    - `spec.md` FR-004 (exact notice "Authentication is not connected in this prototype."), FR-005 (no signed-in state or navigation),
      AC-003, BR-003 (post-login destination out of scope), Explicit Non-Goals (post-login navigation excluded)
    - `plan.md:11`, `plan.md:98-99`, `plan.md:109`, `plan.md:113-114`
    - `tasks.md:20-22` (T003)
    - `quickstart.md:36-37` (manual check expects the notice and no navigation)
    - `data-model.md:10` (submission outcome = prototype notice)
  - **Required State**: The spec, plan, tasks, and quickstart describe the behavior the code actually has, or the code matches the spec.
  - **Impact**: `/sdd-audit` and the quickstart checks will fail. Future `/sdd-implement` runs driven by these
    artifacts could revert the Patient List flow.
  - **Remediation**: Run `/sdd-specify` for a follow-up feature (for example `feat-fake-sign-in-patient-list`) covering
    the Code Blue branding, pre-filled demo values, "Fake Sign in", and navigation to Patient List. Then update or
    supersede FR-004, FR-005, AC-003, and BR-003 in the login spec and regenerate the plan, tasks, and quickstart.
    Keep the "never claims real authentication" rule by writing it as a fake sign-in.
  - **Effort**: 1–2 hours
  - **Files**: `specs/feat-create-login-page/{spec,plan,tasks,quickstart,data-model}.md`, `src/App.jsx`, `src/PatientList.jsx`

---

## Principle 13: Versioning Policy

**Status**: Compliant  
**Drift Items**: 0

> Until a stable release policy is adopted, the package version remains an implementation detail.

`package.json` is at `0.0.0` and nothing treats it as a compatibility guarantee. No drift.

---

## Principle 14: Constitution Completeness (Governance)

**Status**: Non-Compliant  
**Drift Items**: 1

### Constitutional Requirement

> `core.md` §2: "**Secrets**: Follow security.md…", "**Validation**: Follow security.md…",
> "**Logging**: Follow the project-specific observability standards…"

`core.md` defers to modules that contain no rules yet.

### High Priority Drift

- [ ] **DRIFT-001**: Five of six constitution modules are unfilled templates.
  - **Requirement**: `core.md` §2 references `security.md` and observability standards as binding
  - **Current State**: `security.md` and `testing.md` (both marked `Priority: critical`), plus `architecture.md`,
    `observability.md`, and `user-interface.md`, contain only `[PLACEHOLDER]` tokens (305 in total).
    `core.md` also has an unresolved `TODO(RATIFICATION_DATE)`.
  - **Required State**: Each module that applies to this project has concrete rules for this project. Modules that
    don't apply are marked not applicable. Applicability matters here: `observability.md` targets backend/infrastructure,
    and this is a client-only app.
  - **Impact**: Drift and audit runs can't check security, testing, accessibility, or architecture. The project has
    no test runner, and with an empty `testing.md` nothing flags that. Accessibility attributes already exist in
    `src/App.jsx` but no standard says they are required.
  - **Remediation**: Run `/sdd-init` (or amend the modules directly) to fill in `security.md`, `testing.md`, and
    `user-interface.md` first, then `architecture.md`. Mark `observability.md` as not applicable or keep it minimal.
    Record the ratification date in `core.md`.
  - **Effort**: 2–4 hours
  - **Files**: `.specify/memory/constitution/*.md`

---

## Action Plan

### Immediate Actions (Next 1-3 Days)

1. No critical items.
2. **DRIFT-002**: Write a follow-up spec for Fake Sign in → Patient List so the SDD artifacts match the code
   before more features are added "one by one".

### Short-term Actions (Next 1-2 Weeks)

1. **DRIFT-001**: Fill in `security.md`, `testing.md`, and `user-interface.md`. Decide how `observability.md` applies.
2. Re-run `/sdd-drift` once those modules exist, so testing and accessibility drift can be measured.

### Medium-term Actions (This Sprint/Month)

1. **DRIFT-003**: Replace the demo values with obviously fake ones, or document an exception.

### Backlog Items (Future Sprints)

1. **DRIFT-004**: Move `Login` into its own module when the next login change happens.

---

## Progress Tracking

### Drift Resolution

- [x] **Week 1**: 0 critical items to resolve
- [ ] **Week 1**: 2 high priority items resolved (DRIFT-001, DRIFT-002)
- [ ] **Week 2-3**: 1 medium priority item resolved (DRIFT-003)
- [ ] **Ongoing**: 1 low priority item (DRIFT-004)

### Re-evaluation

- Next drift detection recommended: 2026-10-26, or right after the constitution modules are filled in
- Trigger re-evaluation if:
  - Constitution is updated (version change)
  - The next Patient List feature is added
  - Security incident or audit
  - Quarterly review cycle

---

## Notes

### Observations Outside the Constitution (not scored)

- `README.md` is still the Vite starter text and says nothing about Code Blue or how to run it.
- `index.html` `<title>` is `my-react-sdd`, not Code Blue.
- `.prototype-notice` styles in `src/App.css` are no longer used.
- No test runner or CI workflow is configured. This will become drift once `testing.md` is filled in.

### Drift Prevention

- Run `/sdd-drift` after each Patient List feature is added
- Update the feature spec before changing behavior it forbids
- Fill in the remaining constitution modules so audits cover security, testing, and UI

### Review Checklist

- [x] All drift items have clear requirements references
- [x] Effort estimates are realistic
- [x] Remediation steps are actionable
- [x] Priority levels are appropriate
- [x] No duplicate drift items across principles
- [x] Summary statistics are accurate
