import { Icons as Ic } from './Icons.jsx';
import { EcgMini } from './Ecg.jsx';
import { Sidebar, Topbar } from './Shell.jsx';
import { C } from './tokens.js';
import { useNav } from './NavContext.jsx';

const STAT_CARDS = [
  { label: 'ECGs reviewed',   value: '38',     delta: '+12%', icon: 'Activity',      color: C.primary,  bg: C.primary50,  sub: 'vs. last 24h',     down: false },
  { label: 'Awaiting review', value: '7',      delta: '–3',   icon: 'Clock',         color: '#B45309',  bg: C.amber50,    sub: '2 marked urgent',  down: false },
  { label: 'Risk alerts',     value: '2',      delta: '+1',   icon: 'AlertTriangle', color: '#B91C1C',  bg: C.red50,      sub: 'AFib · STEMI',     down: true  },
  { label: 'Avg. turnaround', value: '4m 18s', delta: '–22%', icon: 'Zap',           color: '#0F766E',  bg: C.teal50,     sub: 'across 38 reports',down: false },
];

const RECENT_UPLOADS = [
  { name: 'Eleanor Morgan',   mrn: '00482-913', age: '64F', time: '09:14', dur: '12s ago', cycles: 5, finding: '1° AV block',      conf: 94, status: 'review', waveColor: C.red   },
  { name: 'James Whitfield',  mrn: '00318-220', age: '57M', time: '08:52', dur: '38m ago', cycles: 4, finding: 'Sinus rhythm',      conf: 98, status: 'normal', waveColor: C.green },
  { name: 'Aiko Tanaka',      mrn: '00591-014', age: '71F', time: '08:39', dur: '51m ago', cycles: 6, finding: 'AFib · irregular',  conf: 91, status: 'urgent', waveColor: C.red   },
  { name: 'Marcus Ellington', mrn: '00427-771', age: '46M', time: '08:21', dur: '1h ago',  cycles: 5, finding: 'Sinus bradycardia', conf: 89, status: 'review', waveColor: C.amber },
  { name: 'Priya Shah',       mrn: '00611-553', age: '38F', time: '08:02', dur: '1h ago',  cycles: 5, finding: 'Sinus rhythm',      conf: 97, status: 'signed', waveColor: C.green },
  { name: 'David Reyes',      mrn: '00204-119', age: '69M', time: '07:48', dur: '1h ago',  cycles: 4, finding: 'LVH criteria',      conf: 86, status: 'review', waveColor: C.amber },
];

const QUEUE_ITEMS = [
  { name: 'Batch · ED Triage',         detail: '12 records',      state: 'Feature extraction',    pct: 64 },
  { name: 'Sofia Ng · 00712-446',      detail: 'Single record',   state: 'Rhythm classification', pct: 82 },
  { name: 'Daniel Hofer · 00198-005',  detail: 'Single record',   state: 'Queued',                pct: 4  },
];

const RISK_ALERTS = [
  { name: 'Aiko Tanaka',      age: '71F', finding: 'Atrial fibrillation · rapid ventricular response', time: '08:39', severity: 'high' },
  { name: 'Marcus Ellington', age: '46M', finding: 'Sinus bradycardia · HR 42 bpm',                    time: '08:21', severity: 'med'  },
];

const ACTIVITY = [
  { who: 'Dr. Mehta', what: 'signed report',           target: '#R-2841 · E. Morgan',        time: 'just now', icon: 'Check',         color: C.green   },
  { who: 'AI',        what: 'flagged AFib in',         target: 'A. Tanaka · MRN 00591-014',  time: '6m',       icon: 'AlertTriangle', color: C.red     },
  { who: 'Dr. Park',  what: 'added note to',           target: '#R-2839 · J. Whitfield',     time: '14m',      icon: 'Edit',          color: C.primary },
  { who: 'System',    what: 'imported 12 ECGs from',   target: 'MUSE — ED bay 3',            time: '32m',      icon: 'Database',      color: C.text2   },
  { who: 'Dr. Mehta', what: 'opened chart',            target: 'D. Reyes · MRN 00204-119',   time: '48m',      icon: 'Users',         color: C.text2   },
];

