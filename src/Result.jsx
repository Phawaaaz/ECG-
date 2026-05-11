import { useState } from 'react';
import { Icons as Ic } from './Icons.jsx';
import { EcgMultiLead } from './Ecg.jsx';
import { Sidebar, Topbar } from './Shell.jsx';
import { C } from './tokens.js';

const PATIENT_META = [
  ['Encounter',  'ED · Bay 3'],
  ['Recorded',   '11 May 2026 · 09:14'],
  ['Device',     'MUSE NX'],
  ['Indication', 'Palpitations'],
  ['Ordering',   'Dr. K. Park'],
];

const MEASUREMENTS = [
  { label: 'Heart rate',   value: '78',       unit: 'bpm', ref: '60–100',       ok: true },
  { label: 'PR interval',  value: '204',       unit: 'ms',  ref: '120–200',      ok: false },
  { label: 'QRS duration', value: '92',        unit: 'ms',  ref: '70–110',       ok: true },
  { label: 'QT / QTc',    value: '384 / 438', unit: 'ms',  ref: '<440',         ok: true },
  { label: 'P axis',       value: '+62°',      unit: '',    ref: '+45–75°',      ok: true },
  { label: 'QRS axis',     value: '+38°',      unit: '',    ref: '–30 to +90°',  ok: true },
];

const AI_CLASSES = [
  { label: '1° AV block',  conf: '94%', badgeClass: 'badge-blue' },
  { label: 'Sinus rhythm', conf: '98%', badgeClass: 'badge-green' },
  { label: 'AFib',         conf: '<1%', badgeClass: 'badge-slate' },
];

const ANNOTATIONS = [
  { text: 'P wave OK',        badgeClass: 'badge-green' },
  { text: 'PR prolonged',     badgeClass: 'badge-amber' },
  { text: 'Normal QRS axis',  badgeClass: 'badge-green' },
  { text: 'No ST elevation',  badgeClass: 'badge-green' },
  { text: 'Inverted T (aVR)', badgeClass: 'badge-slate' },
  { text: 'Regular RR',       badgeClass: 'badge-green' },
];

const VIEW_TABS = ['3-Lead', '12-Lead', 'Rhythm strip'];

const LEADS_BY_TAB = {
  '3-Lead':       ['Lead I', 'Lead II', 'Lead V1'],
  '12-Lead':      ['Lead I', 'Lead II', 'Lead III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6'],
  'Rhythm strip': ['Lead II'],
};

