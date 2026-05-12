// Lightweight self-contained canvas confetti — no dependency.
// Fires a celebratory burst from the bottom-center.

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  color: string;
  shape: 'rect' | 'circle';
  alpha: number;
}

const palette = ['#E07B39', '#FBEFD9', '#16A34A', '#1E3A8A', '#DC2626', '#FBBF24', '#0F172A'];

export function fireConfetti(opts: { count?: number; duration?: number } = {}) {
  if (typeof window === 'undefined') return;
  const count = opts.count ?? 180;
  const duration = opts.duration ?? 2200;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }
  ctx.scale(dpr, dpr);

  const w = window.innerWidth;
  const h = window.innerHeight;

  const particles: Particle[] = [];
  const origins = [
    { x: w * 0.25, y: h * 0.55 },
    { x: w * 0.75, y: h * 0.55 },
    { x: w * 0.5, y: h * 0.4 },
  ];
  for (let i = 0; i < count; i++) {
    const o = origins[i % origins.length];
    const angle = (Math.random() * Math.PI) - Math.PI / 2; // upward fan
    const speed = 8 + Math.random() * 10;
    particles.push({
      x: o.x,
      y: o.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      size: 4 + Math.random() * 6,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: palette[Math.floor(Math.random() * palette.length)],
      shape: Math.random() > 0.4 ? 'rect' : 'circle',
      alpha: 1,
    });
  }

  const start = performance.now();
  const gravity = 0.35;
  const drag = 0.992;

  let raf = 0;
  const tick = (t: number) => {
    const elapsed = t - start;
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.vy += gravity;
      p.vx *= drag;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      if (elapsed > duration * 0.65) p.alpha = Math.max(0, p.alpha - 0.02);

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    if (elapsed < duration) {
      raf = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(raf);
      canvas.remove();
    }
  };
  raf = requestAnimationFrame(tick);
}
