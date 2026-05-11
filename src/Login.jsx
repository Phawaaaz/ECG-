import { useState } from 'react';
import { Icons as Ic } from './Icons.jsx';

export function Login() {
  const [email, setEmail]       = useState('r.mehta@mercywest.health');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
    setLoading(true);
    // Simulate async sign-in (replace with real auth call)
    setTimeout(() => setLoading(false), 1200);
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh', background: '#fff' }}>

      {/* ── Illustration side ── */}
      <div style={{ background: '#F7F9FC', padding: '40px 48px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }} aria-hidden="true">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Ic.Logo size={28} />
          <span style={{ fontWeight: 650, fontSize: 15, letterSpacing: '-0.01em' }}>CardioEcg</span>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="360" height="360" viewBox="0 0 360 360" fill="none" aria-hidden="true">
            <circle cx="180" cy="180" r="160" stroke="#E5EAF2" strokeWidth="1" />
            <circle cx="180" cy="180" r="120" stroke="#DBE3EF" strokeWidth="1" />
            <circle cx="180" cy="180" r="80"  stroke="#C7D2FE" strokeWidth="1" />
            <circle cx="180" cy="180" r="40"  fill="url(#login-grad)" />
            <path d="M180 158v44M168 180h24" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <defs>
              <radialGradient id="login-grad" cx="0.3" cy="0.3" r="0.9">
                <stop stopColor="#3B82F6" />
                <stop offset="1" stopColor="#1D4ED8" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>Clinical decision support for licensed providers.</p>
      </div>

      {/* ── Sign-in form ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
        <div style={{ width: 340 }}>
          <h1 style={{ fontSize: 24, fontWeight: 650, letterSpacing: '-0.02em', margin: '0 0 28px' }}>Sign in</h1>

          <form onSubmit={handleSubmit} noValidate aria-label="Sign in to CardioEcg">
            {error && (
              <div
                role="alert"
                style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: '#B91C1C', marginBottom: 16 }}
              >
                {error}
              </div>
            )}

            <div style={{ marginBottom: 14 }}>
              <label className="label" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                className="input"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                aria-required="true"
              />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label className="label" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                className="input"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                aria-required="true"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '11px 14px', marginBottom: 16 }}
              aria-busy={loading}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#9CA3AF', fontSize: 11.5, fontWeight: 500, marginBottom: 16 }} aria-hidden="true">
              <div style={{ flex: 1, height: 1, background: '#F1F3F7' }} />
              or
              <div style={{ flex: 1, height: 1, background: '#F1F3F7' }} />
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center', padding: '11px 14px' }}
            >
              Continue with hospital SSO
            </button>
          </form>

          <div style={{ marginTop: 22, textAlign: 'center', fontSize: 12.5, color: '#9CA3AF' }}>
            <button
              type="button"
              style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: 500, cursor: 'pointer', fontSize: 'inherit', padding: 0, fontFamily: 'inherit' }}
            >
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
