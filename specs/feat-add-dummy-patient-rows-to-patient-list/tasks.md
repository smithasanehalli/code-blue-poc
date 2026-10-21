# Tasks: Dummy Patient Rows in Patient List

**Input**: Design documents from `specs/feat-add-dummy-patient-rows-to-patient-list/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `quickstart.md`

## Execution Notes

- No setup task is needed; the feature uses existing files and dependencies.
- The repository has no automated test runner. Use `npm run lint`, `npm run build`, and the
  explicit browser scenarios in `quickstart.md`.
- Patient records remain static demonstration content; do not add persistence or external
  clinical integration.

## Phase 3.1: Implementation

- [x] T001 [AC-001] [AC-002] [FR-001] [FR-002] [EC-001] [EC-002] Add the supplied 12-row
  static dataset to `src/PatientList.jsx` and render a semantic table with the exact 13
  column headers, row order, and cell values from `specs/feat-add-dummy-patient-rows-to-patient-list/spec.md`.
  Preserve `Unassigned` and all supplied clinical-looking values verbatim; do not infer or
  interpret them.
- [x] T002 [AC-003] [FR-003] [FR-004] Replace the empty-state message in `src/PatientList.jsx`
  with the table and a clear dummy-demonstration label. Do not imply the rows are real or
  suitable for clinical decisions.
- [x] T003 [AC-004] [FR-005] Update `src/PatientList.css` so the table remains readable and
  every column is reachable at narrow viewport widths without hiding or changing values.

## Phase 3.2: Verification

- [ ] T004 Run `npm run lint` and `npm run build` from the repository root; resolve failures
  in `src/PatientList.jsx` or `src/PatientList.css`.
- [ ] T005 [FR-006] Execute QV-01 through QV-05 in
  `specs/feat-add-dummy-patient-rows-to-patient-list/quickstart.md`: verify header order,
  all 12 exact rows, demo-only labeling, narrow-screen access to first and last columns, and
  unchanged sign-out behavior.

## Dependencies

- T001 precedes T002 and T003 because the label and styling depend on the table structure.
- T001 through T003 must complete before T004 and T005.
- T004 and T005 are final checks; no automated test-first task is supported by this repo.

## Parallel Execution

No tasks are marked `[P]`: table data, markup, and its styling are coupled, and verification
depends on the implementation being complete.

## Coverage Audit

| Requirement | Covered by |
| ----------- | ---------- |
| AC-001 | T001 |
| AC-002 | T001 |
| AC-003 | T002 |
| AC-004 | T003, T005 |
| FR-001 | T001 |
| FR-002 | T001 |
| FR-003 | T002 |
| FR-004 | T002 |
| FR-005 | T003 |
| FR-006 | T005 |
| EC-001 | T001 |
| EC-002 | T001 |

Uncovered AC/FR/EC items: none.