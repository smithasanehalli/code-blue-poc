# Research: Prototype Login Page

## Repository Findings

- The application is a React 19 and Vite 8 browser starter using JavaScript and JSX.
- `src/main.jsx` renders the existing `src/App.jsx` screen; page styles are in `src/App.css`.
- The package has `lint`, `build`, `dev`, and `preview` scripts, but no test script or test framework.
- No authentication provider, API client, router, or persistence layer is configured.

## Decisions

### D1: Keep the feature prototype-only

**Decision**: Do not connect to a real authentication service or simulate a successful login.
For a valid-looking submission, show the exact notice specified by the feature spec and stay
on the page.

**Rationale**: The spec explicitly says authentication is not connected and prohibits a
signed-in state or post-login navigation. The repository has no auth dependency or service.

**Alternatives rejected**: Adding a provider or inventing a fake success flow would exceed the
spec and risk implying that credentials were verified.

### D2: Validate only the stated form requirements

**Decision**: Require both email and password and reject an email value that is not in a
valid email format before showing the prototype notice. Provide field-specific feedback.

**Rationale**: These are the explicit input rules in the spec. Password policy belongs to
authentication, which is not part of this prototype.

**Alternatives rejected**: Password-strength rules, credential matching, and account-existence
checks have no supporting requirement and would imply a real auth system.

### D3: Use existing source files and available verification

**Decision**: Implement in the existing app surface and page stylesheet. Validate with
`npm run lint`, `npm run build`, and the manual scenarios in `quickstart.md`.

**Rationale**: The feature is a single screen, and no automated test harness is configured.

**Alternatives rejected**: Adding routes, shared form infrastructure, or test dependencies
would introduce structure not justified by this prototype.