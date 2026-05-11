import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { Icons as Ic } from './Icons.jsx';
import { useNav } from './NavContext.jsx';
import { C } from './tokens.js';

const NAV_LINKS = ['Features', 'Workflow', 'Security', 'Patients', 'Reports'];

const FEATURES_DATA = [
  { icon: 'Upload', title: 'Secure ECG Uploads', desc: 'Upload single recordings or batch files in XML, EDF, CSV, and HL7 formats. Encrypted in transit and at rest.', color: C.primary },
  { icon: 'Brain', title: 'AI-Assisted Analysis', desc: 'Rhythm classification, interval measurements, and morphology flags. AI suggests — clinicians decide.', color: C.teal },
  { icon: 'FileText', title: 'Clinical Reporting', desc: 'Structured reports with patient summary, findings, measurements, and interpretation. Export as PDF or HL7.', color: C.primary },
  { icon: 'Users', title: 'Patient Management', desc: 'Search by name, MRN, or date. Filter by status, risk level, or date range. Full audit trail on every view.', color: C.teal },
  { icon: 'Zap', title: 'Fast Processing', desc: 'Average 38 seconds from upload to first interpretation. Parallel processing for batch uploads.', color: C.primary },
  { icon: 'Folder', title: 'Multi-File Support', desc: 'XML, EDF, CSV, SCP-ECG, HL7 v2, FHIR. Direct sync from MUSE, GE MUSE, and Philips TraceMaster.', color: C.teal },
];

const TESTIMONIALS = [
  { quote: 'We reduced average ECG review time by 60% without changing our clinical workflow. The audit trail made NAFDAC compliance straightforward.', name: 'Dr. D. Adekunle', role: 'Chief of Cardiology', org: 'LUTH, Lagos' },
  { quote: 'Deployment took two days. Our technicians were uploading ECGs within the hour. The AI suggestions are remarkably accurate.', name: 'Dr. F. Ogunlesi', role: 'Head of Clinical Services', org: 'UCH, Ibadan' },
  { quote: 'We process over 200 ECGs daily. The queue management and batch processing alone saved us hours. The reporting is exceptional.', name: 'Dr. A. Bello', role: 'Medical Director', org: 'National Hospital, Abuja' },
];

function useViewAnimation(ref, fn) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { fn(); observer.unobserve(el); }
    }, { threshold: 0.12 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, fn]);
}

function SectionLabel({ children }) {
  return <p className="sec-label" style={{ fontSize: 12, color: C.primary, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', margin: '0 0 10px' }}>{children}</p>;
}

function Badge({ label, variant }) {
  const m = { green: { bg: '#ECFDF3', c: '#15803D' }, amber: { bg: '#FFFAEB', c: '#B45309' }, blue: { bg: '#EFF6FF', c: '#1D4ED8' }, red: { bg: '#FEF2F2', c: '#B91C1C' }, slate: { bg: '#F3F4F6', c: '#374151' } };
  const s = m[variant] || m.slate;
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 550, background: s.bg, color: s.c }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: s.c }} />{label}</span>;
}

function Avatar({ initials, size = 28, bg = '#EFF6FF', color = C.primary700 }) {
  return <div style={{ width: size, height: size, borderRadius: '50%', background: bg, color, display: 'grid', placeItems: 'center', fontSize: size * 0.38, fontWeight: 600, flexShrink: 0 }}>{initials}</div>;
}

