# TravelEcosystem SaaS — Functional Prototype Build Prompt

> Copy everything below this line into Lovable, Bolt, v0, Replit Agent, or Claude Code. Treat it as a single self-contained brief.

---

## Role and Quality Bar

You are a senior product designer and frontend engineer building a high-stakes, click-through product demo. The output will be shown to a sophisticated European travel-industry founder who is directly comparing this against a competitor's prototype. Lose this comparison and the project is lost. The demo must look better than typical SaaS templates, feel like a complete coherent product (not 14 disconnected pages), have zero lorem ipsum or placeholder text, and use real-feeling content throughout.

Aesthetic targets to internalize before writing code: Linear (calm precision), Stripe Dashboard (clarity and depth), Notion (warmth), Klook and GetYourGuide (consumer booking polish). Avoid stock travel cliches (palm trees, generic beaches, oversaturated stock photos). The product is travel-focused but reads as premium European SaaS.

Aesthetic references provided by the client to match:

- starktemplate.webflow.io
- obliq-template.webflow.io

---

## Product Vision

**TravelEcosystem** is a multi-tenant SaaS platform for travel agencies running guided tours and activities across Europe (primarily Prague, Budapest, Vienna, Krakow). The platform manages bookings, payments, guides, commissions, and OTA integrations across multiple agencies, and lets end consumers book directly via a public-facing website.

The platform also enables cross-selling between agencies in different cities: an agency in Prague can sell tours from a partner agency in Budapest, with commission tracking handled automatically.

The prototype is purely a frontend with realistic mock data. No real backend, no real APIs, no real auth. Every action that "saves" or "syncs" should show a loading state and then update local React state so the experience feels real to click through.

---

## Tech Stack

- **Next.js 14 (App Router)** with TypeScript
- **Tailwind CSS** for all styling
- **shadcn/ui** components as the base
- **Lucide React** for icons
- **Recharts** for charts
- **date-fns** for date handling
- **Framer Motion** for subtle animations (page transitions, drawer slide-ins, micro-interactions)
- All data in `/lib/mock-data/*.ts` files
- All state via React hooks; no Zustand, no Redux

---

## Design System

### Color Tokens

Use these as CSS variables. Make sure they read elegantly together.

```css
--bg: #FAFAF7;            /* warm off-white app background */
--surface: #FFFFFF;       /* card surface */
--ink: #0A0F1E;           /* primary text */
--ink-2: #5F6B7A;         /* secondary text */
--ink-3: #94A3B8;         /* tertiary / placeholder */
--brand: #0F172A;         /* near-black, premium */
--brand-soft: #1E293B;    /* hover state for brand */
--accent: #E07B39;        /* warm amber, used SPARINGLY for primary CTAs and key highlights */
--accent-soft: #FBEFD9;   /* cream tint, for highlight surfaces */
--success: #16A34A;
--warning: #D97706;
--danger:  #DC2626;
--border:  #E8E5DE;       /* warm neutral border */
--ring:    rgba(15,23,42,0.08); /* focus ring */
```

For white-label tenant theming, swap `--brand` per tenant. Demo tenants:

- "United World Tours" (Prague): `--brand: #0F172A` (default)
- "Bohemia Tours" (Prague): `--brand: #1E3A8A` (deep blue)
- "Budapest Walks" (Budapest): `--brand: #166534` (forest green)

### Typography

- Font: **Inter** for everything (load via next/font), with **Manrope** as an optional display alternative for hero headlines.
- Headings: tight tracking (-0.02em), generous weight contrast.
- Hero headlines: 64-80px on desktop, 40-48px on mobile, weight 600-700.
- Section titles: 32-40px, weight 600.
- Card titles: 18-20px, weight 600.
- Body: 14-15px, regular, line-height 1.6.
- Use a mix of weights, not just sizes, to build hierarchy.

### Spacing and Layout

- 8px base grid. All paddings, margins, gaps are multiples of 4 or 8.
- Section vertical padding: 80-120px on desktop, 56-72px on mobile.
- Card padding: 24-32px.
- Max content width: 1280px.
- Generous whitespace. The product should feel calm, not crowded.

### Components

