'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PublicShell } from '@/components/layout/public-shell';

const plans = [
  {
    name: 'Single Video',
    price: '$19.99',
    description: 'One message, 1080p quality, 90‑day hosting',
    features: ['1080p quality', '90‑day hosting after delivery', 'Download link included'],
    cta: 'Purchase',
    popular: false,
  },
  {
    name: '5‑Pack',
    price: '$79.99',
    description: 'Most Popular • $16 each',
    features: ['5 video credits', '1080p quality', '90‑day hosting after delivery'],
    cta: 'Best Value',
    popular: true,
  },
  {
    name: 'Unlimited',
    price: '$249.99/yr',
    description: 'For those with lots to share',
    features: ['Unlimited videos', '4K quality', '1 year hosting', 'Priority support'],
    cta: 'Subscribe',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <PublicShell>
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl md:text-5xl font-heading text-gold">Pricing</h1>
          <p className="text-lg text-text-secondary">Pay only for what you use. Keep it simple, meaningful, and affordable.</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} viewport={{ once: true }}>
              <Card className={`relative h-full ${plan.popular ? 'border-gold shadow-glow' : 'border-gold/20'} bg-background-card/60`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gold text-background px-4 py-1 rounded-full text-sm font-semibold">MOST POPULAR</div>
                  </div>
                )}
                <CardHeader className="text-center pb-6 pt-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="text-4xl font-heading text-gold mb-2">{plan.price}</div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-gold/20 flex items-center justify-center"><div className="h-2 w-2 rounded-full bg-gold" /></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>{plan.cta}</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <Card className="border-gold/20 bg-background-card/60">
            <CardHeader>
              <CardTitle className="text-gold">Storage Extensions</CardTitle>
              <CardDescription className="text-text-secondary">Keep videos hosted longer beyond 90 days post‑delivery.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 text-sm text-text-secondary">
              <div className="rounded-md border border-gold/20 p-4">$4.99/month per video</div>
              <div className="rounded-md border border-gold/20 p-4">$29.99/year for 10 videos (bundle)</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicShell>
  );
}

