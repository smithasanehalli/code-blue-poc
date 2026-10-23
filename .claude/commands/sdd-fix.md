---
description: Apply fixes for findings in a feature's REVIEW.md (or AUDIT.md), or apply a change you describe to the files you name. Verifies each change and writes FIX-LOG.md using the fix-log template.
---

# sdd-fix

## Usage

```
Findings mode: fix findings from a review or audit
@sdd-fix <folder-name>                         # Amazon Q
/sdd-fix <folder-name>                         # GitHub Copilot, Claude Code

  -ids <F-001,F-003,...>      Fix only these findings
  -severity <list>            Fix only these severities (e.g. critical,high). Default: critical,high,medium
  -source <review|audit>      Findings source. Default: review (specs/<folder>/REVIEW.md)

Change mode: apply a change you describe
/sdd-fix -file <path[,path...]> -change "<what to change>"
/sdd-fix <path[,path...]> "<what to change>"    # shorthand
/sdd-fix "<what to change>"                     # no file: search, propose files, ask first

  -file <path[,path...]>      Files to change (relative to the repo root)
  -change "<text>"            The change, in plain words
  -folder <folder-name>       Feature folder to log under (default: auto-detect)
  -quick                      Light run for small edits: spec search only, one check at the end,
                              one-line log entry (see "Quick Runs")

Both modes:
  -dry-run                    Produce the fix plan only; change nothing
  -commit                     Create one commit per fix (default: do not commit)
```

Examples:

```
/sdd-fix feat-create-login-page -ids F-001,F-002
/sdd-fix src/AppLayout.jsx,src/PatientDetails.jsx "rename Patient Details to Patient Record"
/sdd-fix -file src/App.css -change "darken --muted to meet 4.5:1 contrast" -dry-run
/sdd-fix src/AppLayout.jsx "rename Patient Details to Patient Record" -quick
```

