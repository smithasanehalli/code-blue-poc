---
description: Assess how complex an existing UI project is using a fixed, reproducible rubric, and produce an onboarding-oriented report. Reads the constitution created by sdd-ui-init.
---

# sdd-ui-complexity

## Usage

```
/sdd-ui-complexity [path]      # Copilot, Claude Code

Optional arguments:
  path        Project root (default: current directory)
```

Arguments for this run: `$ARGUMENTS`
(If the line above still shows a literal `$ARGUMENTS` placeholder, take the arguments from the user's message instead. If there are none, use the defaults.)

## Purpose

Answer "how big and how risky is this UI project to work in?" with numbers and a rubric, not impressions. The output is a report a new engineer can read in five minutes to know where to start and what to be careful about.

Unlike `sdd-ui-init` (which records *what the stack is*), this command measures *how hard the project is*. It can be re-run at any time to track change.

## Prerequisite

`.specify/memory/constitution.md` should exist (created by `sdd-ui-init`). If it does not, stop and tell the user to run `sdd-ui-init` first. Read it, including its YAML front matter, for stack, commands, and structure so you do not repeat detection work.

## Operating Rules

1. **Read-only except one file.** Write only `docs/architecture/ui-complexity.md`. Overwrite it if it exists, but if the old report has an overall score, show the previous score and the change in the new one.
2. **Measure, then judge.** Collect the raw numbers in Step 1 before assigning any score. Show the numbers in the report so a reader can check your scoring.
3. **Use the rubric exactly.** Apply the thresholds in Step 2 as written. If a measurement is unavailable, score that metric `n/a`, exclude it from the average, and say why. Do not estimate silently.
4. **Use the reference commands.** Step 1 gives a command for each measurement. Use it when you have a shell. If you cannot run commands, count with your file tools using the same include/exclude rules, and record "manual count" as the method.
5. **Count, do not read everything.** Use file listings and line counts. Open only the files needed for the hotspots and the onboarding reading list.
6. **Exclude noise.** Ignore `node_modules`, `bower_components`, build output (`dist`, `build`, `out`, `.next`, `.nuxt`, `.angular`, `.svelte-kit`, `coverage`, `storybook-static`), generated files, lockfiles, and minified (`*.min.*`) or vendored code. List the exclusions in the report.
7. **No unverifiable claims.** Do not state that a dependency is deprecated, vulnerable, or end-of-life. Flag it for human verification instead.
8. **No fixes.** This command diagnoses. It does not recommend rewrites or change any project file.
9. **Do not run the project.** Read-only commands only (list, count, search). Do not install, build, or execute tests.

## Execution Steps

### Step 1: Collect measurements

Run from the project root. The reference commands assume a POSIX shell (macOS, Linux, Git Bash, WSL). Set up the shared file list once:

```sh
SRC_EXT='ts|tsx|js|jsx|mjs|cjs|vue|svelte|html|scss|sass|less|css'
EXCLUDE='(^|/)(node_modules|bower_components|dist|build|out|\.next|\.nuxt|\.angular|\.svelte-kit|coverage|storybook-static|vendor|\.git)(/|$)'
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git ls-files --cached --others --exclude-standard
else
  find . -type f | sed 's|^\./||'
fi | grep -Ev "$EXCLUDE" | grep -Ev '\.min\.' | grep -E "\.($SRC_EXT)$" \
  | grep -Ev '(^|/)\.[^/]+$|(^|/)[^/]*\.config\.[^/]+$|(^|/)(Gruntfile|gulpfile|karma\.conf|protractor\.conf)\.[^/]+$' \
  > /tmp/sdd-ui-files.txt
```

Config files (dotfiles, `*.config.*`, Grunt/Gulp/Karma files) are left out of the source list on purpose. M10 counts them.

If the environment prevents writing to `/tmp`, keep the list in memory or pipe it directly. Do not write it inside the project.

| ID | Measurement | Reference command / method |
|---|---|---|
| M1 | Source files, total and by extension | `wc -l < /tmp/sdd-ui-files.txt`; `sed 's/.*\.//' /tmp/sdd-ui-files.txt \| sort \| uniq -c` |
| M2 | Approximate lines of code (physical lines, including blanks and comments) | `tr '\n' '\0' < /tmp/sdd-ui-files.txt \| xargs -0 cat \| wc -l` |
| M3 | Production dependencies | count keys in `package.json > dependencies` (sum across workspace packages for monorepos, and say so) |
| M4 | Dev dependencies | count keys in `package.json > devDependencies` (same rule) |
| M5 | Stack categories in use | from the constitution Tech Stack table: rows with a choice other than `Not found` |
| M6 | Competing libraries in the same category | from the constitution "Overlaps" line: number of categories with 2+ choices |
| M7 | Workspaces / packages | number of workspace packages, else 1 |
| M8 | Test files and ratio to non-test source files | `grep -Ec '(\.|/)(test|spec|cy|e2e)\.[jt]sx?$\|/__tests__/' /tmp/sdd-ui-files.txt`; ratio = M8 / (M1 − M8) |
| M9 | TypeScript share, plus `strict` setting | files ending `.ts`/`.tsx` (and `<script lang="ts">` for `.vue`/`.svelte` if easy to tell) ÷ script files (ts, tsx, js, jsx, mjs, cjs, vue, svelte); `strict` from `tsconfig.json` |
| M10 | Build/tooling config files at repo root | count root files matching `*.config.*`, `.babelrc*`, `.eslintrc*`, `.prettierrc*`, `.stylelintrc*`, `tsconfig*.json`, `angular.json`, `karma.conf.*`, `Gruntfile.*`, `gulpfile.*`, `webpack*.js` |
| M11 | Largest 10 source files by line count | `tr '\n' '\0' < /tmp/sdd-ui-files.txt \| xargs -0 wc -l \| grep -v ' total$' \| sort -rn \| head -10` |
| M12 | Deepest directory nesting under the source root | `grep '^src/' /tmp/sdd-ui-files.txt \| awk -F/ '{print NF-1}' \| sort -n \| tail -1` (replace `src/` with the actual source root; depth counts directories below the repo root) |
| M13 | Feature areas / routes | count top-level feature folders, or declared routes, whichever is clearer; state which |
| M14 | Automation present | yes/no each: CI workflow, CI runs tests or lint, pre-commit hook, lint config, format config |
| M15 | TODO / FIXME / HACK / XXX markers | `tr '\n' '\0' < /tmp/sdd-ui-files.txt \| xargs -0 grep -Eo '\b(TODO\|FIXME\|HACK\|XXX)\b' \| wc -l` |
| M16 | Duplicate or legacy signals | from the constitution "Legacy signals" plus what you see: `.js` and `.ts` mixed in one feature, class components next to hooks, AngularJS next to Angular, multiple styling systems |

(Inside the table `\|` is an escaped pipe; type a plain `|` in the shell.)

### Step 2: Score using the rubric

Score each dimension from **1 (low complexity / low risk)** to **5 (high)**. Use the thresholds exactly. When a value sits on a boundary, use the band whose range includes it as written.

**D1. Size** (from M1 and M2). Score files and lines separately and **take the higher** of the two.

| Score | Files | Lines |
|---|---|---|
| 1 | under 50 | under 5k |
| 2 | 50–199 | 5k–19,999 |
| 3 | 200–499 | 20k–59,999 |
| 4 | 500–1,499 | 60k–149,999 |
| 5 | 1,500 or more | 150k or more |

**D2. Dependency footprint** (M3 + M4)
- 1: under 30 total
- 2: 30–59
- 3: 60–99
- 4: 100–149
- 5: 150 or more

**D3. Stack breadth and overlap** (from M5, M6, M16)
- 1: single coherent stack, no overlaps, no legacy signals
- 2: coherent stack, at most one minor overlap (for example two date libraries)
- 3: one clear overlap (for example two state libraries) or legacy and modern patterns mixed in one area
- 4: two or more overlaps, or multiple styling or state paradigms
- 5: three or more overlaps plus legacy and modern patterns coexisting widely

**D4. Structure and modularity** (from M7, M11, M12, M13). Use the **highest** band any condition meets.
- 1: clear organization, largest file under 300 lines, depth 4 or less
- 2: clear organization, largest file 300–499 lines
- 3: mixed organization, largest file 500–999 lines, or depth 5–6
- 4: weak organization, 3 or more files of 1,000+ lines, depth 7+, or a monorepo with 5–9 packages
- 5: no discernible organization, any file of 2,000+ lines, or a monorepo with 10+ packages

**D5. Tooling and build complexity** (from M10 and the constitution)
- 1: 5 or fewer config files, standard setup
- 2: 6–9 config files, standard setup
- 3: 10–14 config files, or a customized bundler config (custom loaders/plugins beyond the framework default)
- 4: 15 or more config files, or an ejected / heavily customized build (`craco`, ejected CRA, hand-written webpack)
- 5: custom build pipeline, multiple bundlers in use, or a patched toolchain (`patch-package`, forked build deps)

**D6. Quality safeguards** (inverted: more safeguards = lower risk) (from M8, M9, M14, M15)
Start at 5 and subtract one point for each that is true, minimum 1:
- test-to-source ratio (M8) of 0.2 or more
- TypeScript on 80% or more of script files, with `strict: true`
- CI present and runs tests or lint
- lint and format both configured
- TODO/FIXME/HACK/XXX count (M15) under 1 per 100 source files

**Overall score** = average of the scored dimensions, rounded to one decimal:
- 1.0–1.9 **Low**, 2.0–2.9 **Moderate**, 3.0–3.9 **High**, 4.0–5.0 **Very High**

### Step 3: Identify hotspots and risks

- **Hotspots**: the M11 largest files, each with a one-line note on what it appears to do (open each only far enough to say so).
- **Risk flags**: list only items backed by a measurement, each with its metric ID. Examples: no tests found (M8), competing state libraries (M6), very large components (M11), most of the code in one package of a monorepo (M7), heavy TODO density (M15).
- **Versions worth verifying**: carry forward from the constitution and add any new ones.

### Step 4: Build the onboarding path

Produce a reading list of **5 to 8 files** in the order a new engineer should read them to understand the project fastest. Typically: README, entry point, router/route config, root state setup, one representative feature, the API access layer, one representative test, the CI file. Give each a one-line reason. Only list files that exist.

### Step 5: Self-check before writing

- [ ] Every scored dimension shows the raw numbers it was scored from.
- [ ] Each score matches the rubric band for those numbers. Recheck the boundaries.
- [ ] The overall score is the arithmetic mean of the scored dimensions, excluding `n/a`.
- [ ] Every risk flag cites a metric ID.
- [ ] No dependency is called outdated, deprecated, or vulnerable.
- [ ] Every file in the reading path exists.

### Step 6: Write the report

Create `docs/architecture/ui-complexity.md` using `.specify/templates/ui-complexity-template.md` as the structure (create folders if needed). Fill every `<placeholder>`, keep the section order and headings, and remove nothing except placeholder text. Then print a short chat summary:

```
Complexity report written: docs/architecture/ui-complexity.md
Overall: <rating> (<score>/5)   Previous: <score or first run>
Highest dimension: <Dn name> (<score>)
Top risks: <flag 1>; <flag 2>
```

## Report Template

The output structure lives in `.specify/templates/ui-complexity-template.md`. Edit that file to change the report layout; edit this prompt to change how the analysis is done.