- Shadows are subtle: `box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);`
- Border radius: 8px for inputs/buttons, 12px for cards, 16px for large surfaces.
- Hover states on every interactive element. Smooth 200ms transitions.
- Buttons:
  - Primary: solid `--accent` background, white text. Use sparingly.
  - Secondary: solid `--brand` background, white text.
  - Outline: white background, `--border` outline.
  - Ghost: no background, hover shows `--accent-soft`.
- Inputs: white background, `--border` outline, focus ring uses `--ring`.
- Badges and pills: small (h-6), use color soft variants.

---

## Application Architecture

The prototype has two surfaces:

1. **Public Marketing + Booking Site** (consumer-facing, public routes)
2. **SaaS Operator Dashboard** (multi-tenant, role-based, behind login)

### Routes to Build

**Public:**

- `/` — Marketing homepage
- `/tours` — Tour catalog with filters
- `/tours/[slug]` — Tour detail page
- `/checkout` — Booking checkout
- `/checkout/success` — Confirmation page

**Auth (visual only):**

- `/login` — Login page with role-quickselect for demo purposes
- `/signup` — Signup page

**Application (all under `/app`):**

- `/app` — Redirect to `/app/dashboard`
- `/app/dashboard` — Main dashboard (agency owner view)
- `/app/bookings` — Reservations: table + calendar toggle
- `/app/tours` — Tour catalog management
- `/app/tours/new` — Create tour wizard (4 steps)
- `/app/tours/[id]` — Tour detail / edit
- `/app/team` — Team members (guides, managers, promoters)
- `/app/finance` — Balance, commissions, expenses
- `/app/channels` — OTA integrations
- `/app/network` — Cross-sell marketplace
- `/app/whatsapp` — WhatsApp chatbot builder
- `/app/reports` — Reports hub (list of report types)
- `/app/settings` — Tenant settings (white label, branding)

**Role-specific views (switchable from a dev menu in the top-right):**

- `/app/guide` — Guide dashboard
- `/app/manager` — Manager daily operations
- `/app/promoter` — Promoter sales view
- `/app/traveler` — Traveler mobile app view (mobile-first layout)

### Multi-Tenant and Role Context

Place a **tenant switcher** in the top-left corner of the app shell (a dropdown). Default: "United World Tours". Switching tenants changes:

- The sidebar accent color (white-label demo)
- The tenant name in the header
- The data shown (different bookings, tours, team members)

Place a **role switcher** in the top-right corner labeled "View as" (dev/demo only). Switching role changes:

- The sidebar items shown
- The default landing page
- The data scope (a guide sees only their tours; an admin sees everything)

---

## Page-by-Page Detail

### 1. Marketing Homepage (`/`)

**Hero**

- Large headline: "Discover Prague through the eyes of locals"
- Subheading: "Join 30,000+ travelers who booked authentic tours, activities, and experiences with our trusted network of guides across Europe."
- Primary CTA: "Browse Tours" → links to `/tours`
- Secondary CTA: "How it works" → smooth-scrolls to "How it works" section
- Background: Editorial photo of Prague Old Town (Charles Bridge or Old Town Square). Use a high-quality Unsplash image. Add subtle dark gradient overlay for text contrast.

**Featured Tours** (4 cards in a grid)

- Each card: image, tour name, duration, rating, "From €XX"
- Use these names: "Old Town & Astronomical Clock Walking Tour", "Prague Castle & Lesser Town", "Beer & Bohemia: Local Pub Tour", "Communist Prague: A Cold War Story"

**How It Works** (3-step section)

1. Choose your tour — Browse and pick what fits
2. Pay securely — Stripe or SumUp checkout
3. Meet your guide — Live GPS lets you find them easily

**Stats strip** (4 numbers in a row, neutral background)

- 30,000+ travelers served
- 4.9 average rating
- 12 cities across Europe
- 250+ local guides

**Testimonials** (3 cards, with star ratings, reviewer name, and city)

- Use realistic European names

**Footer**

- Newsletter signup
- Language switcher (EN / ES / IT)
- Links: Tours, Cities, For Agencies, About, Privacy, Terms
- Social icons

### 2. Tour Catalog (`/tours`)

**Top filter bar** (sticky)

- City dropdown: Prague (default), Budapest, Vienna, Krakow
- Date picker (mock calendar)
- Pax counter (1-10)
- Price range slider (€10 - €200)
- Language pills: EN, ES, IT
- Sort dropdown: Popular, Price low→high, Rating

