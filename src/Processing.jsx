import { Icons as Ic } from './Icons.jsx';
import { EcgStrip, EcgMini } from './Ecg.jsx';
import { Sidebar, Topbar } from './Shell.jsx';
import { C } from './tokens.js';

const STEPS = [
  { title: 'Upload validated',      status: 'done',    desc: '4 files · 8.7 MB · de-identified',                               ts: '09:14:02' },
  { title: 'Signal preprocessing',  status: 'done',    desc: 'Bandpass 0.5–40 Hz · powerline notch · baseline correction',     ts: '09:14:05' },
  { title: 'Lead detection & QRS',  status: 'done',    desc: '12 leads confirmed · 14 QRS complexes detected',                 ts: '09:14:07' },
  { title: 'Feature extraction',    status: 'active',  desc: 'PR, QRS, QT/QTc, axis, ST measurements',                        ts: 'running · 38%', pct: 38 },
  { title: 'Rhythm classification', status: 'pending', desc: 'Beat-level + rhythm classifier · 24 classes',                   ts: 'queued' },
  { title: 'Report generation',     status: 'pending', desc: 'Structured report · awaiting clinician review',                  ts: 'queued' },
];

const LIVE_METRICS = [
  { label: 'HR (live)', value: '78' },
  { label: 'QRS',       value: '92 ms' },
  { label: 'SNR',       value: '22 dB' },
  { label: 'Beats',     value: '14' },
];

const LOG_LINES = [
  ['09:14:02', 'batch B-1429 received · 4 records', null],
  ['09:14:02', 'de-identification · ', 'ok'],
  ['09:14:03', 'morgan_eleonor: schema xml · 12 leads · 5000 Hz', null],
  ['09:14:04', 'filtering · bandpass 0.5–40 Hz · 60 Hz notch', null],
  ['09:14:05', 'baseline correction · drift –0.18 mV', null],
  ['09:14:06', 'QRS detection · 14 complexes · SNR 22 dB', null],
  ['09:14:07', 'features: PR 164ms · QRS 92ms · QT 384ms · QTc 438ms', null],
  ['09:14:07', 'running rhythm classifier (cardio-rnn v3.2)…', null],
];

const BATCH_RECORDS = [
  { name: 'E. Morgan · 64F',  state: 'Feature extraction',  pct: 38, waveColor: C.primary, tagClass: 'badge-blue',  tagLabel: 'Running' },
  { name: 'J. Whitfield · 57M', state: 'Queued',            pct: 0,  waveColor: C.text3,   tagClass: 'badge-slate', tagLabel: 'Queued' },
  { name: 'A. Tanaka · 71F',  state: 'Queued',              pct: 0,  waveColor: C.text3,   tagClass: 'badge-slate', tagLabel: 'Queued' },
  { name: 'D. Hofer · 58M',   state: 'Held · missing MRN', pct: 0,  waveColor: C.amber,   tagClass: 'badge-amber', tagLabel: 'Held' },
];

