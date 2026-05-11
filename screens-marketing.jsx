// Landing + Login screens — minimal, no ECG waves on hero/login

function Landing() {
  const Ic = window.Icons;
  return (
    <div className="screen" style={{ overflow: 'auto', background: '#fff' }}>
      {/* Top Nav */}
      <header style={{ display: 'flex', alignItems: 'center', padding: '20px 64px', background: '#fff', position: 'sticky', top: 0, zIndex: 5, borderBottom: '1px solid #F1F3F7' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Ic.Logo size={26} />
          <div style={{ fontWeight: 650, letterSpacing: '-0.01em', fontSize: 15 }}>CardioEcg</div>
        </div>
        <nav style={{ display: 'flex', gap: 30, marginLeft: 56 }}>
          {['Platform', 'For Hospitals', 'Compliance', 'Pricing'].map(x => (
            <a key={x} style={{ fontSize: 13, color: '#374151', textDecoration: 'none', fontWeight: 500 }}>{x}</a>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <a style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Sign in</a>
          <button className="btn btn-primary btn-sm">Request demo</button>
        </div>
      </header>

      {/* Hero — minimal, no waveform */}
      <section style={{ padding: '120px 64px 100px', textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px', background: '#F7F9FC', borderRadius: 999, fontSize: 12, color: '#475569', fontWeight: 500, marginBottom: 28 }}>
          <span style={{ width: 6, height: 6, borderRadius: 50, background: '#16A34A' }}></span>
          FDA 510(k) cleared · v3.2
        </div>
        <h1 style={{ fontSize: 56, lineHeight: 1.05, letterSpacing: '-0.03em', fontWeight: 650, margin: '0 0 22px', color: '#0F172A' }}>
          AI-assisted ECG analysis<br/>for faster clinical review.
        </h1>
        <p style={{ fontSize: 17, color: '#6B7280', lineHeight: 1.55, margin: '0 auto 32px', maxWidth: 560 }}>
          Clinical-grade interpretation, built for the way hospital teams already work.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button className="btn btn-primary btn-lg">Book a demo</button>
          <button className="btn btn-secondary btn-lg">View sample report</button>
        </div>
      </section>

      {/* Logos */}
      <section style={{ padding: '0 64px 80px', borderBottom: '1px solid #F1F3F7' }}>
        <div style={{ fontSize: 11.5, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '.1em', textAlign: 'center', marginBottom: 28 }}>Trusted by cardiology programs at</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1000, margin: '0 auto' }}>
          {['Mercy Health','Northstar Medical','St. Aldwyn','Pacific Heart','Beacon','UMC Royal'].map(n=>(
            <div key={n} style={{ fontSize: 15, fontWeight: 600, color: '#CBD5E1', letterSpacing: '-0.01em' }}>{n}</div>
          ))}
        </div>
      </section>

      {/* Workflow — 4 steps */}
      <section style={{ padding: '100px 64px', borderBottom: '1px solid #F1F3F7' }}>
        <div style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 56px' }}>
          <div style={{ fontSize: 12, color: '#2563EB', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>How it works</div>
          <h2 style={{ fontSize: 36, letterSpacing: '-0.025em', margin: '0 0 14px', fontWeight: 650, color: '#0F172A' }}>Four steps. No new workflow.</h2>
          <p style={{ fontSize: 15, color: '#6B7280', margin: 0, lineHeight: 1.55 }}>CardioEcg sits between your acquisition devices and your EHR.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, maxWidth: 1180, margin: '0 auto', background: '#F1F3F7', border: '1px solid #F1F3F7', borderRadius: 14 }}>
          {[
            ['Upload', 'CSV, XML, EDF — or direct sync from MUSE / GE / Philips.', Ic.Upload],
            ['Pre-process', 'Noise filtering, lead detection, QRS detection.', Ic.Cpu],
            ['Classify', '24 rhythm classes with interval measurements.', Ic.Brain],
            ['Sign & file', 'Structured report, audit-trailed e-signature.', Ic.ClipboardCheck],
          ].map(([t,d,IconC], i)=>(
            <div key={t} style={{ background: '#fff', padding: '36px 28px', borderRadius: i===0 ? '14px 0 0 14px' : i===3 ? '0 14px 14px 0' : 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: '#EFF6FF', display: 'grid', placeItems: 'center', color: '#2563EB', marginBottom: 16 }}>
                <IconC size={17} />
              </div>
              <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, marginBottom: 4 }}>0{i+1}</div>
              <h3 style={{ fontSize: 15, margin: '0 0 6px', fontWeight: 600, color: '#0F172A' }}>{t}</h3>
              <p style={{ fontSize: 13, color: '#6B7280', margin: 0, lineHeight: 1.55 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section style={{ padding: '100px 64px', borderBottom: '1px solid #F1F3F7' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginBottom: 56 }}>
            <h2 style={{ fontSize: 36, letterSpacing: '-0.025em', margin: 0, fontWeight: 650, color: '#0F172A', lineHeight: 1.1 }}>Built for clinicians.<br/>Not for hype.</h2>
            <p style={{ fontSize: 15, color: '#6B7280', margin: 0, lineHeight: 1.6, alignSelf: 'end' }}>Every decision is auditable. Every output is reviewable. Every record stays in your tenant.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
            {[
              ['Structured interpretation', 'Intervals, axis, and rhythm classification land in your EHR as discrete fields — not free text.', Ic.FileText],
              ['Built-in audit trail', 'Every view, every signature, every export is logged with user, time, and IP.', Ic.ClipboardCheck],
              ['Hospital-grade security', 'HIPAA, GDPR and SOC 2 Type II. Single-tenant deployment on request.', Ic.ShieldCheck],
              ['HL7 & FHIR integration', 'Drop-in connectors for Epic, Cerner, MEDITECH and major MUSE / GE / Philips devices.', Ic.Layers],
              ['Sub-minute turnaround', 'Average time from upload to first interpretation: 38 seconds.', Ic.Zap],
              ['Clinician in the loop', 'AI suggests. A licensed cardiologist signs. Decision support, never decision making.', Ic.Stethoscope],
            ].map(([t,d,IconC])=>(
              <div key={t}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#F7F9FC', display: 'grid', placeItems: 'center', color: '#2563EB', marginBottom: 16 }}>
                  <IconC size={16} />
                </div>
                <h3 style={{ fontSize: 15, margin: '0 0 6px', fontWeight: 600, color: '#0F172A' }}>{t}</h3>
                <p style={{ fontSize: 13.5, color: '#6B7280', margin: 0, lineHeight: 1.6 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '80px 64px', borderBottom: '1px solid #F1F3F7' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 48, maxWidth: 1180, margin: '0 auto' }}>
          {[['2.4M','ECGs analyzed annually'],['97.8%','Rhythm classification accuracy'],['38s','Avg. time to first interpretation'],['42','Hospitals & cardiology groups']].map(([v,l])=>(
            <div key={l}>
              <div style={{ fontSize: 40, fontWeight: 650, letterSpacing: '-0.025em', color: '#0F172A', marginBottom: 6 }}>{v}</div>
              <div style={{ fontSize: 13, color: '#6B7280' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section style={{ padding: '100px 64px', borderBottom: '1px solid #F1F3F7' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#2563EB', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 24 }}>From the field</div>
          <p style={{ fontSize: 24, lineHeight: 1.4, letterSpacing: '-0.015em', color: '#0F172A', fontWeight: 500, margin: '0 0 28px' }}>
            "We cut average review time in half without changing how our cardiologists work. The audit trail alone made the rollout straightforward."
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <div className="avatar slate" style={{ width: 36, height: 36, fontSize: 12 }}>HK</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Dr. Hannah Kowalski</div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>Chief of Cardiology · Northstar Medical</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 64px', background: '#F7F9FC', borderBottom: '1px solid #F1F3F7' }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontSize: 36, letterSpacing: '-0.025em', margin: '0 0 14px', fontWeight: 650, color: '#0F172A' }}>Ready to see it on your data?</h2>
          <p style={{ fontSize: 15, color: '#6B7280', margin: '0 0 28px', lineHeight: 1.55 }}>30-minute walkthrough with your team, on a deidentified sample of your own recordings.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button className="btn btn-primary btn-lg">Book a demo</button>
            <button className="btn btn-secondary btn-lg">Talk to sales</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 64px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#9CA3AF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Ic.Logo size={20} /> <span>© 2026 CardioEcg Inc.</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <span>Security</span><span>HIPAA</span><span>Privacy</span><span>Terms</span><span>Status</span>
        </div>
      </footer>
    </div>
  );
}

function Login() {
  const Ic = window.Icons;
  return (
    <div className="screen" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#fff' }}>
      {/* Left: minimal — logo + product mark only */}
      <div style={{ background: '#F7F9FC', padding: '40px 48px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Ic.Logo size={28} />
          <div style={{ fontWeight: 650, fontSize: 15, letterSpacing: '-0.01em' }}>CardioEcg</div>
        </div>

        {/* Centered abstract mark — concentric arcs, calm/clinical */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="360" height="360" viewBox="0 0 360 360" fill="none">
            <circle cx="180" cy="180" r="160" stroke="#E5EAF2" strokeWidth="1" />
            <circle cx="180" cy="180" r="120" stroke="#DBE3EF" strokeWidth="1" />
            <circle cx="180" cy="180" r="80" stroke="#C7D2FE" strokeWidth="1" />
            <circle cx="180" cy="180" r="40" fill="#2563EB" />
            <circle cx="180" cy="180" r="40" fill="url(#g1)" />
            <path d="M180 158v44M168 180h24" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <defs>
              <radialGradient id="g1" cx="0.3" cy="0.3" r="0.9">
                <stop stopColor="#3B82F6" />
                <stop offset="1" stopColor="#1D4ED8" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <div style={{ fontSize: 12, color: '#9CA3AF' }}>Clinical decision support for licensed providers.</div>
      </div>

      {/* Right: minimal form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
        <div style={{ width: 340 }}>
          <h1 style={{ fontSize: 24, fontWeight: 650, letterSpacing: '-0.02em', margin: '0 0 28px' }}>Sign in</h1>

          <label className="label">Email</label>
          <input className="input" defaultValue="r.mehta@mercywest.health" style={{ marginBottom: 14 }} />

          <label className="label">Password</label>
          <input className="input" type="password" defaultValue="••••••••••••" style={{ marginBottom: 18 }} />

          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '11px 14px', marginBottom: 16 }}>Sign in</button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#9CA3AF', fontSize: 11.5, fontWeight: 500, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: '#F1F3F7' }} /> or <div style={{ flex: 1, height: 1, background: '#F1F3F7' }} />
          </div>

          <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '11px 14px' }}>
            Continue with hospital SSO
          </button>

          <div style={{ marginTop: 22, textAlign: 'center', fontSize: 12.5, color: '#9CA3AF' }}>
            <a style={{ color: '#2563EB', fontWeight: 500 }}>Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Landing = Landing;
window.Login = Login;
