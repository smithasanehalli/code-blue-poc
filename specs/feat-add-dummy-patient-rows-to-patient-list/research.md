# Research: Dummy Patient Rows in Patient List

## Repository Findings

- `src/PatientList.jsx` currently renders the CODE BLUE header, Patient List heading, empty
  state, and sign-out button.
- `src/PatientList.css` contains the page-specific Patient List styling.
- The app is a React 19/Vite 8 browser project with JavaScript and JSX.
- `package.json` provides `npm run lint` and `npm run build`; no test runner is configured.
- No patient-data service, persistence layer, or external clinical integration is present.

## Decisions

### D1: Keep the supplied rows static and display-only

**Decision**: Use the 12 supplied rows as fixed demonstration content on Patient List. Do not
add a connection to an external system or persist changes.

**Rationale**: The request supplies a fixed dataset and explicitly identifies it as dummy.
The existing screen is an empty placeholder and no data service exists.

**Alternatives rejected**: A database, API, or record-management workflow would exceed the
request and could imply the data is operational.

### D2: Preserve supplied values and order exactly

**Decision**: Display the 13 supplied columns in order and keep each of the 12 records in
the provided order, including values such as `Unassigned`, `89%`, and `39.5°C`.

**Rationale**: The table contents are the primary user-provided requirement. No normalization,
interpretation, or clinical calculation is requested.

**Alternatives rejected**: Sorting, deriving status, or interpreting triage/vital values would
change user-provided data or add unsupported behavior.

### D3: Keep all columns reviewable at narrow widths

**Decision**: The narrow-screen presentation must allow access to every column while
preserving the same row/column relationships. A horizontally scrollable table region is the
smallest suitable option for a 13-column table.

**Rationale**: The spec requires all fields to remain available but does not prescribe a
specific visual treatment.

**Alternatives rejected**: Hiding columns or truncating values would violate the completeness
requirement; converting records into unrelated cards could make row-to-column comparison less
clear.