# Code Review: Dummy Patient Rows in Patient List

- **Feature folder**: specs/feat-add-dummy-patient-rows-to-patient-list
- **Reviewed on**: 2026-10-21
- **Base**: `main` (e16dd3e)   **Head**: `feat-add-dummy-patient-rows-to-patient-list` (uncommitted working tree)
- **Scope method**: git diff (cross-checked against tasks.md)
- **Files reviewed**: 2 (~313 added / 5 removed lines): `src/PatientList.jsx`, `src/PatientList.css`; `src/App.jsx` read for context   **Excluded**: spec docs and `.claude/`, `.github/`, `.specify/` tooling files (not product code)
- **Commands run**: `npm run lint` PASS · `npm run build` PASS · scripted data comparison of all 12 rows × 13 fields against `spec.md` FR-002 PASS (0 mismatches)

## Verdict: APPROVE WITH COMMENTS

Every functional requirement is implemented and the dataset matches the spec exactly. Nothing blocks merge. One medium accessibility and layout issue in the narrow-screen scroll region (F-001) should be fixed before the demo. The manual verification tasks are still open.

## Summary

| Severity | Count |
|---|---|
| Critical | 0 |
| High | 0 |
| Medium | 1 |
| Low | 4 |
| Info | 3 |

The change replaces the Patient List empty state with a 13-column table driven by a static `patientColumns` and `patients` array. It also adds a "Demo data only" notice and makes the content area scroll horizontally. The implementation is small, matches the plan's "minimal change" approach, and adds no dependencies or data layer. The main risks are in the narrow-viewport behaviour: the whole section scrolls instead of just the table, the scroll region cannot be reached by keyboard, and the demo notice scrolls out of view.

## Traceability

| Requirement / Task | Implemented in | Tested in | Status |
|---|---|---|---|
| AC-001 / FR-001 / T001 | `src/PatientList.jsx:3-17` (`patientColumns`), `:219-227` | Manual QV-01 (not yet run) | Covered |
| AC-002 / FR-002 / T001 | `src/PatientList.jsx:19-200` (`patients`), `:228-236` | Scripted comparison in this review; QV-02 not yet run | Covered |
| EC-001 / T001 | `src/PatientList.jsx:123,183` (`'Unassigned'`) | Scripted comparison | Covered |
| EC-002 / T001 | Values stored as literals, rendered without transformation | Scripted comparison | Covered |
| AC-003 / FR-003 / T002 | `src/PatientList.jsx:214-237` (empty state removed) | QV-03 not yet run | Covered |
| FR-004 / T002 | `src/PatientList.jsx:214-217`, `src/PatientList.css:69-79` | QV-03 not yet run | Covered (see F-001) |
| AC-004 / FR-005 / T003 | `src/PatientList.css:53-60,81-89,133-154` | QV-04 not yet run | Partial (see F-001) |
| FR-006 / T005 | `src/PatientList.jsx:207-209` (unchanged) | QV-05 not yet run | Covered |
| T004 | n/a | lint/build run in this review: PASS | Done, not ticked |
| T005 | n/a | n/a | Missing |

**Requirements with no implementation**: none
**Code with no matching task or requirement**: row hover highlight (`src/PatientList.css:114-116`), see F-007

## Findings

### F-001 [Medium] Horizontal scroll is on the whole section, not the table, and cannot be reached by keyboard
- **Category**: Accessibility / UI behaviour
- **Location**: `src/PatientList.css:53-60`, `src/PatientList.jsx:212-237`
- **Traces to**: AC-004, FR-005, FR-004
- **Evidence**: `overflow-x: auto` is set on `.patient-list-content`, the `<section>` that also contains the `<h1>` and the demo notice. The table is forced to `min-width: 1360px`. The scroll container has no `tabindex` and no accessible label.
- **Impact**:
  - On narrow screens, scrolling to the right-hand columns (Bed, Status, Provider) pushes the heading and the "Demo data only" notice off-screen, so the FR-004 label is hidden at the moment someone reads the rightmost fields.
  - Keyboard-only users cannot scroll the region in browsers that do not make scroll containers focusable automatically (notably Safari). Without a pointer they cannot reach the last columns, so AC-004 is not met for them.
  - Screen-reader users are not told that the region scrolls.