function PatientTablePreview() {
  const rows = [
    { name: 'Eleanor Morgan', mrn: '00482-913', time: '09:14', finding: 'Normal sinus rhythm', status: 'review', conf: 97 },
    { name: 'James Whitfield', mrn: '00318-220', time: '08:52', finding: 'Sinus bradycardia', status: 'normal', conf: 94 },
    { name: 'Aiko Tanaka', mrn: '00591-014', time: '08:39', finding: 'AFib detected', status: 'urgent', conf: 91 },
    { name: 'Marcus Ellington', mrn: '00427-771', time: '08:21', finding: 'LVH criteria met', status: 'review', conf: 88 },
  ];
  return (
    <div style={{ background: '#fff', borderRadius: 12, border: `1px solid ${C.borderSoft}`, boxShadow: C.shadowSm, overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.borderSoft}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>Recent ECGs</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', background: C.bg, borderRadius: 6, fontSize: 11, color: C.text2 }}><Ic.Search size={11} />Search</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', background: C.bg, borderRadius: 6, fontSize: 11, color: C.text2 }}><Ic.Filter size={11} />Filter</div>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {['Patient', 'Time', 'Finding', 'Status'].map(h => <th key={h} style={{ textAlign: 'left', padding: '8px 14px', fontWeight: 600, color: C.text3, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.04em' }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.mrn} style={{ borderTop: `1px solid ${C.borderSoft}` }}>
                <td style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Avatar initials={r.name.split(' ').map(x => x[0]).join('')} size={26} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 12 }}>{r.name}</div>
                    <div style={{ fontSize: 10.5, color: C.text3 }}>{r.mrn}</div>
                  </div>
                </td>
                <td style={{ padding: '10px 14px', color: C.text3, fontSize: 11.5 }}>{r.time}</td>
                <td style={{ padding: '10px 14px' }}><div style={{ fontWeight: 550 }}>{r.finding}</div><div style={{ fontSize: 10.5, color: C.text3 }}>{r.conf}% confidence</div></td>
                <td style={{ padding: '10px 14px' }}><Badge label={r.status} variant={r.status === 'urgent' ? 'red' : r.status === 'review' ? 'amber' : 'green'} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProcessingTimeline() {
  return (
    <div style={{ background: '#fff', borderRadius: 12, border: `1px solid ${C.borderSoft}`, padding: 18, boxShadow: C.shadowSm }}>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>Processing Status</div>
      {[{ label: 'Upload Received', time: '08:39 AM', done: true }, { label: 'Noise Filtering', time: '08:40 AM', done: true }, { label: 'QRS Detection', time: '08:41 AM', done: true }, { label: 'Rhythm Classification', time: '08:42 AM', pct: 72 }, { label: 'Report Generation', time: 'Pending', pct: 0 }].map((s, i) => (
        <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderTop: i === 0 ? 'none' : `1px solid ${C.borderSoft}` }}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: s.done ? '#ECFDF3' : s.pct >= 0 ? C.primary50 : C.bg, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            {s.done ? <Ic.Check size={10} color="#15803D" /> : <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.pct ? C.primary : C.text3 }} />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 550 }}>{s.label}</div>
            <div style={{ fontSize: 10.5, color: C.text3 }}>{s.time}{s.pct ? ` · ${s.pct}%` : ''}</div>
          </div>
          {s.done && <Ic.CheckCircle size={14} color="#15803D" />}
        </div>
      ))}
    </div>
  );
}

