import { Icons as Ic } from './Icons.jsx';
import { EcgMultiLead } from './Ecg.jsx';
import { Sidebar, Topbar } from './Shell.jsx';
import { C } from './tokens.js';

const PATIENT_FIELDS = [
  ['Patient',        'Eleanor Morgan'],
  ['MRN',            '00482-913'],
  ['DOB / Age / Sex','14 Jul 1961 · 64 · F'],
  ['Recorded',       '11 May 2026 · 09:14'],
  ['Encounter',      'ED · Bay 3 · MUSE NX'],
  ['Indication',     'Palpitations'],
  ['Ordering MD',    'Dr. K. Park'],
  ['Reviewing MD',   'Dr. R. Mehta, MD'],
  ['Status',         'Awaiting signature'],
];

const MEASUREMENTS = [
  ['Heart rate',    '78 bpm',      '60–100'],
  ['PR interval',   '204 ms ⚑',   '120–200'],
  ['QRS duration',  '92 ms',       '70–110'],
  ['QT / QTc',      '384 / 438 ms','<440'],
  ['P axis',        '+62°',        '+45–75'],
  ['QRS axis',      '+38°',        '–30 to +90'],
];

const SECTIONS = [
  ['Patient demographics',         true],
  ['Measurements & intervals',     true],
  ['AI interpretation summary',    true],
  ['12-lead waveform',             true],
  ['Clinician notes',              true],
  ['Comparison to prior ECG',      false],
  ['Audit trail',                  true],
];

const SEND_TARGETS = [
  { name: 'Epic EHR · Mercy West',    sub: 'Auto-attach to encounter', status: 'Connected', color: 'badge-green' },
  { name: 'Dr. K. Park (ordering)',   sub: 'k.park@mercywest.health',  status: 'Secure email', color: 'badge-blue' },
  { name: 'Patient portal',           sub: 'opt-in required',          status: 'Off',      color: 'badge-slate' },
];

