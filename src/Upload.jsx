import { Icons as Ic } from './Icons.jsx';
import { Sidebar, Topbar } from './Shell.jsx';
import { C } from './tokens.js';
import { useNav } from './NavContext.jsx';

const FILES = [
  { name: 'morgan_eleonor_20260511_0914.xml', size: '1.4 MB', state: 'validated', meta: '12-lead · 10s · Lead II detected' },
  { name: 'whitfield_james_20260511_0852.csv', size: '684 KB', state: 'uploading', meta: 'Encoding utf-8 · 5000 Hz', pct: 72 },
  { name: 'tanaka_aiko_20260511_0839.edf',     size: '3.2 MB', state: 'validated', meta: '12-lead · 30s · MUSE export' },
  { name: 'hofer_d_unknown.csv',               size: '212 KB', state: 'error',    meta: 'Missing patient MRN field · review headers' },
];

const RECENT_BATCHES = [
  { name: 'ED · overnight',    records: '12 records', time: '3:14 AM' },
  { name: 'Outpatient · Mon',  records: '38 records', time: 'Mon' },
  { name: 'ICU · weekly',      records: '6 records',  time: 'Sun' },
];

const BATCH_FIELDS = [
  ['Acquisition site',   'Mercy West · ED Bay 3'],
  ['Sampling rate',      '500 Hz'],
  ['Lead configuration', 'Standard 12-lead'],
  ['Assign reviewer',    'Dr. Riya Mehta (you)'],
  ['Priority',           'Standard'],
];

function FileStatusBadge({ state }) {
  if (state === 'validated') return <span className="badge badge-green"><Ic.Check size={11} /> Validated</span>;
  if (state === 'uploading') return <span className="badge badge-blue"><span className="dot" aria-hidden="true" />Uploading</span>;
  return <span className="badge badge-red"><Ic.AlertTriangle size={11} /> Action needed</span>;
}

