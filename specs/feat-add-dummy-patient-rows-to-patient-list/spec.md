# Feature Specification: Dummy Patient Rows in Patient List

**Feature Branch**: `feat-add-dummy-patient-rows-to-patient-list`  
**Created**: 2026-10-21  
**Status**: Ready for planning  
**Input**: User description: "add dummy to patient list table as below"

## User Scenarios & Testing _(mandatory)_

### Primary User Story

As a presenter demonstrating the patient list, I want it populated with the supplied dummy
records so that viewers can see the intended table and representative patient details.

### Acceptance Criteria

- **AC-001**: **Given** a visitor reaches the Patient List, **When** the screen loads, **Then** it displays a table with these columns in this order: Patient ID, Name, Age, Sex, Arrival, Chief Complaint, ESI, HR, BP, SpO₂, Bed, Status, Provider.
- **AC-002**: **Given** the Patient List table is displayed, **When** the visitor reviews its rows, **Then** it contains the 12 supplied records in the order ED-1001 through ED-1012, with the supplied values unchanged.
- **AC-003**: **Given** the table is displayed, **When** the visitor reads the page, **Then** the empty-state message is replaced by the supplied rows and the data is clearly presented as dummy demonstration content.
- **AC-004**: **Given** the viewport is narrower than the full table, **When** the visitor accesses the Patient List, **Then** every supplied field remains available to review.

### User-Visible Outcomes

- A Patient List table containing all 12 supplied dummy rows.
- The supplied columns, values, and row order are preserved exactly.
- The records are identified as demo data, not live clinical information.

### Edge Cases

- **EC-001**: The supplied data includes a provider value of "Unassigned"; it is displayed as supplied and is not replaced with an inferred provider.
- **EC-002**: The supplied data includes ages, vital signs, and clinical complaints; those values are displayed as supplied and are not interpreted or altered.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The Patient List MUST display these columns in the specified order: Patient ID, Name, Age, Sex, Arrival, Chief Complaint, ESI, HR, BP, SpO₂, Bed, Status, Provider.
- **FR-002**: The table MUST contain exactly the following 12 rows in the order shown, preserving every supplied value:

| Patient ID | Name | Age | Sex | Arrival | Chief Complaint | ESI | HR | BP | SpO₂ | Bed | Status | Provider |
| ---------- | ---- | ---: | --- | ------- | --------------- | --: | --: | -- | ---- | --- | ------ | -------- |
| ED-1001 | Daniel Reyes | 62 | M | 08:05 | Chest pain radiating to left arm | 2 | 104 | 152/94 | 96% | R-01 | In treatment | Dr. Patel |
| ED-1002 | Aisha Khan | 29 | F | 08:12 | Severe abdominal pain, 8/10 | 3 | 98 | 118/76 | 99% | B-04 | Awaiting imaging | Dr. Nguyen |
| ED-1003 | Thomas Whitfield | 78 | M | 08:20 | Shortness of breath, history of COPD | 2 | 112 | 138/82 | 89% | R-02 | In treatment | Dr. Patel |
| ED-1004 | Mia Chen | 7 | F | 08:31 | Fever 39.5°C, vomiting | 3 | 128 | 102/64 | 98% | P-01 | Awaiting labs | Dr. Okafor |
| ED-1005 | Luis Ortega | 34 | M | 08:40 | Laceration, left hand | 4 | 82 | 126/80 | 99% | F-02 | Awaiting suturing | PA Ellis |
| ED-1006 | Grace Mbeki | 45 | F | 08:47 | Severe headache, vision changes | 2 | 90 | 168/102 | 98% | B-02 | CT ordered | Dr. Nguyen |
| ED-1007 | Henry Zhao | 19 | M | 09:02 | Ankle sprain after soccer | 5 | 76 | 120/74 | 100% | W-01 | Waiting room | Unassigned |
| ED-1008 | Priya Nair | 54 | F | 09:10 | Dizziness, near-syncope | 3 | 58 | 94/60 | 97% | B-05 | Awaiting ECG | Dr. Patel |
| ED-1009 | Robert Alvarez | 71 | M | 09:18 | Fall at home, hip pain | 3 | 88 | 130/78 | 95% | B-06 | X-ray done, awaiting result | Dr. Okafor |
| ED-1010 | Sofia Rossi | 26 | F | 09:25 | Allergic reaction, facial swelling | 2 | 118 | 108/66 | 94% | R-03 | In treatment | Dr. Nguyen |
| ED-1011 | Marcus Bell | 41 | M | 09:33 | Back pain, 3 days | 4 | 80 | 134/86 | 99% | W-02 | Waiting room | Unassigned |
| ED-1012 | Elena Petrova | 83 | F | 09:41 | Confusion, new onset | 2 | 96 | 148/90 | 93% | R-04 | Sepsis workup | Dr. Patel |

