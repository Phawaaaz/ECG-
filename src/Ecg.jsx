import { useEffect, useRef, useState, useMemo } from 'react';

// Generate one PQRST cardiac cycle (t: 0..1, y: centered at 0, positive = up)
function pqrst(t, opts = {}) {
  const { p = 1, q = 1, r = 1, s = 1, tt = 1 } = opts;
  const gauss = (c, sig) => Math.exp(-Math.pow((t - c) / sig, 2));
  return (
    0.13 * p  * gauss(0.18, 0.024) +
   -0.10 * q  * gauss(0.37, 0.012) +
    1.00 * r  * gauss(0.40, 0.013) +
   -0.25 * s  * gauss(0.43, 0.013) +
    0.27 * tt * gauss(0.62, 0.045)
  );
}

// Build an SVG polyline path for a multi-cycle ECG strip
function buildEcgPath({ width, height, cycles = 6, baseY = 0.5, amp = 0.32, seed = 0, irregular = false }) {
  const steps = Math.max(360, Math.floor(width * 1.5));
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const xN = i / steps;
    const cyclePos = xN * cycles;
    const k = Math.floor(cyclePos);
    const t = cyclePos - k;
    const variation = irregular
      ? Math.sin(seed + k * 1.7) * 0.06 + Math.sin(seed * 2 + k) * 0.03
      : 0;
    const v = pqrst((t + variation) % 1);
    const wander = 0.012 * Math.sin(seed + xN * 6.28) + 0.006 * Math.sin(seed * 3 + xN * 18);
    const y = baseY * height - (v * amp + wander) * height;
    pts.push(`${(xN * width).toFixed(2)},${y.toFixed(2)}`);
  }
  return 'M ' + pts.join(' L ');
}

export function EcgStrip({
  width = 760, height = 160, cycles = 7,
  color = '#DC2626', strokeWidth = 1.6,
  animate = false, label, lead, irregular = false,
}) {
  const path = useMemo(
    () => buildEcgPath({ width, height, cycles, irregular, seed: cycles + width / 100 }),
    [width, height, cycles, irregular],
  );
  const [progress, setProgress] = useState(animate ? 0 : 1);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!animate) return;
    let start;
    const tick = (ts) => {
      if (!start) start = ts;
      setProgress(((ts - start) / 2200) % 1);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const ariaLabel = lead
    ? `ECG strip — ${lead}${label ? `, ${label}` : ''}`
    : `ECG waveform${label ? ` — ${label}` : ''}`;

  return (
    <div style={{ position: 'relative', width, height }} className="ecg-grid">
      {lead && (
        <div
          style={{ position: 'absolute', top: 8, left: 10, fontSize: 11, fontWeight: 600, color: '#6B7280', fontFamily: 'ui-monospace, monospace', letterSpacing: '.05em' }}
          aria-hidden="true"
        >
          {lead}
        </div>
      )}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ display: 'block' }}
        role="img"
        aria-label={ariaLabel}
      >
        <path d={path} stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {animate && (
          <line x1={progress * width} x2={progress * width} y1="0" y2={height} stroke={color} strokeWidth="1" opacity="0.4" aria-hidden="true" />
        )}
      </svg>
      {label && (
        <div
          style={{ position: 'absolute', bottom: 6, right: 10, fontSize: 10.5, fontFamily: 'ui-monospace, monospace', color: '#9CA3AF' }}
          aria-hidden="true"
        >
          {label}
        </div>
      )}
    </div>
  );
}

// Mini sparkline ECG for table rows and list items
export function EcgMini({ width = 120, height = 32, cycles = 3, color = '#2563EB', strokeWidth = 1.3, label }) {
  const path = useMemo(
    () => buildEcgPath({ width, height, cycles, amp: 0.36, baseY: 0.55, seed: width }),
    [width, height, cycles],
  );
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: 'block' }}
      role="img"
      aria-label={label ?? 'ECG mini waveform'}
    >
      <path d={path} stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Stacked multi-lead viewer (3 leads)
export function EcgMultiLead({ width = 900, leadHeight = 120, leads = ['I', 'II', 'V1'], color = '#DC2626' }) {
  return (
    <div className="ecg-card ecg-grid" style={{ width, padding: '6px 4px' }} role="img" aria-label={`Multi-lead ECG — ${leads.join(', ')}`}>
      {leads.map((l, i) => (
        <div key={l} style={{ borderBottom: i === leads.length - 1 ? 'none' : '1px dashed rgba(220,38,38,0.18)' }}>
          <EcgStrip width={width - 8} height={leadHeight} cycles={9} lead={l} color={color} strokeWidth={1.5} />
        </div>
      ))}
    </div>
  );
}
