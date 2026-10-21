import { patientColumns } from './patients.js'
import './TriageBoard.css'

function TriageBoard({ patients, onOpenPatient }) {
  return (
    <section aria-labelledby="triage-board-title">
      <h1 id="triage-board-title">TriageBoard</h1>
      <p className="demo-note">
        Demo data only. These example records are not live patient information
        and must not be used for clinical decisions. Select a Patient ID to open
        its profile.
      </p>

      <div
        className="triage-table-scroll"
        role="region"
        aria-labelledby="triage-board-title"
        tabIndex={0}
      >
        <table className="triage-table">
          <caption className="visually-hidden">
            Demo patients (dummy data)
          </caption>
          <thead>
            <tr>
              {patientColumns.map((column) => (
                <th key={column.key} scope="col">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.patientId}>
                {patientColumns.map((column) =>
                  column.key === 'patientId' ? (
                    <th key={column.key} scope="row">
                      <button
                        className="triage-patient-link"
                        type="button"
                        onClick={() => onOpenPatient(patient.patientId)}
                      >
                        {patient.patientId}
                      </button>
                    </th>
                  ) : (
                    <td key={column.key}>{patient[column.key]}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default TriageBoard
