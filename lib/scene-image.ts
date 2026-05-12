// Offline scene illustrations. Each tour/agency gets a deterministic editorial
// SVG poster (no network, no flicker). Renders into a data URI usable from <img />.

type Scene =
  | 'oldtown'
  | 'castle'
  | 'river'
  | 'night'
  | 'food'
  | 'nature'
  | 'imperial'
  | 'music'
  | 'spa'
  | 'pub';

const palettes: Record<Scene, { sky: [string, string]; ink: string; accent: string }> = {
  oldtown:  { sky: ['#F6DDB5', '#E8A87C'], ink: '#1F2937', accent: '#B25A2B' },
  castle:   { sky: ['#D5DBE3', '#8FA3B7'], ink: '#1B2735', accent: '#4B5D6F' },
  river:    { sky: ['#E9D6B8', '#C77B5C'], ink: '#1B2735', accent: '#3C6E91' },
  night:    { sky: ['#0F172A', '#312E81'], ink: '#0B1024', accent: '#FBBF24' },
  food:     { sky: ['#FBEFD9', '#E07B39'], ink: '#3F2A1A', accent: '#B25A2B' },
  nature:   { sky: ['#E2EDD8', '#7BA679'], ink: '#1F3A2A', accent: '#4E7A4D' },
  imperial: { sky: ['#EDE3D2', '#C9B98D'], ink: '#2B2417', accent: '#8A6E3A' },
  music:    { sky: ['#E6DCEF', '#8A6FB5'], ink: '#1B1230', accent: '#6B4A91' },
  spa:      { sky: ['#D6E9EE', '#6FAEB8'], ink: '#0F2E33', accent: '#3D8389' },
  pub:      { sky: ['#F3DDB6', '#8E5A2B'], ink: '#2A1A0E', accent: '#B25A2B' },
};

