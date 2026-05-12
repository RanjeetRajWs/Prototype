export interface Commission {
  id: string;
  guideId: string;
  guideName: string;
  toursLed: number;
  paxServed: number;
  commissionEarned: number;
  status: 'Paid' | 'Pending';
  period: string;
}

export const commissions: Commission[] = [
  { id: 'c1', guideId: 'u2', guideName: 'Maria Lopez', toursLed: 42, paxServed: 168, commissionEarned: 2880, status: 'Paid', period: '2026-05' },
  { id: 'c2', guideId: 'u3', guideName: 'Marco Ricci', toursLed: 31, paxServed: 112, commissionEarned: 1960, status: 'Paid', period: '2026-05' },
  { id: 'c3', guideId: 'u8', guideName: 'Elena Ferrari', toursLed: 28, paxServed: 96, commissionEarned: 1680, status: 'Pending', period: '2026-05' },
  { id: 'c4', guideId: 'u9', guideName: 'Pavel Cerny', toursLed: 22, paxServed: 78, commissionEarned: 1365, status: 'Pending', period: '2026-05' },
  { id: 'c5', guideId: 'u10', guideName: 'Isabella Romano', toursLed: 36, paxServed: 144, commissionEarned: 2520, status: 'Paid', period: '2026-05' },
  { id: 'c6', guideId: 'u11', guideName: 'Tomas Horak', toursLed: 19, paxServed: 64, commissionEarned: 1120, status: 'Pending', period: '2026-05' },
  { id: 'c7', guideId: 'u20', guideName: 'Renata Bartos', toursLed: 24, paxServed: 88, commissionEarned: 1540, status: 'Paid', period: '2026-05' },
];

export interface Expense {
  id: string;
  date: string;
  category: 'Marketing' | 'Equipment' | 'Office' | 'Software' | 'Refunds' | 'Other';
  description: string;
  amount: number;
  paidBy: string;
}

export const expenses: Expense[] = [
  { id: 'e1', date: '2026-05-09', category: 'Marketing', description: 'Google Ads — Prague campaign', amount: 480, paidBy: 'Petr Novak' },
  { id: 'e2', date: '2026-05-07', category: 'Software', description: 'Civitatis API monthly fee', amount: 120, paidBy: 'Petr Novak' },
  { id: 'e3', date: '2026-05-05', category: 'Equipment', description: 'Whisper system replacement headsets (x10)', amount: 640, paidBy: 'Anna Svobodova' },
  { id: 'e4', date: '2026-05-03', category: 'Office', description: 'Workspace rent', amount: 1200, paidBy: 'Petr Novak' },
  { id: 'e5', date: '2026-05-02', category: 'Refunds', description: 'Cancelled booking TES-2025-08K1P6', amount: 28, paidBy: 'Anna Svobodova' },
  { id: 'e6', date: '2026-04-29', category: 'Marketing', description: 'Print flyers — Old Town distribution', amount: 220, paidBy: 'Sofia Garcia' },
  { id: 'e7', date: '2026-04-28', category: 'Software', description: 'Slack workspace upgrade', amount: 75, paidBy: 'Petr Novak' },
  { id: 'e8', date: '2026-04-26', category: 'Other', description: 'Guide certifications renewal (x3)', amount: 360, paidBy: 'Anna Svobodova' },
];
