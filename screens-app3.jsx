// Patients + Report screens
function Patients() {
  const Ic = window.Icons;
  const rows = [
    { id: 1, n: 'Eleanor Morgan', age: '64F', mrn: '00482-913', last: '11 May · 09:14', n_ecgs: 14, risk: 'med', dx: '1° AV block · HTN', status: 'Active', open: true },
    { id: 2, n: 'James Whitfield', age: '57M', mrn: '00318-220', last: '11 May · 08:52', n_ecgs: 6, risk: 'low', dx: 'Healthy · routine', status: 'Active' },
    { id: 3, n: 'Aiko Tanaka', age: '71F', mrn: '00591-014', last: '11 May · 08:39', n_ecgs: 22, risk: 'high', dx: 'AFib · CKD III', status: 'Inpatient' },
    { id: 4, n: 'Marcus Ellington', age: '46M', mrn: '00427-771', last: '11 May · 08:21', n_ecgs: 4, risk: 'med', dx: 'Bradycardia w/u', status: 'Active' },
    { id: 5, n: 'Priya Shah', age: '38F', mrn: '00611-553', last: '11 May · 08:02', n_ecgs: 2, risk: 'low', dx: 'Pre-op clearance', status: 'Discharged' },
    { id: 6, n: 'David Reyes', age: '69M', mrn: '00204-119', last: '11 May · 07:48', n_ecgs: 18, risk: 'med', dx: 'LVH · post-MI', status: 'Active' },
    { id: 7, n: 'Sofia Ng', age: '52F', mrn: '00712-446', last: '10 May · 22:18', n_ecgs: 9, risk: 'low', dx: 'Anxiety w/ palpit.', status: 'Active' },
    { id: 8, n: 'Daniel Hofer', age: '58M', mrn: '00198-005', last: '10 May · 21:02', n_ecgs: 11, risk: 'high', dx: 'CHF · NYHA III', status: 'Inpatient' },
  ];

  const RiskBadge = ({ r }) => r === 'high' ? <span className="badge badge-red"><span className="dot"></span>High</span> :
    r === 'med' ? <span className="badge badge-amber"><span className="dot"></span>Moderate</span> :
    <span className="badge badge-green"><span className="dot"></span>Low</span>;

  return (
    <div className="screen">
      <div className="app-shell">
        <window.Sidebar active="patients" />
        <window.Topbar
          title="Patients"
          crumb={<span>Workspace · <b>Patients</b></span>}
          actions={<button className="btn btn-primary btn-sm"><Ic.Plus size={14} /> Add patient</button>}
        />
        <main className="content">
          <div className="row between" style={{ marginBottom: 16 }}>
            <div>
              <h1 className="page-title">Patient directory</h1>
              <p className="page-sub" style={{ marginBottom: 0 }}>248 active · 42 with risk alerts · sorted by last ECG</p>
            </div>
            <div className="row gap-2">
              <span className="chip"><Ic.Grid size={12} /></span>
              <span className="chip active"><Ic.List size={12} /></span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 14 }}>
            {/* Table */}
            <div className="card">
              <div className="card-hd" style={{ alignItems: 'center' }}>
                <div className="row gap-2">
                  <div style={{ position: 'relative' }}>
                    <Ic.Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input className="input" placeholder="Search name, MRN, diagnosis…" style={{ paddingLeft: 30, width: 260, padding: '7px 10px 7px 30px' }} />
                  </div>
                  <span className="chip"><Ic.Filter size={12} /> Risk: All</span>
                  <span className="chip">Last 7 days</span>
                  <span className="chip">Inpatient</span>
                </div>
                <div className="row gap-2">
                  <span style={{ fontSize: 12, color: '#6B7280' }}>1–8 of 248</span>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: 22 }}><input type="checkbox" /></th>
                    <th>Patient</th>
                    <th>Risk</th>
                    <th>Diagnosis</th>
                    <th>Last ECG</th>
                    <th>Records</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => (
                    <tr key={r.id} style={r.open ? { background: '#F8FAFF' } : {}}>
                      <td><input type="checkbox" /></td>
                      <td>
                        <div className="row gap-3">
                          <div className="avatar slate" style={{ width: 28, height: 28, fontSize: 10.5 }}>{r.n.split(' ').map(x=>x[0]).join('').slice(0,2)}</div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{r.n}</div>
                            <div style={{ fontSize: 11.5, color: '#6B7280' }} className="tnum">{r.age} · MRN {r.mrn}</div>
                          </div>
                        </div>
                      </td>
                      <td><RiskBadge r={r.risk} /></td>
                      <td style={{ color: '#374151' }}>{r.dx}</td>
                      <td className="tnum">{r.last}</td>
                      <td className="tnum">{r.n_ecgs}</td>
                      <td>
                        {r.status === 'Inpatient' && <span className="badge badge-blue"><span className="dot"></span>Inpatient</span>}
                        {r.status === 'Active' && <span className="badge badge-slate"><span className="dot" style={{background:'#9CA3AF'}}></span>Active</span>}
                        {r.status === 'Discharged' && <span className="badge badge-slate"><span className="dot" style={{background:'#9CA3AF'}}></span>Discharged</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="row between" style={{ padding: '10px 16px', borderTop: '1px solid #EEF0F4', fontSize: 12, color: '#6B7280' }}>
                <span>Showing 8 of 248</span>
                <div className="row gap-2">
                  <span className="chip"><Ic.ChevronLeft size={12} /></span>
                  <span className="chip active">1</span>
                  <span className="chip">2</span>
                  <span className="chip">3</span>
                  <span className="chip">…</span>
                  <span className="chip">31</span>
                  <span className="chip"><Ic.ChevronRight size={12} /></span>
                </div>
              </div>
            </div>

            {/* Drawer */}
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '16px 18px', borderBottom: '1px solid #EEF0F4', background: 'linear-gradient(180deg,#F8FAFF,#fff)' }}>
                <div className="row between">
                  <div className="row gap-3">
                    <div className="avatar" style={{ width: 42, height: 42, fontSize: 14 }}>EM</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 650 }}>Eleanor Morgan</div>
                      <div style={{ fontSize: 12, color: '#6B7280' }} className="tnum">64F · DOB 14 Jul 1961 · MRN 00482-913</div>
                    </div>
                  </div>
                  <Ic.X size={16} color="#9CA3AF" />
                </div>
                <div className="row gap-2" style={{ marginTop: 12 }}>
                  <span className="badge badge-amber"><span className="dot"></span>Moderate risk</span>
                  <span className="badge badge-slate">Mercy West</span>
                  <span className="badge badge-slate">English</span>
                </div>
              </div>

              <div className="tabs" style={{ padding: '0 18px' }}>
                <div className="tab active">Overview</div>
                <div className="tab">ECG history</div>
                <div className="tab">Reports</div>
                <div className="tab">Timeline</div>
              </div>

              <div style={{ padding: '14px 18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                  {[
                    ['Primary Dx','1° AV block'],['Comorbidities','HTN · CKD II'],
                    ['Cardiologist','Dr. R. Mehta'],['Next visit','24 May 2026'],
                  ].map(([l,v])=>(
                    <div key={l}>
                      <div style={{ fontSize: 10.5, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em' }}>{l}</div>
                      <div style={{ fontSize: 12.5, color: '#111827', marginTop: 2 }}>{v}</div>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 8 }}>ECG history</div>
                {[
                  { t: '11 May · 09:14', tag: '1° AV block', tagC: 'badge-amber', cycles: 5 },
                  { t: '02 Apr · 11:08', tag: 'Sinus rhythm', tagC: 'badge-green', cycles: 4 },
                  { t: '17 Jan · 14:32', tag: '1° AV block', tagC: 'badge-amber', cycles: 5 },
                  { t: '04 Dec · 09:20', tag: 'Sinus rhythm', tagC: 'badge-green', cycles: 4 },
                ].map((h,i)=>(
                  <div key={i} className="row between" style={{ padding: '10px 0', borderTop: i === 0 ? '0' : '1px solid #F1F3F7' }}>
                    <div className="row gap-3">
                      <window.EcgMini width={90} height={26} cycles={h.cycles} color="#DC2626" />
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 550 }} className="tnum">{h.t}</div>
                        <div style={{ fontSize: 11, color: '#9CA3AF' }}>Lead II · 10s</div>
                      </div>
                    </div>
                    <span className={`badge ${h.tagC}`}><span className="dot"></span>{h.tag}</span>
                  </div>
                ))}

                <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', margin: '16px 0 8px' }}>Timeline</div>
                <div style={{ borderLeft: '2px solid #EEF0F4', paddingLeft: 14, marginLeft: 6 }}>
                  {[
                    ['Report #R-2841 signed by Dr. Mehta', '9m'],
                    ['ECG #R-2841 uploaded · ED Bay 3', '14m'],
                    ['Patient seen by Dr. Park', '32m'],
                    ['Triaged on arrival · ED', '1h'],
                  ].map(([t,ts],i)=>(
                    <div key={i} style={{ position: 'relative', padding: '4px 0 10px' }}>
                      <div style={{ position: 'absolute', left: -20, top: 8, width: 8, height: 8, borderRadius: 50, background: i===0?'#2563EB':'#fff', border: '2px solid #2563EB' }}></div>
                      <div style={{ fontSize: 12.5, color: '#374151' }}>{t}</div>
                      <div className="tnum" style={{ fontSize: 11, color: '#9CA3AF' }}>{ts} ago</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="row gap-2" style={{ padding: '12px 18px', borderTop: '1px solid #EEF0F4' }}>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Open chart</button>
                <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>New ECG</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Report() {
  const Ic = window.Icons;
  return (
    <div className="screen">
      <div className="app-shell">
        <window.Sidebar active="reports" />
        <window.Topbar
          title="Export report · #R-2841"
          crumb={<span>Reports · <b>R-2841 · Morgan, E.</b></span>}
          actions={<>
            <button className="btn btn-secondary btn-sm"><Ic.Printer size={13} /> Print</button>
            <button className="btn btn-primary btn-sm"><Ic.Download size={13} /> Download PDF</button>
          </>}
        />
        <main className="content" style={{ background: '#EEF1F5' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18 }}>
            {/* PDF preview */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 720, background: '#fff', boxShadow: '0 8px 30px -8px rgba(15,23,42,.18)', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                {/* Page */}
                <div style={{ padding: '28px 36px' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #111827', paddingBottom: 14, marginBottom: 18 }}>
                    <div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div style={{ width: 30, height: 30, borderRadius: 6, background: '#2563EB', display: 'grid', placeItems: 'center' }}>
                          <Ic.Heart size={16} color="#fff" />
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.005em' }}>Mercy West Hospital</div>
                          <div style={{ fontSize: 10.5, color: '#6B7280' }}>Department of Cardiology · 14 Westbridge Ave, Portland OR</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#2563EB', letterSpacing: '.05em', textTransform: 'uppercase' }}>ECG Clinical Report</div>
                      <div className="tnum" style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>Report #R-2841 · v1</div>
                    </div>
                  </div>

                  {/* Patient block */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: '10px 0 14px', borderBottom: '1px solid #E5E7EB', marginBottom: 14, fontSize: 11 }}>
                    {[
                      ['Patient','Eleanor Morgan'],
                      ['MRN','00482-913'],
                      ['DOB / Age / Sex','14 Jul 1961 · 64 · F'],
                      ['Recorded','11 May 2026 · 09:14'],
                      ['Encounter','ED · Bay 3 · MUSE NX'],
                      ['Indication','Palpitations'],
                      ['Ordering MD','Dr. K. Park'],
                      ['Reviewing MD','Dr. R. Mehta, MD'],
                      ['Status','Awaiting signature'],
                    ].map(([l,v])=>(
                      <div key={l}>
                        <div style={{ fontSize: 9.5, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 600 }}>{l}</div>
                        <div style={{ fontSize: 11, color: '#111827', marginTop: 2, fontWeight: 500 }}>{v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Measurements + Interpretation row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 16, marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 10.5, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 700, marginBottom: 6 }}>Measurements</div>
                      <table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse' }}>
                        <tbody>
                          {[['Heart rate','78 bpm','60–100'],['PR interval','204 ms ⚑','120–200'],['QRS duration','92 ms','70–110'],['QT / QTc','384 / 438 ms','<440'],['P axis','+62°','+45–75'],['QRS axis','+38°','–30 to +90']].map(([a,b,c])=>(
                            <tr key={a}>
                              <td style={{ padding: '4px 0', color: '#374151' }}>{a}</td>
                              <td style={{ padding: '4px 0', fontWeight: 600, textAlign: 'right' }} className="tnum">{b}</td>
                              <td style={{ padding: '4px 0', color: '#9CA3AF', textAlign: 'right', paddingLeft: 8 }} className="tnum">{c}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <div style={{ fontSize: 10.5, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 700, marginBottom: 6 }}>Interpretation</div>
                      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Sinus rhythm with first-degree AV block.</div>
                      <div style={{ fontSize: 11, color: '#374151', lineHeight: 1.55 }}>
                        Regular sinus rhythm at 78 bpm. PR interval prolonged at 204 ms consistent with first-degree AV block. QRS duration and axis within normal limits. No ST-segment elevation or depression. T-wave morphology preserved. No criteria for chamber hypertrophy.
                      </div>
                    </div>
                  </div>

                  {/* ECG strip */}
                  <div style={{ fontSize: 10.5, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 700, marginBottom: 6 }}>12-Lead Recording · 25 mm/s · 10 mm/mV</div>
                  <div style={{ border: '1px solid #E5E7EB', borderRadius: 4, overflow: 'hidden' }}>
                    <window.EcgMultiLead width={648} leadHeight={76} leads={['Lead I','Lead II','Lead V1']} />
                  </div>

                  {/* Notes */}
                  <div style={{ marginTop: 14 }}>
                    <div style={{ fontSize: 10.5, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 700, marginBottom: 6 }}>Clinician notes</div>
                    <div style={{ fontSize: 11, color: '#374151', lineHeight: 1.55, padding: '8px 10px', background: '#FAFBFD', borderLeft: '3px solid #2563EB', borderRadius: 3 }}>
                      Findings consistent with 1° AV block — likely chronic given baseline ECG from January 2023. Continue current medication list; no urgent intervention indicated. Follow-up in 6 weeks with repeat ECG.
                    </div>
                  </div>

                  {/* Signature */}
                  <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
                    <div>
                      <div style={{ fontSize: 10.5, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 600, marginBottom: 28 }}>Reviewed by</div>
                      <div style={{ fontFamily: '"Brush Script MT", "Lucida Handwriting", cursive', fontSize: 22, color: '#1D4ED8', borderBottom: '1px solid #111827', paddingBottom: 4 }}>R. Mehta</div>
                      <div style={{ fontSize: 11, color: '#111827', fontWeight: 600, marginTop: 6 }}>Dr. Riya Mehta, MD</div>
                      <div style={{ fontSize: 10.5, color: '#6B7280' }}>Board-certified Cardiologist · NPI 1497-2308</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10.5, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 600, marginBottom: 6 }}>Audit</div>
                      <div style={{ fontSize: 11, color: '#374151', lineHeight: 1.7 }}>
                        Generated <b>11 May 2026 · 09:18 PDT</b><br/>
                        AI engine: cardio-rnn v3.2 (510(k) K231084)<br/>
                        Report hash: <span className="tnum">a4e1·b8c2·9d34</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div style={{ marginTop: 22, paddingTop: 10, borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', fontSize: 9.5, color: '#9CA3AF' }}>
                    <span>CardioEcg Clinical Platform · This report is for use by licensed clinicians.</span>
                    <span className="tnum">Page 1 of 2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Export panel */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="card card-pad">
                <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 4 }}>Export options</div>
                <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 14 }}>Configure how this report is delivered.</div>

                <label className="label">Format</label>
                <div className="row gap-2" style={{ marginBottom: 14 }}>
                  <span className="chip active">PDF</span>
                  <span className="chip">DICOM SR</span>
                  <span className="chip">HL7 FHIR</span>
                </div>

                <label className="label">Template</label>
                <div className="input" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, cursor: 'pointer' }}>
                  <span>Mercy West · Cardiology v2.4</span>
                  <Ic.ChevronDown size={14} color="#9CA3AF" />
                </div>

                <label className="label">Include sections</label>
                {[
                  ['Patient demographics', true],
                  ['Measurements & intervals', true],
                  ['AI interpretation summary', true],
                  ['12-lead waveform', true],
                  ['Clinician notes', true],
                  ['Comparison to prior ECG', false],
                  ['Audit trail', true],
                ].map(([l, on], i) => (
                  <label key={l} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '5px 0', fontSize: 12.5, color: '#374151' }}>
                    <input type="checkbox" defaultChecked={on} /> {l}
                  </label>
                ))}
              </div>

              <div className="card card-pad">
                <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 12 }}>Send to</div>
                {[
                  ['Epic EHR · Mercy West', 'Auto-attach to encounter', 'Connected', 'green'],
                  ['Dr. K. Park (ordering)', 'k.park@mercywest.health', 'Secure email', 'blue'],
                  ['Patient portal', 'opt-in required', 'Off', 'slate'],
                ].map(([n, sub, s, c], i)=>(
                  <div key={i} className="row between" style={{ padding: '8px 0', borderTop: i === 0 ? '0' : '1px solid #F1F3F7' }}>
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 550 }}>{n}</div>
                      <div style={{ fontSize: 11, color: '#9CA3AF' }}>{sub}</div>
                    </div>
                    <span className={`badge badge-${c}`}>{s}</span>
                  </div>
                ))}
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}><Ic.Send size={13} /> Sign & deliver</button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

window.Patients = Patients;
window.Report = Report;
