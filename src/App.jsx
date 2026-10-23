import { useState } from 'react'
import AppLayout from './AppLayout.jsx'
import PatientDetails from './PatientDetails.jsx'
import TriageBoard from './TriageBoard.jsx'
import {
  clearSavedPatients,
  demoPatients,
  loadPatients,
  savePatients,
} from './patients.js'
import './App.css'

const DEMO_EMAIL = 'demo@abchospital.com'
const DEMO_PASSWORD = 'abchospital123'

function Login({ onSignIn }) {
  const [errors, setErrors] = useState({})

  function handleSubmit(event) {
    event.preventDefault()

    const { email, password } = event.currentTarget.elements
    const nextErrors = {}

    if (!email.value.trim()) {
      nextErrors.email = 'Enter your email address.'
    } else if (!email.validity.valid) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!password.value) {
      nextErrors.password = 'Enter your password.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      onSignIn()
    }
  }

  return (
    <main className="login-page">
      <aside className="login-aside" aria-label="Login prototype information">
        <div className="aside-topline">
          <span className="aside-mark" aria-hidden="true">
            01
          </span>
          <span>ACCOUNT ACCESS</span>
        </div>

        <div className="aside-message">
          <p className="eyebrow">A SIGN-IN PREVIEW</p>
          <h2>Welcome to ABC Hospital</h2>
          <p>
            Explore the form experience. This prototype does not access an
            account.
          </p>
        </div>

        <p className="aside-footer">PROTOTYPE / NO ACCOUNT ACCESS</p>
      </aside>

      <section className="login-main" aria-labelledby="login-title">
        <div className="login-panel">
          <p className="form-eyebrow">YOUR ACCOUNT</p>
          <h1 id="login-title">Fake Sign in</h1>
          <p className="form-intro">
            Demo credentials are filled in. Select Fake Sign in to continue.
          </p>

          <form
            className="login-form"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="form-field">
              <label htmlFor="email">Email address</label>
              <input
                autoComplete="username"
                id="email"
                name="email"
                type="email"
                defaultValue={DEMO_EMAIL}
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby="email-error"
              />
              <p className="field-error" id="email-error" aria-live="polite">
                {errors.email}
              </p>
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                autoComplete="current-password"
                id="password"
                name="password"
                type="password"
                defaultValue={DEMO_PASSWORD}
                required
                aria-invalid={Boolean(errors.password)}
                aria-describedby="password-error"
              />
              <p className="field-error" id="password-error" aria-live="polite">
                {errors.password}
              </p>
            </div>

            <button className="sign-in-button" type="submit">
              Fake Sign in
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [activeModule, setActiveModule] = useState('triage')
  const [patients, setPatients] = useState(loadPatients)
  const [selectedPatientId, setSelectedPatientId] = useState(
    demoPatients[0].patientId,
  )
  const [dataVersion, setDataVersion] = useState(0)

  function handleSignIn() {
    setActiveModule('triage')
    setIsSignedIn(true)
  }

  function handleOpenPatient(patientId) {
    setSelectedPatientId(patientId)
    setActiveModule('profile')
  }

  function handleSavePatient(updatedPatient) {
    const nextPatients = patients.map((patient) =>
      patient.patientId === updatedPatient.patientId ? updatedPatient : patient,
    )
    setPatients(nextPatients)
    return savePatients(nextPatients)
  }

  function handleResetAll() {
    clearSavedPatients()
    setPatients(demoPatients)
    setDataVersion((version) => version + 1)
  }

  if (!isSignedIn) {
    return <Login onSignIn={handleSignIn} />
  }

  return (
    <AppLayout
      activeModule={activeModule}
      onNavigate={setActiveModule}
      onSignOut={() => setIsSignedIn(false)}
    >
      {activeModule === 'triage' ? (
        <TriageBoard patients={patients} onOpenPatient={handleOpenPatient} />
      ) : (
        <PatientDetails
          patients={patients}
          dataVersion={dataVersion}
          selectedPatientId={selectedPatientId}
          onSelectPatient={setSelectedPatientId}
          onSavePatient={handleSavePatient}
          onResetAll={handleResetAll}
        />
      )}
    </AppLayout>
  )
}

export default App
