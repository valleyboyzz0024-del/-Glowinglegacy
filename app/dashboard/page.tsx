'use client';

import { StatCard } from '@/components/dashboard/stat-card';
import { UpcomingDeliveries } from '@/components/dashboard/upcoming-deliveries';
import { VideoCredits } from '@/components/dashboard/video-credits';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  // Placeholder demo data — wired to Supabase in a later phase
  const deliveries = [
    {
      id: '1',
      date: new Date(),
      items: [
        { type: 'video' as const, title: 'Birthday Message', recipient: 'Sarah Johnson' },
        { type: 'package' as const, title: 'Memory Box - Walnut', recipient: 'Sarah Johnson' },
      ],
    },
  ];

  const activities = [
    { id: 'a1', date: '2 days ago', text: 'Recorded "Birthday Message for Sarah"' },
    { id: 'a2', date: '5 days ago', text: 'Purchased Memory Box for $89.99' },
    { id: 'a3', date: '1 week ago', text: 'Added recipient: Michael Johnson' },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="rounded-xl border border-gold/20 bg-gradient-to-br from-background-card/80 to-background/80 p-6 shadow-glow">
          <div className="text-lg">✨ Welcome back</div>
          <div className="text-text-secondary">You have 1 delivery scheduled this month</div>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Videos" value={12} subtext="3 scheduled, 9 delivered" />
        <StatCard label="Recipients" value={4} subtext="2 with upcoming deliveries" />
        <StatCard label="Packages" value={3} subtext="1 processing" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <UpcomingDeliveries deliveries={deliveries} />
          <ActivityFeed items={activities} />
        </div>
        <div className="space-y-6">
          <VideoCredits available={5} used={12} />
          <div className="rounded-xl border border-gold/20 bg-background-card/60 p-5">
            <div className="mb-2 font-heading text-gold">Quick Actions</div>
            <div className="grid gap-3 text-sm text-text-secondary">
              <a className="rounded-md border border-gold/20 p-3 hover:shadow-glow transition-shadow" href="/dashboard/record">🎥 Record New Video</a>
              <a className="rounded-md border border-gold/20 p-3 hover:shadow-glow transition-shadow" href="/shop">🛍️ Browse Gifts</a>
              <a className="rounded-md border border-gold/20 p-3 hover:shadow-glow transition-shadow" href="/dashboard/recipients">👥 Add Recipient</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

