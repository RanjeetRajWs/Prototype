export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Guide' | 'Promoter' | 'Partner' | 'Traveler';
  avatar: string;
  languages: ('en' | 'es' | 'it' | 'cs')[];
  toursLed: number;
  rating: number;
  status: 'Active' | 'Inactive';
  affiliateId: string;
}

import { monogramAvatar } from '@/lib/scene-image';

// External portraits were swapped for monogram avatars so the demo runs offline.
const u = (_id: string) => '';

export const users: User[] = [
  {
    id: 'u1', name: 'Petr Novak', email: 'petr.novak@unitedworld.eu', role: 'Admin',
    avatar: u('photo-1472099645785-5658abf4ff4e'),
    languages: ['en', 'cs'], toursLed: 156, rating: 4.9, status: 'Active', affiliateId: 'PETR123',
  },
  {
    id: 'u2', name: 'Maria Lopez', email: 'maria.lopez@unitedworld.eu', role: 'Guide',
    avatar: u('photo-1438761681033-6461ffad8d80'),
    languages: ['en', 'es', 'it'], toursLed: 342, rating: 5.0, status: 'Active', affiliateId: 'MARIA456',
  },
  {
    id: 'u3', name: 'Marco Ricci', email: 'marco.ricci@unitedworld.eu', role: 'Guide',
    avatar: u('photo-1500648767791-00dcc994a43e'),
    languages: ['en', 'it'], toursLed: 189, rating: 4.8, status: 'Active', affiliateId: 'MARCO789',
  },
  {
    id: 'u4', name: 'Anna Svobodova', email: 'anna.svobodova@unitedworld.eu', role: 'Manager',
    avatar: u('photo-1494790108377-be9c29b29330'),
    languages: ['en', 'cs', 'es'], toursLed: 45, rating: 4.9, status: 'Active', affiliateId: 'ANNA012',
  },
  {
    id: 'u5', name: 'Sofia Garcia', email: 'sofia.garcia@unitedworld.eu', role: 'Promoter',
    avatar: u('photo-1534528741775-53994a69daeb'),
    languages: ['en', 'es'], toursLed: 0, rating: 4.7, status: 'Active', affiliateId: 'SOFIA345',
  },
  {
    id: 'u6', name: 'Lorenzo Bianchi', email: 'lorenzo.bianchi@unitedworld.eu', role: 'Promoter',
    avatar: u('photo-1492562080023-ab3db95bfbce'),
    languages: ['en', 'it'], toursLed: 0, rating: 4.6, status: 'Active', affiliateId: 'LORENZO567',
  },
  {
    id: 'u7', name: 'Karel Dvorak', email: 'karel.dvorak@unitedworld.eu', role: 'Manager',
    avatar: u('photo-1507003211169-0a1dd7228f2d'),
    languages: ['en', 'cs'], toursLed: 32, rating: 4.8, status: 'Active', affiliateId: 'KAREL678',
  },
  {
    id: 'u8', name: 'Elena Ferrari', email: 'elena.ferrari@unitedworld.eu', role: 'Guide',
    avatar: u('photo-1487412720507-e7ab37603c6f'),
    languages: ['en', 'it', 'es'], toursLed: 211, rating: 4.9, status: 'Active', affiliateId: 'ELENA789',
  },
  {
    id: 'u9', name: 'Pavel Cerny', email: 'pavel.cerny@unitedworld.eu', role: 'Guide',
    avatar: u('photo-1506794778202-cad84cf45f1d'),
    languages: ['en', 'cs'], toursLed: 124, rating: 4.7, status: 'Active', affiliateId: 'PAVEL890',
  },
  {
    id: 'u10', name: 'Isabella Romano', email: 'isabella.romano@unitedworld.eu', role: 'Guide',
    avatar: u('photo-1502823403499-6ccfcf4fb453'),
    languages: ['en', 'it'], toursLed: 278, rating: 5.0, status: 'Active', affiliateId: 'ISABELLA901',
  },
  {
    id: 'u11', name: 'Tomas Horak', email: 'tomas.horak@unitedworld.eu', role: 'Guide',
    avatar: u('photo-1539571696357-5a69c17a67c6'),
    languages: ['en', 'cs', 'es'], toursLed: 156, rating: 4.6, status: 'Active', affiliateId: 'TOMAS012',
  },
  {
    id: 'u12', name: 'Eliska Novotna', email: 'eliska.novotna@unitedworld.eu', role: 'Manager',
    avatar: u('photo-1573496359142-b8d87734a5a2'),
    languages: ['en', 'cs', 'it'], toursLed: 28, rating: 4.9, status: 'Active', affiliateId: 'ELISKA123',
  },
  {
    id: 'u13', name: 'Diego Morales', email: 'diego.morales@unitedworld.eu', role: 'Promoter',
    avatar: u('photo-1463453091185-61582044d556'),
    languages: ['en', 'es'], toursLed: 0, rating: 4.8, status: 'Active', affiliateId: 'DIEGO234',
  },
  {
    id: 'u14', name: 'Chiara Conti', email: 'chiara.conti@unitedworld.eu', role: 'Promoter',
    avatar: u('photo-1521119989659-a83eee488004'),
    languages: ['en', 'it'], toursLed: 0, rating: 4.7, status: 'Active', affiliateId: 'CHIARA345',
  },
  {
    id: 'u15', name: 'Jiri Prochazka', email: 'jiri.prochazka@bohemia.tours', role: 'Partner',
    avatar: u('photo-1492447166138-50c3889fccb1'),
    languages: ['en', 'cs'], toursLed: 56, rating: 4.8, status: 'Active', affiliateId: 'JIRI456',
  },
  {
    id: 'u16', name: 'Hanna Kovacs', email: 'hanna.kovacs@budapestwalks.hu', role: 'Partner',
    avatar: u('photo-1438761681033-6461ffad8d80'),
    languages: ['en'], toursLed: 78, rating: 4.9, status: 'Active', affiliateId: 'HANNA567',
  },
  {
    id: 'u17', name: 'Felix Wagner', email: 'felix.wagner@vienna-insiders.at', role: 'Partner',
    avatar: u('photo-1500648767791-00dcc994a43e'),
    languages: ['en'], toursLed: 41, rating: 4.7, status: 'Active', affiliateId: 'FELIX678',
  },
  {
    id: 'u18', name: 'Lucia Rossi', email: 'lucia.rossi@guest.com', role: 'Traveler',
    avatar: u('photo-1517841905240-472988babdf9'),
    languages: ['it', 'en'], toursLed: 0, rating: 5.0, status: 'Active', affiliateId: 'LUCIA-GUEST',
  },
  {
    id: 'u19', name: 'Vaclav Hruska', email: 'vaclav.hruska@unitedworld.eu', role: 'Guide',
    avatar: u('photo-1542178243-bc20204b769f'),
    languages: ['en', 'cs'], toursLed: 87, rating: 4.5, status: 'Inactive', affiliateId: 'VACLAV789',
  },
  {
    id: 'u20', name: 'Renata Bartos', email: 'renata.bartos@unitedworld.eu', role: 'Guide',
    avatar: u('photo-1554151228-14d9def656e4'),
    languages: ['en', 'cs', 'es'], toursLed: 134, rating: 4.8, status: 'Active', affiliateId: 'RENATA890',
  },
];

users.forEach((user) => {
  user.avatar = monogramAvatar(user.name);
});
