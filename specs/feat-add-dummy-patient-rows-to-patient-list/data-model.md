# Data Model: Dummy Patient Row

This feature displays a fixed, non-persistent demonstration dataset. It does not create or
update clinical records.

| Field | Supplied representation | Display rule |
| ----- | ---------------------- | ------------ |
| Patient ID | Text identifier, such as `ED-1001` | Preserve exactly; identifies the supplied row only |
| Name | Text | Preserve spelling and spacing |
| Age | Whole number | Display as supplied; do not infer date of birth |
| Sex | Supplied text value (`M` or `F`) | Preserve exactly; do not reinterpret |
| Arrival | Time text in `HH:mm` form | Preserve exactly; no timezone or date is implied |
| Chief Complaint | Text | Preserve punctuation and wording |
| ESI | Whole number | Display as supplied; do not calculate or interpret triage |
| HR | Whole number | Display as supplied; no clinical interpretation |
| BP | Text in supplied `systolic/diastolic` form | Preserve exactly |
| SpO₂ | Text percentage | Preserve exactly, including the supplied percent sign |
| Bed | Text identifier | Preserve exactly |
| Status | Text | Preserve exact wording and punctuation |
| Provider | Text | Preserve exact name or `Unassigned` value |

The dataset contains 12 rows in the supplied order from `ED-1001` through `ED-1012`. The
values are dummy demonstration content and must not be treated as live patient information.