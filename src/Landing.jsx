import { Icons as Ic } from './Icons.jsx';

const NAV_LINKS = ['Platform', 'For Hospitals', 'Compliance', 'Pricing'];

const WORKFLOW_STEPS = [
  { title: 'Upload',      desc: 'CSV, XML, EDF — or direct sync from MUSE / GE / Philips.', icon: 'Upload' },
  { title: 'Pre-process', desc: 'Noise filtering, lead detection, QRS detection.',          icon: 'Cpu' },
  { title: 'Classify',    desc: '24 rhythm classes with interval measurements.',            icon: 'Brain' },
  { title: 'Sign & file', desc: 'Structured report, audit-trailed e-signature.',           icon: 'ClipboardCheck' },
];

const FEATURES = [
  { title: 'Structured interpretation', desc: 'Intervals, axis, and rhythm classification land in your EHR as discrete fields — not free text.', icon: 'FileText' },
  { title: 'Built-in audit trail',      desc: 'Every view, every signature, every export is logged with user, time, and IP.',                   icon: 'ClipboardCheck' },
  { title: 'Hospital-grade security',   desc: 'HIPAA, GDPR and SOC 2 Type II. Single-tenant deployment on request.',                           icon: 'ShieldCheck' },
  { title: 'HL7 & FHIR integration',    desc: 'Drop-in connectors for Epic, Cerner, MEDITECH and major MUSE / GE / Philips devices.',           icon: 'Layers' },
  { title: 'Sub-minute turnaround',     desc: 'Average time from upload to first interpretation: 38 seconds.',                                   icon: 'Zap' },
  { title: 'Clinician in the loop',     desc: 'AI suggests. A licensed cardiologist signs. Decision support, never decision making.',            icon: 'Stethoscope' },
];

const STATS = [
  { value: '2.4M',  label: 'ECGs analyzed annually' },
  { value: '97.8%', label: 'Rhythm classification accuracy' },
  { value: '38s',   label: 'Avg. time to first interpretation' },
  { value: '42',    label: 'Hospitals & cardiology groups' },
];

const TRUST_LOGOS = ['Mercy Health', 'Northstar Medical', 'St. Aldwyn', 'Pacific Heart', 'Beacon', 'UMC Royal'];

const FOOTER_LINKS = ['Security', 'HIPAA', 'Privacy', 'Terms', 'Status'];

