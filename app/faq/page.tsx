'use client';

import { PublicShell } from '@/components/layout/public-shell';

const faqs = [
  { q: 'What happens if I pass away unexpectedly?', a: 'Designate a trusted executor in settings; we will verify identity and ensure your deliveries are sent according to your wishes.' },
  { q: 'Can I change delivery dates?', a: 'Yes. You can edit recipients and schedules any time before the scheduled date.' },
  { q: 'How long are videos stored?', a: 'Videos remain hosted for 90 days after delivery. You can extend storage monthly or via discounted bundles.' },
  { q: 'Are my videos secure?', a: 'All data is encrypted in transit and at rest. Access is private by default and protected by Supabase RLS.' },
];

export default function FAQPage() {
  return (
    <PublicShell>
      <section className="container mx-auto px-4 py-16">
        <h1 className="mb-8 text-center text-4xl md:text-5xl font-heading text-gold">Frequently Asked Questions</h1>
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((item) => (
            <details key={item.q} className="rounded-lg border border-gold/20 bg-background-card/60 p-4 open:shadow-glow">
              <summary className="cursor-pointer text-lg text-gold">{item.q}</summary>
              <div className="mt-2 text-sm text-text-secondary">{item.a}</div>
            </details>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}

