'use client';

import { Button } from '@/components/ui/button';
import { useCallback } from 'react';

export default function SentryExamplePage() {
  const throwError = useCallback(() => {
    // Simple test error to verify Sentry captures client exceptions
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.myUndefinedFunction();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-4 text-3xl font-heading text-gold">Sentry Test</h1>
      <p className="mb-6 text-text-secondary">Click the button below to trigger a sample client-side error.</p>
      <Button onClick={throwError}>Trigger Error</Button>
    </div>
  );
}

