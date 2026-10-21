@sdd-fix <folder-name>                         # Amazon Q
/sdd-fix <folder-name>                         # GitHub Copilot, Claude Code

Optional arguments:
  -ids <F-001,F-003,...>      Fix only these findings
  -severity <list>            Fix only these severities (e.g. critical,high). Default: critical,high,medium
  -source <review|audit>      Findings source. Default: review (specs/<folder>/REVIEW.md)
  -dry-run                    Produce the fix plan only; change nothing
  -commit                     Create one commit per fixed finding (default: do not commit)