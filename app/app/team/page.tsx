'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Mail, 
  Phone, 
  Star, 
  Shield, 
  MoreHorizontal,
  UserCheck,
  Languages
} from 'lucide-react';
import { monogramAvatar } from '@/lib/scene-image';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const team = [
  { id: 1, name: 'Maria Novakova', role: 'Guide', status: 'Active', languages: ['EN', 'CZ', 'ES'], rating: 4.9, tours: 142 },
  { id: 2, name: 'Petr Novak', role: 'Admin', status: 'Active', languages: ['EN', 'CZ'], rating: 5.0, tours: 12 },
  { id: 3, name: 'Marco Ricci', role: 'Guide', status: 'On Break', languages: ['IT', 'EN'], rating: 4.7, tours: 89 },
  { id: 4, name: 'Elena Garcia', role: 'Guide', status: 'Active', languages: ['ES', 'EN'], rating: 4.8, tours: 115 },
  { id: 5, name: 'Anna Svobodova', role: 'Manager', status: 'Active', languages: ['CZ', 'EN', 'DE'], rating: 4.9, tours: 0 },
];

export default function TeamPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Team Management</h1>
          <p className="text-ink-2">Manage your guides, admins, and support staff.</p>
        </div>
        <Button className="bg-brand hover:bg-brand-soft text-white font-bold shadow-lg h-11 px-6 rounded-xl">
          <Plus className="w-5 h-5 mr-2" /> Add Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Members', value: '12', icon: UserCheck, color: 'text-success' },
          { label: 'Average Rating', value: '4.85', icon: Star, color: 'text-warning' },
          { label: 'Pending Invitations', value: '2', icon: Mail, color: 'text-accent' },
        ].map((stat, i) => (
          <Card key={i} className="border-border shadow-subtle">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-bg flex items-center justify-center">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-ink-3 uppercase tracking-widest">{stat.label}</div>
                <div className="text-2xl font-display font-bold text-ink">{stat.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border shadow-subtle overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-bg">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="font-bold text-ink text-xs uppercase tracking-wider py-4 px-8">Member</TableHead>
                <TableHead className="font-bold text-ink text-xs uppercase tracking-wider py-4">Role</TableHead>
                <TableHead className="font-bold text-ink text-xs uppercase tracking-wider py-4">Languages</TableHead>
                <TableHead className="font-bold text-ink text-xs uppercase tracking-wider py-4 text-center">Rating</TableHead>
                <TableHead className="font-bold text-ink text-xs uppercase tracking-wider py-4 text-center">Total Tours</TableHead>
                <TableHead className="font-bold text-ink text-xs uppercase tracking-wider py-4">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map((member) => (
                <TableRow key={member.id} className="hover:bg-bg/50 transition-colors border-border group">
                  <TableCell className="py-4 px-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-surface shadow-sm overflow-hidden bg-bg">
                        <img src={monogramAvatar(member.name)} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">{member.name}</div>
                        <div className="text-xs text-ink-3 font-medium">Joined 12 Mar 2024</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      {member.role === 'Admin' ? <Shield className="w-3.5 h-3.5 text-accent" /> : null}
                      <span className="text-sm font-semibold">{member.role}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex gap-1">
                      {member.languages.map(lang => (
                        <span key={lang} className="px-1.5 py-0.5 bg-bg border border-border rounded text-[9px] font-bold text-ink-3">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <div className="flex items-center justify-center gap-1 font-bold text-sm">
                      <Star className="w-3.5 h-3.5 text-warning fill-current" />
                      {member.rating}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center font-bold text-ink-2">{member.tours}</TableCell>
                  <TableCell className="py-4">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      member.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}>
                      {member.status}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Button variant="ghost" size="icon" className="text-ink-3 group-hover:text-ink">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
