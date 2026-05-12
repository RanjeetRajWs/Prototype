export interface Agency {
  id: string;
  name: string;
  city: string;
  country: string;
  logoUrl: string;
  toursAvailable: number;
  commissionOffered: number;
  description: string;
}

import { monogramAvatar } from '@/lib/scene-image';

const logo = (_id: string) => '';

export const agencies: Agency[] = [
  {
    id: 'a1',
    name: 'Bohemia Tours',
    city: 'Prague',
    country: 'Czech Republic',
    logoUrl: logo('photo-1559599141-383d43733947'),
    toursAvailable: 8,
    commissionOffered: 15,
    description: 'Leading provider of historical walking tours in Prague.',
  },
  {
    id: 'a2',
    name: 'Budapest Walks',
    city: 'Budapest',
    country: 'Hungary',
    logoUrl: logo('photo-1513151233558-d860c5398176'),
    toursAvailable: 12,
    commissionOffered: 18,
    description: 'Specialists in Danube cruises and castle district tours.',
  },
  {
    id: 'a3',
    name: 'Vienna Insiders',
    city: 'Vienna',
    country: 'Austria',
    logoUrl: logo('photo-1516550893923-42d28e5677af'),
    toursAvailable: 6,
    commissionOffered: 20,
    description: 'Exclusive access to imperial palaces and coffee house culture.',
  },
  {
    id: 'a4',
    name: 'Krakow Hidden Stories',
    city: 'Krakow',
    country: 'Poland',
    logoUrl: logo('photo-1512100356956-c128783941c5'),
    toursAvailable: 5,
    commissionOffered: 15,
    description: 'Revealing the secrets of the Jewish Quarter and Wawel Castle.',
  },
  {
    id: 'a5',
    name: 'Salzburg Sound',
    city: 'Salzburg',
    country: 'Austria',
    logoUrl: logo('photo-1567448400815-59d5a71b1a6c'),
    toursAvailable: 4,
    commissionOffered: 17,
    description: 'Mozart trail, Sound of Music sites, and alpine day trips.',
  },
  {
    id: 'a6',
    name: 'Berlin Underground',
    city: 'Berlin',
    country: 'Germany',
    logoUrl: logo('photo-1560969184-10fe8719e047'),
    toursAvailable: 9,
    commissionOffered: 16,
    description: 'Street art, techno history, and Cold War walking tours.',
  },
  {
    id: 'a7',
    name: 'Lisbon by Locals',
    city: 'Lisbon',
    country: 'Portugal',
    logoUrl: logo('photo-1513735492246-483525079686'),
    toursAvailable: 7,
    commissionOffered: 19,
    description: 'Fado nights, tram 28 tours, and Alfama food walks.',
  },
  {
    id: 'a8',
    name: 'Rome Authentic',
    city: 'Rome',
    country: 'Italy',
    logoUrl: logo('photo-1552832230-c0197dd311b5'),
    toursAvailable: 11,
    commissionOffered: 14,
    description: 'Skip-the-line Vatican, Colosseum at night, and Trastevere food tours.',
  },
];

agencies.forEach((a) => {
  a.logoUrl = monogramAvatar(a.name);
});
