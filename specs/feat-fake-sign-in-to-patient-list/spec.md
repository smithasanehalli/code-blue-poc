# Feature Specification: Fake Sign in → Patient List

**Feature Branch**: `feat-fake-sign-in-to-patient-list`  
**Created**: 2026-10-19  
**Status**: Ready for planning  
**Input**: User description: "Fake Sign in → Patient List". Detailed by the earlier request: "Change the screen to
Welcome to Code Blue and in the place of Sign in Fake Sign in and prepopulate email and password and once signed in
land in a new component called Patient List for now I will add the remaining feature one by one"  
**Supersedes**: Login Page specification (`feat-create-login-page`) FR-004, FR-005, AC-003, BR-003, and its
"post-login navigation" non-goal. All other Login Page requirements still apply.

## User Scenarios & Testing _(mandatory)_

### Primary User Story

As a person demonstrating Code Blue, I want the sign-in screen to carry the Code Blue welcome and come with demo
details already filled in. Then I can select "Fake Sign in" once and reach the Patient List screen without typing
or holding a real account.

### Acceptance Criteria

- **AC-001**: **Given** a visitor opens the application, **When** the sign-in screen loads, **Then** the welcome
  heading reads exactly "Welcome to Code Blue".
- **AC-002**: **Given** a visitor opens the application, **When** the sign-in screen loads, **Then** the form
  title and the submit action both read exactly "Fake Sign in", and the words "Sign in" do not appear as a
  standalone title or action.
- **AC-003**: **Given** a visitor opens the application, **When** the sign-in screen loads, **Then** the email
  field already contains a demo email address and the password field already contains a demo password, with the
  password masked.
- **AC-004**: **Given** the pre-filled demo values are unchanged, **When** the visitor selects "Fake Sign in",
  **Then** the visitor is taken to the Patient List screen.
- **AC-005**: **Given** the visitor has cleared a field or entered an email that is not in a valid email format,
  **When** the visitor selects "Fake Sign in", **Then** the visitor stays on the sign-in screen and the field that
  needs correction is identified (same messages as the Login Page specification).
- **AC-006**: **Given** the visitor has replaced the demo values with any other non-empty password and a valid-format
  email, **When** the visitor selects "Fake Sign in", **Then** the visitor is taken to the Patient List screen
  (values are never checked against an account).
- **AC-007**: **Given** the visitor has reached the Patient List screen, **When** the screen loads, **Then** it shows
  the "CODE BLUE" brand label, the heading "Patient List", and the message "No patients to display yet."
- **AC-008**: **Given** the visitor is on the Patient List screen, **When** the visitor selects "Sign out",
  **Then** the visitor returns to the sign-in screen with the demo values filled in again.

### User-Visible Outcomes

- A sign-in screen branded "Welcome to Code Blue" with a "Fake Sign in" title and action.
- Email and password fields that are filled in on arrival.
- The intro text "Demo credentials are filled in. Select Fake Sign in to continue."
- Field-level messages when a field is empty or the email format is invalid.
- A Patient List screen with an empty-state message, reached right after a valid fake sign-in.
- A "Sign out" action on Patient List that returns to the sign-in screen.

### Edge Cases

- **EC-001**:
  - What happens when the visitor reloads the page while on Patient List?
  - The application opens on the sign-in screen again. The fake signed-in state is not remembered.
- **EC-002**:
  - What happens when the visitor edits the pre-filled values?
  - The edited values are used for the form checks only. Fake sign-in proceeds whenever the checks pass.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The sign-in screen MUST show the welcome heading "Welcome to Code Blue".
- **FR-002**: The sign-in screen MUST use "Fake Sign in" as its form title and as its submit action label.
- **FR-003**: The sign-in screen MUST show the intro text "Demo credentials are filled in. Select Fake Sign in to continue."
- **FR-004**: The email and password fields MUST be pre-filled with demo values when the sign-in screen loads,
  and the password MUST remain masked.
- **FR-005**: The existing field checks (required email, valid email format, required password) MUST still run on
  submit, and a failing check MUST keep the visitor on the sign-in screen.
- **FR-006**: When all field checks pass, the application MUST take the visitor to the Patient List screen.
- **FR-007**: The Patient List screen MUST show the "CODE BLUE" brand label, the heading "Patient List", and the
  empty-state message "No patients to display yet."
- **FR-008**: The Patient List screen MUST offer a "Sign out" action that returns the visitor to the sign-in
  screen with the demo values filled in again. (Confirmed by the requester on 2026-10-19.)

### Business Rules

- **BR-001**: "Fake Sign in" is a demonstration step, not authentication. Reaching Patient List grants no real
  access and confirms no identity.
- **BR-002**: The demo values MUST be obviously fictitious and MUST NOT match any real account.
- **BR-003**: Patient List starts as an empty placeholder. Patient data and list features will be specified in
  separate, later features.

### Assumptions & Scope Boundaries

#### Assumptions

- Visitors are presenters or reviewers demonstrating the application, not clinical users.
- One fixed set of demo values is enough. The values do not need to vary by visitor or environment.

#### Explicit Non-Goals

- Real authentication, account lookup, registration, recovery, multi-factor authentication, and remember-me.
- Remembering the fake signed-in state across a reload or a new visit.
- Showing, searching, filtering, or editing patients. Patient List features come in later features, one at a time.
- Separate addresses or links for the sign-in and Patient List screens.

#### Prohibited Behaviors

- The application MUST NOT send the entered email or password anywhere or store them.
- The application MUST NOT show the entered password in any message or on Patient List.
- The application MUST NOT tell the visitor they have been authenticated or verified.
- The application MUST NOT show real or realistic patient information on Patient List within this feature.

---

## Review & Acceptance Checklist

_GATE: Automated checks run during main() execution_

### Content Quality

- [x] No implementation details (languages, frameworks, APIs, implementation identifiers, or file paths)
- [x] No tech-stack, CSS implementation detail, or code-structure detail leaked from reference artifacts
- [x] No `Reference Context` analysis section embedded in `spec.md` (reference analysis belongs in `reference-context.md`)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] Reference material translated into business language only (no reference folder used)
- [x] Exact user-facing copy preserved when a validated source clearly specifies it
- [x] All mandatory sections completed

### Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Scope is clearly bounded
- [x] Prototype-only or limited-scope flows explicitly state what must NOT happen
- [x] Short prompts did not silently broaden the feature beyond the given input or validated reference material
- [x] Acceptance criteria cover all distinct observable scenarios supported by the prompt or validated reference material
- [x] No inferred behavior was added beyond the prompt, validated reference material, or explicit business rules (Sign out confirmed by requester)
- [x] Dependencies and assumptions identified

---

## Execution Status

_Updated by main() during processing_

- [x] User description parsed
- [x] Key concepts extracted
- [x] Ambiguities marked
- [x] User scenarios defined
- [x] Requirements generated
- [x] Entities identified (none required; no data entities in this feature)
- [x] Review checklist passed

---
