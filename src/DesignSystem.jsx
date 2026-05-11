import { Icons as Ic } from './Icons.jsx';
import { EcgStrip, EcgMini, EcgMultiLead } from './Ecg.jsx';
import { C } from './tokens.js';

const COLOR_SWATCHES_1 = [
  { name: 'Background', hex: '#F7F9FC', fg: C.text },
  { name: 'Card',       hex: '#FFFFFF', fg: C.text },
  { name: 'Primary',    hex: '#2563EB', fg: '#fff' },
  { name: 'Accent Teal',hex: '#14B8A6', fg: '#fff' },
  { name: 'Success',    hex: '#16A34A', fg: '#fff' },
  { name: 'Warning',    hex: '#F59E0B', fg: '#1F2937' },
];

const COLOR_SWATCHES_2 = [
  { name: 'Danger',      hex: '#DC2626', fg: '#fff' },
  { name: 'Text',        hex: '#111827', fg: '#fff' },
  { name: 'Text 2',      hex: '#6B7280', fg: '#fff' },
  { name: 'Text 3',      hex: '#9CA3AF', fg: '#fff' },
  { name: 'Border',      hex: '#E5E7EB', fg: C.text },
  { name: 'Border soft', hex: '#EEF0F4', fg: C.text },
];

const TIMELINE_ITEMS = [
  { text: 'Report signed',          ts: 'just now', current: true },
  { text: 'ECG uploaded',           ts: '14m ago',  current: false },
  { text: 'Patient seen by Dr. Park', ts: '32m ago', current: false },
  { text: 'Triaged · ED',           ts: '1h ago',   current: false },
];

function Swatch({ name, hex, fg = '#111827' }) {
  return (
    <div style={{ background: hex, border: '1px solid rgba(0,0,0,.06)', borderRadius: 10, padding: 12, color: fg, height: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 12, fontWeight: 600 }}>{name}</div>
      <div className="mono" style={{ fontSize: 10.5, opacity: .75 }}>{hex}</div>
    </div>
  );
}

