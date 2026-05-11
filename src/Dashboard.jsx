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
];

const STYLE_STATUS_BADGE = (status) => {
  const map = {
    urgent: { bg: '#FEF2F2', color: '#B91C1C' },
    normal: { bg: '#ECFDF3', color: '#15803D' },
    review: { bg: '#FFFAEB', color: '#B45309' },
    signed: { bg: '#F3F4F6', color: '#374151' },
  };
  const s = map[status] || map.signed;
  return { ...s, borderRadius: 999, padding: '2px 8px', fontSize: 11, fontWeight: 550, display: 'inline-flex', alignItems: 'center', gap: 4 };
};

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
            <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('upload')}>
              <Ic.Upload size={13} /> Upload ECG
            </button>
          </>}
        />

        <main className="content" aria-label="Dashboard">

          {/* ── Stat cards ── */}
          <div className="pg-stat-grid" role="list" aria-label="Summary statistics">
            {STAT_CARDS.map(s => {
              const IconC = Ic[s.icon];
              return (
                <div key={s.label} className="card" style={{ padding: '14px 16px' }} role="listitem">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: s.bg, color: s.color, display: 'grid', placeItems: 'center' }} aria-hidden="true">
                      <IconC size={16} />
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 5,
                      background: s.down ? '#FEF2F2' : '#ECFDF3',
                      color: s.down ? '#B91C1C' : '#15803D',
                    }}>{s.delta}</span>
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 2 }} className="tnum">{s.value}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: C.text, marginBottom: 1 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: C.text3 }}>{s.sub}</div>
                </div>
              );
            })}
          </div>

          {/* ── Recent uploads (full width) ── */}
          <div className="card">
            <div className="card-hd">
              <div>
                <div className="card-title">Recent ECG uploads</div>
                <div className="card-sub">Last 24 hours</div>
              </div>
              <button type="button" className="btn btn-ghost btn-sm" style={{ fontSize: 12 }} onClick={() => navigate('results')}>
                View all <Ic.ChevronRight size={12} />
              </button>
            </div>
            <div className="table-scroll">
            <table className="table" aria-label="Recent ECG uploads">
              <thead>
                <tr>
                  <th scope="col">Patient</th>
                  <th scope="col">Time</th>
                  <th scope="col">Rhythm</th>
                  <th scope="col">Finding</th>
                  <th scope="col">Status</th>
                  <th scope="col"><span className="sr-only">Open</span></th>
                </tr>
              </thead>
              <tbody>
                {RECENT_UPLOADS.map(r => (
                  <tr key={r.mrn}>
                    <td>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <div className="avatar slate" style={{ width: 28, height: 28, fontSize: 10 }} aria-hidden="true">
                          {r.name.split(' ').map(x => x[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 12.5 }}>{r.name}</div>
                          <div style={{ fontSize: 11, color: C.text3 }} className="tnum">{r.age} · {r.mrn}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="tnum" style={{ fontWeight: 600, fontSize: 12.5 }}>{r.time}</div>
                      <div style={{ fontSize: 10.5, color: C.text3 }}>{r.dur}</div>
                    </td>
                    <td>
                      <EcgMini width={80} height={22} cycles={r.cycles} color={r.waveColor} label={`Lead II for ${r.name}`} />
                    </td>
                    <td>
                      <div style={{ fontWeight: 550, fontSize: 12.5 }}>{r.finding}</div>
                      <div style={{ fontSize: 10.5, color: C.text3 }} className="tnum">{r.conf}% conf.</div>
                    </td>
                    <td><span style={STYLE_STATUS_BADGE(r.status)}>{r.status}</span></td>
                    <td>
                      <button type="button" className="btn btn-ghost btn-sm btn-icon" aria-label={`Open ${r.name}`} onClick={() => navigate('results')}>
                        <Ic.ChevronRight size={13} color={C.text3} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
