---
generated_by: sdd-ui-complexity
generated_on: <YYYY-MM-DD>
constitution_date: <generated_on from constitution>
overall_score: <x.x>
overall_rating: <Low | Moderate | High | Very High>
scores: { D1: <n>, D2: <n>, D3: <n>, D4: <n>, D5: <n>, D6: <n> }
---

# UI Complexity Report: <project name>

- **Generated**: <date>   **Source**: `sdd-ui-complexity`
- **Based on constitution**: <date of constitution file>
- **Previous score**: <score and date, or "first run">   **Change**: <+/- x.x, or n/a>

## Overall: <Low | Moderate | High | Very High> (<score> / 5)

<Two or three sentences in plain language: what kind of project this is, what drives its complexity, and where a newcomer should be careful.>

## Scorecard

| Dimension | Score | Key numbers |
|---|---|---|
| D1 Size | | <files, lines> |
| D2 Dependency footprint | | <prod + dev> |
| D3 Stack breadth and overlap | | <overlaps, legacy signals> |
| D4 Structure and modularity | | <largest file, depth, packages> |
| D5 Tooling and build | | <config files, customizations> |
| D6 Quality safeguards | | <test ratio, TS %, strict, CI, TODO density> |
| **Overall** | **<x.x>** | |

## Raw Measurements

| ID | Measurement | Value | Method |
|---|---|---|---|
| M1 | Source files | | |
| M2 | Lines of code | | |
| M3 | Production dependencies | | |
| M4 | Dev dependencies | | |
| M5 | Stack categories in use | | |
| M6 | Competing libraries | | |
| M7 | Workspaces / packages | | |
| M8 | Test files / ratio | | |
| M9 | TypeScript share / strict | | |
| M10 | Root config files | | |
| M11 | Largest file | | |
| M12 | Max nesting depth | | |
| M13 | Feature areas / routes | | |
| M14 | Automation | | |
| M15 | TODO/FIXME/HACK markers | | |
| M16 | Duplicate / legacy signals | | |

**Excluded from counts**: <list>
**Not measurable**: <metrics scored n/a and why>

## Hotspots

| File | Lines | Appears to do |
|---|---|---|

## Risk Flags

- **<flag>** (<metric ID>): <what was measured and why it matters>

## Versions Worth Verifying

<List, with the note that these are not claimed outdated.>

## Onboarding Reading Path

1. `<path>`: <reason>
2. `<path>`: <reason>

## Limitations

<What this analysis cannot tell: runtime behavior, actual test pass rate, performance, security posture, business complexity. State plainly.>
