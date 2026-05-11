// App shell: sidebar + topbar

function Sidebar({ active = 'dashboard', counts = {} }) {
  const Ic = window.Icons;
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: Ic.Home },
    { id: 'patients', label: 'Patients', icon: Ic.Users, count: counts.patients ?? 248 },
    { id: 'upload', label: 'Upload ECG', icon: Ic.Upload },
    { id: 'queue', label: 'Processing Queue', icon: Ic.Cpu, count: counts.queue ?? 7 },
    { id: 'results', label: 'Results', icon: Ic.Activity, count: counts.results },
    { id: 'reports', label: 'Reports', icon: Ic.FileText },
  ];
  const admin = [
    { id: 'team', label: 'Team & Roles', icon: Ic.Users },
    { id: 'audit', label: 'Audit Log', icon: Ic.ClipboardCheck },
    { id: 'integrations', label: 'Integrations', icon: Ic.Layers },
    { id: 'settings', label: 'Settings', icon: Ic.Settings },
  ];
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
        <div className="sb-search-box">
          <Ic.Search size={14} />
          <span>Search patients, MRN…</span>
          <span className="kbd">⌘K</span>
        </div>
      </div>

      <div className="sb-section">Workspace</div>
      <nav className="sb-nav">
        {items.map((it) => {
          const IconC = it.icon;
          return (
            <div key={it.id} className={`sb-item ${active === it.id ? 'active' : ''}`}>
              <IconC size={16} />
              <span>{it.label}</span>
              {it.count != null && <span className="count">{it.count}</span>}
            </div>
          );
        })}
      </nav>

      <div className="sb-section" style={{ marginTop: 14 }}>Administration</div>
      <nav className="sb-nav">
        {admin.map((it) => {
          const IconC = it.icon;
          return (
            <div key={it.id} className={`sb-item ${active === it.id ? 'active' : ''}`}>
              <IconC size={16} />
              <span>{it.label}</span>
            </div>
          );
        })}
      </nav>

      <div className="sb-foot">
        <div style={{ padding: '8px 10px', borderRadius: 8, background: 'linear-gradient(180deg,#EFF6FF,#F0FDFA)', border: '1px solid #DBEAFE', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Ic.ShieldCheck size={14} color="#0F766E" />
            <span style={{ fontSize: 11.5, fontWeight: 600, color: '#0F766E' }}>HIPAA · SOC 2 Type II</span>
          </div>
          <div style={{ fontSize: 11, color: '#475569', lineHeight: 1.45 }}>All data encrypted at rest & in transit. Session expires in 23 min.</div>
        </div>
        <div className="sb-user">
          <div className="avatar">DR</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sb-user-name">Dr. Riya Mehta</div>
            <div className="sb-user-role">Cardiologist · Mercy West</div>
          </div>
          <Ic.ChevronDown size={14} color="#9CA3AF" />
        </div>
      </div>
    </aside>
  );
}

function Topbar({ title, crumb, actions, searchPlaceholder = 'Search by patient name, MRN, or report ID…' }) {
  const Ic = window.Icons;
  return (
    <header className="topbar">
      <div>
        {crumb && <div className="tb-crumb">{crumb}</div>}
        <div className="tb-title">{title}</div>
      </div>
      <div className="tb-search">
        <div className="tb-search-wrap">
          <Ic.Search size={14} />
          <input className="" placeholder={searchPlaceholder} />
        </div>
      </div>
      <div className="tb-actions">
        <div className="tb-ico"><Ic.HelpCircle size={18} /></div>
        <div className="tb-ico"><Ic.Bell size={18} /><span className="dot"></span></div>
        <div style={{ width: 1, height: 24, background: '#E5E7EB', margin: '0 4px' }} />
        {actions}
        <div className="avatar" style={{ marginLeft: 4 }}>DR</div>
      </div>
    </header>
  );
}

window.Sidebar = Sidebar;
window.Topbar = Topbar;