- **Recommendation**: Wrap only the table in a dedicated, focusable, labelled scroll region and remove the overflow from the section:
  ```jsx
  <div className="patient-table-scroll" role="region" aria-labelledby="patient-list-title" tabIndex={0}>
    <table>…</table>
  </div>
  ```
  ```css
  .patient-table-scroll { overflow-x: auto; overscroll-behavior-inline: contain; }
  .patient-table-scroll:focus-visible { outline: 3px solid #e0e998; outline-offset: 2px; }
  ```

### F-002 [Low] Table has no accessible name and no row headers — FIXED 2026-10-21
- **Category**: Accessibility
- **Location**: `src/PatientList.jsx:218-236`
- **Traces to**: AC-001 (presentation quality); general defect
- **Evidence**: `<table>` has no `<caption>` or `aria-label`. Every body cell is a `<td>`, including Patient ID.
- **Impact**: Screen readers announce an unnamed table. When moving across a row, users hear the column header but not which patient the row belongs to.
- **Recommendation**: Add `<caption>`, for example "Demo patients (dummy data)". The caption can be visually hidden, and it also reinforces FR-004. Render the Patient ID cell as `<th scope="row">`.
- **Resolution**: Added a visually hidden `<caption>` "Demo patients (dummy data)" and rendered Patient ID as `<th scope="row">`. Scoped the dark header style to `thead th` and kept row headers visually identical to the other cells. Lint and build pass; an SSR render confirms 1 caption, 13 column headers, 12 row headers and 144 data cells.

### F-003 [Low] Verification tasks T004 and T005 are still open
- **Category**: Process / Testing
- **Location**: `specs/feat-add-dummy-patient-rows-to-patient-list/tasks.md` (Phase 3.2)
- **Traces to**: core constitution §2 ("`npm run lint` MUST pass before changes are considered complete"); quickstart QV-01…QV-05
- **Evidence**: T004 and T005 are unchecked. This review confirmed that lint and build pass, but no record shows that QV-01 to QV-05 were run in a browser.
- **Impact**: AC-004 and FR-006 have no verification at all. F-001 would have shown up during QV-04 with keyboard-only navigation.
- **Recommendation**: Tick T004. Run QV-01 to QV-05, adding a keyboard-only pass to QV-04, then tick T005.

### F-004 [Low] Branch name does not follow the git workflow convention
- **Category**: Constitution / Process
- **Location**: current branch `feat-add-dummy-patient-rows-to-patient-list`
- **Traces to**: `.specify/memory/git-workflow.yaml` `branch_naming.regex` `^(feat|fix|…)/[a-z0-9-]+$`
- **Evidence**: The branch uses `feat-` where the regex requires `feat/`.
- **Impact**: Fails the documented naming rule and any automation that relies on it.
- **Recommendation**: Rename before pushing (`git branch -m feat/add-dummy-patient-rows-to-patient-list`). Alternatively, change the workflow rule if folder-style names are intended. The earlier features use the same pattern, so this is a systemic mismatch.

### F-005 [Low] Column-specific CSS depends on column position
- **Category**: Maintainability
- **Location**: `src/PatientList.css:118-131`
- **Traces to**: general maintainability
- **Evidence**: `td:nth-child(1|5|7|8|9|10|11)` and `td:nth-child(6|12)` hard-code positions from the `patientColumns` array.
- **Impact**: If a column is reordered or inserted, the wrapping rules silently apply to the wrong columns. Nothing links the CSS back to `patientColumns`.
- **Recommendation**: Add a `nowrap` or `wide` flag to each `patientColumns` entry and render it as a `className` on the cells. At minimum, add a comment pointing at `patientColumns`.

### F-006 [Info] Redundant and dead CSS
- **Category**: Maintainability
- **Location**: `src/PatientList.css:146-148`, `src/PatientList.css:6`
- **Evidence**: The media query repeats `min-width: 1360px`, which the base rule already sets. `--muted` is no longer used in `PatientList.css` now that `.patient-list-empty` has been removed.
- **Recommendation**: Remove both.

