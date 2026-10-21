# Implementation Plan: Dummy Patient Rows in Patient List

**Branch**: `feat-add-dummy-patient-rows-to-patient-list` | **Date**: 2026-10-21 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/feat-add-dummy-patient-rows-to-patient-list/spec.md`

## Summary

Replace the Patient List empty-state message with a table containing the 12 supplied dummy
rows. Preserve the exact 13-column order, row order, values, and existing sign-out behavior.
Make every column reviewable on narrow screens and label the dataset as demonstration-only.

## Minimal Change Hypothesis

Add a static array of the supplied rows to the existing `PatientList` surface, render it as a
semantic table, and update `src/PatientList.css` for readable desktop and narrow-screen
presentation. Keep the existing page header and sign-out action. Do not add data services,
storage, patient workflows, or new dependencies.

## Technical Context

**Runtime / Language Context**: React 19 with JavaScript ES modules and JSX; Vite 8.  
**Existing Dependencies / Boundaries**: React and React DOM; `PatientList` is already rendered
by the existing demonstration flow. No table library is configured.  
**Storage / External Systems**: None. The rows are static dummy display data; no persistence
or external system is required.  
**Verification Strategy**: `npm run lint`, `npm run build`, and manual browser checks against
`quickstart.md`; no automated test runner is configured.  
**Operational Constraints**: Clearly label the rows as dummy demonstration data. Do not
present the contents as real patient information or use them for clinical decisions.  
**Scale / Performance Constraints**: The fixed dataset contains 12 rows; no additional scale
or performance target is specified.

## Repo Reality Check

**Current Entry Points**: `index.html` loads `src/main.jsx`, which renders `src/App.jsx`;
`App` displays `src/PatientList.jsx` after the current fake sign-in action.  
**Existing Layout Patterns**: `src/PatientList.jsx` currently shows the CODE BLUE header,
Patient List heading, empty-state message, and sign-out action. Its styles are in
`src/PatientList.css`.  
**Existing Verification / Tooling**: `npm run lint` runs ESLint and `npm run build` runs
Vite. The repository has no test script or automated test framework.  
**Missing Prerequisites**: No additional runtime or data dependency is needed. Automated
table tests are unavailable; use the planned manual checks.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **Technology**: Use the existing React/Vite JavaScript stack; add no dependency. PASS.
- **Data handling**: Keep the supplied values static and display-only; do not connect,
  persist, or infer patient data. PASS.
- **Modularity**: Keep the bounded dataset and its table in the existing Patient List surface;
  no service or repository layer is justified. PASS.
- **Verification**: Use configured lint/build checks and explicit manual scenarios; do not
  assume an automated test harness exists. PASS.
- **Module limitation**: Project-specific architecture, testing, security, observability, and
  UI constitution copies still contain template placeholders, so their detailed requirements
  cannot be applied as project-specific gates.

## Project Structure

### Documentation (this feature)

```text
specs/feat-add-dummy-patient-rows-to-patient-list/
├── plan.md
├── research.md
├── data-model.md
└── quickstart.md
```

### Repository Surface

**Implementation Shape Decision**: Static, display-only data rendered in the existing Patient
List screen, with page-specific responsive table styling.

**Existing Touched Areas**:

- `src/PatientList.jsx`: replace the empty state with the ordered table and demo-data label.
- `src/PatientList.css`: style the table and keep all fields reviewable on narrow screens.

**Proposed New Files / Folders (only if justified)**:

- None; the fixed 12-row dataset does not justify a separate data layer.

**Rejected Structure Additions**:

- Database, API, or persistence layer: explicitly outside this feature's scope.
- Patient model/service/repository abstraction: the table is static demonstration content.
- Search, sort, filter, edit, pagination, or refresh behavior: not requested.
- New automated test framework: no existing harness and no setup justified for this bounded
  feature; keep verification manual.

## Phase 0: Outline & Research

Repository review confirmed that Patient List is an existing empty-state screen and the app
has no data service or test runner. Research decisions are recorded in `research.md`.

**Output**: `research.md`.

## Phase 1: Design & Contracts

Represent each supplied record as a row with the exact fields and values from `spec.md`.
Render the ordered data with the same column order, replace the empty-state message, and show
a clear demo-data label. At narrow widths, place the wide table in a horizontally scrollable
region so all fields remain accessible without changing the data. Keep the sign-out control
outside and unchanged. No external contract is justified; `data-model.md` describes the
static row shape, and `quickstart.md` defines lint/build and manual checks.

### Coverage Block

| Requirement | Research / Decision | Design Artifact | Quickstart / Verification | Expected Task Coverage |
| ----------- | ------------------- | --------------- | ------------------------- | ---------------------- |
| AC-001 | Preserve exact column order | `data-model.md` | QV-01 | T-TABLE |
| AC-002 | Preserve all 12 rows and order | `data-model.md` | QV-02 | T-DATA |
| AC-003 | Replace empty state and identify demo data | `research.md` | QV-03 | T-EMPTY-STATE |
| AC-004 | Keep all columns available at narrow widths | `research.md` | QV-04 | T-RESPONSIVE |
| FR-001 | Use the specified 13 columns | `data-model.md` | QV-01 | T-TABLE |
| FR-002 | Preserve the supplied dataset exactly | `data-model.md` | QV-02 | T-DATA |
| FR-003 | Replace the empty state | `research.md` | QV-03 | T-EMPTY-STATE |
| FR-004 | Label content as dummy demo data | `research.md` | QV-03 | T-EMPTY-STATE |
| FR-005 | Expose every field on narrow screens | `research.md` | QV-04 | T-RESPONSIVE |
| FR-006 | Retain sign-out behavior | `research.md` | QV-05 | T-SIGN-OUT |
| EC-001 | Keep "Unassigned" unchanged | `data-model.md` | QV-02 | T-DATA |
| EC-002 | Do not interpret or alter clinical-looking values | `data-model.md` | QV-02 | T-DATA |

**Output**: `data-model.md`, `quickstart.md`; no contract artifact is justified.

## Phase 2: Task Planning Approach

_This section describes what the /tasks command will do - DO NOT execute during /plan_

**Task Generation Strategy**:

- Load `.specify/templates/tasks-template.md` as the base.
- Create tasks for rendering the ordered row data, labeling demo content, and replacing the
  empty state in `src/PatientList.jsx`.
- Create a styling task for narrow-screen table access in `src/PatientList.css`.
- Include lint/build and all five quickstart checks as verification tasks.
- Cover every AC, FR, and EC in the Coverage Block; do not add persistence or patient actions.

**Ordering Strategy**:

- Implement table markup and static data before styling the table layout.
- Run lint/build after the implementation tasks, then exercise the manual quickstart.
- Keep source-file tasks sequential if they modify the same file. Parallelize only genuinely
  independent files.

**Estimated Output**: A small task set for the existing Patient List component and stylesheet,
followed by supported automated checks and manual verification; `/plan` does not create
`tasks.md`.

## Phase 3+: Future Implementation

_These phases are beyond the scope of the /plan command_

**Phase 3**: Task execution (`/tasks` command creates `tasks.md`)  
**Phase 4**: Implementation (execute `tasks.md` following constitutional principles)  
**Phase 5**: Validation (run supported checks and execute `quickstart.md`)

## Complexity Tracking

_Fill ONLY if Constitution Check has violations that must be justified_

No constitution violations or complexity deviations identified. Project-specific module
placeholders are a governance limitation, not an implementation-layer exception.

## Progress Tracking

_This checklist is updated during execution flow_

**Phase Status**:

- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

During `/plan`, only Phases 0-2 may be checked. Leave Phase 3 and later unchecked.

**Gate Status**:

- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All clarification items resolved
- [x] Complexity deviations documented (none)

---

_Based on Constitution - See `.specify/memory/constitution/`_