function ClinicalReportPreview() {
  return (
    <div style={{ background: '#fff', borderRadius: 12, border: `1px solid ${C.borderSoft}`, padding: 22, boxShadow: C.shadowSm, maxWidth: 480 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, paddingBottom: 14, borderBottom: `1px solid ${C.borderSoft}` }}>
        <div>
          <div style={{ fontSize: 10.5, color: C.text3, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 2 }}>CardioEcg · Clinical Report</div>
          <div style={{ fontSize: 16, fontWeight: 650 }}>R-2841</div>
        </div>
        <Badge label="Signed" variant="green" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
        {[{ l: 'Patient', v: 'Eleanor Morgan' }, { l: 'MRN', v: '00482-913' }, { l: 'Age / Sex', v: '64 / Female' }, { l: 'Recorded', v: 'Today, 08:39 AM' }].map(d => (
          <div key={d.l}><div style={{ fontSize: 10.5, color: C.text3, marginBottom: 1 }}>{d.l}</div><div style={{ fontSize: 12.5, fontWeight: 550 }}>{d.v}</div></div>
        ))}
      </div>
      <div style={{ padding: 12, background: C.bg, borderRadius: 8, marginBottom: 14 }}>
        <div style={{ fontSize: 10.5, color: C.text3, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>Interpretation</div>
        <div style={{ fontSize: 12.5, lineHeight: 1.6 }}>Normal sinus rhythm at 72 bpm. Normal PR interval, QRS duration, and QTc. No ST-segment or T-wave abnormalities. Normal axis.</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: `1px solid ${C.borderSoft}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar initials="DA" size={22} bg={C.primary50} color={C.primary} />
          <div style={{ fontSize: 11.5, color: C.text2 }}>Signed by <span style={{ fontWeight: 600, color: C.text }}>Dr. D. Adekunle</span></div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ padding: '5px 10px', borderRadius: 6, border: `1px solid ${C.border}`, fontSize: 11, color: C.text2, cursor: 'pointer' }}>Export PDF</div>
        </div>
      </div>
    </div>
  );
}

function SecurityCard({ icon: Icon, title, desc }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, border: `1px solid ${C.borderSoft}`, padding: 22, boxShadow: C.shadowSm }}>
      <div style={{ width: 34, height: 34, borderRadius: 9, background: C.primary50, display: 'grid', placeItems: 'center', color: C.primary, marginBottom: 12 }}><Icon size={16} /></div>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6 }}>{desc}</div>
    </div>
  );
}

export function Landing() {
  const navigate = useNav();
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const workflowRef = useRef(null);
  const securityRef = useRef(null);
  const patientsRef = useRef(null);
  const reportsRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    animate('.hero-fade', { translateY: [20, 0], opacity: [0, 1], duration: 500, delay: stagger(100), easing: 'easeOutCubic' });
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => setSticky(!e.isIntersecting), { threshold: 0 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useViewAnimation(featuresRef, () => animate('.feature-item', { opacity: [0, 1], translateY: [16, 0], duration: 400, delay: stagger(70), easing: 'easeOutCubic' }));
  useViewAnimation(workflowRef, () => animate('.workflow-item', { opacity: [0, 1], translateY: [16, 0], duration: 400, delay: stagger(80), easing: 'easeOutCubic' }));
  useViewAnimation(securityRef, () => animate('.security-item', { opacity: [0, 1], translateY: [16, 0], duration: 400, delay: stagger(70), easing: 'easeOutCubic' }));
  useViewAnimation(patientsRef, () => animate('.patients-view', { opacity: [0, 1], translateY: [16, 0], duration: 500, easing: 'easeOutCubic' }));
  useViewAnimation(reportsRef, () => animate('.reports-view', { opacity: [0, 1], translateY: [16, 0], duration: 500, easing: 'easeOutCubic' }));
  useViewAnimation(testimonialsRef, () => animate('.testimonial-item', { opacity: [0, 1], translateY: [16, 0], duration: 400, delay: stagger(80), easing: 'easeOutCubic' }));

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: C.text, background: C.bg }}>
      <style>{`
        .lp-hdr { padding: 14px 48px; }
        .lp-sec { padding: 96px 48px; }
        .lp-sec-sm { padding: 72px 48px; }
        .lp-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 6px; color: ${C.text2}; }
        .lp-mobile-nav { display: none; }
        @media (max-width: 1024px) {
          .lp-hdr { padding: 14px 24px; }
          .lp-sec { padding: 64px 24px; }
          .lp-sec-sm { padding: 48px 24px; }
          .lp-hero-right { display: none; }
        }
        @media (max-width: 768px) {
          .lp-hdr { padding: 12px 20px; }
          .lp-sec { padding: 48px 20px; }
          .lp-sec-sm { padding: 40px 20px; }
          .lp-nav { display: none; }
          .lp-hamburger { display: flex; }
          .lp-hero { min-height: 0; padding: 48px 20px 40px; }
          .lp-clin-report { grid-template-columns: 1fr; }
          .lp-mobile-nav { display: flex; }
        }
        @media (max-width: 480px) {
          .lp-hdr { padding: 10px 16px; }
          .lp-sec { padding: 36px 16px; }
          .lp-sec-sm { padding: 28px 16px; }
          .lp-hero { min-height: 0; padding: 36px 16px 28px; }
        }
      `}</style>

      {/* ── Navbar ── */}
      <header className="lp-hdr" style={{
        display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50, transition: '.2s',
        background: sticky ? 'rgba(255,255,255,.95)' : 'transparent',
        backdropFilter: sticky ? 'blur(10px)' : 'none',
        borderBottom: sticky ? `1px solid ${C.borderSoft}` : '1px solid transparent',
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'inherit' }} aria-label="CardioEcg home">
          <Ic.Logo size={24} />
          <span style={{ fontWeight: 650, fontSize: 14, letterSpacing: '-0.01em' }}>CardioEcg</span>
        </a>
        <nav className="lp-nav" style={{ display: 'flex', gap: 24, marginLeft: 44 }} aria-label="Site navigation">
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} style={{ fontSize: 13, color: C.text2, textDecoration: 'none', fontWeight: 500, transition: 'color .15s' }}
              onMouseEnter={e => e.currentTarget.style.color = C.text}
              onMouseLeave={e => e.currentTarget.style.color = C.text2}>{link}</a>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <button type="button" onClick={() => navigate('login')} className="lp-signin" style={{
            fontSize: 13, color: C.text2, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '6px 12px', transition: 'color .15s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = C.text}
            onMouseLeave={e => e.currentTarget.style.color = C.text2}>
            Sign in
          </button>
          <button type="button" onClick={() => navigate('login')} className="lp-getstarted" style={{
            padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 550, fontFamily: 'inherit', border: 'none', cursor: 'pointer', lineHeight: 1,
            background: C.primary, color: '#fff', boxShadow: '0 1px 2px rgba(37,99,235,.2)',
          }}
            onMouseEnter={e => e.currentTarget.style.background = C.primary700}
            onMouseLeave={e => e.currentTarget.style.background = C.primary}>
            Get Started
          </button>
          <button className="lp-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle navigation menu">
            {menuOpen ? <Ic.X size={20} /> : <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 2 }}><div style={{ width: 18, height: 2, background: 'currentColor', borderRadius: 1 }} /><div style={{ width: 18, height: 2, background: 'currentColor', borderRadius: 1 }} /><div style={{ width: 18, height: 2, background: 'currentColor', borderRadius: 1 }} /></div>}
          </button>
        </div>
      </header>

      {/* ── Mobile nav overlay ── */}
      {menuOpen && (
        <div className="lp-mobile-nav" style={{
          position: 'fixed', inset: 0, zIndex: 49, background: '#fff',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
          padding: 24,
        }}>
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{
              fontSize: 22, fontWeight: 550, color: C.text, textDecoration: 'none', padding: '8px 0',
            }}>{link}</a>
          ))}
          <div style={{ height: 1, width: 80, background: C.borderSoft, margin: '12px 0' }} />
          <button type="button" onClick={() => { setMenuOpen(false); navigate('login'); }} style={{
            fontSize: 20, fontWeight: 500, color: C.text2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '8px 0',
          }}>Sign in</button>
          <button type="button" onClick={() => { setMenuOpen(false); navigate('login'); }} style={{
            marginTop: 8, padding: '14px 36px', borderRadius: 10, fontSize: 18, fontWeight: 550, fontFamily: 'inherit', border: 'none', cursor: 'pointer',
            background: C.primary, color: '#fff',
          }}>Get Started</button>
        </div>
      )}

      <main>
        {/* ── Hero ── */}
        <section ref={heroRef} aria-labelledby="hero-heading" className="lp-hero" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 48px' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
            <SectionLabel>CardioEcg Platform</SectionLabel>
            <h1 id="hero-heading" className="hero-fade" style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.03em', fontWeight: 700, margin: '0 0 16px', color: C.text }}>
              AI-Assisted ECG Analysis<br />for Faster Clinical Review
            </h1>
            <p className="hero-fade" style={{ fontSize: 16, color: C.text2, lineHeight: 1.65, margin: '0 auto 28px', maxWidth: 520 }}>
              Upload, process, and interpret ECGs in under a minute. Built for hospital cardiology departments — from LUTH to UCH.
            </p>
            <div className="hero-fade" style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
              <button type="button" onClick={() => navigate('login')} style={{
                padding: '11px 22px', borderRadius: 9, fontSize: 14, fontWeight: 550, fontFamily: 'inherit', border: 'none', cursor: 'pointer', lineHeight: 1,
                background: C.primary, color: '#fff', boxShadow: '0 1px 2px rgba(37,99,235,.25)',
              }}
                onMouseEnter={e => e.currentTarget.style.background = C.primary700}
                onMouseLeave={e => e.currentTarget.style.background = C.primary}>
                Book a Demo
              </button>
              <button type="button" onClick={() => navigate('login')} style={{
                padding: '11px 22px', borderRadius: 9, fontSize: 14, fontWeight: 550, fontFamily: 'inherit', cursor: 'pointer', lineHeight: 1,
                background: '#fff', color: C.text, border: `1px solid ${C.border}`,
              }}
                onMouseEnter={e => e.currentTarget.style.background = C.bg}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                View Sample Report
              </button>
            </div>
            <div className="hero-fade" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <Badge label="NAFDAC Cleared" variant="green" />
              <Badge label="NLoN Compliant" variant="blue" />
              <Badge label="SOC 2 Type II" variant="slate" />
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section ref={featuresRef} id="features" aria-labelledby="features-heading" className="lp-sec" style={{ background: '#fff' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <SectionLabel>Platform Features</SectionLabel>
              <h2 id="features-heading" style={{ fontSize: 'clamp(26px, 2.8vw, 34px)', letterSpacing: '-0.025em', fontWeight: 700, margin: '0 0 12px', color: C.text }}>
                Everything you need for clinical ECG analysis
              </h2>
              <p style={{ fontSize: 14.5, color: C.text2, maxWidth: 560, margin: '0 auto', lineHeight: 1.65 }}>
                From upload to signed report — a complete workflow designed for hospital cardiology teams.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
              {FEATURES_DATA.map(({ icon, title, desc, color }) => {
                const IconC = Ic[icon];
                return (
                  <div key={title} className="feature-item" style={{ background: '#fff', borderRadius: 12, border: `1px solid ${C.borderSoft}`, padding: 24, boxShadow: C.shadowSm, opacity: 0 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: `${color}10`, display: 'grid', placeItems: 'center', color, marginBottom: 12 }}>
                      <IconC size={17} />
                    </div>
                    <h3 style={{ fontSize: 14.5, fontWeight: 600, margin: '0 0 6px', color: C.text }}>{title}</h3>
                    <p style={{ fontSize: 13, color: C.text2, margin: 0, lineHeight: 1.6 }}>{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Workflow ── */}
        <section ref={workflowRef} id="workflow" aria-labelledby="workflow-heading" className="lp-sec">
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <SectionLabel>How It Works</SectionLabel>
              <h2 id="workflow-heading" style={{ fontSize: 'clamp(26px, 2.8vw, 34px)', letterSpacing: '-0.025em', fontWeight: 700, margin: '0 0 12px', color: C.text }}>
                Three steps to a signed report
              </h2>
              <p style={{ fontSize: 14.5, color: C.text2, maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}>
                No new hardware. No complex setup. Your team works the way they always have.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {[
                { step: '01', title: 'Upload ECG Files', desc: 'Drag and drop XML, EDF, CSV files or sync directly from MUSE, GE, and Philips devices. Encrypted upload with instant validation.', preview: <div style={{ display: 'flex', gap: 8 }}><Badge label="XML" variant="blue" /><Badge label="EDF" variant="blue" /><Badge label="CSV" variant="blue" /><Badge label="HL7" variant="blue" /></div> },
                { step: '02', title: 'AI Processing', desc: 'Noise filtering, lead detection, QRS identification, and rhythm classification. Average processing time: 38 seconds.', preview: <div style={{ width: '100%', height: 6, background: C.bg, borderRadius: 999, overflow: 'hidden' }}><div style={{ width: '72%', height: '100%', background: C.primary, borderRadius: 999 }} /></div> },
                { step: '03', title: 'Clinical Review', desc: 'AI-generated interpretation reviewed and signed by a licensed cardiologist. Structured report with full audit trail.', preview: <div style={{ display: 'flex', gap: 8 }}><Badge label="Review" variant="amber" /><Badge label="Sign" variant="green" /><Badge label="Archive" variant="slate" /></div> },
              ].map((s, i) => (
                <div key={s.step} className="workflow-item" style={{ background: '#fff', borderRadius: 12, border: `1px solid ${C.borderSoft}`, padding: 28, boxShadow: C.shadowSm, opacity: 0 }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: C.primary50, lineHeight: 1, marginBottom: 14 }}>{s.step}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px' }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: C.text2, margin: '0 0 16px', lineHeight: 1.6 }}>{s.desc}</p>
                  {s.preview}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 48, maxWidth: 480 }}>
              <ProcessingTimeline />
            </div>
          </div>
        </section>

        {/* ── Security ── */}
        <section ref={securityRef} id="security" className="lp-sec" style={{ background: '#fff' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <SectionLabel>Security &amp; Compliance</SectionLabel>
              <h2 style={{ fontSize: 'clamp(26px, 2.8vw, 34px)', letterSpacing: '-0.025em', fontWeight: 700, margin: '0 0 12px', color: C.text }}>
                Built for healthcare-grade trust
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              <div className="security-item" style={{ opacity: 0 }}><SecurityCard icon={Ic.Upload} title="Encrypted Uploads" desc="All ECG files encrypted in transit via TLS 1.3 and at rest using AES-256. NAFDAC compliant." /></div>
              <div className="security-item" style={{ opacity: 0 }}><SecurityCard icon={Ic.Database} title="Secure Storage" desc="Single-tenant storage with isolated databases. Data never leaves your configured region." /></div>
              <div className="security-item" style={{ opacity: 0 }}><SecurityCard icon={Ic.ClipboardCheck} title="Audit Logs" desc="Every view, signature, export, and upload logged with user identity, timestamp, and IP address." /></div>
              <div className="security-item" style={{ opacity: 0 }}><SecurityCard icon={Ic.Lock} title="Access Control" desc="Role-based access with cardiologist, technician, and admin tiers. MFA and SSO supported." /></div>
            </div>
          </div>
        </section>

        {/* ── Patient Management ── */}
        <section ref={patientsRef} id="patients" aria-labelledby="patients-heading" className="lp-sec">
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 40 }}>
              <SectionLabel>Patient Management</SectionLabel>
              <h2 id="patients-heading" style={{ fontSize: 'clamp(26px, 2.8vw, 34px)', letterSpacing: '-0.025em', fontWeight: 700, margin: '0 0 8px', color: C.text }}>
                Search, filter, review
              </h2>
              <p style={{ fontSize: 14, color: C.text2, margin: 0, maxWidth: 480, lineHeight: 1.6 }}>
                Manage patients across your department. Every ECG, every report, every note — in one place.
              </p>
            </div>
            <div className="patients-view" style={{ opacity: 0 }}>
              <PatientTablePreview />
            </div>
          </div>
        </section>

        {/* ── Reports ── */}
        <section ref={reportsRef} id="reports" aria-labelledby="reports-heading" className="lp-sec" style={{ background: '#fff' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 40 }}>
              <SectionLabel>Clinical Reports</SectionLabel>
              <h2 id="reports-heading" style={{ fontSize: 'clamp(26px, 2.8vw, 34px)', letterSpacing: '-0.025em', fontWeight: 700, margin: '0 0 8px', color: C.text }}>
                Professional, structured, signed
              </h2>
              <p style={{ fontSize: 14, color: C.text2, margin: 0, maxWidth: 480, lineHeight: 1.6 }}>
                Each report includes patient summary, measurements, interpretation, and digital signature. Export as PDF or send to your EHR.
              </p>
            </div>
            <div className="reports-view lp-clin-report" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start', opacity: 0 }}>
              <ClinicalReportPreview />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
                {[{ label: 'PDF Export', desc: 'Download complete report with hospital branding' }, { label: 'HL7 v2', desc: 'Send structured results to any HMS/EHR' }, { label: 'FHIR R4', desc: 'Standardized observation resources' }].map(d => (
                  <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: C.bg, borderRadius: 10, border: `1px solid ${C.borderSoft}` }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: C.primary50, display: 'grid', placeItems: 'center', color: C.primary }}><Ic.FileText size={15} /></div>
                    <div><div style={{ fontSize: 13, fontWeight: 600 }}>{d.label}</div><div style={{ fontSize: 11.5, color: C.text2 }}>{d.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section ref={testimonialsRef} id="testimonials" className="lp-sec">
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <SectionLabel>From the Field</SectionLabel>
              <h2 style={{ fontSize: 'clamp(26px, 2.8vw, 34px)', letterSpacing: '-0.025em', fontWeight: 700, margin: '0', color: C.text }}>
                Trusted by Nigeria&rsquo;s leading cardiology programs
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
              {TESTIMONIALS.map(t => (
                <div key={t.name} className="testimonial-item" style={{ background: '#fff', borderRadius: 12, border: `1px solid ${C.borderSoft}`, padding: 24, boxShadow: C.shadowSm, opacity: 0 }}>
                  <div style={{ fontSize: 13.5, color: C.text2, lineHeight: 1.65, marginBottom: 16, fontStyle: 'italic' }}>&ldquo;{t.quote}&rdquo;</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar initials={t.name.split(' ').slice(1).map(x => x[0]).join('').slice(0, 2)} size={32} />
                    <div><div style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</div><div style={{ fontSize: 11.5, color: C.text2 }}>{t.role}, {t.org}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section style={{ padding: '80px 48px', textAlign: 'center', background: '#fff', borderTop: `1px solid ${C.borderSoft}` }}>
          <div style={{ maxWidth: 520, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', letterSpacing: '-0.02em', fontWeight: 700, margin: '0 0 10px', color: C.text }}>
              Ready to see CardioEcg in action?
            </h2>
            <p style={{ fontSize: 14, color: C.text2, margin: '0 0 28px', lineHeight: 1.6 }}>
              30-minute walkthrough with your team on a de-identified sample of your hospital&rsquo;s recordings.
            </p>
            <button type="button" onClick={() => navigate('login')} style={{
              padding: '11px 24px', borderRadius: 9, fontSize: 14, fontWeight: 550, fontFamily: 'inherit', border: 'none', cursor: 'pointer', lineHeight: 1,
              background: C.primary, color: '#fff',
            }}
              onMouseEnter={e => e.currentTarget.style.background = C.primary700}
              onMouseLeave={e => e.currentTarget.style.background = C.primary}>
              Book a Demo
            </button>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer style={{
        padding: '40px 48px 32px', background: '#fff', borderTop: `1px solid ${C.borderSoft}`,
        display: 'flex', flexDirection: 'column', gap: 24,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24, maxWidth: 1100, margin: '0 auto', width: '100%' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Ic.Logo size={20} />
              <span style={{ fontWeight: 650, fontSize: 13.5 }}>CardioEcg</span>
            </div>
            <div style={{ fontSize: 12, color: C.text2 }}>Lagos, Nigeria</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '32px 48px', fontSize: 12.5 }}>
            {[
              { h: 'Product', l: ['Features', 'Workflow', 'Security', 'Pricing'] },
              { h: 'Resources', l: ['Documentation', 'API Status', 'Compliance', 'Support'] },
              { h: 'Legal', l: ['Privacy Policy', 'Terms of Service', 'NAFDAC', 'SOC 2'] },
            ].map(col => (
              <div key={col.h}>
                <div style={{ fontWeight: 600, color: C.text, marginBottom: 10, fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '.06em' }}>{col.h}</div>
                {col.l.map(l => (
                  <a key={l} href={`/${l.toLowerCase().replace(/ /g, '-')}`} style={{ display: 'block', color: C.text2, textDecoration: 'none', padding: '3px 0', transition: 'color .15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = C.text}
                    onMouseLeave={e => e.currentTarget.style.color = C.text2}>{l}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.borderSoft}`, paddingTop: 16, fontSize: 11.5, color: C.text3, textAlign: 'center', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
          &copy; 2026 CardioEcg. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