### F-007 [Info] Row hover highlight suggests rows can be clicked
- **Category**: UI behaviour / Scope
- **Location**: `src/PatientList.css:114-116`
- **Traces to**: Spec non-goals (no select, edit, or other row actions)
- **Evidence**: `tbody tr:hover` changes the row background, but rows have no action.
- **Impact**: Presenters or viewers may try to click a row. This is minor, but it adds affordance the spec rules out.
- **Recommendation**: Remove it, or keep it deliberately as a reading aid and note that choice.

### F-008 [Info] Numeric columns are left-aligned
- **Category**: Spec fidelity
- **Location**: `src/PatientList.css:86` (`text-align: left`)
- **Traces to**: FR-002 table (`---:` alignment on Age, ESI, HR)
- **Evidence**: The spec's markdown marks Age, ESI, and HR as right-aligned. The implementation left-aligns every column.
- **Impact**: Probably none, because the alignment is most likely a markdown artefact. See the question below.

## Constitution Compliance

| Rule | Status | Notes |
|---|---|---|
| Core §1 Technology stack (React 19, Vite 8, JS/JSX, no new deps) | Pass | No dependencies added |
| Core §1 Prohibitions (no `eval`, `Function`, implicit globals, deprecated APIs) | Pass | None present |
| Core §2 Modularity (no layers without need) | Pass | Static data kept in the component, as planned |
| Core §2 Validation of untrusted data | N/A | Data is a static literal; React escapes rendered text |
| Core §2 Secrets | Pass | None introduced. The existing demo credentials in `App.jsx` predate this change and are intentional fake values. |
| Core §3 `npm run lint` must pass | Pass | Verified in this review |
| Git workflow: branch naming | Fail | F-004 |
| Testing / Security / Architecture / Observability / UI modules | N/A | Files are still template placeholders; no project-specific rules to apply (as noted in plan.md) |

## Spec Gaps and Questions

1. **Numeric alignment** (spec update): Is right alignment of Age, ESI, and HR in FR-002 intended, or a markdown artefact? If intended, say so in a requirement.
2. **Demo label visibility** (spec update): Must the FR-004 label stay visible while the user scrolls the table, or is showing it once enough? The answer decides how strictly to apply F-001.
3. **Keyboard access** (spec update): AC-004 says "every field remains available" but does not mention keyboard or assistive-tech access. Consider adding that explicitly.
4. **Constitution modules** (governance): Testing, security, architecture, observability, and UI are still placeholders, so most compliance checks are N/A. Populating at least the UI module would enable accessibility gates.

## Positive Observations

- **Exact data fidelity**: all 156 cell values match the spec character for character, including `°C`, `100%`, `168/102`, and `Unassigned`.
- **One column definition for headers and cells**: headers and cells both render from `patientColumns`, so they cannot drift out of order.
- **Good table semantics**: the table uses `<thead>`, `<tbody>`, and `<th scope="col">`, and has stable React keys (`patientId`, `column.key`).
- **Clear demo-only copy** that also states "must not be used for clinical decisions", which covers BR-001 and the prohibited behaviours.
- **Sign-out is unchanged**, and no persistence, fetches, or new dependencies were added. This is tightly scoped to the plan.

## Not Reviewed

- **Rendering in a real browser**: no manual or visual run was done, and QV-01 to QV-05 were not executed. Findings about layout and keyboard behaviour come from reading the code.
- **Automated tests**: the repo has no test runner, so there was nothing to run.
- **Performance**: not assessed beyond confirming the static 12-row dataset needs no optimisation.
- **Tooling files** (`.claude/commands/sdd-review.md`, `.github/prompts/sdd-review.prompt.md`, `.specify/templates/review-template.md`): they are untracked in the same working tree but are not part of this feature.

## Suggested Next Steps

1. Fix F-001 by moving the scroll to a focusable, labelled wrapper around the table only.
2. Fix F-002 by adding a caption and row headers. Optionally clean up F-005, F-006, and F-007.
3. Rename the branch, or update the workflow rule (F-004).
4. Run `npm run lint` and `npm run build`, then QV-01 to QV-05 with a keyboard-only pass on QV-04. Tick T004 and T005.
5. Answer the Spec Gaps questions, then re-run `/sdd-review feat-add-dummy-patient-rows-to-patient-list`.
