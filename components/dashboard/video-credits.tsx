'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Film } from 'lucide-react';

export function VideoCredits({ available, used }: { available: number; used: number }) {
  return (
    <Card className="border-gold/20 bg-background-card/60">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg text-gold">Your Video Credits</CardTitle>
        <Film className="h-5 w-5 text-gold" />
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4">
        <div>
          <div className="text-2xl font-heading text-gold">{available}</div>
          <div className="text-sm text-text-secondary">Available • Used {used}</div>
        </div>
        <Button className="whitespace-nowrap" asChild>
          <a href="/shop?category=digital">Purchase More Videos</a>
        </Button>
      </CardContent>
    </Card>
  );
}

export default VideoCredits;

