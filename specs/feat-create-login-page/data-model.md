# Data Model: Prototype Login Page

This feature has no persistent domain entities or external data contracts. Its only data is
transient UI state for the currently displayed form.

| State | Contents | Lifetime |
| ----- | -------- | -------- |
| Form values | Email and password entered by the visitor | Current page interaction only |
| Validation feedback | Field-specific messages for missing values or invalid email format | Until the form state changes or the page is left |
| Submission outcome | The prototype notice after valid-looking values are submitted | Current page interaction only |

The application must not send or persist the password, create an authenticated identity, or
represent the submission as successful authentication.