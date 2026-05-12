import { monogramAvatar } from '@/lib/scene-image';

export interface Tenant {
  id: string;
  name: string;
  city: string;
  brandColor: string;
  logo: string;
}

export const tenants: Tenant[] = [
  {
    id: 'uwt',
    name: 'United World Tours',
    city: 'Prague',
    brandColor: '#0F172A',
    logo: monogramAvatar('United World Tours'),
  },
  {
    id: 'bohemia',
    name: 'Bohemia Tours',
    city: 'Prague',
    brandColor: '#1E3A8A',
    logo: monogramAvatar('Bohemia Tours'),
  },
  {
    id: 'budapest',
    name: 'Budapest Walks',
    city: 'Budapest',
    brandColor: '#166534',
    logo: monogramAvatar('Budapest Walks'),
  },
];
