'use client';

import { PublicShell } from '@/components/layout/public-shell';

export default function AboutPage() {
  return (
    <PublicShell>
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl md:text-5xl font-heading text-gold">Our Story</h1>
          <p className="text-lg text-text-secondary">
            Glowing Legacy was created to help families stay connected across time. We combine secure technology with
            a warm, human touch—so your love and wisdom can be delivered exactly when it matters most.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3 text-sm text-text-secondary">
          <div className="rounded-lg border border-gold/20 bg-background-card/60 p-5">Security • AES‑256 encryption and private-by-default access controls.</div>
          <div className="rounded-lg border border-gold/20 bg-background-card/60 p-5">Reliability • Redundant storage and delivery confirmations.</div>
          <div className="rounded-lg border border-gold/20 bg-background-card/60 p-5">Compassion • Senior‑friendly, clear language, and helpful guidance.</div>
        </div>
      </section>
    </PublicShell>
  );
}