export function Landing() {
  return (
    <div style={{ background: '#fff', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>

      {/* ── Top nav ── */}
      <header style={{ display: 'flex', alignItems: 'center', padding: '20px 64px', background: '#fff', position: 'sticky', top: 0, zIndex: 5, borderBottom: '1px solid #F1F3F7' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }} aria-label="CardioEcg home">
          <Ic.Logo size={26} />
          <span style={{ fontWeight: 650, letterSpacing: '-0.01em', fontSize: 15 }}>CardioEcg</span>
        </a>
        <nav style={{ display: 'flex', gap: 30, marginLeft: 56 }} aria-label="Site navigation">
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`} style={{ fontSize: 13, color: '#374151', textDecoration: 'none', fontWeight: 500 }}>
              {link}
            </a>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="/login" style={{ fontSize: 13, color: '#374151', fontWeight: 500, textDecoration: 'none' }}>Sign in</a>
          <button type="button" className="btn btn-primary btn-sm">Request demo</button>
        </div>
      </header>

      {/* ── Hero ── */}
      <main>
        <section aria-labelledby="hero-heading" style={{ padding: '120px 64px 100px', textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px', background: '#F7F9FC', borderRadius: 999, fontSize: 12, color: '#475569', fontWeight: 500, marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} aria-hidden="true" />
            FDA 510(k) cleared · v3.2
          </div>
          <h1 id="hero-heading" style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.03em', fontWeight: 650, margin: '0 0 22px', color: '#0F172A' }}>
            AI-assisted ECG analysis<br />for faster clinical review.
          </h1>
          <p style={{ fontSize: 17, color: '#6B7280', lineHeight: 1.55, margin: '0 auto 32px', maxWidth: 560 }}>
            Clinical-grade interpretation, built for the way hospital teams already work.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-primary btn-lg">Book a demo</button>
            <button type="button" className="btn btn-secondary btn-lg">View sample report</button>
          </div>
        </section>

        {/* ── Trust logos ── */}
        <section aria-label="Trusted by" style={{ padding: '0 64px 80px', borderBottom: '1px solid #F1F3F7' }}>
          <p style={{ fontSize: 11.5, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '.1em', textAlign: 'center', marginBottom: 28, marginTop: 0 }}>
            Trusted by cardiology programs at
          </p>
          <ul style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1000, margin: '0 auto', listStyle: 'none', padding: 0, flexWrap: 'wrap', gap: 16 }}>
            {TRUST_LOGOS.map(name => (
              <li key={name} style={{ fontSize: 15, fontWeight: 600, color: '#CBD5E1', letterSpacing: '-0.01em' }}>{name}</li>
            ))}
          </ul>
        </section>

        {/* ── How it works ── */}
        <section id="platform" aria-labelledby="workflow-heading" style={{ padding: '100px 64px', borderBottom: '1px solid #F1F3F7' }}>
          <div style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 56px' }}>
            <p style={{ fontSize: 12, color: '#2563EB', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12, marginTop: 0 }}>How it works</p>
            <h2 id="workflow-heading" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-0.025em', margin: '0 0 14px', fontWeight: 650, color: '#0F172A' }}>Four steps. No new workflow.</h2>
            <p style={{ fontSize: 15, color: '#6B7280', margin: 0, lineHeight: 1.55 }}>CardioEcg sits between your acquisition devices and your EHR.</p>
          </div>
          <ol style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, maxWidth: 1180, margin: '0 auto', background: '#F1F3F7', border: '1px solid #F1F3F7', borderRadius: 14, listStyle: 'none', padding: 0 }}>
            {WORKFLOW_STEPS.map(({ title, desc, icon }, i) => {
              const IconC = Ic[icon];
              return (
                <li key={title} style={{ background: '#fff', padding: '36px 28px', borderRadius: i === 0 ? '14px 0 0 14px' : i === WORKFLOW_STEPS.length - 1 ? '0 14px 14px 0' : 0 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: '#EFF6FF', display: 'grid', placeItems: 'center', color: '#2563EB', marginBottom: 16 }}>
                    <IconC size={17} />
                  </div>
                  <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, marginBottom: 4, marginTop: 0 }}>0{i + 1}</p>
                  <h3 style={{ fontSize: 15, margin: '0 0 6px', fontWeight: 600, color: '#0F172A' }}>{title}</h3>
                  <p style={{ fontSize: 13, color: '#6B7280', margin: 0, lineHeight: 1.55 }}>{desc}</p>
                </li>
              );
            })}
          </ol>
        </section>

        {/* ── Features ── */}
        <section id="for-hospitals" aria-labelledby="features-heading" style={{ padding: '100px 64px', borderBottom: '1px solid #F1F3F7' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 80, marginBottom: 56 }}>
              <h2 id="features-heading" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-0.025em', margin: 0, fontWeight: 650, color: '#0F172A', lineHeight: 1.1 }}>
                Built for clinicians.<br />Not for hype.
              </h2>
              <p style={{ fontSize: 15, color: '#6B7280', margin: 0, lineHeight: 1.6, alignSelf: 'end' }}>
                Every decision is auditable. Every output is reviewable. Every record stays in your tenant.
              </p>
            </div>
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, listStyle: 'none', padding: 0, margin: 0 }}>
              {FEATURES.map(({ title, desc, icon }) => {
                const IconC = Ic[icon];
                return (
                  <li key={title}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#F7F9FC', display: 'grid', placeItems: 'center', color: '#2563EB', marginBottom: 16 }}>
                      <IconC size={16} />
                    </div>
                    <h3 style={{ fontSize: 15, margin: '0 0 6px', fontWeight: 600, color: '#0F172A' }}>{title}</h3>
                    <p style={{ fontSize: 13.5, color: '#6B7280', margin: 0, lineHeight: 1.6 }}>{desc}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ── Stats ── */}
        <section aria-label="Platform statistics" style={{ padding: '80px 64px', borderBottom: '1px solid #F1F3F7' }}>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, maxWidth: 1180, margin: '0 auto', listStyle: 'none', padding: 0 }}>
            {STATS.map(({ value, label }) => (
              <li key={label}>
                <div style={{ fontSize: 'clamp(30px, 4vw, 40px)', fontWeight: 650, letterSpacing: '-0.025em', color: '#0F172A', marginBottom: 6 }}>{value}</div>
                <div style={{ fontSize: 13, color: '#6B7280' }}>{label}</div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Testimonial ── */}
        <section aria-label="Customer testimonial" style={{ padding: '100px 64px', borderBottom: '1px solid #F1F3F7' }}>
          <figure style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: '#2563EB', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 24, marginTop: 0 }}>From the field</p>
            <blockquote style={{ fontSize: 24, lineHeight: 1.4, letterSpacing: '-0.015em', color: '#0F172A', fontWeight: 500, margin: '0 0 28px' }}>
              "We cut average review time in half without changing how our cardiologists work. The audit trail alone made the rollout straightforward."
            </blockquote>
            <figcaption style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <div className="avatar slate" style={{ width: 36, height: 36, fontSize: 12 }} aria-hidden="true">HK</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Dr. Hannah Kowalski</div>
                <div style={{ fontSize: 12, color: '#6B7280' }}>Chief of Cardiology · Northstar Medical</div>
              </div>
            </figcaption>
          </figure>
        </section>

        {/* ── CTA ── */}
        <section aria-labelledby="cta-heading" style={{ padding: '100px 64px', background: '#F7F9FC', borderBottom: '1px solid #F1F3F7' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
            <h2 id="cta-heading" style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-0.025em', margin: '0 0 14px', fontWeight: 650, color: '#0F172A' }}>
              Ready to see it on your data?
            </h2>
            <p style={{ fontSize: 15, color: '#6B7280', margin: '0 0 28px', lineHeight: 1.55 }}>
              30-minute walkthrough with your team, on a deidentified sample of your own recordings.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-primary btn-lg">Book a demo</button>
              <button type="button" className="btn btn-secondary btn-lg">Talk to sales</button>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer style={{ padding: '40px 64px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, fontSize: 12, color: '#9CA3AF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Ic.Logo size={20} />
          <span>© 2026 CardioEcg Inc.</span>
        </div>
        <nav aria-label="Footer links">
          <ul style={{ display: 'flex', gap: 24, listStyle: 'none', padding: 0, margin: 0 }}>
            {FOOTER_LINKS.map(link => (
              <li key={link}>
                <a href={`/${link.toLowerCase()}`} style={{ color: 'inherit', textDecoration: 'none' }}>{link}</a>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </div>
  );
}