export function Result() {
  const [activeTab, setActiveTab] = useState('3-Lead');

  const leads = LEADS_BY_TAB[activeTab];

  return (
    <div className="screen">
      <div className="app-shell">
        <Sidebar active="results" />
        <Topbar
          title="ECG #R-2841 · Eleanor Morgan"
          crumb={<span>Results · <b>R-2841</b></span>}
          actions={<>
            <button type="button" className="btn btn-secondary btn-sm"><Ic.Printer size={13} /> Print</button>
            <button type="button" className="btn btn-secondary btn-sm"><Ic.Share size={13} /> Share</button>
            <button type="button" className="btn btn-primary btn-sm"><Ic.Download size={13} /> Export report</button>
          </>}
        />
        <main className="content" aria-label="ECG result for Eleanor Morgan">

          {/* Patient meta strip */}
          <div className="card" style={{ padding: '14px 18px', marginBottom: 14, display: 'grid', gridTemplateColumns: 'auto 1px 1fr auto', gap: 18, alignItems: 'center' }}>
            <div className="row gap-3">
              <div className="avatar" style={{ width: 40, height: 40, fontSize: 14 }} aria-hidden="true">EM</div>
              <div>
                <div style={{ fontWeight: 650, fontSize: 15 }}>Eleanor Morgan</div>
                <div style={{ fontSize: 12, color: C.text2 }} className="tnum">64F · DOB 14 Jul 1961 · MRN 00482-913</div>
              </div>
            </div>
            <div style={{ width: 1, height: 36, background: C.border2 }} aria-hidden="true" />
            <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, margin: 0 }}>
              {PATIENT_META.map(([l, v]) => (
                <div key={l}>
                  <dt style={{ fontSize: 10.5, color: C.text3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em' }}>{l}</dt>
                  <dd style={{ margin: 0, fontSize: 12.5, color: C.text, fontWeight: 500, marginTop: 2 }}>{v}</dd>
                </div>
              ))}
            </dl>
            <span className="badge badge-amber"><span className="dot" aria-hidden="true" />Awaiting sign-off</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 14 }}>
            {/* ECG viewer */}
            <div className="card" style={{ overflow: 'hidden' }}>
              <div className="card-hd">
                <div className="row gap-3">
                  <div className="card-title">12-lead ECG</div>
                  <div
                    className="tabs"
                    style={{ border: 'none' }}
                    role="tablist"
                    aria-label="ECG view"
                  >
                    {VIEW_TABS.map(tab => (
                      <button
                        key={tab}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab}
                        aria-controls={`panel-${tab.replace(/\s+/g, '-').toLowerCase()}`}
                        id={`tab-${tab.replace(/\s+/g, '-').toLowerCase()}`}
                        className={`tab${activeTab === tab ? ' active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="row gap-2">
                  <span className="chip"><Ic.Move size={12} /> Calipers</span>
                  <span className="chip">25 mm/s · 10 mm/mV <Ic.ChevronDown size={11} /></span>
                </div>
              </div>

              <div
                role="tabpanel"
                id={`panel-${activeTab.replace(/\s+/g, '-').toLowerCase()}`}
                aria-labelledby={`tab-${activeTab.replace(/\s+/g, '-').toLowerCase()}`}
                style={{ padding: 0 }}
              >
                <EcgMultiLead
                  width={700}
                  leadHeight={activeTab === 'Rhythm strip' ? 120 : activeTab === '12-Lead' ? 76 : 132}
                  leads={leads}
                  label={`${activeTab} ECG view for Eleanor Morgan`}
                />
              </div>

              <div style={{ padding: '12px 18px', borderTop: `1px solid ${C.border2}`, background: '#FAFBFD', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: C.text2 }}>
                <div className="row gap-3">
                  <span><b style={{ color: C.text }}>10s strip</b> · 5000 samples/s</span>
                  <span aria-hidden="true" className="dot-divider" />
                  <span>Filter: 0.05–150 Hz · 60 Hz notch on</span>
                </div>
                <div className="row gap-3">
                  <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.primary, fontWeight: 550, fontSize: 12, fontFamily: 'inherit', padding: 0 }}>Reset view</button>
                  <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.primary, fontWeight: 550, fontSize: 12, fontFamily: 'inherit', padding: 0 }}>Compare to previous</button>
                </div>
              </div>

              {/* Annotations */}
              <div style={{ padding: '14px 18px', borderTop: `1px solid ${C.border2}` }}>
                <div className="row between" style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>Annotations</div>
                  <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.primary, fontWeight: 550, fontSize: 12, fontFamily: 'inherit', padding: 0 }}>Add note</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }} role="list" aria-label="ECG annotations">
                  {ANNOTATIONS.map(a => (
                    <span key={a.text} role="listitem" className={`badge ${a.badgeClass}`} style={{ fontWeight: 500 }}>
                      <span className="dot" aria-hidden="true" />{a.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Findings column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Clinical measurements */}
              <div className="card">
                <div className="card-hd">
                  <div className="card-title">Clinical findings</div>
                  <span className="badge badge-slate">Computer-aided</span>
                </div>
                <div style={{ padding: '14px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {MEASUREMENTS.map(m => (
                    <div
                      key={m.label}
                      style={{ padding: '10px 12px', border: `1px solid ${C.border2}`, borderRadius: 10, background: m.ok ? '#fff' : C.amber50 }}
                    >
                      <div style={{ fontSize: 10.5, color: C.text3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em' }}>{m.label}</div>
                      <div className="row between" style={{ marginTop: 2 }}>
                        <div className="tnum" style={{ fontSize: 18, fontWeight: 650, letterSpacing: '-0.01em' }}>
                          {m.value}<span style={{ fontSize: 11, color: C.text3, fontWeight: 500, marginLeft: 3 }}>{m.unit}</span>
                        </div>
                        {!m.ok && <span className="badge badge-amber" style={{ fontSize: 10 }}>↑ above ref</span>}
                      </div>
                      <div style={{ fontSize: 11, color: C.text3, marginTop: 2 }} className="tnum">ref {m.ref}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI interpretation */}
              <div className="card">
                <div className="card-hd">
                  <div className="card-title">AI interpretation</div>
                  <div className="row gap-2">
                    <Ic.Sparkle size={13} color={C.primary} />
                    <span style={{ fontSize: 12, color: C.primary, fontWeight: 600 }}>cardio-rnn v3.2</span>
                  </div>
                </div>
                <div style={{ padding: '14px 18px' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>
                    Sinus rhythm with first-degree AV block.
                  </div>
                  <p style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.55, marginBottom: 12, marginTop: 0 }}>
                    Regular sinus rhythm, rate 78 bpm. PR interval prolonged at 204 ms (1° AV block). No ST-segment elevation. T-wave morphology preserved across precordial leads. No criteria for chamber enlargement.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 12 }}>
                    {AI_CLASSES.map(c => (
                      <div key={c.label} style={{ padding: 8, border: `1px solid ${C.border2}`, borderRadius: 8 }}>
                        <div style={{ fontSize: 11.5, color: C.text2 }}>{c.label}</div>
                        <div className="tnum" style={{ fontWeight: 650, marginTop: 2 }}>{c.conf}</div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 11.5, color: C.text3, margin: 0 }}>
                    Decision-support output. Final interpretation is the responsibility of the reviewing clinician.
                  </p>
                </div>
              </div>

              {/* Clinician note */}
              <div className="card">
                <div className="card-hd"><div className="card-title">Clinician note</div></div>
                <div style={{ padding: '12px 18px' }}>
                  <label className="sr-only" htmlFor="clinician-note">Clinician note</label>
                  <textarea
                    id="clinician-note"
                    className="input"
                    style={{ minHeight: 70, fontSize: 13, lineHeight: 1.5 }}
                    defaultValue="Findings consistent with 1° AV block — likely chronic given baseline ECG from 2023. Continue current med list, no urgent intervention."
                  />
                  <div className="row between" style={{ marginTop: 10 }}>
                    <div className="row gap-2">
                      <span className="chip">@ Dr. Park</span>
                      <span className="chip"># follow-up</span>
                    </div>
                    <button type="button" className="btn btn-primary btn-sm">
                      <Ic.ClipboardCheck size={13} /> Sign &amp; file
                    </button>
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
