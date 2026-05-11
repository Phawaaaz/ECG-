import { useState } from 'react';
import { Icons as Ic } from './Icons.jsx';
import { EcgMini } from './Ecg.jsx';
import { Sidebar, Topbar } from './Shell.jsx';
import { C } from './tokens.js';

const ROWS = [
  { mrn: '00482-913', name: 'Eleanor Morgan',  age: '64F', last: '11 May · 09:14', ecgs: 14, risk: 'med',  dx: '1° AV block · HTN',    status: 'Active',     open: true },
  { mrn: '00318-220', name: 'James Whitfield', age: '57M', last: '11 May · 08:52', ecgs: 6,  risk: 'low',  dx: 'Healthy · routine',     status: 'Active' },
  { mrn: '00591-014', name: 'Aiko Tanaka',     age: '71F', last: '11 May · 08:39', ecgs: 22, risk: 'high', dx: 'AFib · CKD III',        status: 'Inpatient' },
  { mrn: '00427-771', name: 'Marcus Ellington',age: '46M', last: '11 May · 08:21', ecgs: 4,  risk: 'med',  dx: 'Bradycardia w/u',       status: 'Active' },
  { mrn: '00611-553', name: 'Priya Shah',      age: '38F', last: '11 May · 08:02', ecgs: 2,  risk: 'low',  dx: 'Pre-op clearance',      status: 'Discharged' },
  { mrn: '00204-119', name: 'David Reyes',     age: '69M', last: '11 May · 07:48', ecgs: 18, risk: 'med',  dx: 'LVH · post-MI',        status: 'Active' },
  { mrn: '00712-446', name: 'Sofia Ng',        age: '52F', last: '10 May · 22:18', ecgs: 9,  risk: 'low',  dx: 'Anxiety w/ palpit.',    status: 'Active' },
  { mrn: '00198-005', name: 'Daniel Hofer',    age: '58M', last: '10 May · 21:02', ecgs: 11, risk: 'high', dx: 'CHF · NYHA III',        status: 'Inpatient' },
];

const OVERVIEW_FIELDS = [
  ['Primary Dx',     '1° AV block'],
  ['Comorbidities',  'HTN · CKD II'],
  ['Cardiologist',   'Dr. R. Mehta'],
  ['Next visit',     '24 May 2026'],
];

const ECG_HISTORY = [
  { ts: '11 May · 09:14', tag: '1° AV block', tagClass: 'badge-amber', cycles: 5 },
  { ts: '02 Apr · 11:08', tag: 'Sinus rhythm', tagClass: 'badge-green', cycles: 4 },
  { ts: '17 Jan · 14:32', tag: '1° AV block', tagClass: 'badge-amber', cycles: 5 },
  { ts: '04 Dec · 09:20', tag: 'Sinus rhythm', tagClass: 'badge-green', cycles: 4 },
];

const TIMELINE_EVENTS = [
  { text: 'Report #R-2841 signed by Dr. Mehta', ago: '9m',  current: true },
  { text: 'ECG #R-2841 uploaded · ED Bay 3',    ago: '14m', current: false },
  { text: 'Patient seen by Dr. Park',           ago: '32m', current: false },
  { text: 'Triaged on arrival · ED',            ago: '1h',  current: false },
];

const DRAWER_TABS = ['Overview', 'ECG history', 'Reports', 'Timeline'];

function RiskBadge({ risk }) {
  if (risk === 'high') return <span className="badge badge-red"><span className="dot" aria-hidden="true" />High</span>;
  if (risk === 'med')  return <span className="badge badge-amber"><span className="dot" aria-hidden="true" />Moderate</span>;
  return                      <span className="badge badge-green"><span className="dot" aria-hidden="true" />Low</span>;
}

function StatusBadge({ status }) {
  if (status === 'Inpatient') return <span className="badge badge-blue"><span className="dot" aria-hidden="true" />Inpatient</span>;
  return <span className="badge badge-slate"><span className="dot" aria-hidden="true" style={{ background: C.text3 }} />{status}</span>;
}

