import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Icons as Ic } from './Icons.jsx';
import { useNav } from './NavContext.jsx';

const FOOTER_LINKS = ['Security', 'NAFDAC', 'Privacy', 'Terms', 'Status'];

function useViewAnimation(ref, fn) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fn();
        observer.unobserve(el);
      }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, fn]);
}

export function Landing() {
  const navigate = useNav();
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

  useViewAnimation(ctaRef, () => {
    animate('.cta-content', { opacity: [0, 1], translateY: [20, 0], duration: 500, easing: 'easeOutCubic' });
  });

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>

      <header style={{
        display: 'flex', alignItems: 'center', padding: '18px 48px',
        background: '#fff', borderBottom: '1px solid #eee',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'inherit' }} aria-label="CardioEcg home">
          <Ic.Logo size={22} />
          <span style={{ fontWeight: 650, fontSize: 14, letterSpacing: '-0.01em' }}>CardioEcg</span>
        </a>
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
        <section aria-labelledby="hero-heading" style={{
          padding: '100px 48px 80px', textAlign: 'center',
          background: '#F8FAFC',
        }}>
          <div className="hero-fade" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px 4px 6px',
            background: '#fff', borderRadius: 999, fontSize: 12, color: '#475569', fontWeight: 500,
            marginBottom: 24, boxShadow: '0 1px 2px rgba(0,0,0,.04), 0 0 0 1px rgba(0,0,0,.04)',
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%', background: '#16A34A',
              display: 'inline-block',
            }} aria-hidden="true" />
            NAFDAC cleared · NLoN compliant
          </div>
          <h1 id="hero-heading" className="hero-fade" style={{
            fontSize: 'clamp(32px, 4.5vw, 50px)', lineHeight: 1.08, letterSpacing: '-0.03em',
            fontWeight: 700, margin: '0 0 14px', color: '#0F172A',
          }}>
            ECG analysis for<br />Nigerian hospitals.
          </h1>
          <p className="hero-fade" style={{
            fontSize: 15, color: '#6B7280', lineHeight: 1.6, margin: '0 auto 28px',
            maxWidth: 480,
          }}>
            From LUTH to UCH — clinical-grade cardiac interpretation
            built for the way your team works.
          </p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-primary btn-lg hero-btn" onClick={() => navigate('login')}>Book a demo</button>
            <button type="button" className="btn btn-secondary btn-lg hero-btn" onClick={() => navigate('login')}>View sample report</button>
          </div>
        </section>

        {/* ── Simple value prop ── */}
        <section style={{
          padding: '80px 48px', background: '#fff',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          borderBottom: '1px solid #eee',
        }}>
          <p style={{ fontSize: 22, fontWeight: 600, color: '#0F172A', margin: 0, textAlign: 'center', maxWidth: 600 }}>
            AI suggests. A cardiologist signs.
          </p>
          <p style={{ fontSize: 14, color: '#6B7280', margin: 0, textAlign: 'center', maxWidth: 480, lineHeight: 1.6 }}>
            Sub-minute turnaround. Full audit trail. NAFDAC compliant.
            No new hardware, no new workflow.
          </p>
        </section>

        {/* ── CTA ── */}
        <section ref={ctaRef} aria-labelledby="cta-heading" style={{
          padding: '80px 48px', background: '#0F172A',
        }}>
          <div className="cta-content" style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto', opacity: 0 }}>
            <h2 id="cta-heading" style={{
              fontSize: 'clamp(22px, 2.5vw, 30px)', letterSpacing: '-0.02em',
              margin: '0 0 10px', fontWeight: 700, color: '#fff',
            }}>
              See it on your data.
            </h2>
            <p style={{
              fontSize: 14, color: '#94A3B8', margin: '0 0 28px', lineHeight: 1.6,
            }}>
              30-minute walkthrough with a de-identified sample of your hospital&rsquo;s recordings.
            </p>
            <button type="button" onClick={() => navigate('login')} style={{
              padding: '11px 22px', borderRadius: 8, fontSize: 14, fontWeight: 550, fontFamily: 'inherit',
              border: 'none', cursor: 'pointer', lineHeight: 1,
              background: '#2563EB', color: '#fff',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#1D4ED8'}
              onMouseLeave={e => e.currentTarget.style.background = '#2563EB'}>
              Book a demo
            </button>
          </div>
        </section>
      </main>

      <footer style={{
        padding: '28px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12, fontSize: 12, color: '#6B7280',
        background: '#F8FAFC', borderTop: '1px solid #eee',
      }}>
        <span>CardioEcg · Lagos, Nigeria</span>
        <nav aria-label="Footer links">
          <ul style={{ display: 'flex', gap: 20, listStyle: 'none', padding: 0, margin: 0 }}>
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
