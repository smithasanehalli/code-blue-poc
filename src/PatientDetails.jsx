import { useState } from 'react'
import { numericFields, patientColumns, validatePatient } from './patients.js'
import './PatientDetails.css'

const editableColumns = patientColumns.filter((column) => column.key !== 'patientId')

const inputProps = {
  sex: { as: 'select', options: ['M', 'F'] },
  arrival: { type: 'time' },
  age: { inputMode: 'numeric' },
  esi: { inputMode: 'numeric' },
  hr: { inputMode: 'numeric' },
}

function toDraft(patient) {
  return Object.fromEntries(
    editableColumns.map((column) => [column.key, String(patient[column.key])]),
  )
}

function fromDraft(patient, draft) {
  const updated = { ...patient }
  for (const [key, value] of Object.entries(draft)) {
    updated[key] = numericFields.has(key) ? Number(value) : value.trim()
  }
  return updated
}

function ProfileForm({ patient, patients, onSelectPatient, onSavePatient }) {
  const [draft, setDraft] = useState(() => toDraft(patient))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const savedDraft = toDraft(patient)
  const isDirty = editableColumns.some(
    (column) => draft[column.key] !== savedDraft[column.key],
  )

  function handleSelect(event) {
    if (isDirty && !window.confirm('Discard unsaved changes to this patient?')) {
      return
    }
    onSelectPatient(event.target.value)
  }

  function handleChange(event) {
    const { name, value } = event.target
    setDraft((current) => ({ ...current, [name]: value }))
    setStatus('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validatePatient(draft)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('Fix the highlighted fields before saving.')
      return
    }
    const persisted = onSavePatient(fromDraft(patient, draft))
    setStatus(
      persisted
        ? `Saved changes to ${patient.patientId}.`
        : `Updated ${patient.patientId}, but this browser blocked saving. Changes will be lost when the page is closed.`,
    )
  }

  function handleDiscard() {
    setDraft(savedDraft)
    setErrors({})
    setStatus('Changes discarded.')
  }

  return (
    <form className="profile-form" noValidate onSubmit={handleSubmit}>
      <div className="profile-field profile-picker">
        <label htmlFor="profile-patient">Patient</label>
        <select id="profile-patient" value={patient.patientId} onChange={handleSelect}>
          {patients.map((option) => (
            <option key={option.patientId} value={option.patientId}>
              {option.patientId} — {option.name}
            </option>
          ))}
        </select>
      </div>

      <div className="profile-grid">
        {editableColumns.map((column) => {
          const { as, options, ...rest } = inputProps[column.key] ?? {}
          const id = `profile-${column.key}`
          const errorId = `${id}-error`
          const shared = {
            id,
            name: column.key,
            value: draft[column.key],
            onChange: handleChange,
            'aria-invalid': Boolean(errors[column.key]),
            'aria-describedby': errorId,
          }

          return (
            <div className="profile-field" key={column.key}>
              <label htmlFor={id}>{column.label}</label>
              {as === 'select' ? (
                <select {...shared}>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input type="text" {...rest} {...shared} />
              )}
              <p className="profile-error" id={errorId}>
                {errors[column.key]}
              </p>
            </div>
          )
        })}
      </div>

      <div className="profile-actions">
        <button
          className="profile-button profile-button-primary"
          type="submit"
          disabled={!isDirty}
        >
          Save changes
        </button>
        <button
          className="profile-button"
          type="button"
          onClick={handleDiscard}
          disabled={!isDirty}
        >
          Discard
        </button>
        <p className="profile-status" role="status">
          {status}
        </p>
      </div>
    </form>
  )
}

function PatientDetails({
  patients,
  dataVersion,
  selectedPatientId,
  onSelectPatient,
  onSavePatient,
  onResetAll,
}) {
  const patient =
    patients.find((candidate) => candidate.patientId === selectedPatientId) ?? patients[0]

  function handleResetAll() {
    if (window.confirm('Reset all patients to the original demo data? Saved edits will be lost.')) {
      onResetAll()
    }
  }

  return (
    <section aria-labelledby="patient-details-title">
      <div className="profile-heading">
        <h1 id="patient-details-title">Patient Details</h1>
        <button className="profile-button" type="button" onClick={handleResetAll}>
          Reset demo data
        </button>
      </div>
      <p className="demo-note">
        Demo data only. Edits are saved in this browser and are not clinical records.
      </p>

      <ProfileForm
        key={`${patient.patientId}:${dataVersion}`}
        patient={patient}
        patients={patients}
        onSelectPatient={onSelectPatient}
        onSavePatient={onSavePatient}
      />
    </section>
  )
}

export default PatientDetails
