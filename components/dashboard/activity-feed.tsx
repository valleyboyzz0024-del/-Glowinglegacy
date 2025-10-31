'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Activity = {
  id: string;
  date: string;
  text: string;
};

export function ActivityFeed({ items }: { items: Activity[] }) {
  return (
    <Card className="border-gold/20 bg-background-card/60">
      <CardHeader>
        <CardTitle className="text-lg text-gold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {items.length === 0 && (
            <li className="text-sm text-text-secondary">No recent activity.</li>
          )}
          {items.map((a) => (
            <li key={a.id} className="rounded-lg border border-gold/20 p-3">
              <div className="text-xs text-text-secondary">{a.date}</div>
              <div className="text-sm">{a.text}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default ActivityFeed;

