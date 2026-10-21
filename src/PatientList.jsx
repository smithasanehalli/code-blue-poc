import './PatientList.css'

const patientColumns = [
  { key: 'patientId', label: 'Patient ID' },
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'sex', label: 'Sex' },
  { key: 'arrival', label: 'Arrival' },
  { key: 'chiefComplaint', label: 'Chief Complaint' },
  { key: 'esi', label: 'ESI' },
  { key: 'hr', label: 'HR' },
  { key: 'bp', label: 'BP' },
  { key: 'spo2', label: 'SpO₂' },
  { key: 'bed', label: 'Bed' },
  { key: 'status', label: 'Status' },
  { key: 'provider', label: 'Provider' },
]

const patients = [
  {
    patientId: 'ED-1001',
    name: 'Daniel Reyes',
    age: 62,
    sex: 'M',
    arrival: '08:05',
    chiefComplaint: 'Chest pain radiating to left arm',
    esi: 2,
    hr: 104,
    bp: '152/94',
    spo2: '96%',
    bed: 'R-01',
    status: 'In treatment',
    provider: 'Dr. Patel',
  },
  {
    patientId: 'ED-1002',
    name: 'Aisha Khan',
    age: 29,
    sex: 'F',
    arrival: '08:12',
    chiefComplaint: 'Severe abdominal pain, 8/10',
    esi: 3,
    hr: 98,
    bp: '118/76',
    spo2: '99%',
    bed: 'B-04',
    status: 'Awaiting imaging',
    provider: 'Dr. Nguyen',
  },
  {
    patientId: 'ED-1003',
    name: 'Thomas Whitfield',
    age: 78,
    sex: 'M',
    arrival: '08:20',
    chiefComplaint: 'Shortness of breath, history of COPD',
    esi: 2,
    hr: 112,
    bp: '138/82',
    spo2: '89%',
    bed: 'R-02',
    status: 'In treatment',
    provider: 'Dr. Patel',
  },
  {
    patientId: 'ED-1004',
    name: 'Mia Chen',
    age: 7,
    sex: 'F',
    arrival: '08:31',
    chiefComplaint: 'Fever 39.5°C, vomiting',
    esi: 3,
    hr: 128,
    bp: '102/64',
    spo2: '98%',
    bed: 'P-01',
    status: 'Awaiting labs',
    provider: 'Dr. Okafor',
  },
  {
    patientId: 'ED-1005',
    name: 'Luis Ortega',
    age: 34,
    sex: 'M',
    arrival: '08:40',
    chiefComplaint: 'Laceration, left hand',
    esi: 4,
    hr: 82,
    bp: '126/80',
    spo2: '99%',
    bed: 'F-02',
    status: 'Awaiting suturing',
    provider: 'PA Ellis',
  },
  {
    patientId: 'ED-1006',
    name: 'Grace Mbeki',
    age: 45,
    sex: 'F',
    arrival: '08:47',
    chiefComplaint: 'Severe headache, vision changes',
    esi: 2,
    hr: 90,
    bp: '168/102',
    spo2: '98%',
    bed: 'B-02',
    status: 'CT ordered',
    provider: 'Dr. Nguyen',
  },
  {
    patientId: 'ED-1007',
    name: 'Henry Zhao',
    age: 19,
    sex: 'M',
    arrival: '09:02',
    chiefComplaint: 'Ankle sprain after soccer',
    esi: 5,
    hr: 76,
    bp: '120/74',
    spo2: '100%',
    bed: 'W-01',
    status: 'Waiting room',
    provider: 'Unassigned',
  },
  {
    patientId: 'ED-1008',
    name: 'Priya Nair',
    age: 54,
    sex: 'F',
    arrival: '09:10',
    chiefComplaint: 'Dizziness, near-syncope',
    esi: 3,
    hr: 58,
    bp: '94/60',
    spo2: '97%',
    bed: 'B-05',
    status: 'Awaiting ECG',
    provider: 'Dr. Patel',
  },
  {
    patientId: 'ED-1009',
    name: 'Robert Alvarez',
    age: 71,
    sex: 'M',
    arrival: '09:18',
    chiefComplaint: 'Fall at home, hip pain',
    esi: 3,
    hr: 88,
    bp: '130/78',
    spo2: '95%',
    bed: 'B-06',
    status: 'X-ray done, awaiting result',
    provider: 'Dr. Okafor',
  },
  {
    patientId: 'ED-1010',
    name: 'Sofia Rossi',
    age: 26,
    sex: 'F',
    arrival: '09:25',
    chiefComplaint: 'Allergic reaction, facial swelling',
    esi: 2,
    hr: 118,
    bp: '108/66',
    spo2: '94%',
    bed: 'R-03',
    status: 'In treatment',
    provider: 'Dr. Nguyen',
  },
  {
    patientId: 'ED-1011',
    name: 'Marcus Bell',
    age: 41,
    sex: 'M',
    arrival: '09:33',
    chiefComplaint: 'Back pain, 3 days',
    esi: 4,
    hr: 80,
    bp: '134/86',
    spo2: '99%',
    bed: 'W-02',
    status: 'Waiting room',
    provider: 'Unassigned',
  },
  {
    patientId: 'ED-1012',
    name: 'Elena Petrova',
    age: 83,
    sex: 'F',
    arrival: '09:41',
    chiefComplaint: 'Confusion, new onset',
    esi: 2,
    hr: 96,
    bp: '148/90',
    spo2: '93%',
    bed: 'R-04',
    status: 'Sepsis workup',
    provider: 'Dr. Patel',
  },
]

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
        <p className="patient-list-demo-note">
          Demo data only. These example records are not live patient information
          and must not be used for clinical decisions.
        </p>
        <table>
          <caption className="patient-list-visually-hidden">
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
                      {patient[column.key]}
                    </th>
                  ) : (
                    <td key={column.key}>{patient[column.key]}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default PatientList