Arguments for this run: `$ARGUMENTS`
(If the line above still shows a literal `$ARGUMENTS` placeholder, take the arguments from the user's message instead.)

## Purpose

Turn reviewed findings, or a change you request directly, into verified changes. Each item is triaged, made with the smallest change that does the job, verified, and recorded in a `FIX-LOG.md`. Run `sdd-review` afterwards to confirm.

## Operating Rules

1. **Only what was asked.** In findings mode, change only what the selected findings need. In change mode, change only the named files. Write anything else you notice under New Observations, not as a fix.
2. **Stay inside the named files.** In change mode, edit another file only when the change cannot work without it (for example, an import that must follow a renamed file). List every such file, and ask before editing it unless it is a mechanical follow-on of the requested change.
3. **Smallest correct change.** Follow the finding's Recommendation, or the requested change, unless it is wrong or unsafe. If you deviate, explain why under "Deviation from recommendation".
4. **Never change requirements.** Do not edit requirement text in `spec.md` (FR, AC, EC, BR, NFR). If a finding or requested change contradicts a requirement, including exact user-facing copy that a spec fixes, mark it **Needs Spec Decision** and do not apply it. Status notes, such as marking a task or requirement as superseded by another spec, are allowed only when that other spec already says so. Otherwise mark the item **Needs Confirmation**.
5. **Verify before and after.** Run the project's checks before the first change (baseline) and after each fix. A fix that introduces a new failure is reverted and marked **Failed**.
6. **Add a test when a test runner exists.** Write it to fail before the fix and pass after. If there is no test runner, say so and describe the manual check instead.
7. **Follow the template exactly.** Use `.specify/templates/fix-log-template.md` for the structure and order. Write `none` in an empty section.
8. **Report honestly.** Never mark an item Fixed without the verification that shows it. List every command you ran and its result.
9. **Do not touch** `node_modules`, lockfiles (unless the change is about dependencies), secrets or `.env*` files. Never push, and never commit unless `-commit` is given.

## Status Values

| Status | Meaning |
|---|---|
| Fixed | Changed and verified |
| Already Fixed | The code already does what was asked; nothing changed |
| Not Reproducible | The described problem, or the text to change, is not present at the location; explain what you checked |
| Needs Spec Decision | It conflicts with a requirement that only the spec owner can change |
| Needs Confirmation | The change is clear but reaches beyond what was asked, or the request is ambiguous; ask before applying |
| Failed | Attempted, but verification failed; the change was reverted |
| Skipped | Not selected by `-ids` or `-severity` (findings mode only) |

## Quick Runs (`-quick`)

`-quick` is for small, local edits in change mode: wording, labels, a style value, a constant. It keeps the safety checks that matter and drops the rest. It is ignored in findings mode.

**Allowed only when** files are named with `-file` or the shorthand, and the change stays inside those files. If triage finds the change needs another file, a file or symbol rename, or a new test, drop `-quick`, say why in one line, and continue as a normal run.

**What changes from a normal run:**

| Step | Normal run | Quick run |
|---|---|---|
| Step 1: context | Template, specs, constitution, earlier log | Only the named files. Do **not** read the constitution, `plan.md`, `tasks.md` or the full template |
| Spec check (Rule 4) | Read the feature's spec files | `grep` every `specs/*/spec.md` for the exact text being changed. If it matches, stop: Needs Spec Decision |
| Step 2: baseline | Run all checks before changing | Skip |
| Step 4 and 5: verify | Checks after each item, and again at the end | Run lint and build once, after all edits, plus a `grep` that the old text is gone and the new text is there. If a check fails, revert, run it again to see whether the failure was already there, and report which |
| Step 6: log | Full template entry | One row in the `## Quick Changes` table at the top of the log file (see below) |

**Quick log format.** Add the table if it is missing, directly under the log's title, and add one row per run, newest first:

```
## Quick Changes

| Date | ID | Files | Request | Result | Checks | Commit |
|---|---|---|---|---|---|---|
| 2026-10-23 | C-001 | `src/AppLayout.jsx` | rename "Patient Details" to "Patient Record" | Fixed | lint pass, build pass | not committed |
```

If the log file does not exist yet, create it containing only `# Fix Log: <feature name or "General">` and this table.

## Execution Steps

### Step 0: Parse arguments and pick the mode

1. **Change mode** applies when any of these is true:
   - `-file` or `-change` is given;
   - the first argument is a path to an existing file (or a comma-separated list of them), followed by a description;
   - the arguments are only a quoted or plain-text description and the first word is not an existing `specs/` folder.

   Otherwise use **findings mode**.

2. **Findings mode**:
   - `folder-name` is required. If it is missing and the only argument looks like a finding ID, and this conversation has just reviewed one folder, use that folder and say so in the log's Selection line. Otherwise list the `specs/` folders that have REVIEW.md or AUDIT.md, ask which one, and stop.
   - Normalize IDs: `F3`, `F003` and `f-003` all mean `F-003`. When `-ids` is given, it overrides `-severity`.
   - The source file is `specs/<folder-name>/REVIEW.md` (default) or `AUDIT.md` (`-source audit`). Stop if it is missing, and suggest running `/sdd-review <folder-name>` first.

3. **Change mode**:
   - Every file in `-file` must exist; stop and list any that do not. A `-change` description is required.
   - Silently correct obvious typos in the description (for example "Patinet" to "Patient") and record the corrected wording under Request.
   - **No file given**: search the source for the text or symbol the change refers to (excluding `node_modules`, `dist` and other build output). Show the matching files and lines, ask which to change, and stop. With `-dry-run`, show the matches as the plan.
   - Split the description into separate items when it asks for more than one thing. Number the items `C-001`, `C-002` and so on.
   - **Log folder**: use `-folder` if given. Otherwise use the `specs/` folder whose `tasks.md` or `plan.md` names the changed files. If none or several match, log to `specs/FIX-LOG.md`.

### Step 1: Load context

Read:

- `.specify/templates/fix-log-template.md` (required; stop if missing)
- **Findings mode**: the source file, with its verdict and every finding's ID, severity, location, traces-to and recommendation. For AUDIT.md, map its issue IDs (for example `MED-001`) the same way.
- **Change mode**: the named files in full, and the places that reference them (imports, class names, IDs) if the change renames anything.
- The feature folder's `spec.md`, `plan.md` and `tasks.md` (when there is one), so changes stay within the requirements. In change mode, also search every `specs/*/spec.md` for the exact text being changed, to catch copy that a spec fixes.
- The constitution (`.specify/memory/constitution.md` and `.specify/memory/constitution/*.md`), for coding rules and the check commands
- Any earlier `FIX-LOG.md` at the log location

In findings mode, select findings by `-ids`, otherwise by `-severity`. Every other finding is Skipped. Stop and report if an ID in `-ids` does not exist.

### Step 2: Baseline

Find the check commands: test, lint, type-check, build (from the constitution, otherwise `package.json` scripts). Run them and record the results as **Baseline tests**, including failures that existed before. Do not install dependencies.

### Step 3: Triage each item

- **Findings**: open the cited location and confirm the problem still exists.
- **Changes**: confirm the text or code to change exists in the named files. Check whether the change reaches beyond them (Rule 2) or conflicts with a spec (Rule 4).

Assign Confirmed, Already Fixed, Not Reproducible, Needs Spec Decision or Needs Confirmation. Only Confirmed items go on to Step 4.

If `-dry-run` is set: write FIX-LOG.md with Mode `dry-run`, and give each Confirmed item its planned change (files and lines) in place of a result. Change no other file, and go to Step 6.

### Step 4: Fix and verify, one item at a time (findings most severe first; changes in order)

1. Make the change, plus a test if a runner exists.
2. Re-run the checks. Confirm the specific result: grep shows the old text gone and the new text present, a contrast ratio is recomputed, and so on.
3. If a check that passed at baseline now fails, revert this item's change and mark it Failed.
4. With `-commit`: commit only this item's files, and record the hash. Use the message `fix(<folder-name>): <ID> <short title>` for findings, or `chore: <short description of the change>` for changes. Otherwise record `not committed`.

### Step 5: Final checks

Run the full set of checks once more, and record the results as **Final tests**.

### Step 6: Write the log

Write FIX-LOG.md at the log location, following the template:

- **Findings mode**: include every finding in the source file, including Skipped ones (they can be grouped on one line).
- **Change mode**: set Source to `direct request`, give the files and change text under Selection, and write one entry per `C-` item with a **Request** line quoting the requested change.
- If a FIX-LOG.md already exists there, add this run as a new dated section at the top, and keep the older runs.
- Next Steps should normally include re-running `/sdd-review <folder-name>` when there is a feature folder.

### Step 7: Reply to the user

Reply briefly with what was changed, how it was verified, what needs the user's decision, what was not committed, and the path to FIX-LOG.md.
