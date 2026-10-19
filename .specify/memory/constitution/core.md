<!--
Sync Impact Report
File updated: core.md
Version change: template 1.0.0 -> project 1.1.0 (initial project-specific material expansion)
Modified principles: Technology Stack Standards; Coding Standards; Enforcement and Validation
Added sections: Versioning Policy
Removed sections: none
Templates reviewed: PASS .specify/templates/plan-template.md (constitution gate is generic)
Templates reviewed: PASS .specify/templates/spec-template.md (business scope remains unaffected)
Templates reviewed: PASS .specify/templates/tasks-template.md (verification categories remain adequate)
Commands reviewed: PASS .specify/templates/commands/*.md (sdd-plan updated for selective loading)
Loader updated: PASS .specify/scripts/bash/load-constitution.sh (optional section selection; no-argument discovery preserved)
Runtime guidance: PASS README.md (no changed principle references)
Other constitution modules: no changes; module-specific standards remain independently owned
Deferred: RATIFICATION_DATE is unknown; replace its TODO when adoption history is confirmed
-->

# Constitution Core Standards

<!--
Section: core
Priority: critical
Applies to: my-react-sdd
Version: 1.1.0
Token Count Estimate: approximately 500
Ratification Date: TODO(RATIFICATION_DATE): original adoption date is unknown
Last Amended Date: 2026-10-16
Project: my-react-sdd
-->

## 1. Technology Stack Standards

| Component            | Requirement                                                | Priority |
| -------------------- | ---------------------------------------------------------- | -------- |
| **Runtime**          | Evergreen browsers; React 19.x UI; Vite 8.x toolchain     | MUST     |
| **Language**         | JavaScript ES modules and JSX                              | MUST     |
| Language Strictness  | ESLint recommended rules; no TypeScript is configured     | MUST     |
| Language Linting     | ESLint 10 flat config with React Hooks and Refresh rules   | MUST     |
| **Compute Platform** | Client-side browser application                            | MUST     |
| **Database**         | Not applicable; no database is configured                  | N/A      |

### Technology Prohibitions (WON'T without RFC)

- Do not add an alternative runtime or server platform without an approved design change.
- Do not use `eval`, the `Function` constructor, or implicit global variables.
- Do not use deprecated React APIs or browser APIs when a supported equivalent exists.
- Do not add a database without a documented feature requirement and approved design.

---

## 2. Coding Standards

| Area               | Standard                                                                      | Enforcement |
| ------------------ | ----------------------------------------------------------------------------- | ----------- |
| **Language**       | Use JavaScript ES modules and JSX consistent with the existing Vite setup.    | MUST        |
| **Type Safety**    | Run ESLint; validate untrusted or externally supplied data at its boundary.  | MUST        |
| **Async Patterns** | Handle rejected promises; clean up subscriptions and asynchronous effects.    | MUST        |
| **Modularity**     | Keep components and modules focused; avoid layers without a concrete need.    | MUST        |
| **Error Handling** | Show actionable failure states; preserve the cause when translating errors.  | MUST        |
| **Logging**        | Follow the project-specific observability standards when logging is added.    | MUST        |
| **Secrets**        | Follow security.md; never commit credentials or embed secrets in browser code. | MUST       |
| **Validation**     | Follow security.md for validation of untrusted input and rendered content.    | MUST        |
| **DTOs/Models**    | No DTO layer is required; name and validate data shapes when a contract exists. | MUST       |

### Error Handling Pattern

```text
Handle an error at the boundary where the application can recover or inform the user.
Show a clear failure state when an operation cannot complete.
Preserve the original cause when translating or propagating an error.
Do not expose secrets or internal implementation details in user-visible messages.
```

### Core Requirements

- **Error Handling**: Catch errors only when the code can recover, report a safe message, or add useful context.
- **Data Shapes**: Validate external data before use; do not add model layers without a concrete need.
- **Verification**: `npm run lint` MUST pass before changes are considered complete.

---

## 3. Enforcement and Validation

| Standard Area      | Enforcement Level | Validation Method                     | Automated |
| ------------------ | ----------------- | ------------------------------------- | --------- |
| Language Standards | Mandatory         | ESLint via `npm run lint`             | Yes       |
| Type Safety        | Mandatory         | ESLint and review; no compile-time TS | Partial   |
| Error Handling     | Mandatory         | Linting and review                    | Partial   |
| Architecture       | Mandatory         | Review against the feature plan       | No        |

### Versioning Policy

For a designated product release, use Semantic Versioning: increment MAJOR for incompatible
user-visible contract changes, MINOR for backward-compatible capabilities, and PATCH for
backward-compatible fixes or clarifications. Until a stable release policy is adopted, the
package version remains an implementation detail and MUST NOT be treated as a compatibility
guarantee.
