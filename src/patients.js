export const patientColumns = [
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

export const demoPatients = [
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

const STORAGE_KEY = 'abc-hospital.patients'

const demoPatientIds = new Set(demoPatients.map((patient) => patient.patientId))

function isValidStoredPatients(value) {
  return (
    Array.isArray(value) &&
    value.length === demoPatients.length &&
    value.every(
      (patient) =>
        patient &&
        typeof patient === 'object' &&
        demoPatientIds.has(patient.patientId) &&
        patientColumns.every((column) => column.key in patient),
    )
  )
}

export function loadPatients() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (isValidStoredPatients(stored)) {
      return stored
    }
  } catch {
    // Unreadable or malformed storage falls back to the demo data below.
  }
  return demoPatients
}

// Both return false when browser storage is unavailable (blocked or full).
export function savePatients(patients) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients))
    return true
  } catch {
    return false
  }
}

export function clearSavedPatients() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch {
    return false
  }
}

const fieldRules = {
  name: { required: true, message: 'Enter a name.' },
  age: { pattern: /^\d{1,3}$/, max: 130, message: 'Enter an age from 0 to 130.' },
  sex: { pattern: /^[MF]$/, message: 'Select M or F.' },
  arrival: { pattern: /^([01]\d|2[0-3]):[0-5]\d$/, message: 'Enter a time as HH:mm.' },
  chiefComplaint: { required: true, message: 'Enter a chief complaint.' },
  esi: { pattern: /^[1-5]$/, message: 'Enter an ESI level from 1 to 5.' },
  hr: { pattern: /^\d{1,3}$/, max: 300, message: 'Enter a heart rate from 0 to 300.' },
  bp: { pattern: /^\d{2,3}\/\d{2,3}$/, message: 'Enter BP as systolic/diastolic, e.g. 120/80.' },
  spo2: { pattern: /^\d{1,3}%$/, max: 100, message: 'Enter SpO₂ as a percentage, e.g. 98%.' },
  bed: { required: true, message: 'Enter a bed.' },
  status: { required: true, message: 'Enter a status.' },
  provider: { required: true, message: 'Enter a provider or "Unassigned".' },
}

export const numericFields = new Set(['age', 'esi', 'hr'])

export function validatePatient(draft) {
  const errors = {}
  for (const [key, rule] of Object.entries(fieldRules)) {
    const value = String(draft[key] ?? '').trim()
    const invalid =
      (rule.required && !value) ||
      (rule.pattern && !rule.pattern.test(value)) ||
      (rule.max !== undefined && parseInt(value, 10) > rule.max)
    if (invalid) {
      errors[key] = rule.message
    }
  }
  return errors
}
