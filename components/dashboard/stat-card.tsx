'use client';

import { Card, CardContent } from '@/components/ui/card';

export function StatCard({
  label,
  value,
  subtext,
}: {
  label: string;
  value: string | number;
  subtext?: string;
}) {
  return (
    <Card className="border-gold/20 bg-background-card/60 shadow-glow">
      <CardContent className="p-5">
        <div className="text-sm text-text-secondary">{label}</div>
        <div className="mt-2 font-heading text-3xl text-gold">{value}</div>
        {subtext && (
          <div className="mt-1 text-xs text-text-secondary">{subtext}</div>
        )}
      </CardContent>
    </Card>
  );
}

export default StatCard;