export function Processing() {
  return (
    <div className="screen">
      <div className="app-shell">
        <Sidebar active="queue" />
        <Topbar
          title="Processing · Batch #B-1429"
          crumb={<span>Workspace · Upload · <b>Processing</b></span>}
          actions={<button type="button" className="btn btn-secondary btn-sm"><Ic.X size={13} /> Cancel batch</button>}
        />
        <main className="content" aria-label="AI processing pipeline">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 18 }}>

            {/* Pipeline stepper */}
            <div className="card">
              <div className="card-hd">
                <div>
                  <div className="card-title">Pipeline · 4 records</div>
                  <div className="card-sub">Started 09:14:02 · est. completion 09:14:31</div>
                </div>
                <span className="badge badge-blue"><span className="dot" aria-hidden="true" />Running</span>
              </div>
              <div style={{ padding: '20px 22px 8px' }}>
                <ol
                  className="stepper"
                  aria-label="Processing pipeline steps"
                  aria-live="polite"
                  aria-atomic="false"
                >
                  {STEPS.map(s => (
                    <li
                      key={s.title}
                      className={`step${s.status === 'done' ? ' done' : s.status === 'active' ? ' active' : ''}`}
                      aria-current={s.status === 'active' ? 'step' : undefined}
                    >
                      <div className="marker" aria-hidden="true">
                        {s.status === 'done' ? <Ic.Check size={13} /> : STEPS.indexOf(s) + 1}
                      </div>
                      <div>
                        <h3 style={{ margin: '4px 0 2px', fontSize: 13.5, fontWeight: 600 }}>{s.title}</h3>
                        <p style={{ margin: 0, fontSize: 12.5, color: C.text2 }}>{s.desc}</p>
                        {s.status === 'active' && s.pct != null && (
                          <div style={{ marginTop: 8, maxWidth: 320 }}>
                            <div
                              className="progress"
                              role="progressbar"
                              aria-valuenow={s.pct}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-label={`${s.title}: ${s.pct}% complete`}
                            >
                              <div style={{ width: `${s.pct}%` }} />
                            </div>
                          </div>
                        )}
                        <div className="ts">{s.ts}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right: live preview + log */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="card">
                <div className="card-hd">
                  <div>
                    <div className="card-title">Live signal · E. Morgan</div>
                    <div className="card-sub">Lead II preview · 25 mm/s</div>
                  </div>
                  <span className="badge badge-green"><span className="dot" aria-hidden="true" />Stable</span>
                </div>
                <EcgStrip width={520} height={150} cycles={9} color={C.red} animate label="Lead II · 25 mm/s" />
                <dl style={{ padding: '10px 18px', borderTop: '1px solid #EEF0F4', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, margin: 0 }}>
                  {LIVE_METRICS.map(m => (
                    <div key={m.label}>
                      <dt style={{ fontSize: 10.5, color: C.text3, textTransform: 'uppercase', letterSpacing: '.04em', fontWeight: 600 }}>{m.label}</dt>
                      <dd className="tnum" style={{ margin: 0, fontSize: 15, fontWeight: 650 }}>{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="card">
                <div className="card-hd">
                  <div className="card-title">Process log</div>
                  <button type="button" style={{ fontSize: 12, color: C.primary, fontWeight: 550, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Export</button>
                </div>
                <div
                  className="mono"
                  style={{ padding: '12px 18px', fontSize: 11.5, lineHeight: 1.65, color: '#475569', maxHeight: 220, overflow: 'hidden' }}
                  role="log"
                  aria-label="Process log"
                  aria-live="polite"
                >
                  {LOG_LINES.map(([ts, msg, highlight]) => (
                    <div key={ts + msg}>
                      <span style={{ color: C.text3 }}>{ts}</span> · {msg}
                      {highlight && <span style={{ color: C.green }}>{highlight}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Batch record cards */}
          <div className="card" style={{ marginTop: 18 }}>
            <div className="card-hd">
              <div className="card-title">Records in batch</div>
              <div style={{ fontSize: 12, color: C.text2 }}>1 of 4 in feature extraction · 3 queued</div>
            </div>
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, listStyle: 'none', padding: 0, margin: 0 }}>
              {BATCH_RECORDS.map((r, i) => (
                <li key={r.name} style={{ padding: '16px 18px', borderRight: i === BATCH_RECORDS.length - 1 ? '0' : '1px solid #EEF0F4' }}>
                  <div className="row between" style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{r.name}</div>
                    <span className={`badge ${r.tagClass}`}><span className="dot" aria-hidden="true" />{r.tagLabel}</span>
                  </div>
                  <EcgMini width={200} height={28} cycles={5} color={r.waveColor} label={`ECG preview for ${r.name}`} />
                  <div style={{ fontSize: 11.5, color: C.text2, marginTop: 8 }}>{r.state}</div>
                  {r.pct > 0 && (
                    <div className="progress" style={{ marginTop: 6 }} role="progressbar" aria-valuenow={r.pct} aria-valuemin={0} aria-valuemax={100}>
                      <div style={{ width: `${r.pct}%` }} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
