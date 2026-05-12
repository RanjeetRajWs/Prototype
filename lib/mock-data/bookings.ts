import { NOW, seeded, pick, offsetDays } from '@/lib/now';

export interface Booking {
  id: string;
  tourId: string;
  date: Date;
  time: string;
  pax: number;
  travelerName: string;
  travelerEmail: string;
  guideId: string;
  source: 'Direct' | 'Civitatis' | 'GetYourGuide' | 'Web';
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
  amount: number;
  notes?: string;
}

const refs = [
  'TES-2026-04F7K2', 'TES-2026-05G8L3', 'TES-2026-06H9M4', 'TES-2026-07J0N5', 'TES-2026-08K1P6',
  'TES-2026-09L2Q7', 'TES-2026-10M3R8', 'TES-2026-11N4S9', 'TES-2026-12P5T0', 'TES-2026-13Q6U1',
  'TES-2026-14R7V2', 'TES-2026-15S8W3', 'TES-2026-16T9X4', 'TES-2026-17U0Y5', 'TES-2026-18V1Z6',
  'TES-2026-19W2A7', 'TES-2026-20X3B8', 'TES-2026-21Y4C9', 'TES-2026-22Z5D0', 'TES-2026-23A6E1',
  'TES-2026-24B7F2', 'TES-2026-25C8G3', 'TES-2026-26D9H4', 'TES-2026-27E0J5', 'TES-2026-28F1K6',
  'TES-2026-29G2L7', 'TES-2026-30H3M8', 'TES-2026-31J4N9', 'TES-2026-32K5P0', 'TES-2026-33L6Q1',
  'TES-2026-34M7R2', 'TES-2026-35N8S3', 'TES-2026-36P9T4', 'TES-2026-37Q0U5', 'TES-2026-38R1V6',
  'TES-2026-39S2W7', 'TES-2026-40T3X8', 'TES-2026-41U4Y9', 'TES-2026-42V5Z0', 'TES-2026-43W6A1',
  'TES-2026-44X7B2', 'TES-2026-45Y8C3', 'TES-2026-46Z9D4', 'TES-2026-47A0E5', 'TES-2026-48B1F6',
  'TES-2026-49C2G7', 'TES-2026-50D3H8', 'TES-2026-51E4J9', 'TES-2026-52F5K0', 'TES-2026-53G6L1',
  'TES-2026-54H7M2', 'TES-2026-55J8N3', 'TES-2026-56K9P4', 'TES-2026-57L0Q5', 'TES-2026-58M1R6',
  'TES-2026-59N2S7', 'TES-2026-60P3T8', 'TES-2026-61Q4U9', 'TES-2026-62R5V0', 'TES-2026-63S6W1',
];

const travelers: ReadonlyArray<readonly [string, string]> = [
  ['Lukas Becker', 'lukas.becker@example.de'],
  ['Marta Sanchez', 'marta.sanchez@example.es'],
  ['Giulia Romano', 'giulia.romano@example.it'],
  ['Henri Dupont', 'henri.dupont@example.fr'],
  ['Sophia Müller', 'sophia.mueller@example.de'],
  ['Pablo Hernandez', 'pablo.h@example.es'],
  ['Sarah Johnson', 'sarah.j@example.com'],
  ['Wei Chen', 'wei.chen@example.com'],
  ['Marco Bianchi', 'marco.b@example.it'],
  ['Elena Petrova', 'elena.p@example.com'],
  ['Tom O\'Brien', 'tom.obrien@example.ie'],
  ['Anna Kowalski', 'anna.k@example.pl'],
  ['Jonas Lindqvist', 'jonas.l@example.se'],
  ['Lucia Esposito', 'lucia.e@example.it'],
  ['Robert Smith', 'robert.smith@example.com'],
  ['Alice Wong', 'alice.w@example.com'],
  ['Michael Brown', 'michael.b@example.com'],
  ['Inga Olsen', 'inga.o@example.no'],
  ['Carlos Rivera', 'carlos.r@example.mx'],
  ['Hanna Novak', 'hanna.novak@example.cz'],
];

const tourIds = ['t1','t2','t3','t4','t5','t6','t7','t8','t9','t10','t13','t14','t15','t16','t17','t18','t19','t20'];
const guideIds = ['u2', 'u3', 'u8', 'u9', 'u10', 'u11', 'u20'];
const sources: Booking['source'][] = ['Direct', 'Civitatis', 'GetYourGuide', 'Web'];
const futureStatuses: Booking['status'][] = ['Confirmed', 'Confirmed', 'Confirmed', 'Pending', 'Pending', 'Cancelled'];
const times = ['09:00', '10:00', '11:30', '14:00', '15:30', '17:00', '18:00'];
const prices = [15, 18, 22, 25, 28, 30, 32, 35, 38, 42, 45, 48, 55, 65, 85];

// 60 bookings, range: last 25 days through next 10 days, anchored to NOW.
// Deterministic — same data on every reload.
export const bookings: Booking[] = Array.from({ length: 60 }, (_, i) => {
  const rng = seeded(i * 7919 + 11);
  const dateOffset = Math.floor(rng() * 35) - 25;
  const time = pick(rng, times);
  const [hh, mm] = time.split(':').map(Number);
  const pax = 1 + Math.floor(rng() * 5);
  const tourId = pick(rng, tourIds);
  const guideId = pick(rng, guideIds);
  const source = pick(rng, sources);
  const isPast = dateOffset < 0;
  const status: Booking['status'] = isPast
    ? rng() < 0.88 ? 'Completed' : 'Cancelled'
    : pick(rng, futureStatuses);
  const traveler = travelers[i % travelers.length];
  const basePrice = pick(rng, prices);
  const noteRoll = rng();
  const notes =
    noteRoll < 0.06 ? 'Vegetarian meal requested.'
    : noteRoll < 0.10 ? 'Mobility assistance needed.'
    : noteRoll < 0.14 ? 'Anniversary trip — small surprise welcome.'
    : noteRoll < 0.18 ? 'Family with two children (ages 6, 9).'
    : undefined;

  return {
    id: refs[i],
    tourId,
    date: offsetDays(dateOffset, hh, mm),
    time,
    pax,
    travelerName: traveler[0],
    travelerEmail: traveler[1],
    guideId,
    source,
    status,
    amount: basePrice * pax,
    notes,
  };
});

// Helpful precomputed slices used by the dashboard / activity feed.
export const bookingsToday = bookings.filter(
  (b) =>
    b.date.getUTCFullYear() === NOW.getUTCFullYear() &&
    b.date.getUTCMonth() === NOW.getUTCMonth() &&
    b.date.getUTCDate() === NOW.getUTCDate(),
);
