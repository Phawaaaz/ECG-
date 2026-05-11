// Dashboard + Upload screens

function Dashboard() {
  const Ic = window.Icons;
  return (
    <div className="screen">
      <div className="app-shell">
        <window.Sidebar active="dashboard" />
        <window.Topbar
          title="Dashboard"
          crumb={<span>Mercy West Hospital · <b>Cardiology</b></span>}
          actions={<>
            <button className="btn btn-secondary btn-sm"><Ic.Calendar size={14} /> Today</button>
            <button className="btn btn-primary btn-sm"><Ic.Upload size={14} /> Upload ECG</button>
          </>}
        />
        <main className="content">
          {/* Greeting row */}
          <div className="row between" style={{ marginBottom: 18 }}>
            <div>
              <h1 className="page-title" style={{ marginBottom: 2 }}>Good morning, Dr. Mehta</h1>
              <div className="page-sub" style={{ marginBottom: 0 }}>You have <b style={{ color: '#111827' }}>7 ECGs</b> awaiting review and <b style={{ color: '#B91C1C' }}>2 risk alerts</b> flagged overnight.</div>
            </div>
            <div className="row gap-2">
              <span className="chip active">Today</span>
              <span className="chip">7 days</span>
              <span className="chip">30 days</span>
              <span className="chip"><Ic.Calendar size={12} /> Custom</span>
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 18 }}>
            {[
              { l: 'ECGs reviewed', v: '38', d: '+12%', icon: Ic.Activity, color: '#2563EB', bg: '#EFF6FF', sub: 'vs. last 24h' },
              { l: 'Awaiting review', v: '7', d: '–3', icon: Ic.Clock, color: '#B45309', bg: '#FFFAEB', sub: '2 marked urgent', down: false },
              { l: 'Risk alerts', v: '2', d: '+1', icon: Ic.AlertTriangle, color: '#B91C1C', bg: '#FEF2F2', sub: 'AFib · STEMI', down: true },
              { l: 'Avg. turnaround', v: '4m 18s', d: '–22%', icon: Ic.Zap, color: '#0F766E', bg: '#ECFDF5', sub: 'across 38 reports' },
            ].map((s, i) => {
              const IconC = s.icon;
              return (
                <div key={i} className="card card-pad">
                  <div className="row between" style={{ marginBottom: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: s.bg, color: s.color, display: 'grid', placeItems: 'center' }}><IconC size={17} /></div>
                    <span className={`badge ${s.down ? 'badge-red' : 'badge-green'}`} style={{ fontSize: 11 }}>{s.d}</span>
                  </div>
                  <div className="stat">
                    <div className="v tnum">{s.v}</div>
                    <div style={{ fontSize: 12.5, color: '#374151', fontWeight: 550 }}>{s.l}</div>
                    <div style={{ fontSize: 11.5, color: '#9CA3AF', marginTop: 2 }}>{s.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 14 }}>
            {/* Recent uploads */}
            <div className="card">
              <div className="card-hd">
                <div>
                  <div className="card-title">Recent ECG uploads</div>
                  <div className="card-sub">Last 24 hours</div>
                </div>
                <div className="row gap-2">
                  <span className="chip"><Ic.Filter size={12} /> All leads</span>
                  <span className="chip">View all <Ic.ChevronRight size={12} /></span>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Recorded</th>
                    <th>Lead II preview</th>
                    <th>AI finding</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { n: 'Eleanor Morgan', mrn: '00482-913', age: '64F', time: '09:14', dur: '12s ago', mini: 5, find: '1° AV block', conf: 94, status: 'review', col: '#DC2626' },
                    { n: 'James Whitfield', mrn: '00318-220', age: '57M', time: '08:52', dur: '38m ago', mini: 4, find: 'Sinus rhythm', conf: 98, status: 'normal', col: '#16A34A' },
                    { n: 'Aiko Tanaka', mrn: '00591-014', age: '71F', time: '08:39', dur: '51m ago', mini: 6, find: 'AFib · irregular', conf: 91, status: 'urgent', col: '#DC2626', irr: true },
                    { n: 'Marcus Ellington', mrn: '00427-771', age: '46M', time: '08:21', dur: '1h ago', mini: 5, find: 'Sinus brady', conf: 89, status: 'review', col: '#F59E0B' },
                    { n: 'Priya Shah', mrn: '00611-553', age: '38F', time: '08:02', dur: '1h ago', mini: 5, find: 'Sinus rhythm', conf: 97, status: 'signed', col: '#16A34A' },
                    { n: 'David Reyes', mrn: '00204-119', age: '69M', time: '07:48', dur: '1h ago', mini: 4, find: 'LVH criteria', conf: 86, status: 'review', col: '#F59E0B' },
                  ].map((r, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                          <div className="avatar slate" style={{ width: 28, height: 28, fontSize: 11 }}>{r.n.split(' ').map(x=>x[0]).join('').slice(0,2)}</div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{r.n}</div>
                            <div style={{ fontSize: 11.5, color: '#6B7280' }} className="tnum">{r.age} · MRN {r.mrn}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="tnum" style={{ fontWeight: 550 }}>{r.time}</div>
                        <div style={{ fontSize: 11, color: '#9CA3AF' }}>{r.dur}</div>
                      </td>
                      <td><window.EcgMini width={110} height={28} cycles={r.mini} color={r.col} /></td>
                      <td>
                        <div style={{ fontWeight: 550 }}>{r.find}</div>
                        <div style={{ fontSize: 11, color: '#9CA3AF' }} className="tnum">Conf. {r.conf}%</div>
                      </td>
                      <td>
                        {r.status === 'review' && <span className="badge badge-amber"><span className="dot"></span>Review</span>}
                        {r.status === 'normal' && <span className="badge badge-green"><span className="dot"></span>Normal</span>}
                        {r.status === 'urgent' && <span className="badge badge-red"><span className="dot"></span>Urgent</span>}
                        {r.status === 'signed' && <span className="badge badge-slate"><span className="dot" style={{background:'#9CA3AF'}}></span>Signed</span>}
                      </td>
                      <td style={{ textAlign: 'right' }}><Ic.ChevronRight size={14} color="#9CA3AF" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right column: Queue + Alerts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="card">
                <div className="card-hd">
                  <div className="card-title">Processing queue</div>
                  <span className="badge badge-blue"><span className="dot"></span>3 active</span>
                </div>
                <div style={{ padding: '4px 18px 16px' }}>
                  {[
                    { n: 'Batch · ED Triage (12 records)', state: 'Feature extraction', pct: 64 },
                    { n: 'Sofia Ng · MRN 00712-446', state: 'Rhythm classification', pct: 82 },
                    { n: 'Daniel Hofer · MRN 00198-005', state: 'Queued', pct: 4 },
                  ].map((q, i) => (
                    <div key={i} style={{ paddingTop: 14 }}>
                      <div className="row between" style={{ marginBottom: 6 }}>
                        <div style={{ fontSize: 13, fontWeight: 550 }}>{q.n}</div>
                        <div className="tnum" style={{ fontSize: 12, color: '#6B7280', fontWeight: 550 }}>{q.pct}%</div>
                      </div>
                      <div className="progress"><div style={{ width: `${q.pct}%`, background: q.pct < 10 ? '#9CA3AF' : 'var(--primary)' }}></div></div>
                      <div style={{ fontSize: 11.5, color: '#9CA3AF', marginTop: 5 }}>{q.state}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div className="card-hd">
                  <div className="card-title">Risk alerts</div>
                  <a style={{ fontSize: 12, color: '#2563EB', fontWeight: 550 }}>View all</a>
                </div>
                <div style={{ padding: '6px 0' }}>
                  {[
                    { n: 'Aiko Tanaka · 71F', f: 'Atrial fibrillation · rapid ventricular response', t: '08:39', sev: 'high' },
                    { n: 'Marcus Ellington · 46M', f: 'Sinus bradycardia · HR 42 bpm', t: '08:21', sev: 'med' },
                  ].map((a, i) => (
                    <div key={i} style={{ padding: '12px 18px', borderTop: i === 0 ? '0' : '1px solid #EEF0F4', display: 'flex', gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 9, background: a.sev === 'high' ? '#FEF2F2' : '#FFFAEB', color: a.sev === 'high' ? '#B91C1C' : '#B45309', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                        <Ic.AlertTriangle size={16} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{a.n}</div>
                        <div style={{ fontSize: 12, color: '#6B7280' }}>{a.f}</div>
                        <div style={{ fontSize: 11.5, color: '#9CA3AF', marginTop: 4 }} className="tnum">{a.t} · auto-flagged</div>
                      </div>
                      <button className="btn btn-secondary btn-sm">Open</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Activity feed + Throughput */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 14, marginTop: 14 }}>
            <div className="card">
              <div className="card-hd">
                <div className="card-title">Throughput · last 14 days</div>
                <div className="row gap-3" style={{ fontSize: 11.5, color: '#6B7280' }}>
                  <div className="row gap-2"><span style={{ width: 8, height: 8, borderRadius: 2, background: '#2563EB' }}></span>Reviewed</div>
                  <div className="row gap-2"><span style={{ width: 8, height: 8, borderRadius: 2, background: '#DBEAFE' }}></span>Uploaded</div>
                </div>
              </div>
              <div style={{ padding: 18 }}>
                <Bars />
              </div>
            </div>

            <div className="card">
              <div className="card-hd">
                <div className="card-title">Activity</div>
                <a style={{ fontSize: 12, color: '#2563EB', fontWeight: 550 }}>Full log</a>
              </div>
              <div style={{ padding: '12px 18px 14px' }}>
                {[
                  { who: 'Dr. Mehta', what: 'signed report', tgt: '#R-2841 · E. Morgan', t: 'just now', i: 'Check', c: '#16A34A' },
                  { who: 'AI', what: 'flagged AFib in', tgt: 'A. Tanaka · MRN 00591-014', t: '6m', i: 'AlertTriangle', c: '#DC2626' },
                  { who: 'Dr. Park', what: 'added clinician note to', tgt: '#R-2839 · J. Whitfield', t: '14m', i: 'Edit', c: '#2563EB' },
                  { who: 'System', what: 'imported 12 ECGs from', tgt: 'MUSE — ED bay 3', t: '32m', i: 'Database', c: '#6B7280' },
                  { who: 'Dr. Mehta', what: 'opened patient chart', tgt: 'D. Reyes · MRN 00204-119', t: '48m', i: 'Users', c: '#6B7280' },
                ].map((a, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '24px 1fr auto', gap: 12, padding: '7px 0', alignItems: 'flex-start' }}>
                    <div style={{ width: 24, height: 24, borderRadius: 50, background: '#F3F4F6', display: 'grid', placeItems: 'center', color: a.c }}>
                      {React.createElement(Ic[a.i], { size: 12 })}
                    </div>
                    <div style={{ fontSize: 12.5, color: '#374151', lineHeight: 1.5 }}>
                      <b style={{ color: '#111827' }}>{a.who}</b> {a.what} <span style={{ color: '#6B7280' }}>{a.tgt}</span>
                    </div>
                    <div className="tnum" style={{ fontSize: 11, color: '#9CA3AF' }}>{a.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Bars() {
  const data = [22,18,26,30,24,32,28,34,30,38,36,42,40,38];
  const data2 = [28,24,32,35,30,38,34,40,38,46,44,52,50,48];
  const max = 60;
  return (
    <svg width="100%" viewBox="0 0 700 180" preserveAspectRatio="none" style={{ display: 'block' }}>
      {[0,1,2,3,4].map(i => <line key={i} x1="36" x2="700" y1={(i*36)+6} y2={(i*36)+6} stroke="#F1F3F7" />)}
      {[60,45,30,15,0].map((v,i)=> <text key={v} x="0" y={(i*36)+10} fill="#9CA3AF" fontSize="10" fontFamily="ui-monospace, monospace">{v}</text>)}
      {data.map((v,i)=>{
        const w = 28, gap = 18, x = 50 + i*(w+gap);
        const h2 = (data2[i]/max)*150, h1 = (v/max)*150;
        return (
          <g key={i}>
            <rect x={x} y={156 - h2} width={w} height={h2} fill="#DBEAFE" rx="3" />
            <rect x={x} y={156 - h1} width={w} height={h1} fill="#2563EB" rx="3" />
            <text x={x + w/2} y="172" textAnchor="middle" fontSize="10" fill="#9CA3AF">{`${i+1}`}</text>
          </g>
        );
      })}
    </svg>
  );
}

function Upload() {
  const Ic = window.Icons;
  return (
    <div className="screen">
      <div className="app-shell">
        <window.Sidebar active="upload" />
        <window.Topbar
          title="Upload ECG"
          crumb={<span>Workspace · <b>Upload</b></span>}
          actions={<button className="btn btn-secondary btn-sm"><Ic.RefreshCw size={14} /> Sync from MUSE</button>}
        />
        <main className="content">
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 18 }}>
            <div>
              <h1 className="page-title">Upload ECG recordings</h1>
              <p className="page-sub">Drop one or more files, or sync directly from an integrated acquisition device. Files are validated, de-identified per policy, and queued for analysis.</p>

              <div className="dropzone" style={{ padding: '48px 28px', position: 'relative' }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: '#fff', boxShadow: '0 2px 6px rgba(37,99,235,.12)', display: 'grid', placeItems: 'center', margin: '0 auto 14px', color: '#2563EB' }}>
                  <Ic.Upload size={24} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Drag & drop ECG files here</div>
                <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>or click to browse from your computer</div>
                <button className="btn btn-primary">Select files</button>
                <div style={{ marginTop: 20, display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {['CSV','XLSX','XML','EDF','SCP-ECG','DICOM-ECG','MUSE XML'].map(t => <span key={t} className="badge badge-outline" style={{ fontWeight: 500 }}>{t}</span>)}
                </div>
                <div style={{ fontSize: 11.5, color: '#9CA3AF', marginTop: 14 }}>Up to 250 MB per file · 50 files per batch · 12-lead recordings only</div>
              </div>

              {/* File rows */}
              <div className="card" style={{ marginTop: 18 }}>
                <div className="card-hd">
                  <div className="card-title">In this batch · 4 files</div>
                  <div className="row gap-2">
                    <span className="badge badge-green"><Ic.Check size={11} /> 3 validated</span>
                    <span className="badge badge-amber"><span className="dot"></span>1 needs attention</span>
                  </div>
                </div>
                <div>
                  {[
                    { n: 'morgan_eleonor_20260511_0914.xml', size: '1.4 MB', state: 'validated', meta: '12-lead · 10s · Lead II detected', icon: 'FileText' },
                    { n: 'whitfield_james_20260511_0852.csv', size: '684 KB', state: 'uploading', pct: 72, meta: 'Encoding utf-8 · 5000 Hz', icon: 'FileText' },
                    { n: 'tanaka_aiko_20260511_0839.edf', size: '3.2 MB', state: 'validated', meta: '12-lead · 30s · MUSE export', icon: 'FileText' },
                    { n: 'hofer_d_unknown.csv', size: '212 KB', state: 'error', meta: 'Missing patient MRN field · review headers', icon: 'FileText' },
                  ].map((f, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '36px 1fr auto', gap: 14, padding: '14px 18px', borderTop: i === 0 ? '0' : '1px solid #EEF0F4', alignItems: 'center' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#F3F4F6', display: 'grid', placeItems: 'center', color: '#6B7280' }}>
                        <Ic.FileText size={16} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div className="row between" style={{ marginBottom: 3 }}>
                          <div style={{ fontWeight: 600, fontSize: 13.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.n}</div>
                          <div className="tnum" style={{ fontSize: 11.5, color: '#9CA3AF', marginLeft: 10 }}>{f.size}</div>
                        </div>
                        {f.state === 'uploading' && (<>
                          <div className="progress"><div style={{ width: `${f.pct}%` }}></div></div>
                          <div style={{ fontSize: 11.5, color: '#6B7280', marginTop: 5 }}>Uploading · {f.pct}% · {f.meta}</div>
                        </>)}
                        {f.state === 'validated' && <div style={{ fontSize: 11.5, color: '#6B7280' }}>{f.meta}</div>}
                        {f.state === 'error' && <div style={{ fontSize: 11.5, color: '#B91C1C' }}>{f.meta}</div>}
                      </div>
                      <div>
                        {f.state === 'validated' && <span className="badge badge-green"><Ic.Check size={11} /> Validated</span>}
                        {f.state === 'uploading' && <span className="badge badge-blue"><span className="dot"></span>Uploading</span>}
                        {f.state === 'error' && <span className="badge badge-red"><Ic.AlertTriangle size={11} /> Action needed</span>}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '12px 18px', borderTop: '1px solid #EEF0F4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>3 ready to process · 1 needs review</div>
                  <div className="row gap-2">
                    <button className="btn btn-ghost btn-sm">Cancel</button>
                    <button className="btn btn-primary btn-sm">Process 3 records <Ic.ArrowRight size={13} /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="card card-pad">
                <div className="row gap-3" style={{ marginBottom: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#ECFDF5', color: '#0F766E', display: 'grid', placeItems: 'center' }}><Ic.ShieldCheck size={16} /></div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>De-identification policy</div>
                </div>
                <div style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.55, marginBottom: 12 }}>Patient identifiers are stripped before files leave your network. Mapping is held in your hospital's keystore.</div>
                <div className="row gap-2"><span className="chip active">PHI redacted</span><span className="chip">PHI passthrough</span></div>
              </div>

              <div className="card">
                <div className="card-hd"><div className="card-title">Batch settings</div></div>
                <div style={{ padding: '14px 18px' }}>
                  <Field label="Acquisition site" value="Mercy West · ED Bay 3" />
                  <Field label="Sampling rate" value="500 Hz" />
                  <Field label="Lead configuration" value="Standard 12-lead" />
                  <Field label="Assign reviewer" value="Dr. Riya Mehta (you)" />
                  <Field label="Priority" value="Standard" />
                </div>
              </div>

              <div className="card card-pad">
                <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>Recent batches</div>
                {[
                  ['ED · overnight','12 records','3:14 AM','#16A34A'],
                  ['Outpatient · Mon','38 records','Mon','#16A34A'],
                  ['ICU · weekly','6 records','Sun','#16A34A'],
                ].map(([n,r,t,c],i)=>(
                  <div key={i} className="row between" style={{ padding: '8px 0', borderTop: i === 0 ? '0' : '1px solid #F1F3F7' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 550 }}>{n}</div>
                      <div style={{ fontSize: 11.5, color: '#9CA3AF' }}>{r}</div>
                    </div>
                    <div className="row gap-2">
                      <span style={{ fontSize: 11.5, color: '#9CA3AF' }} className="tnum">{t}</span>
                      <Ic.Check size={14} color={c} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', padding: '7px 0', borderBottom: '1px dashed #F1F3F7', fontSize: 12.5 }}>
      <span style={{ color: '#6B7280' }}>{label}</span>
      <span style={{ color: '#111827', fontWeight: 500 }}>{value} <window.Icons.ChevronDown size={11} style={{ verticalAlign: 'middle', marginLeft: 4, color: '#9CA3AF' }} /></span>
    </div>
  );
}

window.Dashboard = Dashboard;
window.Upload = Upload;
