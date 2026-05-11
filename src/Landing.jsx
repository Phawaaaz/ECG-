import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { Icons as Ic } from './Icons.jsx';
import { useNav } from './NavContext.jsx';

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
  { title: 'Hospital-grade security',   desc: 'NAFDAC compliant, NDIC-aligned. Single-tenant deployment on request.',                           icon: 'ShieldCheck' },
  { title: 'HL7 & FHIR integration',    desc: 'Drop-in connectors for Epic, Cerner and major MUSE / GE / Philips devices.',           icon: 'Layers' },
  { title: 'Sub-minute turnaround',     desc: 'Average time from upload to first interpretation: 38 seconds.',                                   icon: 'Zap' },
  { title: 'Clinician in the loop',     desc: 'AI suggests. A licensed cardiologist signs. Decision support, never decision making.',            icon: 'Stethoscope' },
];

const STATS_DATA = [
  { value: '1.8M',  label: 'ECGs analyzed across Nigeria' },
  { value: '97.8%', label: 'Rhythm classification accuracy' },
  { value: '38s',   label: 'Avg. time to first interpretation' },
  { value: '18',    label: 'Hospitals & cardiology groups' },
];

function useViewAnimation(ref, fn) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fn();
        observer.unobserve(el);
      }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, fn]);
}