const BAR_DATA    = [22, 18, 26, 30, 24, 32, 28, 34, 30, 38, 36, 42, 40, 38];
const BAR_DATA_BG = [28, 24, 32, 35, 30, 38, 34, 40, 38, 46, 44, 52, 50, 48];

function StatusBadge({ status }) {
  if (status === 'urgent') return <span className="badge badge-red"><span className="dot" aria-hidden="true" />Urgent</span>;
  if (status === 'normal') return <span className="badge badge-green"><span className="dot" aria-hidden="true" />Normal</span>;
  if (status === 'review') return <span className="badge badge-amber"><span className="dot" aria-hidden="true" />Review</span>;
  return <span className="badge badge-slate"><span className="dot" aria-hidden="true" />Signed</span>;
}

function ThroughputChart() {
  const max = 60;
  return (
    <svg width="100%" viewBox="0 0 680 160" preserveAspectRatio="none" style={{ display: 'block' }}
      role="img" aria-label="ECG throughput over the last 14 days">
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1="32" x2="680" y1={i * 40 + 8} y2={i * 40 + 8} stroke="#F1F3F7" strokeWidth="1" />
      ))}
      {[60, 40, 20, 0].map((v, i) => (
        <text key={v} x="0" y={i * 40 + 12} fill="#9CA3AF" fontSize="9" fontFamily="ui-monospace,monospace">{v}</text>
      ))}
      {BAR_DATA.map((v, i) => {
        const w = 26, gap = 20, x = 40 + i * (w + gap);
        const h2 = (BAR_DATA_BG[i] / max) * 128;
        const h1 = (v / max) * 128;
        return (
          <g key={i} aria-label={`Day ${i + 1}: ${v} reviewed, ${BAR_DATA_BG[i]} uploaded`}>
            <rect x={x} y={136 - h2} width={w} height={h2} fill="#DBEAFE" rx="4" />
            <rect x={x} y={136 - h1} width={w} height={h1} fill={C.primary} rx="4" />
          </g>
        );
      })}
    </svg>
  );
}