**Grid of tour cards** (12 visible, pagination at bottom)

- Each card: image, tour name, duration, language flags, rating + review count, "From €XX"
- Hover reveals a "Quick view" overlay button

### 3. Tour Detail (`/tours/[slug]`)

**Layout**

- Full-width image gallery at top (4-6 images, with lightbox on click)
- Two-column body:
  - Left: Title, rating, duration, language, tabs for Overview / Itinerary / What's Included / Meeting Point / Reviews
  - Right (sticky): booking widget with date picker, pax selector, total price calculation, "Book Now" CTA

**Itinerary tab**: vertical timeline with 5-7 stops (e.g., Old Town Square → Astronomical Clock → Tyn Church → Jewish Quarter → Charles Bridge → Lesser Town → Prague Castle)

**Reviews tab**: TripAdvisor-style cards with star ratings, reviewer name, date, comment

**Related tours** at the bottom: 3 cards

### 4. Checkout (`/checkout`)

**Layout**: two columns

- Left: Multi-step form
  1. Traveler details (name, email, phone, country)
  2. Optional add-ons (audio guide, pickup service, photo package)
  3. Payment method tabs: Card (Stripe-Elements-style UI), SumUp, PayPal
- Right (sticky): Order summary
  - Tour name and image thumbnail
  - Date, time, pax
  - Subtotal, fees, total
  - "Pay €XX" main CTA

Payment is visual only. On submit, show a 1.5s loader, then redirect to `/checkout/success`.

### 5. Confirmation (`/checkout/success`)

- Subtle confetti animation (Framer Motion)
- Booking reference number (format: `TES-2025-04F7K2`)
- Tour details
- Meeting point with map placeholder
- "Add to calendar" + "Download voucher" buttons
- "Continue to your trips" CTA

### 6. App Dashboard (`/app/dashboard`)

**Layout**: standard app shell

- Left sidebar: nav (Dashboard, Bookings, Tours, Team, Finance, Channels, Network, WhatsApp, Reports, Settings)
- Top bar: tenant switcher (left), search, notifications bell, role switcher, user avatar (right)

**Page content**

KPI row (4 cards):

- Today's Bookings: 12 (+3 vs yesterday)
- Today's Revenue: €840 (+€120 vs yesterday)
- Tours Running Now: 3
- Pending Check-ins: 7

Two-column middle section:

- Left: This week's bookings calendar (7-day grid view, colored dots per booking)
- Right: Activity feed (newest first), e.g.:
  - "New booking via Civitatis · Old Town Walking Tour · 2 pax · 10 min ago"
  - "Petr Novak confirmed reservation · 1 hour ago"
  - "Tour completed: Prague Castle (4 pax) · 2 hours ago"
  - "Maria Lopez checked in 4 travelers · 3 hours ago"

Bottom: Line + bar combo chart showing bookings and revenue over last 30 days. Use Recharts.

### 7. Bookings (`/app/bookings`)

Toggle between **Table view** and **Calendar view** at the top.

**Filters**: date range, status, source (Direct, Civitatis, GetYourGuide, Web), guide, tour

**Table columns**: Date · Time · Tour · Pax · Guide · Source (with OTA logo) · Status pill · Amount · Actions

- Status pills: Confirmed (green), Pending (amber), Cancelled (red), Completed (gray)
- Click row → slide-in right-side drawer with full reservation details, including travelers list, payment info, source booking ID, notes

**Calendar view**: Full-month grid with each day showing colored chips per booking

### 8. Tour Management (`/app/tours`)

Card grid showing all tours. Each card:

- Featured image
- Tour name
- Status pill: Active / Draft / Paused
- "12 bookings this month · €960 revenue" subline
- Quick actions: Edit · Duplicate · Pause/Activate

"+ New Tour" CTA top right.

### 9. Create Tour Wizard (`/app/tours/new`)

4-step wizard with a sticky progress bar at top.

1. **Basics**: name, description, type (Walking · Food · Day Trip · Bike · Boat), language, duration
2. **Pricing**: base price, multi-tier pricing (1 pax · 2 pax · 3-5 pax · group 6+), pack discount toggle
3. **Schedule**: recurring schedule (days of week checkboxes, time slot inputs), capacity per slot
4. **Photos & Meeting Point**: image upload area (mock, no real upload), map placeholder with pin

