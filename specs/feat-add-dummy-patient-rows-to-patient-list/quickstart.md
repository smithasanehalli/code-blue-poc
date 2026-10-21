# Quickstart: Dummy Patient Rows in Patient List

## Automated Checks

Run from the repository root:

```bash
npm run lint
npm run build
```

The repository does not currently include an automated test runner.

## Manual Scenarios

Start the application with `npm run dev` and open the local URL it reports. Reach Patient
List through the existing demonstration sign-in flow.

### QV-01: Table headers and order

Confirm the Patient List displays all columns in this order: Patient ID, Name, Age, Sex,
Arrival, Chief Complaint, ESI, HR, BP, SpO₂, Bed, Status, Provider.

### QV-02: Supplied rows and values

Confirm there are exactly 12 rows, ordered from `ED-1001` through `ED-1012`. Compare each row
against the table in `spec.md`, including the `Unassigned` provider entries and exact complaint,
status, vital, and time values.

### QV-03: Demo-only presentation

Confirm the prior empty-state message is gone and the page clearly labels the patient rows as
dummy demonstration data. Confirm no copy says the records are live or suitable for clinical
decisions.

### QV-04: Narrow viewport access

Set the browser viewport to approximately 390px wide. Confirm all columns remain reachable,
including the first and last columns, and values are not silently removed or changed.

### QV-05: Sign-out remains available

Select `Sign out` and confirm the existing demonstration flow returns to its sign-in screen.