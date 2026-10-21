# Code Review: <feature name>

- **Feature folder**: specs/<folder-name>
- **Reviewed on**: <date>
- **Base**: <branch or commit>   **Head**: <branch or commit>
- **Scope method**: <flag | git diff | tasks.md>
- **Files reviewed**: <n> (~<lines> lines)   **Excluded**: <list or "none">
- **Commands run**: <list with pass/fail, or "none run">

## Verdict: <APPROVE | APPROVE WITH COMMENTS | REQUEST CHANGES>

<One or two sentences explaining the verdict.>

## Summary

| Severity | Count |
|---|---|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 0 |
| Info | 0 |

<Short paragraph: what the change does, overall quality, and the main risks.>

## Traceability

| Requirement / Task | Implemented in | Tested in | Status |
|---|---|---|---|
| R1 / T003 | `path/file.ext` (`symbolName`) | `path/test.ext` | Covered / Partial / Missing |

**Requirements with no implementation**: <list or "none">
**Code with no matching task or requirement**: <list or "none">

## Findings

### F-001 [Critical] <short title>
- **Category**: <A-J name>
- **Location**: `path/file.ext:42-58`
- **Traces to**: <requirement ID | plan section | constitution rule | general defect>
- **Evidence**: <what the code does, quoted or paraphrased>
- **Impact**: <what goes wrong, and for whom>
- **Recommendation**: <specific fix, with a short snippet only if it clarifies>

(Repeat for each finding.)

## Constitution Compliance

| Rule | Status | Notes |
|---|---|---|
| <rule or section heading> | Pass / Fail / N/A | <note> |

## Spec Gaps and Questions

<Requirements that appear missing, ambiguous, or contradictory. Questions for the author. Mark each as needing a spec update, not a code change.>

## Positive Observations

<Things done well that should be kept or reused.>

## Not Reviewed

<Files or dimensions skipped, and why. Be explicit so no one assumes coverage that did not happen.>

## Suggested Next Steps

1. <Ordered, concrete actions, e.g. fix F-001 and F-003, add test for R4, then re-run `@sdd-review <folder-name>`>