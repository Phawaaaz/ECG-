// Realistic ECG waveform generator + components.
// Builds a PQRST complex repeated across the strip with subtle baseline wander.

const { useEffect, useRef, useState, useMemo } = React;

// Generate one PQRST cycle of points (x in 0..1, y centered at 0, +up)
function pqrst(t, opts = {}) {
  // t: 0..1 within a single cardiac cycle
  const { p = 1, q = 1, r = 1, s = 1, tt = 1 } = opts;
  const gauss = (c, s) => Math.exp(-Math.pow((t - c) / s, 2));
  const P = 0.13 * p * gauss(0.18, 0.024);
  const Q = -0.10 * q * gauss(0.37, 0.012);
  const R = 1.00 * r * gauss(0.40, 0.013);
  const S = -0.25 * s * gauss(0.43, 0.013);
  const T = 0.27 * tt * gauss(0.62, 0.045);
  return P + Q + R + S + T;
}

// Build a polyline path for a strip of cycles
function buildEcgPath({ width, height, cycles = 6, baseY = 0.5, amp = 0.32, seed = 0, irregular = false }) {
  const pts = [];
  const steps = Math.max(360, Math.floor(width * 1.5));
  for (let i = 0; i <= steps; i++) {
    const xN = i / steps;
    const localCycles = cycles;
    const cyclePos = xN * localCycles;
    const k = Math.floor(cyclePos);
    let t = cyclePos - k;
    // small RR variability
    const variation = irregular ? (Math.sin(seed + k * 1.7) * 0.06 + Math.sin(seed * 2 + k) * 0.03) : 0;
    const cycleT = (t + variation) % 1;
    const v = pqrst(cycleT);
    // baseline wander
    const wander = 0.012 * Math.sin(seed + xN * 6.28) + 0.006 * Math.sin(seed * 3 + xN * 18);
    const y = baseY * height - (v * amp + wander) * height;
    pts.push(`${(xN * width).toFixed(2)},${y.toFixed(2)}`);
  }
  return 'M ' + pts.join(' L ');
}

function EcgStrip({ width = 760, height = 160, cycles = 7, color = '#DC2626', strokeWidth = 1.6, animate = false, label, lead, irregular = false }) {
  const path = useMemo(() => buildEcgPath({ width, height, cycles, irregular, seed: cycles + width / 100 }), [width, height, cycles, irregular]);
  const [progress, setProgress] = useState(animate ? 0 : 1);
  useEffect(() => {
    if (!animate) return;
    let raf, start;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = ((ts - start) / 2200) % 1;
      setProgress(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate]);
  return (
    <div style={{ position: 'relative', width, height }} className="ecg-grid">
      {lead && <div style={{ position: 'absolute', top: 8, left: 10, fontSize: 11, fontWeight: 600, color: '#6B7280', fontFamily: 'ui-monospace, monospace', letterSpacing: '.05em' }}>{lead}</div>}
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
        <path d={path} stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {animate && (
          <line x1={progress * width} x2={progress * width} y1="0" y2={height} stroke={color} strokeWidth="1" opacity="0.4" />
        )}
      </svg>
      {label && <div style={{ position: 'absolute', bottom: 6, right: 10, fontSize: 10.5, fontFamily: 'ui-monospace, monospace', color: '#9CA3AF' }}>{label}</div>}
    </div>
  );
}

// Mini sparkline-style ECG (for cards / list rows)
function EcgMini({ width = 120, height = 32, cycles = 3, color = '#2563EB', strokeWidth = 1.3 }) {
  const path = useMemo(() => buildEcgPath({ width, height, cycles, amp: 0.36, baseY: 0.55, seed: width }), [width, height, cycles]);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <path d={path} stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Multi-lead strip viewer (3 leads stacked)
function EcgMultiLead({ width = 900, leadHeight = 120, leads = ['I', 'II', 'V1'], color = '#DC2626' }) {
  return (
    <div className="ecg-card ecg-grid" style={{ width, padding: '6px 4px' }}>
      {leads.map((l, i) => (
        <div key={l} style={{ borderBottom: i === leads.length - 1 ? 'none' : '1px dashed rgba(220,38,38,0.18)' }}>
          <EcgStrip width={width - 8} height={leadHeight} cycles={9} lead={l} color={color} strokeWidth={1.5} />
        </div>
      ))}
    </div>
  );
}

window.EcgStrip = EcgStrip;
window.EcgMini = EcgMini;
window.EcgMultiLead = EcgMultiLead;
