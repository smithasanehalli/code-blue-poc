import './PatientList.css'

function PatientList({ onSignOut }) {
  return (
    <main className="patient-list-page">
      <header className="patient-list-header">
        <span className="patient-list-brand">CODE BLUE</span>
        <button className="sign-out-button" type="button" onClick={onSignOut}>
          Sign out
        </button>
      </header>

      <section className="patient-list-content" aria-labelledby="patient-list-title">
        <h1 id="patient-list-title">Patient List</h1>
        <p className="patient-list-empty">No patients to display yet.</p>
      </section>
    </main>
  )
}

export default PatientList
