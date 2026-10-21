# Fix Log: <feature name>

- **Feature folder**: specs/<folder-name>
- **Run on**: <date>
- **Source**: <REVIEW.md | AUDIT.md> (verdict at review time: <verdict>)
- **Selection**: <filters used>
- **Mode**: <apply | dry-run>   **Commits**: <per-finding | none>
- **Test command(s)**: <commands, documented or inferred>

## Outcome

| Status | Count |
|---|---|
| Fixed | 0 |
| Already Fixed | 0 |
| Not Reproducible | 0 |
| Needs Spec Decision | 0 |
| Needs Confirmation | 0 |
| Failed | 0 |
| Skipped | 0 |

**Baseline tests**: <pass/fail counts, pre-existing failures>
**Final tests**: <pass/fail counts, new failures if any>

## Fixes

### F-001 [Critical] <title> — Fixed
- **Triage**: Confirmed
- **Files changed**: `path/file.ext`, `path/test.ext`
- **Change**: <what was changed and why, in one or two sentences>
- **Deviation from recommendation**: <none | explanation>
- **Test**: <test added or extended; failed before, passes after>
- **Verification**: <commands run and results>
- **Commit**: <hash or "not committed">

(Repeat for each finding, including those not fixed, with the reason.)

## Needs Your Decision

<Findings with status Needs Spec Decision or Needs Confirmation. For each, state exactly what must be decided and by whom, and which artifact would need to change.>

## Failed Fixes

<Finding ID, what was attempted, failure summary, and a suggested manual approach.>

## New Observations

<Issues noticed during fixing that were NOT addressed, with location and suggested severity. These are candidates for the next review.>

## Next Steps

1. <e.g. Re-run `@sdd-review <folder-name>` to confirm resolution>
2. <e.g. Update spec.md for F-004, then re-run `@sdd-fix <folder-name> -ids F-004`>
3. <e.g. Run `@sdd-audit <folder-name>` before merge>