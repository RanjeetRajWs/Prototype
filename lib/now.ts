// Frozen NOW for deterministic mock data and demos.
// Pin to 2026-05-12 10:00 UTC so charts, calendars, and "X days ago" copy stay stable.
export const NOW = new Date('2026-05-12T10:00:00Z');

// Seeded LCG so generated data is identical across reloads and machines.
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

export function pick<T>(rng: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

export function offsetDays(days: number, h = 10, m = 0): Date {
  const d = new Date(NOW);
  d.setUTCDate(d.getUTCDate() + days);
  d.setUTCHours(h, m, 0, 0);
  return d;
}
