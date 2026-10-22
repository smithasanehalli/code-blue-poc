---
description: Apply fixes for findings in a feature's REVIEW.md (or AUDIT.md), verify each one, and write specs/<folder>/FIX-LOG.md using the fix-log template.
---

# sdd-fix

## Usage

```
@sdd-fix <folder-name>                         # Amazon Q
/sdd-fix <folder-name>                         # GitHub Copilot, Claude Code

Optional arguments:
  -ids <F-001,F-003,...>      Fix only these findings
  -severity <list>            Fix only these severities (e.g. critical,high). Default: critical,high,medium
  -source <review|audit>      Findings source. Default: review (specs/<folder>/REVIEW.md)
  -dry-run                    Produce the fix plan only; change nothing
  -commit                     Create one commit per fixed finding (default: do not commit)
```

Arguments for this run: `$ARGUMENTS`
(If the line above still shows a literal `$ARGUMENTS` placeholder, take the arguments from the user's message instead.)

## Purpose

Turn reviewed findings into verified changes. Each selected finding is triaged, fixed with the smallest change that resolves it, verified, and recorded in `specs/<folder-name>/FIX-LOG.md`. Run `sdd-review` afterwards to confirm.

## Operating Rules

1. **Only selected findings.** Change nothing that is not needed for a selected finding. Write anything else you notice under New Observations, not as a fix.
2. **Smallest correct change.** Follow the finding's Recommendation unless it is wrong or unsafe. If you deviate, explain why under "Deviation from recommendation".
3. **Never change requirements.** Do not edit requirement text in `spec.md` (FR, AC, EC, BR, NFR). If a finding needs a requirement changed, mark it **Needs Spec Decision**. Status notes, such as marking a task or requirement as superseded by another spec, are allowed only when that other spec already says so. Otherwise mark the finding **Needs Confirmation**.
4. **Verify before and after.** Run the project's checks before the first change (baseline) and after each fix. A fix that introduces a new failure is reverted and marked **Failed**.
5. **Add a test when a test runner exists.** Write it to fail before the fix and pass after. If there is no test runner, say so and describe the manual check instead.
6. **Follow the template exactly.** Use `.specify/templates/fix-log-template.md` for the structure and order. Write `none` in an empty section.
7. **Report honestly.** Never mark a finding Fixed without the verification that shows it. List every command you ran and its result.
8. **Do not touch** `node_modules`, lockfiles (unless the finding is about dependencies), secrets or `.env*` files. Never push, and never commit unless `-commit` is given.

## Status Values

| Status | Meaning |
|---|---|
| Fixed | Changed and verified |
| Already Fixed | The code already meets the recommendation; nothing changed |
| Not Reproducible | The described problem is not present at the cited location; explain what you checked |
| Needs Spec Decision | Fixing it needs a requirement change only the spec owner can make |
| Needs Confirmation | The fix is clear but changes behaviour or copy beyond the finding, or the finding is ambiguous; ask before applying |
| Failed | Attempted, but verification failed; the change was reverted |
| Skipped | Not selected by `-ids` or `-severity` |

## Execution Steps

### Step 0: Parse arguments

1. `folder-name` is required. If it is missing:
   - If the only argument looks like a finding ID and this conversation has just reviewed one folder, use that folder and say so in the log's Selection line.
   - Otherwise list the `specs/` folders that have REVIEW.md or AUDIT.md, ask which one, and stop.
2. Normalize IDs: `F3`, `F003` and `f-003` all mean `F-003`. When `-ids` is given, it overrides `-severity`.
3. The source file is `specs/<folder-name>/REVIEW.md` (default) or `AUDIT.md` (`-source audit`). Stop if it is missing, and suggest running `/sdd-review <folder-name>` first.

### Step 1: Load context

Read:

- `.specify/templates/fix-log-template.md` (required; stop if missing)
- The source file: its verdict and every finding's ID, severity, location, traces-to and recommendation. For AUDIT.md, map its issue IDs (for example `MED-001`) the same way.
- `specs/<folder-name>/spec.md`, `plan.md` and `tasks.md`, so fixes stay within the requirements
- The constitution (`.specify/memory/constitution.md` and `.specify/memory/constitution/*.md`), for coding rules and the check commands
- Any earlier `FIX-LOG.md` in the folder

Select the findings (by `-ids`, otherwise by `-severity`). Every other finding is Skipped. Stop and report if an ID in `-ids` does not exist.

### Step 2: Baseline

Find the check commands: test, lint, type-check, build (from the constitution, otherwise `package.json` scripts). Run them and record the results as **Baseline tests**, including failures that existed before. Do not install dependencies.

### Step 3: Triage each selected finding

Open the cited location and confirm the problem still exists. Assign Confirmed, Already Fixed, Not Reproducible, Needs Spec Decision or Needs Confirmation. Only Confirmed findings go on to Step 4.

If `-dry-run` is set: write FIX-LOG.md with Mode `dry-run`, and give each Confirmed finding its planned change in place of a result. Change no other file, and go to Step 6.

### Step 4: Fix and verify, one finding at a time, most severe first

1. Make the change, plus a test if a runner exists.
2. Re-run the checks. Confirm the specific problem is gone (for example, grep for the removed code, or recompute a contrast ratio).
3. If a check that passed at baseline now fails, revert this finding's change and mark it Failed.
4. With `-commit`: commit only this finding's files, with the message `fix(<folder-name>): <ID> <short title>`, and record the hash. Otherwise record `not committed`.

### Step 5: Final checks

Run the full set of checks once more, and record the results as **Final tests**.

### Step 6: Write the log

Write `specs/<folder-name>/FIX-LOG.md` following the template. If one already exists, add this run as a new dated section at the top, and keep the older runs. Include every finding in the source file, including Skipped ones (they can be grouped on one line). Next Steps should normally include re-running `/sdd-review <folder-name>`.

### Step 7: Reply to the user

Reply briefly with what was fixed, how it was verified, what needs the user's decision, what was not committed, and the path to FIX-LOG.md.
