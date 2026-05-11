import { Icons as Ic } from './Icons.jsx';
import { EcgMini } from './Ecg.jsx';
import { Sidebar, Topbar } from './Shell.jsx';
import { C } from './tokens.js';
import { useNav } from './NavContext.jsx';

const STAT_CARDS = [
  { label: 'ECGs reviewed',    value: '38',    delta: '+12%',         icon: 'Activity',      color: C.primary,  bg: C.primary50, sub: 'vs. last 24h',      down: false },
  { label: 'Awaiting review',  value: '7',     delta: '–3',           icon: 'Clock',         color: '#B45309',  bg: C.amber50,   sub: '2 marked urgent',    down: false },
  { label: 'Risk alerts',      value: '2',     delta: '+1',           icon: 'AlertTriangle', color: '#B91C1C',  bg: C.red50,     sub: 'AFib · STEMI',       down: true },
  { label: 'Avg. turnaround',  value: '4m 18s', delta: '–22%',        icon: 'Zap',           color: '#0F766E',  bg: C.teal50,    sub: 'across 38 reports',  down: false },
];

const RECENT_UPLOADS = [
  { name: 'Eleanor Morgan',   mrn: '00482-913', age: '64F', time: '09:14', dur: '12s ago', cycles: 5, finding: '1° AV block',   conf: 94, status: 'review', waveColor: C.red },
  { name: 'James Whitfield',  mrn: '00318-220', age: '57M', time: '08:52', dur: '38m ago', cycles: 4, finding: 'Sinus rhythm', conf: 98, status: 'normal', waveColor: C.green },
  { name: 'Aiko Tanaka',      mrn: '00591-014', age: '71F', time: '08:39', dur: '51m ago', cycles: 6, finding: 'AFib · irregular', conf: 91, status: 'urgent', waveColor: C.red },
  { name: 'Marcus Ellington', mrn: '00427-771', age: '46M', time: '08:21', dur: '1h ago',  cycles: 5, finding: 'Sinus brady',  conf: 89, status: 'review', waveColor: C.amber },
  { name: 'Priya Shah',       mrn: '00611-553', age: '38F', time: '08:02', dur: '1h ago',  cycles: 5, finding: 'Sinus rhythm', conf: 97, status: 'signed', waveColor: C.green },
  { name: 'David Reyes',      mrn: '00204-119', age: '69M', time: '07:48', dur: '1h ago',  cycles: 4, finding: 'LVH criteria', conf: 86, status: 'review', waveColor: C.amber },
];

const QUEUE_ITEMS = [
  { name: 'Batch · ED Triage (12 records)', state: 'Feature extraction',    pct: 64 },
  { name: 'Sofia Ng · MRN 00712-446',       state: 'Rhythm classification', pct: 82 },
  { name: 'Daniel Hofer · MRN 00198-005',   state: 'Queued',               pct: 4  },
];

const RISK_ALERTS = [
  { name: 'Aiko Tanaka · 71F',      finding: 'Atrial fibrillation · rapid ventricular response', time: '08:39', severity: 'high' },
  { name: 'Marcus Ellington · 46M', finding: 'Sinus bradycardia · HR 42 bpm',                    time: '08:21', severity: 'med' },
];

const ACTIVITY = [
  { who: 'Dr. Mehta', what: 'signed report',           target: '#R-2841 · E. Morgan',       time: 'just now', icon: 'Check',         color: C.green },
  { who: 'AI',        what: 'flagged AFib in',         target: 'A. Tanaka · MRN 00591-014', time: '6m',       icon: 'AlertTriangle', color: C.red },
  { who: 'Dr. Park',  what: 'added clinician note to', target: '#R-2839 · J. Whitfield',    time: '14m',      icon: 'Edit',          color: C.primary },
  { who: 'System',    what: 'imported 12 ECGs from',   target: 'MUSE — ED bay 3',           time: '32m',      icon: 'Database',      color: C.text2 },
  { who: 'Dr. Mehta', what: 'opened patient chart',    target: 'D. Reyes · MRN 00204-119', time: '48m',      icon: 'Users',         color: C.text2 },
];

const BAR_DATA     = [22, 18, 26, 30, 24, 32, 28, 34, 30, 38, 36, 42, 40, 38];
const BAR_DATA_BG  = [28, 24, 32, 35, 30, 38, 34, 40, 38, 46, 44, 52, 50, 48];

function StatusBadge({ status }) {
  if (status === 'urgent') return <span className="badge badge-red"><span className="dot" aria-hidden="true" />Urgent</span>;
  if (status === 'normal') return <span className="badge badge-green"><span className="dot" aria-hidden="true" />Normal</span>;
  if (status === 'review') return <span className="badge badge-amber"><span className="dot" aria-hidden="true" />Review</span>;
  return <span className="badge badge-slate"><span className="dot" style={{ background: '#9CA3AF' }} aria-hidden="true" />Signed</span>;
}

