// Processing + Result screens
function Processing() {
  const Ic = window.Icons;
  const steps = [
    { t: 'Upload validated', s: 'done', d: '4 files · 8.7 MB · de-identified', ts: '09:14:02' },
    { t: 'Signal preprocessing', s: 'done', d: 'Bandpass 0.5–40 Hz · powerline notch · baseline correction', ts: '09:14:05' },
    { t: 'Lead detection & QRS', s: 'done', d: '12 leads confirmed · 14 QRS complexes detected', ts: '09:14:07' },
    { t: 'Feature extraction', s: 'active', d: 'PR, QRS, QT/QTc, axis, ST measurements', ts: 'running · 38%', pct: 38 },
    { t: 'Rhythm classification', s: 'pending', d: 'Beat-level + rhythm classifier · 24 classes', ts: 'queued' },
    { t: 'Report generation', s: 'pending', d: 'Structured report · awaiting clinician review', ts: 'queued' },
  ];
  return (
    <div className="screen">
      <div className="app-shell">
        <window.Sidebar active="queue" />
        <window.Topbar
          title="Processing · Batch #B-1429"
          crumb={<span>Workspace · Upload · <b>Processing</b></span>}
          actions={<button className="btn btn-secondary btn-sm"><Ic.X size={13} /> Cancel batch</button>}
        />
        <main className="content">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 18 }}>
            <div className="card">
              <div className="card-hd">
                <div>
                  <div className="card-title">Pipeline · 4 records</div>
                  <div className="card-sub">Started 09:14:02 · est. completion 09:14:31</div>
                </div>
                <span className="badge badge-blue"><span className="dot"></span>Running</span>
              </div>
              <div style={{ padding: '20px 22px 8px' }}>
                <div className="stepper">
                  {steps.map((s, i) => (
                    <div key={i} className={`step ${s.s === 'done' ? 'done' : s.s === 'active' ? 'active' : ''}`}>
                      <div className="marker">{s.s === 'done' ? <Ic.Check size={13} /> : i + 1}</div>
                      <div>
                        <h4>{s.t}</h4>
                        <p>{s.d}</p>
                        {s.s === 'active' && s.pct != null && (
                          <div style={{ marginTop: 8, maxWidth: 320 }}>
                            <div className="progress"><div style={{ width: `${s.pct}%` }}></div></div>
                          </div>
                        )}
                        <div className="ts">{s.ts}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: live preview + log */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="card">
                <div className="card-hd">
                  <div>
                    <div className="card-title">Live signal · E. Morgan</div>
                    <div className="card-sub">Lead II preview · 25 mm/s</div>
                  </div>
                  <span className="badge badge-green"><span className="dot"></span>Stable</span>
                </div>
                <window.EcgStrip width={520} height={150} cycles={9} color="#DC2626" animate />
                <div style={{ padding: '10px 18px', borderTop: '1px solid #EEF0F4', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
                  {[['HR (live)','78'],['QRS','92 ms'],['SNR','22 dB'],['Beats','14']].map(([l,v])=>(
                    <div key={l}>
                      <div style={{ fontSize: 10.5, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '.04em', fontWeight: 600 }}>{l}</div>
                      <div className="tnum" style={{ fontSize: 15, fontWeight: 650 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div className="card-hd">
                  <div className="card-title">Process log</div>
                  <a style={{ fontSize: 12, color: '#2563EB', fontWeight: 550 }}>Export</a>
                </div>
                <div className="mono" style={{ padding: '12px 18px', fontSize: 11.5, lineHeight: 1.65, color: '#475569', maxHeight: 220, overflow: 'hidden' }}>
                  <div><span style={{ color: '#9CA3AF' }}>09:14:02</span> · batch <b>B-1429</b> received · 4 records</div>
                  <div><span style={{ color: '#9CA3AF' }}>09:14:02</span> · de-identification · <span style={{ color: '#16A34A' }}>ok</span></div>
                  <div><span style={{ color: '#9CA3AF' }}>09:14:03</span> · morgan_eleonor: schema xml · 12 leads · 5000 Hz</div>
                  <div><span style={{ color: '#9CA3AF' }}>09:14:04</span> · filtering · bandpass 0.5–40 Hz · 60 Hz notch</div>
                  <div><span style={{ color: '#9CA3AF' }}>09:14:05</span> · baseline correction · drift –0.18 mV</div>
                  <div><span style={{ color: '#9CA3AF' }}>09:14:06</span> · QRS detection · 14 complexes · SNR 22 dB</div>
                  <div><span style={{ color: '#9CA3AF' }}>09:14:07</span> · features: PR 164ms · QRS 92ms · QT 384ms · QTc 438ms</div>
                  <div><span style={{ color: '#9CA3AF' }}>09:14:07</span> · running rhythm classifier (cardio-rnn v3.2)…</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom record cards */}
          <div className="card" style={{ marginTop: 18 }}>
            <div className="card-hd">
              <div className="card-title">Records in batch</div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>1 of 4 in feature extraction · 3 queued</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
              {[
                { n: 'E. Morgan · 64F', state: 'Feature extraction', pct: 38, col: '#2563EB', tag: 'badge-blue', tagL: 'Running' },
                { n: 'J. Whitfield · 57M', state: 'Queued', pct: 0, col: '#9CA3AF', tag: 'badge-slate', tagL: 'Queued' },
                { n: 'A. Tanaka · 71F', state: 'Queued', pct: 0, col: '#9CA3AF', tag: 'badge-slate', tagL: 'Queued' },
                { n: 'D. Hofer · 58M', state: 'Held · missing MRN', pct: 0, col: '#F59E0B', tag: 'badge-amber', tagL: 'Held' },
              ].map((r, i) => (
                <div key={i} style={{ padding: '16px 18px', borderRight: i === 3 ? '0' : '1px solid #EEF0F4' }}>
                  <div className="row between" style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{r.n}</div>
                    <span className={`badge ${r.tag}`}><span className="dot"></span>{r.tagL}</span>
                  </div>
                  <window.EcgMini width={200} height={28} cycles={5} color={r.col} />
                  <div style={{ fontSize: 11.5, color: '#6B7280', marginTop: 8 }}>{r.state}</div>
                  {r.pct > 0 && <div className="progress" style={{ marginTop: 6 }}><div style={{ width: `${r.pct}%` }}></div></div>}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Result() {
  const Ic = window.Icons;
  return (
    <div className="screen">
      <div className="app-shell">
        <window.Sidebar active="results" />
        <window.Topbar
          title="ECG #R-2841 · Eleanor Morgan"
          crumb={<span>Results · <b>R-2841</b></span>}
          actions={<>
            <button className="btn btn-secondary btn-sm"><Ic.Printer size={13} /> Print</button>
            <button className="btn btn-secondary btn-sm"><Ic.Share size={13} /> Share</button>
            <button className="btn btn-primary btn-sm"><Ic.Download size={13} /> Export report</button>
          </>}
        />
        <main className="content">
          {/* Patient meta strip */}
          <div className="card" style={{ padding: '14px 18px', marginBottom: 14, display: 'grid', gridTemplateColumns: 'auto 1px 1fr auto', gap: 18, alignItems: 'center' }}>
            <div className="row gap-3">
              <div className="avatar" style={{ width: 40, height: 40, fontSize: 14 }}>EM</div>
              <div>
                <div style={{ fontWeight: 650, fontSize: 15 }}>Eleanor Morgan</div>
                <div style={{ fontSize: 12, color: '#6B7280' }} className="tnum">64F · DOB 14 Jul 1961 · MRN 00482-913</div>
              </div>
            </div>
            <div style={{ width: 1, height: 36, background: '#EEF0F4' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14 }}>
              {[['Encounter','ED · Bay 3'],['Recorded','11 May 2026 · 09:14'],['Device','MUSE NX'],['Indication','Palpitations'],['Ordering','Dr. K. Park']].map(([l,v])=>(
                <div key={l}>
                  <div style={{ fontSize: 10.5, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em' }}>{l}</div>
                  <div style={{ fontSize: 12.5, color: '#111827', fontWeight: 500, marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
            <span className="badge badge-amber"><span className="dot"></span>Awaiting sign-off</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 14 }}>
            {/* ECG viewer */}
            <div className="card" style={{ overflow: 'hidden' }}>
              <div className="card-hd">
                <div className="row gap-3">
                  <div className="card-title">12-lead ECG</div>
                  <div className="tabs" style={{ border: 'none' }}>
                    <div className="tab active">3-Lead</div>
                    <div className="tab">12-Lead</div>
                    <div className="tab">Rhythm strip</div>
                  </div>
                </div>
                <div className="row gap-2">
                  <span className="chip"><Ic.Move size={12} /> Calipers</span>
                  <span className="chip">25 mm/s · 10 mm/mV <Ic.ChevronDown size={11} /></span>
                </div>
              </div>
              <div style={{ padding: 0 }}>
                <window.EcgMultiLead width={700} leadHeight={132} leads={['Lead I', 'Lead II', 'Lead V1']} />
              </div>
              <div style={{ padding: '12px 18px', borderTop: '1px solid #EEF0F4', background: '#FAFBFD', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#6B7280' }}>
                <div className="row gap-3">
                  <span><b style={{ color: '#111827' }}>10s strip</b> · 5000 samples/s</span>
                  <span className="dot-divider"></span>
                  <span>Filter: 0.05–150 Hz · 60 Hz notch on</span>
                </div>
                <div className="row gap-3">
                  <a style={{ color: '#2563EB', fontWeight: 550 }}>Reset view</a>
                  <a style={{ color: '#2563EB', fontWeight: 550 }}>Compare to previous</a>
                </div>
              </div>
              {/* Beat markers / annotations */}
              <div style={{ padding: '14px 18px', borderTop: '1px solid #EEF0F4' }}>
                <div className="row between" style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>Annotations</div>
                  <a style={{ fontSize: 12, color: '#2563EB', fontWeight: 550 }}>Add note</a>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['P wave OK','PR prolonged','Normal QRS axis','No ST elevation','Inverted T (aVR)','Regular RR'].map((a,i)=>(
                    <span key={a} className={`badge ${i===1?'badge-amber':i===4?'badge-slate':'badge-green'}`} style={{ fontWeight: 500 }}>
                      <span className="dot"></span>{a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Findings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="card">
                <div className="card-hd"><div className="card-title">Clinical findings</div><span className="badge badge-slate">Computer-aided</span></div>
                <div style={{ padding: '14px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {[
                    { l: 'Heart rate', v: '78', u: 'bpm', r: '60–100', ok: true },
                    { l: 'PR interval', v: '204', u: 'ms', r: '120–200', ok: false },
                    { l: 'QRS duration', v: '92', u: 'ms', r: '70–110', ok: true },
                    { l: 'QT / QTc', v: '384 / 438', u: 'ms', r: '<440', ok: true },
                    { l: 'P axis', v: '+62°', u: '', r: '+45–75°', ok: true },
                    { l: 'QRS axis', v: '+38°', u: '', r: '–30 to +90°', ok: true },
                  ].map(m => (
                    <div key={m.l} style={{ padding: '10px 12px', border: '1px solid #EEF0F4', borderRadius: 10, background: m.ok ? '#fff' : '#FFFAEB' }}>
                      <div style={{ fontSize: 10.5, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em' }}>{m.l}</div>
                      <div className="row between" style={{ marginTop: 2 }}>
                        <div className="tnum" style={{ fontSize: 18, fontWeight: 650, letterSpacing: '-0.01em' }}>{m.v}<span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500, marginLeft: 3 }}>{m.u}</span></div>
                        {!m.ok && <span className="badge badge-amber" style={{ fontSize: 10 }}>↑ above ref</span>}
                      </div>
                      <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }} className="tnum">ref {m.r}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div className="card-hd"><div className="card-title">AI interpretation</div>
                  <div className="row gap-2"><Ic.Sparkle size={13} color="#2563EB" /><span style={{ fontSize: 12, color: '#2563EB', fontWeight: 600 }}>cardio-rnn v3.2</span></div>
                </div>
                <div style={{ padding: '14px 18px' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 4 }}>Sinus rhythm with first-degree AV block.</div>
                  <div style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.55, marginBottom: 12 }}>
                    Regular sinus rhythm, rate 78 bpm. PR interval prolonged at 204 ms (1° AV block). No ST-segment elevation. T-wave morphology preserved across precordial leads. No criteria for chamber enlargement.
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 12 }}>
                    {[
                      { l: '1° AV block', v: '94%', c: 'badge-blue' },
                      { l: 'Sinus rhythm', v: '98%', c: 'badge-green' },
                      { l: 'AFib', v: '<1%', c: 'badge-slate' },
                    ].map(c => (
                      <div key={c.l} style={{ padding: 8, border: '1px solid #EEF0F4', borderRadius: 8 }}>
                        <div style={{ fontSize: 11.5, color: '#6B7280' }}>{c.l}</div>
                        <div className="row between" style={{ marginTop: 2 }}>
                          <div className="tnum" style={{ fontWeight: 650 }}>{c.v}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 11.5, color: '#9CA3AF' }}>Decision-support output. Final interpretation is the responsibility of the reviewing clinician.</div>
                </div>
              </div>

              <div className="card">
                <div className="card-hd"><div className="card-title">Clinician note</div></div>
                <div style={{ padding: '12px 18px' }}>
                  <textarea className="input" style={{ minHeight: 70, fontSize: 13, lineHeight: 1.5 }} defaultValue="Findings consistent with 1° AV block — likely chronic given baseline ECG from 2023. Continue current med list, no urgent intervention." />
                  <div className="row between" style={{ marginTop: 10 }}>
                    <div className="row gap-2">
                      <span className="chip">@ Dr. Park</span>
                      <span className="chip"># follow-up</span>
                    </div>
                    <button className="btn btn-primary btn-sm"><Ic.ClipboardCheck size={13} /> Sign & file</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

window.Processing = Processing;
window.Result = Result;