export function Landing() {
  const navigate = useNav();
  const [sticky, setSticky] = useState(false);
  const heroRef = useRef(null);
  const workflowRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    animate('.hero-fade', {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(100),
      easing: 'easeOutCubic',
    });
    animate('.hero-btn', {
      translateY: [15, 0],
      opacity: [0, 1],
      duration: 400,
      delay: stagger(80),
      easing: 'easeOutCubic',
    });
  }, []);

  /* ── Header becomes sticky when hero scrolls past ── */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => setSticky(!e.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useViewAnimation(workflowRef, () => {
    animate('.workflow-item', { opacity: [0, 1], translateY: [24, 0], duration: 500, delay: stagger(90), easing: 'easeOutCubic' });
  });

  useViewAnimation(featuresRef, () => {
    animate('.feature-item', { opacity: [0, 1], translateY: [24, 0], duration: 500, delay: stagger(70), easing: 'easeOutCubic' });
  });

  useViewAnimation(statsRef, () => {
    animate('.stat-item', { opacity: [0, 1], translateY: [16, 0], duration: 400, delay: stagger(90), easing: 'easeOutCubic' });
    animate('.stat-value', { scale: [0.85, 1], duration: 700, delay: stagger(90), easing: 'easeOutElastic(1, .5)' });
  });

  useViewAnimation(ctaRef, () => {
    animate('.cta-content', { opacity: [0, 1], translateY: [20, 0], duration: 500, easing: 'easeOutCubic' });
  });

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>

      <header style={{
        display: 'flex', alignItems: 'center', padding: '18px 48px',
        position: 'sticky', top: 0, zIndex: 50, transition: '.2s',
        background: sticky ? '#fff' : 'transparent',
        borderBottom: sticky ? '1px solid #eee' : '1px solid transparent',
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'inherit' }} aria-label="CardioEcg home">
          <Ic.Logo size={22} />
          <span style={{ fontWeight: 650, fontSize: 14, letterSpacing: '-0.01em' }}>CardioEcg</span>
        </a>
        <nav style={{ display: 'flex', gap: 24, marginLeft: 48 }} aria-label="Site navigation">
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`} style={{
              fontSize: 13, color: '#374151', textDecoration: 'none', fontWeight: 500,
            }}>{link}</a>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <button type="button" onClick={() => navigate('login')} style={{
            fontSize: 13, color: '#374151', fontWeight: 500, background: 'none',
            border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '6px 10px',
          }}>
            Sign in
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('login')}>Book a demo</button>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section ref={heroRef} aria-labelledby="hero-heading" style={{
          padding: '100px 48px 80px', textAlign: 'center',
          background: '#F8FAFC',
        }}>
          <div className="hero-fade" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px 4px 6px',
            background: '#fff', borderRadius: 999, fontSize: 12, color: '#475569', fontWeight: 500,
            marginBottom: 24, boxShadow: '0 1px 2px rgba(0,0,0,.04), 0 0 0 1px rgba(0,0,0,.04)',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} aria-hidden="true" />
            NAFDAC cleared · NLoN compliant
          </div>
          <h1 id="hero-heading" className="hero-fade" style={{
            fontSize: 'clamp(32px, 4.5vw, 50px)', lineHeight: 1.08, letterSpacing: '-0.03em',
            fontWeight: 700, margin: '0 0 14px', color: '#0F172A',
          }}>
            ECG analysis for<br />Nigerian hospitals.
          </h1>
          <p className="hero-fade" style={{
            fontSize: 15, color: '#6B7280', lineHeight: 1.6, margin: '0 auto 28px', maxWidth: 480,
          }}>
            From LUTH to UCH — clinical-grade cardiac interpretation
            built for the way your team works.
          </p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-primary btn-lg hero-btn" onClick={() => navigate('login')}>Book a demo</button>
            <button type="button" className="btn btn-secondary btn-lg hero-btn" onClick={() => navigate('login')}>View sample report</button>
          </div>
        </section>

        {/* ── How it works ── */}
        <section ref={workflowRef} id="platform" aria-labelledby="workflow-heading" style={{
          padding: '80px 48px', background: '#fff',
        }}>
          <div style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto 48px' }}>
            <h2 id="workflow-heading" style={{
              fontSize: 'clamp(24px, 2.5vw, 32px)', letterSpacing: '-0.02em',
              margin: '0 0 10px', fontWeight: 700, color: '#0F172A',
            }}>
              Four steps. No new workflow.
            </h2>
            <p style={{ fontSize: 14, color: '#6B7280', margin: 0, lineHeight: 1.6 }}>
              CardioEcg sits between your devices and your HMS/EHR.
            </p>
          </div>
          <ol style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 14, maxWidth: 1000, margin: '0 auto', listStyle: 'none', padding: 0,
          }}>
            {WORKFLOW_STEPS.map(({ title, desc, icon }, i) => {
              const IconC = Ic[icon];
              return (
                <li key={title} className="workflow-item" style={{
                  padding: '28px 22px', borderRadius: 10, border: '1px solid #eee',
                  background: '#fff', opacity: 0,
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: 7, background: '#EFF6FF', display: 'grid', placeItems: 'center', color: '#2563EB', marginBottom: 12 }}>
                    <IconC size={15} />
                  </div>
                  <p style={{ fontSize: 10.5, color: '#9CA3AF', fontWeight: 600, marginBottom: 3, marginTop: 0 }}>0{i + 1}</p>
                  <h3 style={{ fontSize: 14, margin: '0 0 3px', fontWeight: 600, color: '#0F172A' }}>{title}</h3>
                  <p style={{ fontSize: 12.5, color: '#6B7280', margin: 0, lineHeight: 1.6 }}>{desc}</p>
                </li>
              );
            })}
          </ol>
        </section>

        {/* ── Features ── */}
        <section ref={featuresRef} id="for-hospitals" aria-labelledby="features-heading" style={{
          padding: '80px 48px', background: '#F8FAFC',
        }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 id="features-heading" style={{
              fontSize: 'clamp(24px, 2.5vw, 32px)', letterSpacing: '-0.02em',
              margin: '0 0 8px', fontWeight: 700, color: '#0F172A',
            }}>
              Built for Nigerian clinicians.
            </h2>
            <p style={{ fontSize: 14, color: '#6B7280', margin: '0 0 36px', maxWidth: 500, lineHeight: 1.6 }}>
              Every decision is auditable. Every record stays in your tenant — NAFDAC and NLoN compliant.
            </p>
            <ul style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 14, listStyle: 'none', padding: 0, margin: 0,
            }}>
              {FEATURES.map(({ title, desc, icon }) => {
                const IconC = Ic[icon];
                return (
                  <li key={title} className="feature-item" style={{
                    background: '#fff', padding: '22px', borderRadius: 10,
                    border: '1px solid #eee', opacity: 0,
                  }}>
                    <div style={{ width: 30, height: 30, borderRadius: 7, background: '#EFF6FF', display: 'grid', placeItems: 'center', color: '#2563EB', marginBottom: 10 }}>
                      <IconC size={14} />
                    </div>
                    <h3 style={{ fontSize: 13.5, margin: '0 0 3px', fontWeight: 600, color: '#0F172A' }}>{title}</h3>
                    <p style={{ fontSize: 12.5, color: '#6B7280', margin: 0, lineHeight: 1.6 }}>{desc}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ── Stats ── */}
        <section ref={statsRef} aria-label="Platform statistics" style={{ padding: '64px 48px', background: '#fff' }}>
          <ul style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 20, maxWidth: 900, margin: '0 auto', listStyle: 'none', padding: 0,
          }}>
            {STATS_DATA.map(({ value, label }) => (
              <li key={label} className="stat-item" style={{
                textAlign: 'center', padding: '24px 14px', background: '#F8FAFC',
                borderRadius: 10, border: '1px solid #eee', opacity: 0,
              }}>
                <div className="stat-value" style={{
                  fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 700,
                  letterSpacing: '-0.025em', color: '#2563EB', marginBottom: 4,
                }}>
                  {value}
                </div>
                <div style={{ fontSize: 12.5, color: '#6B7280', lineHeight: 1.4 }}>{label}</div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── CTA ── */}
        <section ref={ctaRef} aria-labelledby="cta-heading" style={{
          padding: '80px 48px', background: '#0F172A',
        }}>
          <div className="cta-content" style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto', opacity: 0 }}>
            <h2 id="cta-heading" style={{
              fontSize: 'clamp(24px, 2.5vw, 32px)', letterSpacing: '-0.02em',
              margin: '0 0 10px', fontWeight: 700, color: '#fff',
            }}>
              Try it on your own data.
            </h2>
            <p style={{
              fontSize: 14, color: '#94A3B8', margin: '0 0 28px', lineHeight: 1.6,
            }}>
              30-minute walkthrough with a de-identified sample of your hospital&rsquo;s recordings. No commitment.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button type="button" onClick={() => navigate('login')} style={{
                padding: '11px 24px', borderRadius: 8, fontSize: 14, fontWeight: 550,
                fontFamily: 'inherit', border: 'none', cursor: 'pointer', lineHeight: 1,
                background: '#2563EB', color: '#fff',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#1D4ED8'}
                onMouseLeave={e => e.currentTarget.style.background = '#2563EB'}>
                Book a demo
              </button>
              <button type="button" onClick={() => navigate('login')} style={{
                padding: '11px 24px', borderRadius: 8, fontSize: 14, fontWeight: 550,
                fontFamily: 'inherit', cursor: 'pointer', lineHeight: 1,
                background: '#fff', color: '#0F172A', border: 'none',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                Talk to sales
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer style={{
        padding: '32px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#6B7280',
        background: '#fff',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Ic.Logo size={18} />
          <span>CardioEcg</span>
        </div>
        <span>&copy; 2026 Lagos, Nigeria</span>
        <div style={{ display: 'flex', gap: 20 }}>
          <a href="/security" style={{ color: '#6B7280', textDecoration: 'none' }}>Security</a>
          <a href="/nafdac" style={{ color: '#6B7280', textDecoration: 'none' }}>NAFDAC</a>
          <a href="/privacy" style={{ color: '#6B7280', textDecoration: 'none' }}>Privacy</a>
          <a href="/terms" style={{ color: '#6B7280', textDecoration: 'none' }}>Terms</a>
        </div>
      </footer>
    </div>
  );
}