Form state must persist as the user moves between steps (use React state).

### 10. Team (`/app/team`)

Tabs: Guides · Managers · Promoters · Partners

Each tab is a table:

- Photo · Name · Email · Role · Languages · Tours led · Rating · Status · Actions

Click row → drawer with details, schedule, recent reviews.

### 11. Finance (`/app/finance`)

**Period selector** at top (This month, Last month, Custom range)

**Section A — Balance Summary** (4 KPI cards)

- Total Income: €18,420
- Total Expenses: €4,160
- Guide Commissions: €5,840
- Net Margin: €8,420

**Section B — Income Breakdown** (donut chart)

- Direct: 32%, Civitatis: 28%, GetYourGuide: 18%, Web: 14%, Other: 8%

**Section C — Commission Table** Columns: Guide · Tours led · Pax served · Commission earned · Status (Paid / Pending) · Action

**Section D — Recent Expenses Table** Columns: Date · Category · Description · Amount · Paid by

### 12. OTA Channels (`/app/channels`)

Header note: "Connect your booking platforms. Bookings sync automatically."

**Civitatis card** (featured, full-width at top, marked "Connected")

- Status: ● Connected
- Last sync: 2 minutes ago
- Bookings this month: 64
- Revenue: €5,160
- Actions: "View bookings", "Sync now" (shows loading spinner for 1.5s then updates timestamp), "Settings"
- Inside settings: API key field (masked), partner ID, webhook URL, mapping table for tours

**Other channels grid** (4 cards in 2x2)

- GetYourGuide, Viator, Klook, TripAdvisor Experiences
- Each shows: logo, brief description, "Connect" button

### 13. Network / Cross-sell (`/app/network`)

**Header**: "Sell tours from partner agencies in other cities. Earn commission on every booking."

**Grid of partner agencies** (cards):

- Bohemia Tours (Prague) — 8 tours available — 15% commission to you
- Budapest Walks (Budapest) — 12 tours — 18% commission
- Vienna Insiders (Vienna) — 6 tours — 20% commission
- Krakow Hidden Stories (Krakow) — 5 tours — 15% commission

Click card → side panel with their tour catalog. Each tour has an "Add to my offering" button that toggles a green checkmark.

### 14. WhatsApp Chatbot Builder (`/app/whatsapp`)

Two-pane layout:

- **Left (canvas)**: visual flow editor with connected nodes. Use simple absolutely-positioned divs with SVG lines connecting them. Nodes:
  - Welcome message
  - Quick reply menu (3 options: Book a tour · My booking · Speak to human)
  - "Book a tour" branch → list available tours node
  - "My booking" branch → fetch reservation node
  - "Speak to human" branch → handoff to manager node
- **Right (properties panel)**: shows the selected node's text content and configurable variables like `{pax_count}`, `{tour_name}`, `{time}`

Below the canvas:

- **Templates library** with pre-built flows: "Booking confirmation reminder", "Tour day check-in", "Review request after tour"
- Each template is a card with "Preview" and "Use this template" buttons

### 15. Reports Hub (`/app/reports`)

Grid of report cards:

- Guides Performance
- Promoters Performance
- Manager Operations
- Balance Sheet
- Reservations Summary
- Productivity by Tour
- OTA Channel Performance
- Free Tours (Tips) Analytics

Each card shows a small sparkline + last-updated timestamp. Click → detail report page (build one detailed example for "Guides Performance").

### 16. Settings (`/app/settings`)

Tabs: General · Branding · Team Roles · Billing · API Access

**Branding tab** (the key demo tab):

- Logo upload (visual only)
- Primary brand color picker — changes the live sidebar accent in real time
- Custom domain field (e.g., `book.unitedworldtours.eu`)
- Email signature editor
- Save button with success toast

---

### 17. Guide Dashboard (`/app/guide`)

Mobile-friendly, more compact layout (max-width 720px centered).

- **Today's tours** card: list of 2 tours with time, name, pax, meeting point. "Start Check-in" button on each. Clicking opens a check-in flow where you tick off each traveler.
- **Earnings this month** widget: €420, with a small line chart trend
- **Recent reviews**: 3 cards
- **My affiliate QR code**: rendered QR (use a simple QR library or a static QR image), with download button
- **Profile stats**: 45 tours led, 4.9 rating, 8 months active

