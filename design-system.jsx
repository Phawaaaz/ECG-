// Design system showcase panel
function DesignSystem() {
  const Ic = window.Icons;
  const Section = ({ t, sub, children }) => (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4 }}>{t}</div>
      {sub && <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 12 }}>{sub}</div>}
      {children}
    </div>
  );
  const Swatch = ({ name, hex, fg='#111827' }) => (
    <div style={{ background: hex, border: '1px solid rgba(0,0,0,.06)', borderRadius: 10, padding: 12, color: fg, height: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 12, fontWeight: 600 }}>{name}</div>
      <div className="mono" style={{ fontSize: 10.5, opacity: .75 }}>{hex}</div>
    </div>
  );
  return (
    <div className="screen" style={{ overflow: 'auto', padding: 32 }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="row between" style={{ marginBottom: 18 }}>
          <div>
            <div className="row gap-3" style={{ marginBottom: 6 }}>
              <Ic.Logo size={28} />
              <h1 style={{ fontSize: 22, fontWeight: 650, letterSpacing: '-0.015em', margin: 0 }}>CardioEcg — Design System</h1>
            </div>
            <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>Calm, trustworthy, minimal medical SaaS · Light mode · Inter · 8pt grid</p>
          </div>
          <span className="badge badge-blue">v3.2 · 2026.05.11</span>
        </div>

        <Section t="Colors" sub="Hospital-safe palette with semantic states. Use red sparingly — reserved for trace and danger.">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 10, marginBottom: 10 }}>
            <Swatch name="Background" hex="#F7F9FC" />
            <Swatch name="Card" hex="#FFFFFF" />
            <Swatch name="Primary" hex="#2563EB" fg="#fff" />
            <Swatch name="Accent Teal" hex="#14B8A6" fg="#fff" />
            <Swatch name="Success" hex="#16A34A" fg="#fff" />
            <Swatch name="Warning" hex="#F59E0B" fg="#1F2937" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 10 }}>
            <Swatch name="Danger" hex="#DC2626" fg="#fff" />
            <Swatch name="Text" hex="#111827" fg="#fff" />
            <Swatch name="Text 2" hex="#6B7280" fg="#fff" />
            <Swatch name="Text 3" hex="#9CA3AF" fg="#fff" />
            <Swatch name="Border" hex="#E5E7EB" />
            <Swatch name="Border soft" hex="#EEF0F4" />
          </div>
        </Section>

        <Section t="Typography" sub="Inter · –0.015em letter-spacing on display sizes · tabular numbers for measurements.">
          <div className="card card-pad">
            <div style={{ fontSize: 36, fontWeight: 650, letterSpacing: '-0.02em' }}>Aa Bb 0123 — Display 36 / 650</div>
            <div style={{ fontSize: 24, fontWeight: 650, letterSpacing: '-0.015em', marginTop: 8 }}>Heading L · 24 / 650</div>
            <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', marginTop: 6 }}>Heading M · 18 / 600</div>
            <div style={{ fontSize: 14, fontWeight: 500, marginTop: 6 }}>Body · 14 / 500 — Regular reading text.</div>
            <div style={{ fontSize: 12, color: '#6B7280', marginTop: 6 }}>Caption · 12 / 500 · secondary text</div>
            <div className="mono tnum" style={{ fontSize: 13, marginTop: 8, color: '#374151' }}>Mono / tnum · 78 bpm · 204 ms · 438 ms · 09:14:02</div>
          </div>
        </Section>

        <Section t="Buttons">
          <div className="card card-pad">
            <div className="row gap-3" style={{ flexWrap: 'wrap' }}>
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-primary"><Ic.Upload size={14} /> With icon</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-secondary"><Ic.Download size={14} /> Download</button>
              <button className="btn btn-ghost">Ghost</button>
              <button className="btn btn-danger">Danger</button>
              <button className="btn btn-primary btn-sm">Small</button>
              <button className="btn btn-primary btn-lg">Large</button>
              <button className="btn btn-secondary btn-icon"><Ic.More size={15} /></button>
            </div>
          </div>
        </Section>

        <Section t="Inputs & Controls">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div className="card card-pad">
              <label className="label">Patient name</label>
              <input className="input" defaultValue="Eleanor Morgan" />
              <div className="help">Filed once at intake.</div>
            </div>
            <div className="card card-pad">
              <label className="label">Sampling rate</label>
              <div className="input row between" style={{ cursor: 'pointer' }}>
                <span>500 Hz</span><Ic.ChevronDown size={14} color="#9CA3AF" />
              </div>
              <div className="help">Default for standard 12-lead.</div>
            </div>
            <div className="card card-pad">
              <label className="label">Search</label>
              <div style={{ position: 'relative' }}>
                <Ic.Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input className="input" placeholder="Patient, MRN…" style={{ paddingLeft: 32 }} />
              </div>
            </div>
          </div>
        </Section>

        <Section t="Status Badges & Chips">
          <div className="card card-pad row gap-2" style={{ flexWrap: 'wrap' }}>
            <span className="badge badge-green"><span className="dot"></span>Normal</span>
            <span className="badge badge-amber"><span className="dot"></span>Review</span>
            <span className="badge badge-red"><span className="dot"></span>Urgent</span>
            <span className="badge badge-blue"><span className="dot"></span>Processing</span>
            <span className="badge badge-teal"><Ic.ShieldCheck size={11} /> HIPAA</span>
            <span className="badge badge-slate">Signed</span>
            <span className="badge badge-outline">Draft</span>
            <span className="chip">Filter</span>
            <span className="chip active">Active filter</span>
          </div>
        </Section>

        <Section t="Tabs">
          <div className="card card-pad" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className="tabs" style={{ paddingTop: 8 }}>
              <div className="tab active">Overview</div>
              <div className="tab">ECG history</div>
              <div className="tab">Reports</div>
              <div className="tab">Timeline</div>
            </div>
          </div>
        </Section>

        <Section t="Progress & Stepper">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="card card-pad">
              <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 6 }}>Upload · 64%</div>
              <div className="progress"><div style={{ width: '64%' }}></div></div>
              <div style={{ fontSize: 12, color: '#6B7280', margin: '14px 0 6px' }}>Queued · 4%</div>
              <div className="progress"><div style={{ width: '4%', background: '#9CA3AF' }}></div></div>
              <div style={{ fontSize: 12, color: '#6B7280', margin: '14px 0 6px' }}>Complete · 100%</div>
              <div className="progress"><div style={{ width: '100%', background: '#16A34A' }}></div></div>
            </div>
            <div className="card card-pad">
              <div className="stepper">
                <div className="step done"><div className="marker"><Ic.Check size={13} /></div><div><h4>Upload validated</h4><p>4 files · 8.7 MB</p></div></div>
                <div className="step active"><div className="marker">2</div><div><h4>Feature extraction</h4><p>Running · 38%</p></div></div>
                <div className="step"><div className="marker">3</div><div><h4>Classification</h4><p>Queued</p></div></div>
              </div>
            </div>
          </div>
        </Section>

        <Section t="Upload zone">
          <div className="dropzone">
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fff', display: 'grid', placeItems: 'center', margin: '0 auto 10px', boxShadow: '0 2px 6px rgba(37,99,235,.10)', color: '#2563EB' }}>
              <Ic.Upload size={20} />
            </div>
            <div style={{ fontWeight: 600 }}>Drop ECG files here</div>
            <div style={{ fontSize: 12.5, color: '#6B7280', marginTop: 4 }}>CSV · XLSX · XML · EDF · SCP-ECG</div>
          </div>
        </Section>

        <Section t="Table">
          <div className="card" style={{ overflow: 'hidden' }}>
            <table className="table">
              <thead><tr><th>Patient</th><th>Recorded</th><th>Finding</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>Eleanor Morgan · 64F</td><td className="tnum">09:14</td><td>1° AV block</td><td><span className="badge badge-amber"><span className="dot"></span>Review</span></td></tr>
                <tr><td>James Whitfield · 57M</td><td className="tnum">08:52</td><td>Sinus rhythm</td><td><span className="badge badge-green"><span className="dot"></span>Normal</span></td></tr>
                <tr><td>Aiko Tanaka · 71F</td><td className="tnum">08:39</td><td>AFib</td><td><span className="badge badge-red"><span className="dot"></span>Urgent</span></td></tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section t="Patient & Report cards">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div className="card card-pad">
              <div className="row gap-3" style={{ marginBottom: 10 }}>
                <div className="avatar" style={{ width: 36, height: 36 }}>EM</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>Eleanor Morgan</div>
                  <div style={{ fontSize: 11.5, color: '#6B7280' }}>64F · MRN 00482-913</div>
                </div>
              </div>
              <window.EcgMini width={250} height={32} cycles={5} color="#DC2626" />
              <div className="row between" style={{ marginTop: 10 }}>
                <span className="badge badge-amber"><span className="dot"></span>Moderate</span>
                <span className="tnum" style={{ fontSize: 11.5, color: '#6B7280' }}>14 records</span>
              </div>
            </div>
            <div className="card card-pad">
              <div className="row between" style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 11.5, color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em' }}>Report</div>
                <span className="badge badge-green">Signed</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>#R-2841 · 1° AV block</div>
              <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Reviewed by Dr. Mehta · 09:18</div>
              <div className="row gap-2" style={{ marginTop: 12 }}>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Open</button>
                <button className="btn btn-secondary btn-sm btn-icon"><Ic.Download size={13} /></button>
              </div>
            </div>
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 11.5, color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em' }}>Live ECG · Lead II</div>
                <span className="badge badge-blue"><span className="dot"></span>Live</span>
              </div>
              <window.EcgStrip width={280} height={70} cycles={6} color="#DC2626" animate />
            </div>
          </div>
        </Section>

        <Section t="Toasts & Modal">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div className="toast"><div className="ico success"><Ic.Check size={16} /></div><div><h5>Report signed</h5><p>Dr. Mehta signed #R-2841 · just now</p></div></div>
                <div className="toast"><div className="ico info"><Ic.Info size={16} /></div><div><h5>Batch processing</h5><p>3 ECGs queued for analysis</p></div></div>
                <div className="toast"><div className="ico warn"><Ic.AlertTriangle size={16} /></div><div><h5>AFib detected</h5><p>A. Tanaka · MRN 00591-014 · flagged for urgent review</p></div></div>
              </div>
            </div>
            <div className="card" style={{ overflow: 'hidden', boxShadow: '0 16px 40px -16px rgba(15,23,42,.18)' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #EEF0F4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="row gap-3">
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: '#FEF2F2', color: '#DC2626', display: 'grid', placeItems: 'center' }}><Ic.AlertTriangle size={15} /></div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Confirm urgent escalation</div>
                </div>
                <Ic.X size={16} color="#9CA3AF" />
              </div>
              <div style={{ padding: '14px 18px', fontSize: 13, color: '#475569', lineHeight: 1.55 }}>
                You're escalating <b>Aiko Tanaka (MRN 00591-014)</b> for urgent cardiology review. This will page on-call and add an audit entry.
              </div>
              <div className="row gap-2" style={{ padding: '12px 18px', borderTop: '1px solid #EEF0F4', justifyContent: 'flex-end' }}>
                <button className="btn btn-ghost btn-sm">Cancel</button>
                <button className="btn btn-danger btn-sm">Escalate</button>
              </div>
            </div>
          </div>
        </Section>

        <Section t="Skeleton & Timeline">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="card card-pad">
              <div className="sk" style={{ width: '40%', height: 14, marginBottom: 8 }}></div>
              <div className="sk" style={{ width: '75%', height: 12, marginBottom: 6 }}></div>
              <div className="sk" style={{ width: '60%', height: 12, marginBottom: 14 }}></div>
              <div className="sk" style={{ width: '100%', height: 32, marginBottom: 8 }}></div>
              <div className="sk" style={{ width: '100%', height: 32 }}></div>
            </div>
            <div className="card card-pad">
              <div style={{ borderLeft: '2px solid #EEF0F4', paddingLeft: 14, marginLeft: 6 }}>
                {[['Report signed','just now',true],['ECG uploaded','14m'],['Patient seen by Dr. Park','32m'],['Triaged · ED','1h']].map(([t,ts,a],i)=>(
                  <div key={i} style={{ position: 'relative', padding: '4px 0 10px' }}>
                    <div style={{ position: 'absolute', left: -20, top: 8, width: 8, height: 8, borderRadius: 50, background: a?'#2563EB':'#fff', border: '2px solid #2563EB' }}></div>
                    <div style={{ fontSize: 12.5, color: '#374151' }}>{t}</div>
                    <div className="tnum" style={{ fontSize: 11, color: '#9CA3AF' }}>{ts}{a?'':' ago'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section t="ECG waveform card style">
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #EEF0F4' }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>12-lead · 25 mm/s · 10 mm/mV</div>
              <span className="badge badge-slate">Lead II / V1 / I</span>
            </div>
            <window.EcgMultiLead width={1188} leadHeight={90} leads={['I','II','V1']} />
          </div>
        </Section>
      </div>
    </div>
  );
}

window.DesignSystem = DesignSystem;