function svg(scene: Scene, label: string, sub: string): string {
  const p = palettes[scene];
  const skylineByScene: Record<Scene, string> = {
    oldtown: `
      <path d="M0,360 L0,260 L40,260 L40,210 L70,210 L70,250 L120,250 L120,180 L150,160 L180,180 L180,250 L240,250 L240,200 L260,180 L280,200 L280,250 L340,250 L340,220 L380,200 L420,220 L420,260 L500,260 L500,230 L540,210 L580,230 L580,270 L660,270 L660,250 L720,250 L720,290 L800,290 L800,360 Z" fill="${p.ink}" opacity="0.85"/>
      <path d="M150,160 L150,130 L155,130 L155,120 L165,120 L165,130 L170,130 L170,160 Z" fill="${p.ink}"/>
      <path d="M260,180 L260,140 L265,140 L265,128 L275,128 L275,140 L280,140 L280,180 Z" fill="${p.ink}"/>
    `,
    castle: `
      <path d="M0,360 L0,300 L200,300 L200,250 L280,250 L280,210 L320,210 L320,180 L360,180 L360,210 L400,210 L400,250 L480,250 L480,220 L520,220 L520,200 L560,200 L560,240 L600,240 L600,270 L800,270 L800,360 Z" fill="${p.ink}" opacity="0.85"/>
      <path d="M280,250 L280,240 L300,240 L300,250 Z" fill="${p.sky[1]}"/>
      <path d="M340,180 L340,168 L380,168 L380,180 Z" fill="${p.sky[1]}"/>
    `,
    river: `
      <path d="M0,360 L0,310 L800,310 L800,360 Z" fill="${p.accent}" opacity="0.35"/>
      <path d="M0,300 L0,260 L120,260 L120,230 L180,210 L240,230 L240,260 L360,260 L380,240 L420,260 L520,260 L540,230 L600,250 L680,230 L760,250 L800,240 L800,300 Z" fill="${p.ink}" opacity="0.85"/>
      <path d="M100,300 Q160,290 220,300 Q280,310 340,300 L340,308 L100,308 Z" fill="${p.ink}" opacity="0.7"/>
    `,
    night: `
      <circle cx="640" cy="120" r="40" fill="${p.accent}" opacity="0.9"/>
      <circle cx="120" cy="80" r="2" fill="#FFFFFF"/>
      <circle cx="220" cy="60" r="1.5" fill="#FFFFFF"/>
      <circle cx="340" cy="100" r="2" fill="#FFFFFF"/>
      <circle cx="480" cy="50" r="1.5" fill="#FFFFFF"/>
      <circle cx="540" cy="90" r="2" fill="#FFFFFF"/>
      <circle cx="700" cy="60" r="1.5" fill="#FFFFFF"/>
      <path d="M0,360 L0,280 L100,280 L100,240 L160,220 L220,240 L220,280 L300,280 L320,250 L360,280 L460,280 L480,250 L520,280 L600,280 L620,260 L680,260 L700,280 L800,280 L800,360 Z" fill="#000000" opacity="0.85"/>
    `,
    food: `
      <circle cx="220" cy="200" r="80" fill="${p.accent}" opacity="0.18"/>
      <circle cx="540" cy="160" r="60" fill="${p.accent}" opacity="0.22"/>
      <circle cx="640" cy="240" r="100" fill="${p.accent}" opacity="0.15"/>
      <path d="M0,360 L0,330 L800,330 L800,360 Z" fill="${p.ink}" opacity="0.15"/>
    `,
    nature: `
      <path d="M0,360 L0,260 Q200,180 400,260 Q600,340 800,240 L800,360 Z" fill="${p.accent}" opacity="0.55"/>
      <path d="M0,360 L0,310 Q200,260 400,310 Q600,360 800,300 L800,360 Z" fill="${p.ink}" opacity="0.6"/>
      <circle cx="660" cy="100" r="32" fill="#FFFFFF" opacity="0.4"/>
    `,
    imperial: `
      <path d="M120,360 L120,260 L150,260 L150,200 L300,200 L300,260 L500,260 L500,200 L650,200 L650,260 L680,260 L680,360 Z" fill="${p.ink}" opacity="0.85"/>
      <path d="M380,200 L380,160 L420,160 L420,200 Z" fill="${p.ink}"/>
      <circle cx="400" cy="150" r="4" fill="${p.accent}"/>
    `,
    music: `
      <circle cx="400" cy="200" r="120" fill="#FFFFFF" opacity="0.15"/>
      <path d="M380,140 Q420,160 400,200 Q380,240 420,260" stroke="${p.ink}" stroke-width="6" fill="none" opacity="0.6"/>
      <circle cx="420" cy="260" r="14" fill="${p.ink}" opacity="0.7"/>
      <path d="M0,360 L0,320 L800,320 L800,360 Z" fill="${p.ink}" opacity="0.2"/>
    `,
    spa: `
      <ellipse cx="400" cy="340" rx="500" ry="40" fill="${p.accent}" opacity="0.35"/>
      <ellipse cx="280" cy="320" rx="80" ry="10" fill="#FFFFFF" opacity="0.4"/>
      <ellipse cx="520" cy="320" rx="120" ry="14" fill="#FFFFFF" opacity="0.4"/>
      <path d="M0,360 L0,260 L120,260 L120,220 L160,200 L220,220 L240,250 L360,250 L380,220 L460,230 L520,200 L580,220 L640,250 L800,240 L800,360 Z" fill="${p.ink}" opacity="0.55"/>
    `,
    pub: `
      <rect x="100" y="220" width="600" height="120" fill="${p.ink}" opacity="0.7"/>
      <rect x="160" y="240" width="80" height="80" fill="${p.sky[1]}" opacity="0.6"/>
      <rect x="280" y="240" width="80" height="80" fill="${p.sky[1]}" opacity="0.6"/>
      <rect x="400" y="240" width="80" height="80" fill="${p.sky[1]}" opacity="0.6"/>
      <rect x="520" y="240" width="80" height="80" fill="${p.sky[1]}" opacity="0.6"/>
      <rect x="380" y="180" width="40" height="40" fill="${p.accent}"/>
    `,
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${p.sky[0]}"/>
      <stop offset="100%" stop-color="${p.sky[1]}"/>
    </linearGradient>
    <linearGradient id="overlay" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${p.ink}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${p.ink}" stop-opacity="0.55"/>
    </linearGradient>
  </defs>
  <rect width="800" height="360" fill="url(#sky)"/>
  ${skylineByScene[scene]}
  <rect width="800" height="360" fill="url(#overlay)"/>
  <text x="40" y="296" font-family="Manrope, Inter, sans-serif" font-weight="800" font-size="34" fill="#FFFFFF" letter-spacing="-0.5">${escapeXml(label)}</text>
  <text x="40" y="326" font-family="Inter, sans-serif" font-weight="600" font-size="14" fill="#FFFFFF" opacity="0.85" letter-spacing="2">${escapeXml(sub.toUpperCase())}</text>
</svg>`;
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;');
}

function toDataUri(s: string) {
  // Use encodeURIComponent so non-ASCII (like ē, ę) is safe.
  return `data:image/svg+xml,${encodeURIComponent(s)}`;
}

const sceneMap: Record<string, Scene> = {
  // Prague
  'old-town-astronomical-clock': 'oldtown',
  'prague-castle-lesser-town': 'castle',
  'beer-bohemia-local-pub-tour': 'pub',
  'communist-prague-cold-war': 'oldtown',
  'jewish-quarter-walking-tour': 'oldtown',
  'vltava-river-cruise': 'river',
  'charles-bridge-by-night': 'night',
  'czech-food-drink-tasting': 'food',
  'prague-zoo-family-day': 'nature',
  'karlstejn-castle-day-trip': 'castle',
  'bohemian-switzerland-hike': 'nature',
  'photographers-prague': 'oldtown',
  // Budapest
  'buda-castle-fishermans-bastion': 'castle',
  'parliament-heroes-square': 'imperial',
  'thermal-baths-experience': 'spa',
  'budapest-ruin-bar-crawl': 'night',
  'danube-sunset-cruise': 'river',
  'jewish-quarter-holocaust-history': 'oldtown',
  // Vienna
  'imperial-vienna-walking-tour': 'imperial',
  'schonbrunn-palace-half-day': 'imperial',
  'mozart-music-trail': 'music',
  'vienna-coffee-house-culture': 'food',
};

export function sceneFor(slug: string): Scene {
  return sceneMap[slug] ?? 'oldtown';
}

export function sceneImage(slug: string, label: string, sub: string): string {
  return toDataUri(svg(sceneFor(slug), label, sub));
}

// Helper for generic city posters used in hero banners.
const cityHeroImages: Record<string, string> = {
  'Prague': 'photo-1541849548-206242a477bf',
  'Budapest': 'photo-1551882547-ff43c63cd53e',
  'Vienna': 'photo-1516550893923-42d28e5677af',
  'Krakow': 'photo-1516147539103-45ab603c626c'
};

export function cityHero(city: string, _scene: Scene = 'oldtown'): string {
  const id = cityHeroImages[city] || cityHeroImages['Prague'];
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1920&q=80`;
}

// Simple monogram avatar used to replace external portrait URLs.
const portraits = [
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1494790108377-be9c29b29330',
  'photo-1500648767791-00dcc994a43e',
  'photo-1534528741775-53994a69daeb',
  'photo-1506794778202-cad84cf45f1d',
  'photo-1544005313-94ddf0286df2',
  'photo-1531746020798-e6953c6e8e04',
  'photo-1552058544-f2b08422138a'
];

export function monogramAvatar(name: string): string {
  const seed = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const id = portraits[seed % portraits.length];
  return `https://images.unsplash.com/${id}?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`;
}