### 18. Traveler Mobile View (`/app/traveler`)

Render in a centered phone-frame container (max-width 420px on desktop, full width on mobile) for the demo.

- **Top**: Upcoming booking hero card with tour name, date, countdown ("Starts in 2 hours"), meeting point
- **Map preview**: static map placeholder with two pins — meeting point and "Guide is here" pin (use static lat/lng, Mapbox static image or a Leaflet map with mocked pins)
- **Notification example**: "Your guide Maria is on her way. ETA 8 minutes."
- **Past bookings** list
- **Cross-sell card**: "Heading to Budapest next? See top tours →"
- **Bottom tab nav**: Explore · My Trips · Wallet · Account

---

## Mock Data Specification

Create the following files. Use realistic numbers and dates so the prototype feels alive.

### `/lib/mock-data/tours.ts`

12 Prague tours, 6 Budapest tours, 4 Vienna tours. Each tour:

```ts
{
  id: string,
  slug: string,
  name: string,
  city: 'Prague' | 'Budapest' | 'Vienna' | 'Krakow',
  language: 'en' | 'es' | 'it',
  duration: string,      // e.g., "3 hours"
  basePrice: number,     // EUR
  images: string[],      // Unsplash URLs related to the city
  description: string,
  itinerary: { stop: string, description: string, durationMin: number }[],
  capacity: number,
  rating: number,        // 4.5 - 5.0
  reviewCount: number,
  status: 'Active' | 'Draft' | 'Paused',
  bookingsThisMonth: number,
  revenueThisMonth: number,
}
```

Real tour names to use (mix and expand):

- **Prague**: Old Town & Astronomical Clock; Prague Castle & Lesser Town; Beer & Bohemia: Local Pub Tour; Communist Prague: A Cold War Story; Jewish Quarter Walking Tour; Vltava River Cruise; Charles Bridge by Night; Czech Food & Drink Tasting; Prague Zoo Family Day; Karlstejn Castle Day Trip; Bohemian Switzerland Hike; Photographer's Prague.
- **Budapest**: Buda Castle & Fisherman's Bastion; Hungarian Parliament & Heroes' Square; Thermal Baths Experience; Budapest Ruin Bar Crawl; Danube Sunset Cruise; Jewish Quarter & Holocaust History.
- **Vienna**: Imperial Vienna Walking Tour; Schonbrunn Palace Half-Day; Mozart & Music Trail; Vienna Coffee House Culture.

### `/lib/mock-data/bookings.ts`

60 bookings spanning last 30 days. Each:

```ts
{
  id: string,             // e.g., "TES-2025-04F7K2"
  tourId: string,
  date: Date,
  time: string,           // "10:00"
  pax: number,
  travelerName: string,
  travelerEmail: string,
  guideId: string,
  source: 'Direct' | 'Civitatis' | 'GetYourGuide' | 'Web',
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed',
  amount: number,
  notes?: string,
}
```

### `/lib/mock-data/users.ts`

20 users across roles. Mix Czech, Spanish, Italian names: Petr Novak, Maria Lopez, Marco Ricci, Anna Svobodova, Sofia Garcia, Lorenzo Bianchi, Karel Dvorak, Elena Ferrari, Pavel Cerny, Isabella Romano. Each:

```ts
{
  id, name, email, role: 'Admin' | 'Manager' | 'Guide' | 'Promoter' | 'Partner' | 'Traveler',
  avatar: string,         // Unsplash portrait
  languages: ('en'|'es'|'it'|'cs')[],
  toursLed: number,
  rating: number,
  status: 'Active' | 'Inactive',
  affiliateId: string,    // for QR generation
}
```

### `/lib/mock-data/agencies.ts`

8 partner agencies for the cross-sell network. Each:

```ts
{
  id, name, city, country, logoUrl, toursAvailable: number,
  commissionOffered: number,   // percentage
  description: string,
}
```

### `/lib/mock-data/commissions.ts`

Commission entries per guide for the current month. Each: guide, tours led, pax served, commission earned, status.

### `/lib/mock-data/reviews.ts`

40 reviews across tours. Each: tour ID, reviewer name, rating, date, comment.