- **FR-003**: The Patient List MUST show the supplied rows instead of the existing empty-state message.
- **FR-004**: The data MUST be visibly identified as dummy demonstration content and MUST NOT be presented as live patient information.
- **FR-005**: At narrow viewport widths, every supplied field MUST remain available to the visitor; the presentation may adapt without changing the supplied values or their associations.
- **FR-006**: The existing Patient List sign-out behavior MUST remain available and unchanged.

### Business Rules

- **BR-001**: The supplied rows are dummy demonstration content only and MUST NOT be used to identify real people, guide care, or represent current clinical conditions.
- **BR-002**: Each supplied field value MUST remain associated with its given Patient ID and row; no value may be inferred, normalized, or silently changed.
- **BR-003**: These rows do not imply that patient records are created, edited, persisted, refreshed, or synchronized.

### Assumptions & Scope Boundaries

#### Assumptions

- The supplied records are dummy data, as stated in the request.
- The table appears on the existing Patient List reached through the current demonstration flow.
- The request defines the table contents and order but does not prescribe a visual theme.

#### Explicit Non-Goals

- Real patient data, clinical decision support, or use in patient care.
- Adding, editing, deleting, searching, sorting, filtering, pagination, or refreshing records.
- Connecting to a clinical system, database, or external service.
- Changing the sign-in or sign-out flow.

#### Prohibited Behaviors

- The application MUST NOT imply that the supplied rows represent real patients or current clinical information.
- The application MUST NOT change, combine, or infer values across the supplied rows.
- The application MUST NOT use these records to make or recommend clinical decisions.

### Key Entities _(include if feature involves data)_

- **Dummy patient row**: One supplied demonstration entry containing Patient ID, Name, Age, Sex, Arrival, Chief Complaint, ESI, HR, BP, SpO₂, Bed, Status, and Provider values.

---

## Review & Acceptance Checklist

_GATE: Automated checks run during main() execution_

### Content Quality

- [x] No implementation details (languages, frameworks, APIs, implementation identifiers, or file paths)
- [x] No tech-stack, CSS implementation detail, or code-structure detail leaked from reference artifacts
- [x] No `Reference Context` analysis section embedded in `spec.md`
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] No reference material was provided
- [x] Exact supplied labels, values, and copy are preserved
- [x] All mandatory sections completed

### Requirement Completeness

- [x] No unresolved clarification markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Scope is clearly bounded
- [x] Demo-only constraints explicitly state what must NOT happen
- [x] Scope did not expand beyond the requested table content
- [x] Acceptance criteria cover the visible table and supplied rows
- [x] No unsupported data behaviors were added
- [x] Dependencies and assumptions are identified

## Execution Status

_Updated during specification processing_

- [x] User description parsed
- [x] Key concepts extracted
- [x] Ambiguities resolved through explicit scope boundaries
- [x] User scenarios defined
- [x] Requirements generated
- [x] Data entity identified
- [x] Review checklist passed