export function Report() {
  return (
    <div className="screen">
      <div className="app-shell">
        <Sidebar active="reports" />
        <Topbar
          title="Export report · #R-2841"
          crumb={<span>Reports · <b>R-2841 · Morgan, E.</b></span>}
          actions={<>
            <button type="button" className="btn btn-secondary btn-sm"><Ic.Printer size={13} /> Print</button>
            <button type="button" className="btn btn-primary btn-sm"><Ic.Download size={13} /> Download PDF</button>
          </>}
        />
        <main className="content" style={{ background: '#EEF1F5' }} aria-label="Report export for R-2841">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18 }}>

            {/* PDF preview */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <article
                style={{ width: 720, background: '#fff', boxShadow: '0 8px 30px -8px rgba(15,23,42,.18)', borderRadius: 6, overflow: 'hidden' }}
                aria-label="Report preview"
              >
                <div style={{ padding: '28px 36px' }}>

                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #111827', paddingBottom: 14, marginBottom: 18 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div style={{ width: 30, height: 30, borderRadius: 6, background: C.primary, display: 'grid', placeItems: 'center' }} aria-hidden="true">
                        <Ic.Heart size={16} color="#fff" />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.005em' }}>Mercy West Hospital</div>
                        <div style={{ fontSize: 10.5, color: C.text2 }}>Department of Cardiology · 14 Westbridge Ave, Portland OR</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: C.primary, letterSpacing: '.05em', textTransform: 'uppercase' }}>ECG Clinical Report</div>
                      <div className="tnum" style={{ fontSize: 11, color: C.text2, marginTop: 2 }}>Report #R-2841 · v1</div>
                    </div>
                  </div>

                  {/* Patient block */}
                  <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: '10px 0 14px', borderBottom: '1px solid #E5E7EB', marginBottom: 14, fontSize: 11, margin: '0 0 14px' }}>
                    {PATIENT_FIELDS.map(([l, v]) => (
                      <div key={l} style={{ padding: '4px 0' }}>
                        <dt style={{ fontSize: 9.5, color: C.text3, textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 600 }}>{l}</dt>
                        <dd style={{ margin: 0, fontSize: 11, color: C.text, marginTop: 2, fontWeight: 500 }}>{v}</dd>
                      </div>
                    ))}
                  </dl>

                  {/* Measurements + Interpretation */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 16, marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 10.5, color: C.primary, textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 700, marginBottom: 6 }}>Measurements</div>
                      <table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse' }} aria-label="ECG measurements">
                        <thead className="sr-only">
                          <tr>
                            <th scope="col">Parameter</th>
                            <th scope="col">Value</th>
                            <th scope="col">Reference range</th>
                          </tr>
                        </thead>
                        <tbody>
                          {MEASUREMENTS.map(([name, value, ref]) => (
                            <tr key={name}>
                              <td style={{ padding: '4px 0', color: '#374151' }}>{name}</td>
                              <td style={{ padding: '4px 0', fontWeight: 600, textAlign: 'right' }} className="tnum">{value}</td>
                              <td style={{ padding: '4px 0', color: C.text3, textAlign: 'right', paddingLeft: 8 }} className="tnum">{ref}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <div style={{ fontSize: 10.5, color: C.primary, textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 700, marginBottom: 6 }}>Interpretation</div>
                      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Sinus rhythm with first-degree AV block.</div>
                      <p style={{ fontSize: 11, color: '#374151', lineHeight: 1.55, margin: 0 }}>
                        Regular sinus rhythm at 78 bpm. PR interval prolonged at 204 ms consistent with first-degree AV block. QRS duration and axis within normal limits. No ST-segment elevation or depression. T-wave morphology preserved. No criteria for chamber hypertrophy.
                      </p>
                    </div>
                  </div>

                  {/* ECG strip */}
                  <div style={{ fontSize: 10.5, color: C.primary, textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 700, marginBottom: 6 }}>
                    12-Lead Recording · 25 mm/s · 10 mm/mV
                  </div>
                  <div style={{ border: '1px solid #E5E7EB', borderRadius: 4, overflow: 'hidden' }}>
                    <EcgMultiLead width={648} leadHeight={76} leads={['Lead I', 'Lead II', 'Lead V1']} label="12-lead ECG recording" />
                  </div>

                  {/* Notes */}
                  <div style={{ marginTop: 14 }}>
                    <div style={{ fontSize: 10.5, color: C.primary, textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 700, marginBottom: 6 }}>Clinician notes</div>
                    <blockquote style={{ fontSize: 11, color: '#374151', lineHeight: 1.55, padding: '8px 10px', background: '#FAFBFD', borderLeft: `3px solid ${C.primary}`, borderRadius: 3, margin: 0 }}>
                      Findings consistent with 1° AV block — likely chronic given baseline ECG from January 2023. Continue current medication list; no urgent intervention indicated. Follow-up in 6 weeks with repeat ECG.
                    </blockquote>
                  </div>

                  {/* Signature */}
                  <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
                    <div>
                      <div style={{ fontSize: 10.5, color: C.text3, textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 600, marginBottom: 28 }}>Reviewed by</div>
                      <div style={{ fontFamily: '"Brush Script MT", "Lucida Handwriting", cursive', fontSize: 22, color: C.primary700, borderBottom: '1px solid #111827', paddingBottom: 4 }} aria-hidden="true">
                        R. Mehta
                      </div>
                      <div style={{ fontSize: 11, color: C.text, fontWeight: 600, marginTop: 6 }}>Dr. Riya Mehta, MD</div>
                      <div style={{ fontSize: 10.5, color: C.text2 }}>Board-certified Cardiologist · NPI 1497-2308</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10.5, color: C.text3, textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 600, marginBottom: 6 }}>Audit</div>
                      <div style={{ fontSize: 11, color: '#374151', lineHeight: 1.7 }}>
                        Generated <b>11 May 2026 · 09:18 PDT</b><br />
                        AI engine: cardio-rnn v3.2 (510(k) K231084)<br />
                        Report hash: <span className="tnum">a4e1·b8c2·9d34</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div style={{ marginTop: 22, paddingTop: 10, borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', fontSize: 9.5, color: C.text3 }}>
                    <span>CardioEcg Clinical Platform · This report is for use by licensed clinicians.</span>
                    <span className="tnum">Page 1 of 2</span>
                  </div>
                </div>
              </article>
            </div>

            {/* Export panel */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="card card-pad">
                <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 4 }}>Export options</div>
                <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>Configure how this report is delivered.</div>

                <label className="label">Format</label>
                <div className="row gap-2" style={{ marginBottom: 14 }} role="group" aria-label="Export format">
                  <button type="button" className="chip active" aria-pressed="true">PDF</button>
                  <button type="button" className="chip" aria-pressed="false">DICOM SR</button>
                  <button type="button" className="chip" aria-pressed="false">HL7 FHIR</button>
                </div>

                <label className="label" htmlFor="report-template">Template</label>
                <div className="input" id="report-template" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, cursor: 'pointer' }}>
                  <span>Mercy West · Cardiology v2.4</span>
                  <Ic.ChevronDown size={14} color={C.text3} />
                </div>

                <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
                  <legend className="label" style={{ float: 'left', width: '100%' }}>Include sections</legend>
                  {SECTIONS.map(([label, on]) => (
                    <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '5px 0', fontSize: 12.5, color: '#374151' }}>
                      <input type="checkbox" defaultChecked={on} /> {label}
                    </label>
                  ))}
                </fieldset>
              </div>

              <div className="card card-pad">
                <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 12 }}>Send to</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {SEND_TARGETS.map((t, i) => (
                    <li key={t.name} className="row between" style={{ padding: '8px 0', borderTop: i === 0 ? '0' : '1px solid #F1F3F7' }}>
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 550 }}>{t.name}</div>
                        <div style={{ fontSize: 11, color: C.text3 }}>{t.sub}</div>
                      </div>
                      <span className={`badge ${t.color}`}>{t.status}</span>
                    </li>
                  ))}
                </ul>
                <button type="button" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
                  <Ic.Send size={13} /> Sign &amp; deliver
                </button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
