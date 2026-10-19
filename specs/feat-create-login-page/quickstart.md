# Quickstart: Prototype Login Page

## Automated Checks

Run from the repository root:

```bash
npm run lint
npm run build
```

The repository does not currently include an automated test runner.

## Manual Scenarios

Start the development server with `npm run dev` and open the local URL it reports.

### QV-01: Login page is presented

1. Open the application.
2. Confirm the page presents email and password fields and a sign-in action.

### QV-02: Missing or invalid input is rejected

1. Submit with both fields empty; confirm field-specific feedback appears and the prototype
   notice does not appear.
2. Enter a valid-looking email and leave the password empty; confirm the password field is
   identified.
3. Enter a malformed email and a non-empty password; confirm the email field is identified
   and the prototype notice does not appear.

### QV-03: Valid-looking submission remains a prototype

1. Enter a valid-format email and a non-empty password.
2. Submit the form.
3. Confirm the page displays exactly: `Authentication is not connected in this prototype.`
4. Confirm the page does not navigate or display an authenticated/success state.

### QV-04: Password is not exposed or persisted

1. Submit a valid-looking form.
2. Confirm no page message displays the entered password.
3. Reload the page and confirm the application does not restore the previously entered
   password from application-managed storage.