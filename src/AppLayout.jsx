import './AppLayout.css'

const modules = [
  { id: 'triage', label: 'TriageBoard' },
  { id: 'profile', label: 'Patient Details' },
]

function AppLayout({ activeModule, onNavigate, onSignOut, children }) {
  return (
    <div className="app-layout">
      <header className="app-header">
        <span className="app-brand">ABC HOSPITAL</span>

        <nav className="app-nav" aria-label="Modules">
          {modules.map((module) => (
            <button
              key={module.id}
              className="app-nav-link"
              type="button"
              aria-current={module.id === activeModule ? 'page' : undefined}
              onClick={() => onNavigate(module.id)}
            >
              {module.label}
            </button>
          ))}
        </nav>

        <button className="sign-out-button" type="button" onClick={onSignOut}>
          Sign out
        </button>
      </header>

      <main className="app-main">{children}</main>
    </div>
  )
}

export default AppLayout