export function Upload() {
  const navigate = useNav();
  return (
    <div className="screen">
      <div className="app-shell">
        <Sidebar active="upload" />
        <Topbar
          title="Upload ECG"
          crumb={<span>Workspace · <b>Upload</b></span>}
          actions={<button type="button" className="btn btn-secondary btn-sm"><Ic.RefreshCw size={14} /> Sync from MUSE</button>}
        />
        <main className="content" aria-label="Upload ECG recordings">
          <div className="pg-2col pg-2col-wide">
            <div>
              <h2 className="page-title">Upload ECG recordings</h2>
              <p className="page-sub">
                Drop one or more files, or sync directly from an integrated acquisition device.
                Files are validated, de-identified per policy, and queued for analysis.
              </p>

              {/* Drop zone */}
              <div
                className="dropzone"
                style={{ padding: '48px 28px', position: 'relative' }}
                role="region"
                aria-label="File upload area — drag and drop ECG files here, or click to browse"
              >
                <div style={{ width: 56, height: 56, borderRadius: 14, background: '#fff', boxShadow: '0 2px 6px rgba(37,99,235,.12)', display: 'grid', placeItems: 'center', margin: '0 auto 14px', color: C.primary }} aria-hidden="true">
                  <Ic.Upload size={24} />
                </div>
                <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, marginTop: 0 }}>Drag &amp; drop ECG files here</p>
                <p style={{ fontSize: 13, color: C.text2, marginBottom: 16, marginTop: 0 }}>or click to browse from your computer</p>
                <button type="button" className="btn btn-primary">Select files</button>
                <div style={{ marginTop: 20, display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }} aria-label="Accepted file formats">
                  {['CSV', 'XLSX', 'XML', 'EDF', 'SCP-ECG', 'DICOM-ECG', 'MUSE XML'].map(fmt => (
                    <span key={fmt} className="badge badge-outline" style={{ fontWeight: 500 }}>{fmt}</span>
                  ))}
                </div>
                <p style={{ fontSize: 11.5, color: C.text3, marginTop: 14, marginBottom: 0 }}>
                  Up to 250 MB per file · 50 files per batch · 12-lead recordings only
                </p>
              </div>

              {/* File list */}
              <div className="card" style={{ marginTop: 18 }}>
                <div className="card-hd">
                  <div className="card-title">In this batch · 4 files</div>
                  <div className="row gap-2">
                    <span className="badge badge-green"><Ic.Check size={11} /> 3 validated</span>
                    <span className="badge badge-amber"><span className="dot" aria-hidden="true" />1 needs attention</span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} aria-label="Files in this batch">
                  {FILES.map(f => (
                    <li key={f.name} style={{ display: 'grid', gridTemplateColumns: '36px 1fr auto', gap: 14, padding: '14px 18px', borderTop: '1px solid #EEF0F4', alignItems: 'center' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#F3F4F6', display: 'grid', placeItems: 'center', color: C.text2 }} aria-hidden="true">
                        <Ic.FileText size={16} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div className="row between" style={{ marginBottom: 3 }}>
                          <div style={{ fontWeight: 600, fontSize: 13.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</div>
                          <div className="tnum" style={{ fontSize: 11.5, color: C.text3, marginLeft: 10 }}>{f.size}</div>
                        </div>
                        {f.state === 'uploading' && (
                          <>
                            <div
                              className="progress"
                              role="progressbar"
                              aria-valuenow={f.pct}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-label={`Uploading ${f.name}: ${f.pct}%`}
                            >
                              <div style={{ width: `${f.pct}%` }} />
                            </div>
                            <div style={{ fontSize: 11.5, color: C.text2, marginTop: 5 }}>Uploading · {f.pct}% · {f.meta}</div>
                          </>
                        )}
                        {f.state === 'validated' && <div style={{ fontSize: 11.5, color: C.text2 }}>{f.meta}</div>}
                        {f.state === 'error'     && <div style={{ fontSize: 11.5, color: '#B91C1C' }} role="alert">{f.meta}</div>}
                      </div>
                      <FileStatusBadge state={f.state} />
                    </li>
                  ))}
                </ul>
                <div style={{ padding: '12px 18px', borderTop: '1px solid #EEF0F4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 12, color: C.text2 }}>3 ready to process · 1 needs review</div>
                  <div className="row gap-2">
                    <button type="button" className="btn btn-ghost btn-sm">Cancel</button>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('queue')}>Process 3 records <Ic.ArrowRight size={13} /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="card card-pad">
                <div className="row gap-3" style={{ marginBottom: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: C.teal50, color: '#0F766E', display: 'grid', placeItems: 'center' }} aria-hidden="true"><Ic.ShieldCheck size={16} /></div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>De-identification policy</div>
                </div>
                <p style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.55, marginBottom: 12, marginTop: 0 }}>
                  Patient identifiers are stripped before files leave your network. Mapping is held in your hospital's keystore.
                </p>
                <div className="row gap-2" role="group" aria-label="De-identification mode">
                  <button type="button" className="chip active" aria-pressed="true">PHI redacted</button>
                  <button type="button" className="chip" aria-pressed="false">PHI passthrough</button>
                </div>
              </div>

              <div className="card">
                <div className="card-hd"><div className="card-title">Batch settings</div></div>
                <dl style={{ padding: '14px 18px', margin: 0 }}>
                  {BATCH_FIELDS.map(([label, value]) => (
                    <div key={label} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', padding: '7px 0', borderBottom: '1px dashed #F1F3F7', fontSize: 12.5 }}>
                      <dt style={{ color: C.text2 }}>{label}</dt>
                      <dd style={{ margin: 0, color: C.text, fontWeight: 500 }}>
                        {value} <Ic.ChevronDown size={11} style={{ verticalAlign: 'middle', marginLeft: 4, color: C.text3 }} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="card card-pad">
                <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>Recent batches</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {RECENT_BATCHES.map((b, i) => (
                    <li key={b.name} className="row between" style={{ padding: '8px 0', borderTop: i === 0 ? '0' : '1px solid #F1F3F7' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 550 }}>{b.name}</div>
                        <div style={{ fontSize: 11.5, color: C.text3 }}>{b.records}</div>
                      </div>
                      <div className="row gap-2">
                        <time style={{ fontSize: 11.5, color: C.text3 }} className="tnum">{b.time}</time>
                        <Ic.Check size={14} color={C.green} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
