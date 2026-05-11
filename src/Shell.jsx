import { Icons as Ic } from './Icons.jsx';
import { useNav } from './NavContext.jsx';

const NAV_ITEMS = [
  { id: 'dashboard',  label: 'Dashboard',        icon: 'Home' },
  { id: 'patients',   label: 'Patients',          icon: 'Users',           defaultCount: 248 },
  { id: 'upload',     label: 'Upload ECG',        icon: 'Upload' },
  { id: 'queue',      label: 'Processing Queue',  icon: 'Cpu',             defaultCount: 7 },
  { id: 'results',    label: 'Results',           icon: 'Activity' },
  { id: 'reports',    label: 'Reports',           icon: 'FileText' },
];

const ADMIN_ITEMS = [
  { id: 'team',         label: 'Team & Roles',  icon: 'Users' },
  { id: 'audit',        label: 'Audit Log',     icon: 'ClipboardCheck' },
  { id: 'integrations', label: 'Integrations',  icon: 'Layers' },
  { id: 'settings',     label: 'Settings',      icon: 'Settings' },
];

export function Sidebar({ active = 'dashboard', counts = {} }) {
  const navigate = useNav();
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <Ic.Logo size={32} />
        <div>
          <div className="sb-name">CardioEcg</div>
          <div className="sb-tag">Clinical · v3.2</div>
        </div>
      </div>

      <div className="sb-search">
        <div className="sb-search-box" role="search">
          <Ic.Search size={14} />
          <span>Search patients, MRN…</span>
          <kbd className="kbd" aria-label="Keyboard shortcut Command K">⌘K</kbd>
        </div>
      </div>

      <div className="sb-section" aria-hidden="true">Workspace</div>
      <nav className="sb-nav" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const IconC = Ic[item.icon];
          const count = counts[item.id] ?? item.defaultCount;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`sb-item${isActive ? ' active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => navigate?.(item.id)}
            >
              <IconC size={16} />
              <span>{item.label}</span>
              {count != null && (
                <span className="count" aria-label={`${count} items`}>{count}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="sb-section" style={{ marginTop: 14 }} aria-hidden="true">Administration</div>
      <nav className="sb-nav" aria-label="Administration navigation">
        {ADMIN_ITEMS.map((item) => {
          const IconC = Ic[item.icon];
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`sb-item${isActive ? ' active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => navigate?.(item.id)}
            >
              <IconC size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sb-foot">
        <div
          style={{ padding: '8px 10px', borderRadius: 8, background: 'linear-gradient(180deg,#EFF6FF,#F0FDFA)', border: '1px solid #DBEAFE', marginBottom: 10 }}
          role="status"
          aria-label="Security status: HIPAA and SOC 2 Type II compliant. Session expires in 23 minutes."
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Ic.ShieldCheck size={14} color="#0F766E" />
            <span style={{ fontSize: 11.5, fontWeight: 600, color: '#0F766E' }}>HIPAA · SOC 2 Type II</span>
          </div>
          <div style={{ fontSize: 11, color: '#475569', lineHeight: 1.45 }}>
            All data encrypted at rest &amp; in transit. Session expires in 23 min.
          </div>
        </div>
        <div className="sb-user">
          <div className="avatar" aria-hidden="true">DR</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sb-user-name">Dr. Riya Mehta</div>
            <div className="sb-user-role">Cardiologist · Mercy West</div>
          </div>
          <Ic.ChevronDown size={14} color="#9CA3AF" aria-hidden="true" />
        </div>
      </div>
    </aside>
  );
}

export function Topbar({ title, crumb, actions, searchPlaceholder = 'Search by patient name, MRN, or report ID…' }) {
  return (
    <header className="topbar">
      <div>
        {crumb && <div className="tb-crumb" aria-label="Breadcrumb">{crumb}</div>}
        <h1 className="tb-title">{title}</h1>
      </div>

      <div className="tb-search" role="search">
        <div className="tb-search-wrap">
          <Ic.Search size={14} aria-hidden="true" />
          <input
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            type="search"
          />
        </div>
      </div>

      <div className="tb-actions">
        <button type="button" className="tb-ico" aria-label="Help">
          <Ic.HelpCircle size={18} />
        </button>
        <button type="button" className="tb-ico" aria-label="Notifications — new alerts available">
          <Ic.Bell size={18} />
          <span className="dot" aria-hidden="true" />
        </button>
        <div style={{ width: 1, height: 24, background: '#E5E7EB', margin: '0 4px' }} aria-hidden="true" />
        {actions}
        <div className="avatar" aria-label="Dr. Riya Mehta" style={{ marginLeft: 4 }}>DR</div>
      </div>
    </header>
  );
}