function Section({ title, sub, children }) {
  return (
    <section style={{ marginBottom: 28 }} aria-labelledby={`ds-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <div id={`ds-${title.replace(/\s+/g, '-').toLowerCase()}`} style={{ fontSize: 11, fontWeight: 700, color: C.primary, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4 }}>{title}</div>
      {sub && <div style={{ fontSize: 12, color: C.text2, marginBottom: 12 }}>{sub}</div>}
      {children}
    </section>
  );
}

export function DesignSystem() {
  return (
    <div className="screen" style={{ overflow: 'auto', padding: 32 }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="row between" style={{ marginBottom: 18 }}>
          <div>
            <div className="row gap-3" style={{ marginBottom: 6 }}>
              <Ic.Logo size={28} />
              <h1 style={{ fontSize: 22, fontWeight: 650, letterSpacing: '-0.015em', margin: 0 }}>CardioEcg — Design System</h1>
            </div>
            <p style={{ fontSize: 13, color: C.text2, margin: 0 }}>Calm, trustworthy, minimal medical SaaS · Light mode · Inter · 8pt grid</p>
          </div>
          <span className="badge badge-blue">v3.2 · 2026.05.11</span>
        </div>

        <Section title="Colors" sub="Hospital-safe palette with semantic states. Use red sparingly — reserved for trace and danger.">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 10, marginBottom: 10 }}>
            {COLOR_SWATCHES_1.map(s => <Swatch key={s.name} {...s} />)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 10 }}>
            {COLOR_SWATCHES_2.map(s => <Swatch key={s.name} {...s} />)}
          </div>
        </Section>

        <Section title="Typography" sub="Inter · –0.015em letter-spacing on display sizes · tabular numbers for measurements.">
          <div className="card card-pad">
            <div style={{ fontSize: 36, fontWeight: 650, letterSpacing: '-0.02em' }}>Aa Bb 0123 — Display 36 / 650</div>
            <div style={{ fontSize: 24, fontWeight: 650, letterSpacing: '-0.015em', marginTop: 8 }}>Heading L · 24 / 650</div>
            <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', marginTop: 6 }}>Heading M · 18 / 600</div>
            <div style={{ fontSize: 14, fontWeight: 500, marginTop: 6 }}>Body · 14 / 500 — Regular reading text.</div>
            <div style={{ fontSize: 12, color: C.text2, marginTop: 6 }}>Caption · 12 / 500 · secondary text</div>
            <div className="mono tnum" style={{ fontSize: 13, marginTop: 8, color: '#374151' }}>Mono / tnum · 78 bpm · 204 ms · 438 ms · 09:14:02</div>
          </div>
        </Section>

        <Section title="Buttons">
          <div className="card card-pad">
            <div className="row gap-3" style={{ flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-primary">Primary</button>
              <button type="button" className="btn btn-primary"><Ic.Upload size={14} /> With icon</button>
              <button type="button" className="btn btn-secondary">Secondary</button>
              <button type="button" className="btn btn-secondary"><Ic.Download size={14} /> Download</button>
              <button type="button" className="btn btn-ghost">Ghost</button>
              <button type="button" className="btn btn-danger">Danger</button>
              <button type="button" className="btn btn-primary btn-sm">Small</button>
              <button type="button" className="btn btn-primary btn-lg">Large</button>
              <button type="button" className="btn btn-secondary btn-icon"><Ic.More size={15} /></button>
            </div>
          </div>
        </Section>

        <Section title="Inputs & Controls">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div className="card card-pad">
              <label className="label" htmlFor="ds-patient-name">Patient name</label>
              <input id="ds-patient-name" className="input" defaultValue="Eleanor Morgan" />
              <div className="help">Filed once at intake.</div>
            </div>
            <div className="card card-pad">
              <label className="label" htmlFor="ds-sampling-rate">Sampling rate</label>
              <div id="ds-sampling-rate" className="input row between" style={{ cursor: 'pointer' }}>
                <span>500 Hz</span><Ic.ChevronDown size={14} color={C.text3} />
              </div>
              <div className="help">Default for standard 12-lead.</div>
            </div>
            <div className="card card-pad">
              <label className="label" htmlFor="ds-search">Search</label>
              <div style={{ position: 'relative' }}>
                <Ic.Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: C.text3 }} aria-hidden="true" />
                <input id="ds-search" className="input" placeholder="Patient, MRN…" style={{ paddingLeft: 32 }} />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Status Badges & Chips">
          <div className="card card-pad row gap-2" style={{ flexWrap: 'wrap' }}>
            <span className="badge badge-green"><span className="dot" aria-hidden="true" />Normal</span>
            <span className="badge badge-amber"><span className="dot" aria-hidden="true" />Review</span>
            <span className="badge badge-red"><span className="dot" aria-hidden="true" />Urgent</span>
            <span className="badge badge-blue"><span className="dot" aria-hidden="true" />Processing</span>
            <span className="badge badge-teal"><Ic.ShieldCheck size={11} /> HIPAA</span>
            <span className="badge badge-slate">Signed</span>
            <span className="badge badge-outline">Draft</span>
            <button type="button" className="chip">Filter</button>
            <button type="button" className="chip active">Active filter</button>
          </div>
        </Section>

        <Section title="Tabs">
          <div className="card card-pad" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className="tabs" style={{ paddingTop: 8 }} role="tablist" aria-label="Example tabs">
              {['Overview', 'ECG history', 'Reports', 'Timeline'].map((tab, i) => (
                <div key={tab} className={`tab${i === 0 ? ' active' : ''}`} role="tab" aria-selected={i === 0}>{tab}</div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Progress & Stepper">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="card card-pad">
              <div style={{ fontSize: 12, color: C.text2, marginBottom: 6 }}>Upload · 64%</div>
              <div className="progress" role="progressbar" aria-valuenow={64} aria-valuemin={0} aria-valuemax={100} aria-label="Upload progress">
                <div style={{ width: '64%' }} />
              </div>
              <div style={{ fontSize: 12, color: C.text2, margin: '14px 0 6px' }}>Queued · 4%</div>
              <div className="progress" role="progressbar" aria-valuenow={4} aria-valuemin={0} aria-valuemax={100} aria-label="Queue progress">
                <div style={{ width: '4%', background: C.text3 }} />
              </div>
              <div style={{ fontSize: 12, color: C.text2, margin: '14px 0 6px' }}>Complete · 100%</div>
              <div className="progress" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} aria-label="Completed">
                <div style={{ width: '100%', background: C.green }} />
              </div>
            </div>
            <div className="card card-pad">
              <ol className="stepper" aria-label="Pipeline steps">
                <li className="step done">
                  <div className="marker" aria-hidden="true"><Ic.Check size={13} /></div>
                  <div><h3 style={{ margin: '4px 0 2px', fontSize: 13.5, fontWeight: 600 }}>Upload validated</h3><p style={{ margin: 0, fontSize: 12.5, color: C.text2 }}>4 files · 8.7 MB</p></div>
                </li>
                <li className="step active" aria-current="step">
                  <div className="marker" aria-hidden="true">2</div>
                  <div><h3 style={{ margin: '4px 0 2px', fontSize: 13.5, fontWeight: 600 }}>Feature extraction</h3><p style={{ margin: 0, fontSize: 12.5, color: C.text2 }}>Running · 38%</p></div>
                </li>
                <li className="step">
                  <div className="marker" aria-hidden="true">3</div>
                  <div><h3 style={{ margin: '4px 0 2px', fontSize: 13.5, fontWeight: 600 }}>Classification</h3><p style={{ margin: 0, fontSize: 12.5, color: C.text2 }}>Queued</p></div>
                </li>
              </ol>
            </div>
          </div>
        </Section>

        <Section title="Upload zone">
          <div className="dropzone" role="region" aria-label="File upload area">
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fff', display: 'grid', placeItems: 'center', margin: '0 auto 10px', boxShadow: '0 2px 6px rgba(37,99,235,.10)', color: C.primary }} aria-hidden="true">
              <Ic.Upload size={20} />
            </div>
            <div style={{ fontWeight: 600 }}>Drop ECG files here</div>
            <div style={{ fontSize: 12.5, color: C.text2, marginTop: 4 }}>CSV · XLSX · XML · EDF · SCP-ECG</div>
          </div>
        </Section>

        <Section title="Table">
          <div className="card" style={{ overflow: 'hidden' }}>
            <table className="table" aria-label="Example patient table">
              <thead>
                <tr>
                  <th scope="col">Patient</th>
                  <th scope="col">Recorded</th>
                  <th scope="col">Finding</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Eleanor Morgan · 64F</td>
                  <td className="tnum"><time>09:14</time></td>
                  <td>1° AV block</td>
                  <td><span className="badge badge-amber"><span className="dot" aria-hidden="true" />Review</span></td>
                </tr>
                <tr>
                  <td>James Whitfield · 57M</td>
                  <td className="tnum"><time>08:52</time></td>
                  <td>Sinus rhythm</td>
                  <td><span className="badge badge-green"><span className="dot" aria-hidden="true" />Normal</span></td>
                </tr>
                <tr>
                  <td>Aiko Tanaka · 71F</td>
                  <td className="tnum"><time>08:39</time></td>
                  <td>AFib</td>
                  <td><span className="badge badge-red"><span className="dot" aria-hidden="true" />Urgent</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Patient & Report cards">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div className="card card-pad">
              <div className="row gap-3" style={{ marginBottom: 10 }}>
                <div className="avatar" style={{ width: 36, height: 36 }} aria-hidden="true">EM</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>Eleanor Morgan</div>
                  <div style={{ fontSize: 11.5, color: C.text2 }}>64F · MRN 00482-913</div>
                </div>
              </div>
              <EcgMini width={250} height={32} cycles={5} color={C.red} label="ECG preview for Eleanor Morgan" />
              <div className="row between" style={{ marginTop: 10 }}>
                <span className="badge badge-amber"><span className="dot" aria-hidden="true" />Moderate</span>
                <span className="tnum" style={{ fontSize: 11.5, color: C.text2 }}>14 records</span>
              </div>
            </div>
            <div className="card card-pad">
              <div className="row between" style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 11.5, color: C.text2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em' }}>Report</div>
                <span className="badge badge-green">Signed</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>#R-2841 · 1° AV block</div>
              <div style={{ fontSize: 12, color: C.text2, marginTop: 2 }}>Reviewed by Dr. Mehta · 09:18</div>
              <div className="row gap-2" style={{ marginTop: 12 }}>
                <button type="button" className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Open</button>
                <button type="button" className="btn btn-secondary btn-sm btn-icon"><Ic.Download size={13} /></button>
              </div>
            </div>
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 11.5, color: C.text2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em' }}>Live ECG · Lead II</div>
                <span className="badge badge-blue"><span className="dot" aria-hidden="true" />Live</span>
              </div>
              <EcgStrip width={280} height={70} cycles={6} color={C.red} animate label="Live ECG preview" />
            </div>
          </div>
        </Section>

        <Section title="Toasts & Modal">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }} role="region" aria-label="Toast notifications">
                <div className="toast" role="status">
                  <div className="ico success"><Ic.Check size={16} /></div>
                  <div><h5 style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 600 }}>Report signed</h5><p style={{ margin: 0, fontSize: 12, color: C.text2 }}>Dr. Mehta signed #R-2841 · just now</p></div>
                </div>
                <div className="toast" role="status">
                  <div className="ico info"><Ic.Info size={16} /></div>
                  <div><h5 style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 600 }}>Batch processing</h5><p style={{ margin: 0, fontSize: 12, color: C.text2 }}>3 ECGs queued for analysis</p></div>
                </div>
                <div className="toast" role="alert">
                  <div className="ico warn"><Ic.AlertTriangle size={16} /></div>
                  <div><h5 style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 600 }}>AFib detected</h5><p style={{ margin: 0, fontSize: 12, color: C.text2 }}>A. Tanaka · MRN 00591-014 · flagged for urgent review</p></div>
                </div>
              </div>
            </div>
            <div className="card" style={{ overflow: 'hidden', boxShadow: '0 16px 40px -16px rgba(15,23,42,.18)' }} role="dialog" aria-modal="true" aria-labelledby="ds-modal-title">
              <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.border2}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="row gap-3">
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: C.red50, color: C.red, display: 'grid', placeItems: 'center' }} aria-hidden="true"><Ic.AlertTriangle size={15} /></div>
                  <div id="ds-modal-title" style={{ fontSize: 14, fontWeight: 600 }}>Confirm urgent escalation</div>
                </div>
                <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} aria-label="Close dialog">
                  <Ic.X size={16} color={C.text3} />
                </button>
              </div>
              <div style={{ padding: '14px 18px', fontSize: 13, color: '#475569', lineHeight: 1.55 }}>
                You're escalating <b>Aiko Tanaka (MRN 00591-014)</b> for urgent cardiology review. This will page on-call and add an audit entry.
              </div>
              <div className="row gap-2" style={{ padding: '12px 18px', borderTop: `1px solid ${C.border2}`, justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-ghost btn-sm">Cancel</button>
                <button type="button" className="btn btn-danger btn-sm">Escalate</button>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Skeleton & Timeline">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="card card-pad" aria-label="Loading skeleton example" aria-busy="true">
              <div className="sk" style={{ width: '40%', height: 14, marginBottom: 8 }} />
              <div className="sk" style={{ width: '75%', height: 12, marginBottom: 6 }} />
              <div className="sk" style={{ width: '60%', height: 12, marginBottom: 14 }} />
              <div className="sk" style={{ width: '100%', height: 32, marginBottom: 8 }} />
              <div className="sk" style={{ width: '100%', height: 32 }} />
            </div>
            <div className="card card-pad">
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, borderLeft: `2px solid ${C.border2}`, paddingLeft: 14, marginLeft: 6 }} aria-label="Timeline">
                {TIMELINE_ITEMS.map(ev => (
                  <li key={ev.text} style={{ position: 'relative', padding: '4px 0 10px' }}>
                    <div style={{ position: 'absolute', left: -20, top: 8, width: 8, height: 8, borderRadius: '50%', background: ev.current ? C.primary : '#fff', border: `2px solid ${C.primary}` }} aria-hidden="true" />
                    <div style={{ fontSize: 12.5, color: '#374151' }}>{ev.text}</div>
                    <div className="tnum" style={{ fontSize: 11, color: C.text3 }}><time>{ev.ts}</time></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Section>

        <Section title="ECG waveform card style">
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${C.border2}` }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>12-lead · 25 mm/s · 10 mm/mV</div>
              <span className="badge badge-slate">Lead II / V1 / I</span>
            </div>
            <EcgMultiLead width={1188} leadHeight={90} leads={['Lead I', 'Lead II', 'Lead V1']} label="Design system ECG waveform example" />
          </div>
        </Section>
      </div>
    </div>
  );
}