### `/lib/mock-data/tenants.ts`

3 tenants for the multi-tenant switcher:

```ts
[
  { id: 'uwt', name: 'United World Tours', city: 'Prague', brandColor: '#0F172A', logo: ... },
  { id: 'bohemia', name: 'Bohemia Tours', city: 'Prague', brandColor: '#1E3A8A', logo: ... },
  { id: 'budapest', name: 'Budapest Walks', city: 'Budapest', brandColor: '#166534', logo: ... },
]
```

---

## Key Interactions That Must Feel Real

These are the moments that will be clicked during the live demo. They must work:

1. **Tenant switcher** — changes sidebar brand color, tenant name in header, and the data shown everywhere
2. **Role switcher** ("View as" dropdown, top-right) — changes the sidebar items and default landing page
3. **End-to-end booking journey** — `/tours` → click card → `/tours/[slug]` → click "Book Now" → `/checkout` → submit → `/checkout/success` with confetti
4. **Bookings table** → row click → **side drawer** with full reservation details (animate slide-in)
5. **Create tour wizard** — all 4 steps clickable with form state preserved when moving forward/back
6. **Civitatis "Sync now" button** — shows spinner for 1.5s then updates "Last sync" timestamp to "just now"
7. **Settings → Branding → color picker** — changes the live sidebar accent color in real time
8. **WhatsApp chatbot canvas** — at least 3 connected nodes visible with selectable state
9. **Guide check-in flow** — opens modal showing passenger list, tap to tick off each traveler with a green check animation
10. **Finance period change** — clicking different period chips updates all numbers on the page using different mock data sets

---

## Animations and Micro-interactions

- Page transitions: subtle 200ms fade + slide-up (Framer Motion)
- Drawers: slide in from right, 250ms ease-out
- Modal: fade backdrop, scale-up content
- Buttons: subtle scale 0.98 on press
- Cards: lift on hover (translate-y 2px + shadow upgrade)
- Loading spinners: smooth, not jittery
- Toast notifications on saves: slide in from top-right, auto-dismiss after 3s

---

## Out of Scope (Do Not Build)

To save your build budget, explicitly skip:

- Real authentication or sessions (login button just routes to `/app`)
- Real payment processing (Stripe UI is visual only, no actual charge)
- Real Civitatis API (all data mocked)
- Real WhatsApp Business API
- Real map services (use a static map image or a basic Leaflet map with mock pins)
- Email sending
- Database or backend
- Native mobile apps (responsive web only; the traveler view simulates a phone with a frame container)
- Real-time GPS tracking (animate a static pin with CSS if needed)
- File uploads (show the UI, do not actually handle files)
- Server-side rendering optimization
- SEO meta tags beyond basics
- Internationalization runtime (language switcher is visual only)
- Analytics, tracking, A/B testing

---

## Build Order

Start in this order so each step builds on stable foundations:

1. **Design system**: Tailwind config with the color tokens, fonts loaded via next/font, base components (Button, Input, Card, Badge, Table, Drawer, Modal, Toast)
2. **App shell**: sidebar layout, top bar, tenant switcher, role switcher
3. **Mock data files**: all of them upfront
4. **Public marketing site** (`/`, `/tours`, `/tours/[slug]`, `/checkout`, `/checkout/success`)
5. **App dashboard** (`/app/dashboard`) — most important demo screen
6. **Bookings, Tours, Finance** — the operational core
7. **Channels, Network, WhatsApp** — the differentiators that match the brief
8. **Guide and Traveler views** — role-specific demos
9. **Polish pass**: consistency check, empty states, hover states, loading skeletons

---

## Final Quality Checks Before Calling It Done

- Open every route. Does each page look complete and intentional?
- Try every interactive element. Does it respond?
- Resize the browser from 380px to 1920px. Is the layout sane at every width?
- Read every piece of text. Is there any lorem ipsum or placeholder remaining? (Should be zero.)
- Toggle the tenant switcher 3 times. Does the brand color change everywhere?
- Toggle the role switcher. Does the nav and default page change?
- Click through the full booking journey. Does it feel like booking a real tour?
- Does the aesthetic remind you of Linear, Stripe, or Notion? If not, revisit the design system.

Build with the confidence of a senior designer-engineer. This needs to win the project.
