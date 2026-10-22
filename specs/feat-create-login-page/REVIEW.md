# Code Review: Prototype Login Page

- **Feature folder**: specs/feat-create-login-page
- **Reviewed on**: 2026-10-22
- **Base**: none (feature first committed together with `feat-fake-sign-in-to-patient-list` in `e16dd3e`; no isolated diff exists)   **Head**: `main` @ `c1b5e4b`
- **Scope method**: tasks.md (files named in T001-T004)
- **Files reviewed**: 2 (~507 lines): `src/App.jsx` (`Login` component and its use in `App`), `src/App.css`   **Excluded**: `AppLayout.*`, `TriageBoard.*`, `PatientProfile.*`, `patients.js` (other features)
- **Commands run**: `npm run lint` (pass), `npm run build` (pass)

## Verdict: APPROVE WITH COMMENTS

The requirements that still apply are implemented correctly, and the password is never sent, stored or displayed. The feature documents no longer describe the running code, and the contrast issue from the earlier audit is still open. Neither blocks the prototype, but both should be fixed before the next audit.

## Summary

| Severity | Count |
|---|---|
| Critical | 0 |
| High | 0 |
| Medium | 2 |
| Low | 4 |
| Info | 1 |

This feature delivered the email and password form with field-level validation. A later spec, `feat-fake-sign-in-to-patient-list`, intentionally replaced its "prototype notice" behaviour (FR-004, FR-005, AC-003, BR-003) with a fake sign-in that opens the app. The remaining requirements (FR-001, FR-002, FR-003, FR-006, AC-001, AC-002, EC-001 and the prohibited behaviours) hold in the current code. The main risks are documentation drift, which could mislead `sdd-audit` and `sdd-fix`, plus two text colours below WCAG AA.

## Traceability

| Requirement / Task | Implemented in | Tested in | Status |
|---|---|---|---|
| FR-001, AC-001 / T001 | `src/App.jsx:76-112` (`Login`) | Manual QV-01 only | Covered |
| FR-002, AC-002, EC-001 / T002 | `src/App.jsx:25-33` (`handleSubmit`) | Manual QV-02 only | Covered |
| FR-003 / T002 | `src/App.jsx:27` (`email.validity.valid`) | Manual QV-02 only | Covered (see F-007) |
| FR-004, AC-003, EC-002 / T003 | Removed; superseded by fake sign-in FR-006 (`src/App.jsx:36-38`) | QV-03 is now stale | Superseded |
| FR-005, BR-003 | Superseded; app now navigates after sign-in (`src/App.jsx:129-132`) | n/a | Superseded |
| FR-006 | `src/App.jsx:95-104` (masked input, no storage, no echo) | Manual QV-04 only | Covered |
| Prohibited: no send/persist/echo of credentials | No `fetch` or storage in `Login`; `localStorage` used only for patients in `src/patients.js` | Code inspection | Covered |
| T004 (styling) | `src/App.css` | Visual only | Covered (see F-002, F-003) |

**Requirements with no implementation**: none, apart from the superseded items above.
**Code with no matching task or requirement**: demo values pre-filled in the fields (`src/App.jsx:13-14, 83, 100`), the "Fake Sign in" copy, and the `onSignIn` hand-off. All trace to `feat-fake-sign-in-to-patient-list`, not to this spec.

## Findings

### F-001 [Medium] Feature documents still describe the superseded prototype notice
- **Category**: Traceability / documentation
- **Location**: `specs/feat-create-login-page/spec.md:3-6, 22, 34, 41-42`; `tasks.md:20-23`; `quickstart.md` QV-03
- **Traces to**: FR-004, FR-005, AC-003, EC-002, T003
- **Evidence**: `spec.md` is still `Status: Draft` and has no "Superseded by" note. T003 is ticked `[x]` and QV-03 expects the text "Authentication is not connected in this prototype.", but that text appears nowhere in `src/`. The supersedes line in the fake sign-in spec lists FR-004, FR-005, AC-003 and BR-003, but not EC-002 or BR-002, which describe the same removed behaviour.
- **Impact**: Anyone following QV-03, and any re-run of `sdd-audit` or `sdd-fix` against this folder, will report a failure or try to restore the notice. That would break the fake sign-in flow.
- **Recommendation**: Add a `**Superseded in part by**: feat-fake-sign-in-to-patient-list (FR-004, FR-005, AC-003, EC-002, BR-003)` line to `spec.md`. Mark T003 and QV-03 as superseded instead of passing. Add EC-002 to the supersedes list in the fake sign-in spec.

