'use client';

import { motion } from 'framer-motion';
import { Video, Gift, Calendar, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PublicShell } from '@/components/layout/public-shell';

const steps = [
  { icon: Video, title: 'Record', description: 'Click record and speak from your heart. Re-record until it feels right.' },
  { icon: Gift, title: 'Choose', description: 'Add meaningful gifts from our curated collection with personalization.' },
  { icon: Calendar, title: 'Schedule', description: 'Pick the perfect dates. Edit anytime before delivery.' },
  { icon: Heart, title: 'Delivered', description: 'We deliver with care—recipients can download and keep forever.' },
];

export default function HowItWorksPage() {
  return (
    <PublicShell>
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl md:text-5xl font-heading text-gold">How It Works</h1>
          <p className="text-lg text-text-secondary">Four simple steps to ensure your love reaches them at just the right moment.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }} viewport={{ once: true }}>
              <Card className="h-full border-gold/20 bg-background-card/60 shadow-glow">
                <CardHeader className="items-center">
                  <s.icon className="h-8 w-8 text-gold" />
                  <CardTitle className="text-gold">{s.title}</CardTitle>
                  <CardDescription className="text-center text-text-secondary">{s.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <Card className="border-gold/20 bg-background-card/60">
            <CardHeader>
              <CardTitle className="text-gold">Security & Trust</CardTitle>
              <CardDescription className="text-text-secondary">Bank‑level encryption, redundant backups, and strict privacy controls protect your legacy.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3 text-sm text-text-secondary">
              <div className="rounded-md border border-gold/20 p-4">256‑bit encryption in transit and at rest</div>
              <div className="rounded-md border border-gold/20 p-4">Private by default, you choose who sees what</div>
              <div className="rounded-md border border-gold/20 p-4">Redundant backups with 99.99% durability targets</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicShell>
  );
}