export function Dashboard() {
  const navigate = useNav();

  return (
    <div className="screen">
      <div className="app-shell">
        <Sidebar active="dashboard" />
        <Topbar
          title="Dashboard"
          crumb={<span>Mercy West Hospital · <b>Cardiology</b></span>}
          actions={<>
            <button type="button" className="btn btn-secondary btn-sm"><Ic.Calendar size={13} /> Today</button>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('upload')}>
              <Ic.Upload size={13} /> Upload ECG
            </button>
          </>}
        />

        <main className="content" aria-label="Dashboard">

          {/* ── Greeting banner ── */}
          <div style={{
            background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 60%, #0F766E 100%)',
            borderRadius: 14, padding: '20px 24px', marginBottom: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            color: '#fff',
          }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 650, letterSpacing: '-0.015em', marginBottom: 4 }}>
                Good morning, Dr. Mehta
              </div>
              <div style={{ fontSize: 13.5, opacity: 0.85 }}>
                <span style={{ background: 'rgba(255,255,255,.18)', borderRadius: 6, padding: '2px 8px', marginRight: 8, fontWeight: 600 }}>7 ECGs</span>
                awaiting review ·
                <span style={{ background: 'rgba(254,202,202,.25)', borderRadius: 6, padding: '2px 8px', margin: '0 8px', fontWeight: 600 }}>2 risk alerts</span>
                flagged overnight
              </div>
            </div>
            <div className="row gap-2" role="group" aria-label="Time range filter">
              {['Today', '7 days', '30 days'].map(label => (
                <button key={label} type="button"
                  style={{
                    padding: '5px 12px', borderRadius: 7, fontSize: 12.5, fontWeight: 550,
                    fontFamily: 'inherit', cursor: 'pointer', border: 'none',
                    background: label === 'Today' ? 'rgba(255,255,255,.25)' : 'rgba(255,255,255,.10)',
                    color: '#fff',
                  }}
                  aria-pressed={label === 'Today'}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Stat cards ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}
            role="list" aria-label="Summary statistics">
            {STAT_CARDS.map(s => {
              const IconC = Ic[s.icon];
              return (
                <div key={s.label} className="card" style={{ padding: '16px 18px' }} role="listitem">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, color: s.color, display: 'grid', placeItems: 'center' }} aria-hidden="true">
                      <IconC size={18} />
                    </div>
                    <span style={{
                      fontSize: 11.5, fontWeight: 600, padding: '3px 8px', borderRadius: 6,
                      background: s.down ? '#FEF2F2' : '#ECFDF3',
                      color: s.down ? '#B91C1C' : '#15803D',
                    }} aria-label={`Change: ${s.delta}`}>{s.delta}</span>
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 4 }} className="tnum">{s.value}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 11.5, color: C.text3 }}>{s.sub}</div>
                </div>
              );
            })}
          </div>

          {/* ── Main grid ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 14 }}>

            {/* Recent uploads */}
            <div className="card">
              <div className="card-hd">
                <div>
                  <div className="card-title">Recent ECG uploads</div>
                  <div className="card-sub">Last 24 hours</div>
                </div>
                <div className="row gap-2">
                  <button type="button" className="chip"><Ic.Filter size={12} /> All leads</button>
                  <button type="button" className="btn btn-ghost btn-sm" style={{ fontSize: 12 }} onClick={() => navigate('results')}>
                    View all <Ic.ChevronRight size={12} />
                  </button>
                </div>
              </div>
              <table className="table" aria-label="Recent ECG uploads">
                <thead>
                  <tr>
                    <th scope="col">Patient</th>
                    <th scope="col">Time</th>
                    <th scope="col">Lead II</th>
                    <th scope="col">Finding</th>
                    <th scope="col">Status</th>
                    <th scope="col"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_UPLOADS.map(r => (
                    <tr key={r.mrn}>
                      <td>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                          <div className="avatar slate" style={{ width: 30, height: 30, fontSize: 11 }} aria-hidden="true">
                            {r.name.split(' ').map(x => x[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>{r.name}</div>
                            <div style={{ fontSize: 11.5, color: C.text3 }} className="tnum">{r.age} · {r.mrn}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="tnum" style={{ fontWeight: 600, fontSize: 13 }}>{r.time}</div>
                        <div style={{ fontSize: 11, color: C.text3 }}>{r.dur}</div>
                      </td>
                      <td>
                        <EcgMini width={100} height={26} cycles={r.cycles} color={r.waveColor} label={`Lead II for ${r.name}`} />
                      </td>
                      <td>
                        <div style={{ fontWeight: 550, fontSize: 13 }}>{r.finding}</div>
                        <div style={{ fontSize: 11, color: C.text3 }} className="tnum">{r.conf}% confidence</div>
                      </td>
                      <td><StatusBadge status={r.status} /></td>
                      <td>
                        <button type="button" className="btn btn-ghost btn-sm btn-icon" aria-label={`Open ${r.name}`} onClick={() => navigate('results')}>
                          <Ic.ChevronRight size={14} color={C.text3} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Processing queue */}
              <div className="card">
                <div className="card-hd">
                  <div className="card-title">Processing queue</div>
                  <span className="badge badge-blue"><span className="dot" aria-hidden="true" />3 active</span>
                </div>
                <div style={{ padding: '8px 18px 14px' }} role="list" aria-label="Processing queue">
                  {QUEUE_ITEMS.map((q, i) => (
                    <div key={q.name} style={{ paddingTop: 12, borderTop: i === 0 ? 'none' : '1px solid #F1F3F7' }} role="listitem">
                      <div className="row between" style={{ marginBottom: 6 }}>
                        <div>
                          <div style={{ fontSize: 12.5, fontWeight: 600 }}>{q.name}</div>
                          <div style={{ fontSize: 11, color: C.text3, marginTop: 1 }}>{q.detail}</div>
                        </div>
                        <span className="tnum" style={{ fontSize: 12, fontWeight: 650, color: q.pct > 50 ? C.primary : C.text3 }}>{q.pct}%</span>
                      </div>
                      <div className="progress" role="progressbar" aria-valuenow={q.pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${q.name}: ${q.pct}%`}>
                        <div style={{ width: `${q.pct}%`, background: q.pct < 10 ? C.text3 : C.primary }} />
                      </div>
                      <div style={{ fontSize: 11, color: C.text3, marginTop: 4 }}>{q.state}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '10px 18px', borderTop: '1px solid #EEF0F4' }}>
                  <button type="button" className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('queue')}>
                    View full queue <Ic.ChevronRight size={12} />
                  </button>
                </div>
              </div>

              {/* Risk alerts */}
              <div className="card">
                <div className="card-hd">
                  <div className="card-title">Risk alerts</div>
                  <span className="badge badge-red"><span className="dot" aria-hidden="true" />2 new</span>
                </div>
                <div role="list" aria-label="Risk alerts">
                  {RISK_ALERTS.map((a, i) => (
                    <div key={a.name} role="listitem"
                      style={{ padding: '12px 18px', borderTop: i === 0 ? 'none' : '1px solid #EEF0F4', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 10, flexShrink: 0, display: 'grid', placeItems: 'center',
                        background: a.severity === 'high' ? '#FEF2F2' : C.amber50,
                        color: a.severity === 'high' ? '#B91C1C' : '#B45309',
                      }} aria-hidden="true">
                        <Ic.AlertTriangle size={16} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{a.name} · <span style={{ fontWeight: 400, color: C.text2 }}>{a.age}</span></div>
                        <div style={{ fontSize: 12, color: '#374151', marginTop: 1, lineHeight: 1.4 }}>{a.finding}</div>
                        <div style={{ fontSize: 11, color: C.text3, marginTop: 4 }} className="tnum">{a.time} · auto-flagged</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '10px 18px', borderTop: '1px solid #EEF0F4' }}>
                  <button type="button" className="btn btn-danger btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('patients')}>
                    Review alerts <Ic.ChevronRight size={12} />
                  </button>
                </div>
              </div>

              {/* Activity */}
              <div className="card">
                <div className="card-hd">
                  <div className="card-title">Activity</div>
                  <button type="button" style={{ fontSize: 12, color: C.primary, fontWeight: 550, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Full log</button>
                </div>
                <div style={{ padding: '8px 18px 14px' }} role="feed" aria-label="Recent activity">
                  {ACTIVITY.map(a => {
                    const IconC = Ic[a.icon];
                    return (
                      <div key={`${a.who}-${a.time}`} role="article"
                        style={{ display: 'grid', gridTemplateColumns: '28px 1fr auto', gap: 10, padding: '7px 0', alignItems: 'center' }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: '#F3F4F6', display: 'grid', placeItems: 'center', color: a.color }} aria-hidden="true">
                          <IconC size={13} />
                        </div>
                        <div style={{ fontSize: 12.5, color: '#374151', lineHeight: 1.45, minWidth: 0 }}>
                          <b style={{ color: C.text }}>{a.who}</b>{' '}{a.what}{' '}
                          <span style={{ color: C.text2 }}>{a.target}</span>
                        </div>
                        <time style={{ fontSize: 11, color: C.text3, whiteSpace: 'nowrap' }} className="tnum">{a.time}</time>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── Throughput chart ── */}
          <div className="card" style={{ marginTop: 14 }}>
            <div className="card-hd">
              <div className="card-title">Throughput · last 14 days</div>
              <div className="row gap-4" style={{ fontSize: 12, color: C.text2 }} aria-hidden="true">
                <div className="row gap-2">
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: C.primary, display: 'inline-block' }} />
                  Reviewed
                </div>
                <div className="row gap-2">
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: '#DBEAFE', display: 'inline-block' }} />
                  Uploaded
                </div>
              </div>
            </div>
            <div style={{ padding: '16px 20px 12px' }}>
              <ThroughputChart />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
