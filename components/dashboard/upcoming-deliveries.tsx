'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';
import { formatDate } from '@/lib/utils';

type Delivery = {
  id: string;
  date: string | Date;
  items: { type: 'video' | 'package'; title: string; recipient: string }[];
};

export function UpcomingDeliveries({ deliveries }: { deliveries: Delivery[] }) {
  return (
    <Card className="border-gold/20 bg-background-card/60">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg text-gold">Upcoming Deliveries</CardTitle>
        <CalendarDays className="h-5 w-5 text-gold" />
      </CardHeader>
      <CardContent className="space-y-4">
        {deliveries.length === 0 && (
          <div className="text-sm text-text-secondary">No deliveries scheduled.</div>
        )}

        {deliveries.map((d) => (
          <div key={d.id} className="rounded-lg border border-gold/20 p-3">
            <div className="mb-1 font-medium text-text-primary">
              {formatDate(d.date)}
            </div>
            <ul className="space-y-1 text-sm text-text-secondary">
              {d.items.map((it, i) => (
                <li key={i}>• {it.type === 'video' ? '🎥' : '📦'} {it.title} → {it.recipient}</li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default UpcomingDeliveries;