export function Patients() {
  const [drawerTab, setDrawerTab] = useState('Overview');

  return (
    <div className="screen">
      <div className="app-shell">
        <Sidebar active="patients" />
        <Topbar
          title="Patients"
          crumb={<span>Workspace · <b>Patients</b></span>}
          actions={<button type="button" className="btn btn-primary btn-sm"><Ic.Plus size={14} /> Add patient</button>}
        />
        <main className="content" aria-label="Patient directory">
          <div className="row between" style={{ marginBottom: 16 }}>
            <div>
              <h1 className="page-title">Patient directory</h1>
              <p className="page-sub" style={{ marginBottom: 0 }}>248 active · 42 with risk alerts · sorted by last ECG</p>
            </div>
            <div className="row gap-2" role="group" aria-label="View mode">
              <button type="button" className="chip" aria-pressed="false" aria-label="Grid view"><Ic.Grid size={12} /></button>
              <button type="button" className="chip active" aria-pressed="true" aria-label="List view"><Ic.List size={12} /></button>
            </div>
          </div>

          <div className="pg-2col pg-2col-mid" style={{ gap: 14 }}>
            {/* Patient table */}
            <div className="card">
              <div className="card-hd" style={{ alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div className="row gap-2" style={{ flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative' }} role="search">
                    <Ic.Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: C.text3 }} aria-hidden="true" />
                    <input
                      className="input"
                      type="search"
                      placeholder="Search name, MRN, diagnosis…"
                      aria-label="Search patients"
                      style={{ paddingLeft: 30, width: 260, padding: '7px 10px 7px 30px' }}
                    />
                  </div>
                  <button type="button" className="chip"><Ic.Filter size={12} /> Risk: All</button>
                  <button type="button" className="chip">Last 7 days</button>
                  <button type="button" className="chip">Inpatient</button>
                </div>
                <div style={{ fontSize: 12, color: C.text2 }}>1–8 of 248</div>
              </div>

              <table className="table" aria-label="Patient list">
                <thead>
                  <tr>
                    <th style={{ width: 22 }}><input type="checkbox" aria-label="Select all" /></th>
                    <th scope="col">Patient</th>
                    <th scope="col">Risk</th>
                    <th scope="col">Diagnosis</th>
                    <th scope="col">Last ECG</th>
                    <th scope="col">Records</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map(r => {
                    const initials = r.name.split(' ').map(x => x[0]).join('').slice(0, 2);
                    return (
                      <tr key={r.mrn} style={r.open ? { background: '#F8FAFF' } : {}}>
                        <td><input type="checkbox" aria-label={`Select ${r.name}`} /></td>
                        <td>
                          <div className="row gap-3">
                            <div className="avatar slate" style={{ width: 28, height: 28, fontSize: 10.5 }} aria-hidden="true">{initials}</div>
                            <div>
                              <div style={{ fontWeight: 600 }}>{r.name}</div>
                              <div style={{ fontSize: 11.5, color: C.text2 }} className="tnum">{r.age} · MRN {r.mrn}</div>
                            </div>
                          </div>
                        </td>
                        <td><RiskBadge risk={r.risk} /></td>
                        <td style={{ color: '#374151' }}>{r.dx}</td>
                        <td className="tnum"><time>{r.last}</time></td>
                        <td className="tnum">{r.ecgs}</td>
                        <td><StatusBadge status={r.status} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="row between" style={{ padding: '10px 16px', borderTop: `1px solid ${C.border2}`, fontSize: 12, color: C.text2 }}>
                <span>Showing 8 of 248</span>
                <nav aria-label="Pagination" className="row gap-2">
                  <button type="button" className="chip" aria-label="Previous page"><Ic.ChevronLeft size={12} /></button>
                  <button type="button" className="chip active" aria-current="page">1</button>
                  <button type="button" className="chip">2</button>
                  <button type="button" className="chip">3</button>
                  <span className="chip" aria-hidden="true">…</span>
                  <button type="button" className="chip">31</button>
                  <button type="button" className="chip" aria-label="Next page"><Ic.ChevronRight size={12} /></button>
                </nav>
              </div>
            </div>

            {/* Patient drawer */}
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '16px 18px', borderBottom: `1px solid ${C.border2}`, background: 'linear-gradient(180deg,#F8FAFF,#fff)' }}>
                <div className="row between">
                  <div className="row gap-3">
                    <div className="avatar" style={{ width: 42, height: 42, fontSize: 14 }} aria-hidden="true">EM</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 650 }}>Eleanor Morgan</div>
                      <div style={{ fontSize: 12, color: C.text2 }} className="tnum">64F · DOB 14 Jul 1961 · MRN 00482-913</div>
                    </div>
                  </div>
                  <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} aria-label="Close patient drawer">
                    <Ic.X size={16} color={C.text3} />
                  </button>
                </div>
                <div className="row gap-2" style={{ marginTop: 12 }}>
                  <span className="badge badge-amber"><span className="dot" aria-hidden="true" />Moderate risk</span>
                  <span className="badge badge-slate">Mercy West</span>
                  <span className="badge badge-slate">English</span>
                </div>
              </div>

              <div
                className="tabs"
                style={{ padding: '0 18px' }}
                role="tablist"
                aria-label="Patient detail tabs"
              >
                {DRAWER_TABS.map(tab => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={drawerTab === tab}
                    aria-controls={`drawer-panel-${tab.replace(/\s+/g, '-').toLowerCase()}`}
                    id={`drawer-tab-${tab.replace(/\s+/g, '-').toLowerCase()}`}
                    className={`tab${drawerTab === tab ? ' active' : ''}`}
                    onClick={() => setDrawerTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div
                role="tabpanel"
                id={`drawer-panel-${drawerTab.replace(/\s+/g, '-').toLowerCase()}`}
                aria-labelledby={`drawer-tab-${drawerTab.replace(/\s+/g, '-').toLowerCase()}`}
                style={{ padding: '14px 18px' }}
              >
                {drawerTab === 'Overview' && (
                  <>
                    <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14, margin: '0 0 14px' }}>
                      {OVERVIEW_FIELDS.map(([l, v]) => (
                        <div key={l}>
                          <dt style={{ fontSize: 10.5, color: C.text3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em' }}>{l}</dt>
                          <dd style={{ margin: 0, fontSize: 12.5, color: C.text, marginTop: 2 }}>{v}</dd>
                        </div>
                      ))}
                    </dl>

                    <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 8 }}>ECG history</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {ECG_HISTORY.map((h, i) => (
                        <li key={h.ts} className="row between" style={{ padding: '10px 0', borderTop: i === 0 ? '0' : '1px solid #F1F3F7' }}>
                          <div className="row gap-3">
                            <EcgMini width={90} height={26} cycles={h.cycles} color={C.red} label={`ECG from ${h.ts}`} />
                            <div>
                              <div style={{ fontSize: 12.5, fontWeight: 550 }} className="tnum"><time>{h.ts}</time></div>
                              <div style={{ fontSize: 11, color: C.text3 }}>Lead II · 10s</div>
                            </div>
                          </div>
                          <span className={`badge ${h.tagClass}`}><span className="dot" aria-hidden="true" />{h.tag}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {drawerTab === 'ECG history' && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {ECG_HISTORY.map((h, i) => (
                      <li key={h.ts} className="row between" style={{ padding: '12px 0', borderTop: i === 0 ? '0' : '1px solid #F1F3F7' }}>
                        <div className="row gap-3">
                          <EcgMini width={120} height={32} cycles={h.cycles} color={C.red} label={`ECG from ${h.ts}`} />
                          <div>
                            <div style={{ fontSize: 12.5, fontWeight: 550 }} className="tnum"><time>{h.ts}</time></div>
                            <div style={{ fontSize: 11, color: C.text3 }}>Lead II · 10s</div>
                          </div>
                        </div>
                        <span className={`badge ${h.tagClass}`}><span className="dot" aria-hidden="true" />{h.tag}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {drawerTab === 'Reports' && (
                  <p style={{ fontSize: 13, color: C.text2, margin: 0 }}>No additional reports to display.</p>
                )}

                {drawerTab === 'Timeline' && (
                  <ol style={{ listStyle: 'none', padding: 0, margin: 0, borderLeft: `2px solid ${C.border2}`, paddingLeft: 14, marginLeft: 6 }}>
                    {TIMELINE_EVENTS.map((ev, i) => (
                      <li key={ev.text} style={{ position: 'relative', padding: '4px 0 10px' }}>
                        <div style={{ position: 'absolute', left: -20, top: 8, width: 8, height: 8, borderRadius: '50%', background: ev.current ? C.primary : '#fff', border: `2px solid ${C.primary}` }} aria-hidden="true" />
                        <div style={{ fontSize: 12.5, color: '#374151' }}>{ev.text}</div>
                        <div className="tnum" style={{ fontSize: 11, color: C.text3 }}><time>{ev.ago} ago</time></div>
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              <div className="row gap-2" style={{ padding: '12px 18px', borderTop: `1px solid ${C.border2}` }}>
                <button type="button" className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Open chart</button>
                <button type="button" className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>New ECG</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
