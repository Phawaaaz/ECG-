import { Icons as Ic } from './Icons.jsx';
import { Sidebar, Topbar } from './Shell.jsx';
import { C } from './tokens.js';

const PROFILE_FIELDS = [
  { label: 'Full name', value: 'Dr. Riya Mehta' },
  { label: 'Email', value: 'r.mehta@mercywest.health' },
  { label: 'Hospital', value: 'Lagos University Teaching Hospital (LUTH)' },
  { label: 'Department', value: 'Cardiology' },
  { label: 'Role', value: 'Cardiologist' },
  { label: 'NPI / License', value: 'NPI 1497-2308 · MCN 2025-4412' },
];

const PREFERENCES = [
  { label: 'Email notifications', desc: 'Receive alerts for urgent findings via email', on: true },
  { label: 'SMS alerts', desc: 'Text message for critical risk alerts', on: true },
  { label: 'Weekly digest', desc: 'Summary of reviewed ECGs sent every Monday', on: false },
  { label: 'Auto-sign normal ECGs', desc: 'Automatically sign reports with Normal findings', on: false },
];

const SECURITY = [
  { label: 'Two-factor authentication', desc: 'Authenticator app or SMS code on login', on: true },
  { label: 'Session timeout', desc: 'Auto-logout after 30 minutes of inactivity', on: true },
  { label: 'Login notifications', desc: 'Email when a new device logs into your account', on: true },
];

export function Settings() {
  return (
    <div className="screen">
      <div className="app-shell">
        <Sidebar active="settings" />
        <Topbar
          title="Settings"
          crumb={<span>Account · <b>Settings</b></span>}
          actions={<button type="button" className="btn btn-primary btn-sm"><Ic.Check size={13} /> Save changes</button>}
        />
        <main className="content" aria-label="Account settings">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <div>
              <h1 className="page-title">Profile</h1>
              <p className="page-sub">Manage your personal information and account preferences.</p>

              <div className="card" style={{ marginBottom: 18 }}>
                <div className="card-hd">
                  <div className="card-title">Personal information</div>
                </div>
                <div style={{ padding: '16px 18px' }}>
                  <div className="row gap-4" style={{ marginBottom: 18 }}>
                    <div className="avatar" style={{ width: 56, height: 56, fontSize: 20 }} aria-hidden="true">RM</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 16 }}>Dr. Riya Mehta</div>
                      <div style={{ fontSize: 13, color: C.text2 }}>Cardiologist · LUTH</div>
                      <button type="button" style={{ background: 'none', border: 'none', color: C.primary, cursor: 'pointer', padding: 0, fontSize: 12.5, fontWeight: 550, fontFamily: 'inherit', marginTop: 4 }}>
                        Change photo
                      </button>
                    </div>
                  </div>
                  <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px', margin: 0 }}>
                    {PROFILE_FIELDS.map(f => (
                      <div key={f.label}>
                        <dt style={{ fontSize: 11, color: C.text3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em' }}>{f.label}</dt>
                        <dd style={{ margin: '2px 0 0', fontSize: 13, fontWeight: 500 }}>{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="card">
                <div className="card-hd"><div className="card-title">Security</div></div>
                <ul style={{ listStyle: 'none', padding: '8px 18px', margin: 0 }}>
                  {SECURITY.map((s, i) => (
                    <li key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${C.border2}` }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 550 }}>{s.label}</div>
                        <div style={{ fontSize: 11.5, color: C.text2 }}>{s.desc}</div>
                      </div>
                      <label style={{ position: 'relative', width: 38, height: 22, cursor: 'pointer' }} aria-label={`${s.label}: ${s.on ? 'enabled' : 'disabled'}`}>
                        <input type="checkbox" defaultChecked={s.on} style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{
                          position: 'absolute', inset: 0, borderRadius: 11, transition: '.2s',
                          background: s.on ? C.primary : '#E5E7EB',
                        }}>
                          <span style={{
                            position: 'absolute', top: 2, left: s.on ? 18 : 2, width: 18, height: 18,
                            borderRadius: '50%', background: '#fff', transition: '.2s', boxShadow: '0 1px 2px rgba(0,0,0,.1)',
                          }} />
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h1 className="page-title" style={{ visibility: 'hidden' }}>Placeholder</h1>
              <p className="page-sub" style={{ visibility: 'hidden' }}>Placeholder</p>

              <div className="card" style={{ marginBottom: 18 }}>
                <div className="card-hd"><div className="card-title">Notifications</div></div>
                <ul style={{ listStyle: 'none', padding: '8px 18px', margin: 0 }}>
                  {PREFERENCES.map((p, i) => (
                    <li key={p.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: i === 0 ? 'none' : `1px solid ${C.border2}` }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 550 }}>{p.label}</div>
                        <div style={{ fontSize: 11.5, color: C.text2 }}>{p.desc}</div>
                      </div>
                      <label style={{ position: 'relative', width: 38, height: 22, cursor: 'pointer' }} aria-label={`${p.label}: ${p.on ? 'enabled' : 'disabled'}`}>
                        <input type="checkbox" defaultChecked={p.on} style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{
                          position: 'absolute', inset: 0, borderRadius: 11, transition: '.2s',
                          background: p.on ? C.primary : '#E5E7EB',
                        }}>
                          <span style={{
                            position: 'absolute', top: 2, left: p.on ? 18 : 2, width: 18, height: 18,
                            borderRadius: '50%', background: '#fff', transition: '.2s', boxShadow: '0 1px 2px rgba(0,0,0,.1)',
                          }} />
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card card-pad">
                <div className="row gap-3">
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: C.red50, color: C.red, display: 'grid', placeItems: 'center' }} aria-hidden="true"><Ic.AlertTriangle size={17} /></div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>Danger zone</div>
                    <div style={{ fontSize: 12, color: C.text2 }}>Irreversible account actions</div>
                  </div>
                </div>
                <p style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.55, margin: '12px 0' }}>
                  Deactivating your account removes your access immediately. Reports you've signed remain in the audit trail.
                </p>
                <button type="button" className="btn btn-danger btn-sm">Deactivate account</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
