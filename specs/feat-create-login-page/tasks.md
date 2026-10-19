# Tasks: Prototype Login Page

**Input**: Design documents from `specs/feat-create-login-page/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `quickstart.md`

## Execution Notes

- No setup task is needed: the feature uses installed project dependencies and existing files.
- The repository has no test runner. Run supported lint/build checks and the explicit manual
  scenarios in `quickstart.md` after implementation.
- No authentication, routing, persistence, or API integration tasks are in scope.

## Phase 3.1: Implementation

- [x] T001 [AC-001] [FR-001] Replace the starter content in `src/App.jsx` with a login form
  containing labeled email and password fields and a sign-in action.
- [x] T002 [AC-002] [FR-002] [FR-003] [EC-001] Add required-field and email-format checks in
  `src/App.jsx`; identify invalid fields and prevent the prototype notice until inputs pass.
- [x] T003 [AC-003] [FR-004] [FR-005] [FR-006] [EC-002] On valid-looking submission, show
  exactly `Authentication is not connected in this prototype.` in `src/App.jsx`; do not
  authenticate, send or persist credentials, echo the password, create a signed-in state, or
  navigate.
- [x] T004 [AC-001] [AC-002] [AC-003] Style the form, field feedback, and prototype notice
  in `src/App.css` to replace the starter-screen styling.

## Phase 3.2: Verification

- [x] T005 Run `npm run lint` and `npm run build` from the repository root; resolve any
  failures in `src/App.jsx` or `src/App.css`.
- [x] T006 Execute manual scenarios QV-01 through QV-04 in
  `specs/feat-create-login-page/quickstart.md`; confirm the visible results and prototype
  boundary match `specs/feat-create-login-page/spec.md`.

## Dependencies

- T001 precedes T002 and T003 because those tasks extend the same form in `src/App.jsx`.
- T001 precedes T004 so the stylesheet targets the final form structure in `src/App.jsx`.
- T001 through T004 must complete before T005 and T006.
- T005 and T006 are final verification; no test-first task is supported by the current repo.

## Parallel Execution

No tasks are marked `[P]`: the form markup, validation, submission state, and styling are
coupled, and the final checks depend on the implementation being complete.

## Coverage Audit

| Requirement | Covered by |
| ----------- | ---------- |
| AC-001 | T001, T004 |
| AC-002 | T002, T004 |
| AC-003 | T003, T004 |
| FR-001 | T001 |
| FR-002 | T002 |
| FR-003 | T002 |
| FR-004 | T003 |
| FR-005 | T003 |
| FR-006 | T003 |
| EC-001 | T002 |
| EC-002 | T003 |

Uncovered AC/FR/EC items: none.