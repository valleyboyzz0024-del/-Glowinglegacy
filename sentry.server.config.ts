import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN || undefined,
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'preview',
  tracesSampleRate: 0.15,
});

