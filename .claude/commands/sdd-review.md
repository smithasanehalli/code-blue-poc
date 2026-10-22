---
description: Review a feature's implementation against its spec, plan, tasks and the project constitution, and write specs/<folder>/REVIEW.md using the review template. Read-only except for that one file.
---

# sdd-review

## Usage

```
@sdd-review <folder-name>                      # Amazon Q
/sdd-review <folder-name>                      # GitHub Copilot, Claude Code

Optional arguments:
  -base <branch|commit>    Compare changes against this base (default: auto-detect main/master/develop)
  -scope <path[,path...]>  Restrict review to specific paths
  -focus <area[,area...]>  Emphasize areas: correctness, security, tests, performance, maintainability
```

Arguments for this run: `$ARGUMENTS`
(If the line above still shows a literal `$ARGUMENTS` placeholder, take the arguments from the user's message instead.)

## Purpose

Check that the code for one feature does what `specs/<folder-name>/` says it should, follows the project constitution, and has no obvious defects. The output is a single report, `specs/<folder-name>/REVIEW.md`, which `sdd-fix` reads as its input.

## Operating Rules

1. **Read-only except one file.** Write only `specs/<folder-name>/REVIEW.md`. Never change source code, specs, tasks or configs. Fixing is `sdd-fix`'s job.
2. **Follow the template exactly.** Use `.specify/templates/review-template.md` for the structure, headings, order and finding format. Do not add or drop sections. Write `none` in a section that has nothing.
3. **Evidence for every finding.** Each finding cites a file and line range and quotes or paraphrases the code. No finding without a location.
4. **Trace everything.** Each finding traces to a requirement ID, plan section, constitution rule, or "general defect".
5. **Respect supersession.** If another spec in `specs/` says it supersedes requirements in this folder, treat those requirements as superseded. Do not report the new behaviour as a defect, and record the supersession in Traceability.
6. **Do not invent requirements.** Missing or ambiguous behaviour goes under Spec Gaps and Questions, not under Findings.
7. **Report honestly what ran.** List every command you ran and its result. If you did not run something (tests, browser checks), say so under Not Reviewed.
8. **Never copy secrets** from `.env*` files or configs into the report.

## Execution Steps

### Step 0: Parse arguments

1. `folder-name` is required. If it is missing, list the folders under `specs/` (noting which already have `REVIEW.md`), ask which one to review, and stop.
2. If `specs/<folder-name>/` does not exist, stop and list the folders that do.
3. Parse `-base`, `-scope` (comma-separated paths) and `-focus` (comma-separated areas). Reject unknown `-focus` values and list the allowed ones.

### Step 1: Load context

Read, skipping any that are missing (record which ones were missing):

- `.specify/templates/review-template.md` (required; stop if missing)
- `specs/<folder-name>/spec.md`, `plan.md`, `tasks.md`, `quickstart.md`, `data-model.md`, `research.md`
- Any earlier `specs/<folder-name>/REVIEW.md`, `AUDIT.md` or `FIX-LOG.md`, to check whether earlier findings were resolved
- The constitution: `.specify/memory/constitution.md` and every file in `.specify/memory/constitution/`. Treat a file that still contains template placeholders (for example `[UNIT_TEST_LOCATION]`) as N/A and say so.
- Other `specs/*/spec.md` files, but only to search for a `Supersedes` line that names this folder

### Step 2: Determine the review scope

Use the first method that applies, and record it as **Scope method**:

1. **flag**: `-scope` was given. Review only those paths.
2. **git diff**: find the base (`-base`, otherwise the first of `main`, `master`, `develop` that exists and is not the current branch). Use `git diff --name-only <base>...HEAD` plus uncommitted changes. If the diff is empty (for example, already on the base branch), fall through.
3. **tasks.md**: review the files named in `tasks.md`. If tasks.md names none, use the files named in `plan.md`.

Exclude `node_modules`, `dist`, `build`, `coverage`, lockfiles, generated and minified files, and files belonging to other features. List the exclusions in the header. Record Base and Head (branch and short commit hash).

### Step 3: Run the project's checks

Run the lint, type-check, test and build commands that the constitution or `package.json` defines. Do not install dependencies or start a dev server. Record each command with pass or fail. If a command fails, read the output and turn real problems into findings.

### Step 4: Build traceability

For every requirement ID (FR, AC, EC, BR, NFR) and every task ID, find the implementing symbol and file, and the test that covers it. Status values:

- **Covered**: implemented, and tested or verifiable
- **Partial**: implemented in part, or implemented with no way to verify it
- **Missing**: not implemented
- **Superseded**: replaced by another spec (name it)

Also list code in scope that matches no task or requirement.

### Step 5: Review the code

Read every file in scope fully. Check each category below, giving extra depth to the `-focus` areas. Each finding's **Category** uses one of these names:

| ID | Category | What to check |
|---|---|---|
| A | Requirements conformance | Behaviour and exact user-facing copy match the spec |
| B | Correctness | Logic errors, edge cases, state bugs, race conditions |
| C | Security | Secrets in code, unsafe rendering, input validation, data sent or stored that should not be |
| D | Error handling | Failures reported to users in a way they can act on; nothing swallowed |
| E | Tests | Missing, weak or wrong tests for the requirements |
| F | Performance | Needless re-renders, heavy work on the main thread, oversized bundles |
| G | Accessibility & UI | Labels, ARIA, focus, heading order, colour contrast (WCAG AA 4.5:1 for normal text), responsive layout |
| H | Maintainability | Dead code, duplication, unclear naming, unnecessary complexity |
| I | Constitution compliance | Each applicable MUST and SHOULD rule |
| J | Traceability & documentation | Specs, tasks and quickstart agree with the code |

Severity:

- **Critical**: security exposure, data loss, or the core requirement does not work
- **High**: a MUST requirement or MUST constitution rule is broken, or a user-facing defect has no workaround
- **Medium**: a SHOULD rule is broken, an accessibility failure, or docs that would mislead the next command
- **Low**: minor quality issue with limited impact
- **Info**: an observation or question; no change needed

Number findings `F-001`, `F-002` and so on, most severe first.

### Step 6: Decide the verdict

- **REQUEST CHANGES**: any Critical or High finding, or any requirement Missing
- **APPROVE WITH COMMENTS**: only Medium, Low or Info findings
- **APPROVE**: Low or Info findings only, or none

### Step 7: Write the report

Write `specs/<folder-name>/REVIEW.md` following the template. If a REVIEW.md already exists, overwrite it, and mention under Summary which earlier findings are now resolved. Fill in every header field, the Summary counts, Constitution Compliance, Spec Gaps and Questions, Positive Observations, Not Reviewed and Suggested Next Steps. The last next step points to `/sdd-fix <folder-name>` when there are findings to fix.

### Step 8: Reply to the user

Reply briefly with the verdict, the counts by severity, a one-line list of the Critical, High and Medium findings, any decision only the user can make, and the path to REVIEW.md. Do not repeat the whole report.