### F-002 [Medium] Two text colours are still below 4.5:1 contrast (audit MED-001 unresolved)
- **Category**: Accessibility
- **Location**: `src/App.css:14, 16, 130-132, 144-149`
- **Traces to**: AUDIT.md MED-001; WCAG 2.1 AA 1.4.3
- **Evidence**: Against `--paper` (#f4f5ee), `--muted` (#63766d) on the 15px form intro measures 4.41:1. `--coral` (#bd563e) on the 11px bold "YOUR ACCOUNT" eyebrow measures 4.19:1. Both are normal-size text, so they need 4.5:1.
- **Impact**: Low-vision users may struggle to read the intro, which carries the instructions.
- **Recommendation**: Darken both colours slightly, for example `--muted: #5a6c63` and a darker eyebrow colour such as `#a84a34`, then re-check them. The coral button hover (4.52:1) passes narrowly; leave a margin if `--coral` is shared.

### F-003 [Low] Unused prototype-notice styles left behind
- **Category**: Maintainability
- **Location**: `src/App.css:18, 232-240`
- **Traces to**: T003 / T004 (superseded)
- **Evidence**: `.prototype-notice` and `--success-bg` are not used anywhere in `src/`.
- **Impact**: Dead CSS suggests a notice still exists and adds noise for the next person editing the file.
- **Recommendation**: Delete the rule and the variable.

### F-004 [Low] Demo email uses a real-looking domain
- **Category**: Security / data hygiene
- **Location**: `src/App.jsx:13-14`
- **Traces to**: fake sign-in BR-002 ("demo values MUST be obviously fictitious"); constitution core "Secrets"
- **Evidence**: `demo@abchospital.com` sits on a domain that could be registered by a real organisation. The demo password ships in the bundle, which is acceptable only because it opens nothing.
- **Impact**: A screenshot or copied value could be mistaken for a real hospital account.
- **Recommendation**: Use a reserved domain, such as `demo@abchospital.example`, and a password that is obviously fake, such as `demo-only-password`.

### F-005 [Low] Focus does not move to the first invalid field
- **Category**: Accessibility
- **Location**: `src/App.jsx:35`
- **Traces to**: FR-002, AC-002 ("identifies the field")
- **Evidence**: On a failed submit, errors are announced through `aria-live`, but keyboard focus stays on the button.
- **Impact**: Keyboard and screen-reader users have to tab back to find the field to fix.
- **Recommendation**: After `setErrors`, focus the first invalid input, for example `(nextErrors.email ? email : password).focus()`.

### F-006 [Low] Heading order: the page's `h2` comes before its `h1`
- **Category**: Accessibility
- **Location**: `src/App.jsx:53, 66`
- **Traces to**: General semantics; constitution draft rule "SHOULD give interactive and dynamic elements ARIA labelling"
- **Evidence**: The aside's `<h2>Welcome to ABC Hospital</h2>` appears in the DOM before `<h1>Fake Sign in</h1>`.
- **Impact**: Screen-reader heading navigation starts on a sub-heading, which is mildly confusing.
- **Recommendation**: Make the aside welcome a non-heading element with the same styling, or make it the `h1` and demote the form title. Confirm with the copy question in Spec Gaps.

### F-007 [Info] "Valid email format" relies on the browser's built-in email check
- **Category**: Correctness
- **Location**: `src/App.jsx:27`
- **Traces to**: FR-003
- **Evidence**: `email.validity.valid` on `type="email"` accepts values such as `name@host` that have no dot in the domain.
- **Impact**: None for a prototype, but the spec does not say what counts as a valid format.
- **Recommendation**: No code change unless the spec defines a stricter rule (see Spec Gaps).

## Constitution Compliance

Checked against `.specify/memory/constitution/core.md` (complete) and the draft `.specify/memory/constitution.md`. `security.md`, `testing.md`, `user-interface.md`, `architecture.md` and `observability.md` still contain template placeholders, so they cannot be scored.

| Rule | Status | Notes |
|---|---|---|
| Core: JavaScript ES modules + JSX, React 19, Vite 8 | Pass | |
| Core: `npm run lint` MUST pass | Pass | Lint passes; build passes too |
| Core: never commit credentials or embed secrets | Pass | The demo values are not secrets (see F-004) |
| Core: show actionable failure states | Pass | Field messages tell the user what to fix |
| Draft: function components, destructured props, default export | Pass | `Login({ onSignIn })`; `App` is default-exported |
| Draft: relative imports with explicit extensions | Pass | |
| Draft: CSS classes prefixed by component or area | Partial | `login-*` is used, but also generic `form-field`, `field-error`, `eyebrow` and `aside-*` |
| Draft: ARIA on dynamic elements | Pass | `aria-invalid`, `aria-describedby`, `aria-live` |
| Other split constitution files | N/A | Unfilled templates (also AUDIT.md MED-002) |

## Spec Gaps and Questions

1. **Welcome copy conflict (spec update needed).** Fake sign-in FR-001 requires "Welcome to Code Blue", but the code shows "Welcome to ABC Hospital" (changed in `82ffd03`). Which is correct? Update either the spec or the code, but that change belongs to the fake sign-in feature, not this one.
2. **Supersession bookkeeping (spec update needed).** See F-001. Should this folder be marked "partially superseded", or should the two specs be merged?
3. **Email format rule (spec question).** Does "valid email format" mean the browser's rule, or something stricter (F-007)?
4. **Stale errors (spec question).** Errors stay visible after the user corrects a field, until the next submit. Is that acceptable?

## Positive Observations

- Validation is small, readable and uses native constraint validation with `noValidate`, so the messages stay under the app's control.
- Error wiring is accessible: `aria-invalid`, `aria-describedby` and polite live regions, with empty error paragraphs hidden by `.field-error:empty`.
- The form uses uncontrolled inputs, so the password never lands in React state, and it resets to demo values on sign-out because `Login` remounts.
- The page states clearly that it is a prototype ("PROTOTYPE / NO ACCOUNT ACCESS").

## Not Reviewed

- No automated tests exist, and no test runner is configured, so test quality was not reviewed.
- The browser behaviour (QV-01 to QV-04) was not re-run in this review. The findings come from reading the code and running lint and build.
- Responsive layout (`src/App.css:262+`) was read but not tested in a browser.
- The other modules in `src/` are outside this feature's scope.

## Suggested Next Steps

1. Fix F-001 by marking the superseded items in `spec.md`, `tasks.md` and `quickstart.md`, and add EC-002 to the fake sign-in spec's supersedes list.
2. Fix F-002 and F-003 in `src/App.css`.
3. Optionally fix F-004 to F-006 in `src/App.jsx`.
4. Answer Spec Gaps question 1 in `feat-fake-sign-in-to-patient-list`.
5. Re-run `/sdd-review feat-create-login-page`, or `/sdd-fix feat-create-login-page`, to apply the code fixes.