function ThroughputChart() {
  const max = 60;
  return (
    <svg width="100%" viewBox="0 0 700 180" preserveAspectRatio="none" style={{ display: 'block' }} role="img" aria-label="ECG throughput chart over the last 14 days">
      {[0, 1, 2, 3, 4].map(i => <line key={i} x1="36" x2="700" y1={i * 36 + 6} y2={i * 36 + 6} stroke="#F1F3F7" />)}
      {[60, 45, 30, 15, 0].map((v, i) => <text key={v} x="0" y={i * 36 + 10} fill="#9CA3AF" fontSize="10" fontFamily="ui-monospace, monospace">{v}</text>)}
      {BAR_DATA.map((v, i) => {
        const w = 28, gap = 18, x = 50 + i * (w + gap);
        const h2 = (BAR_DATA_BG[i] / max) * 150;
        const h1 = (v / max) * 150;
        return (
          <g key={i} aria-label={`Day ${i + 1}: ${v} reviewed, ${BAR_DATA_BG[i]} uploaded`}>
            <rect x={x} y={156 - h2} width={w} height={h2} fill="#DBEAFE" rx="3" />
            <rect x={x} y={156 - h1} width={w} height={h1} fill="#2563EB" rx="3" />
            <text x={x + w / 2} y="172" textAnchor="middle" fontSize="10" fill="#9CA3AF">{i + 1}</text>
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
            <button type="button" className="btn btn-secondary btn-sm"><Ic.Calendar size={14} /> Today</button>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('upload')}><Ic.Upload size={14} /> Upload ECG</button>
          </>}
        />
        <main className="content" aria-label="Dashboard">

          {/* Greeting */}
          <div className="row between" style={{ marginBottom: 18 }}>
            <div>
              <h2 className="page-title" style={{ marginBottom: 2 }}>Good morning, Dr. Mehta</h2>
              <p className="page-sub" style={{ marginBottom: 0 }}>
                You have <b style={{ color: C.text }}>7 ECGs</b> awaiting review and <b style={{ color: '#B91C1C' }}>2 risk alerts</b> flagged overnight.
              </p>
            </div>
            <div className="row gap-2" role="group" aria-label="Time range filter">
              {['Today', '7 days', '30 days'].map(label => (
                <button key={label} type="button" className={`chip${label === 'Today' ? ' active' : ''}`} aria-pressed={label === 'Today'}>{label}</button>
              ))}
              <button type="button" className="chip"><Ic.Calendar size={12} /> Custom</button>
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 18 }} role="list" aria-label="Summary statistics">
            {STAT_CARDS.map(s => {
              const IconC = Ic[s.icon];
              return (
                <div key={s.label} className="card card-pad" role="listitem">
                  <div className="row between" style={{ marginBottom: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: s.bg, color: s.color, display: 'grid', placeItems: 'center' }} aria-hidden="true">
                      <IconC size={17} />
                    </div>
                    <span className={`badge ${s.down ? 'badge-red' : 'badge-green'}`} style={{ fontSize: 11 }} aria-label={`Change: ${s.delta}`}>{s.delta}</span>
                  </div>
                  <div className="stat">
                    <div className="v tnum">{s.value}</div>
                    <div style={{ fontSize: 12.5, color: '#374151', fontWeight: 550 }}>{s.label}</div>
                    <div style={{ fontSize: 11.5, color: C.text3, marginTop: 2 }}>{s.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 14 }}>

            {/* Recent uploads table */}
            <div className="card">
              <div className="card-hd">
                <div>
                  <div className="card-title">Recent ECG uploads</div>
                  <div className="card-sub">Last 24 hours</div>
                </div>
                <div className="row gap-2">
                  <button type="button" className="chip"><Ic.Filter size={12} /> All leads</button>
                  <button type="button" className="chip">View all <Ic.ChevronRight size={12} /></button>
                </div>
              </div>
              <table className="table" aria-label="Recent ECG uploads">
                <caption className="sr-only">Recent ECG uploads from the last 24 hours</caption>
                <thead>
                  <tr>
                    <th scope="col">Patient</th>
                    <th scope="col">Recorded</th>
                    <th scope="col">Lead II preview</th>
                    <th scope="col">AI finding</th>
                    <th scope="col">Status</th>
                    <th scope="col"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_UPLOADS.map(r => (
                    <tr key={r.mrn}>
                      <td>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                          <div className="avatar slate" style={{ width: 28, height: 28, fontSize: 11 }} aria-hidden="true">
                            {r.name.split(' ').map(x => x[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{r.name}</div>
                            <div style={{ fontSize: 11.5, color: C.text2 }} className="tnum">{r.age} · MRN {r.mrn}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="tnum" style={{ fontWeight: 550 }}>{r.time}</div>
                        <div style={{ fontSize: 11, color: C.text3 }}>{r.dur}</div>
                      </td>
                      <td><EcgMini width={110} height={28} cycles={r.cycles} color={r.waveColor} label={`Lead II preview for ${r.name}`} /></td>
                      <td>
                        <div style={{ fontWeight: 550 }}>{r.finding}</div>
                        <div style={{ fontSize: 11, color: C.text3 }} className="tnum">Conf. {r.conf}%</div>
                      </td>
                      <td><StatusBadge status={r.status} /></td>
                      <td style={{ textAlign: 'right' }}>
                        <button type="button" className="btn btn-ghost btn-sm btn-icon" aria-label={`Open ECG record for ${r.name}`}>
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
                <div style={{ padding: '4px 18px 16px' }} role="list" aria-label="Processing queue">
                  {QUEUE_ITEMS.map(q => (
                    <div key={q.name} style={{ paddingTop: 14 }} role="listitem">
                      <div className="row between" style={{ marginBottom: 6 }}>
                        <div style={{ fontSize: 13, fontWeight: 550 }}>{q.name}</div>
                        <div className="tnum" style={{ fontSize: 12, color: C.text2, fontWeight: 550 }}>{q.pct}%</div>
                      </div>
                      <div className="progress" role="progressbar" aria-valuenow={q.pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${q.name}: ${q.pct}% complete`}>
                        <div style={{ width: `${q.pct}%`, background: q.pct < 10 ? '#9CA3AF' : C.primary }} />
                      </div>
                      <div style={{ fontSize: 11.5, color: C.text3, marginTop: 5 }}>{q.state}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk alerts */}
              <div className="card">
                <div className="card-hd">
                  <div className="card-title">Risk alerts</div>
                  <button type="button" style={{ fontSize: 12, color: C.primary, fontWeight: 550, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>View all</button>
                </div>
                <div style={{ padding: '6px 0' }} role="list" aria-label="Risk alerts">
                  {RISK_ALERTS.map((a, i) => (
                    <div key={a.name} style={{ padding: '12px 18px', borderTop: i === 0 ? '0' : '1px solid #EEF0F4', display: 'flex', gap: 12 }} role="listitem">
                      <div style={{ width: 32, height: 32, borderRadius: 9, background: a.severity === 'high' ? C.red50 : C.amber50, color: a.severity === 'high' ? '#B91C1C' : '#B45309', display: 'grid', placeItems: 'center', flexShrink: 0 }} aria-hidden="true">
                        <Ic.AlertTriangle size={16} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{a.name}</div>
                        <div style={{ fontSize: 12, color: C.text2 }}>{a.finding}</div>
                        <div style={{ fontSize: 11.5, color: C.text3, marginTop: 4 }} className="tnum">{a.time} · auto-flagged</div>
                      </div>
                      <button type="button" className="btn btn-secondary btn-sm">Open</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 14, marginTop: 14 }}>

            {/* Throughput chart */}
            <div className="card">
              <div className="card-hd">
                <div className="card-title">Throughput · last 14 days</div>
                <div className="row gap-3" style={{ fontSize: 11.5, color: C.text2 }} aria-hidden="true">
                  <div className="row gap-2"><span style={{ width: 8, height: 8, borderRadius: 2, background: C.primary, display: 'inline-block' }} />Reviewed</div>
                  <div className="row gap-2"><span style={{ width: 8, height: 8, borderRadius: 2, background: '#DBEAFE', display: 'inline-block' }} />Uploaded</div>
                </div>
              </div>
              <div style={{ padding: 18 }}><ThroughputChart /></div>
            </div>

            {/* Activity feed */}
            <div className="card">
              <div className="card-hd">
                <div className="card-title">Activity</div>
                <button type="button" style={{ fontSize: 12, color: C.primary, fontWeight: 550, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Full log</button>
              </div>
              <div style={{ padding: '12px 18px 14px' }} role="feed" aria-label="Recent activity">
                {ACTIVITY.map(a => {
                  const IconC = Ic[a.icon];
                  return (
                    <div key={`${a.who}-${a.time}`} style={{ display: 'grid', gridTemplateColumns: '24px 1fr auto', gap: 12, padding: '7px 0', alignItems: 'flex-start' }} role="article">
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#F3F4F6', display: 'grid', placeItems: 'center', color: a.color }} aria-hidden="true">
                        <IconC size={12} />
                      </div>
                      <div style={{ fontSize: 12.5, color: '#374151', lineHeight: 1.5 }}>
                        <b style={{ color: C.text }}>{a.who}</b> {a.what} <span style={{ color: C.text2 }}>{a.target}</span>
                      </div>
                      <time style={{ fontSize: 11, color: C.text3 }} className="tnum">{a.time}</time>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
