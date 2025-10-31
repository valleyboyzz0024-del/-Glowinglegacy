'use client';

import { PublicShell } from '@/components/layout/public-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const products = [
  { name: 'Memory Box - Walnut', price: 89.99, tag: 'Best for: Mom' },
  { name: 'Photo Album - Leather', price: 124.99, tag: 'Best for: Family' },
  { name: 'Letter Set - Vintage', price: 34.99, tag: 'Best for: Keepsakes' },
  { name: 'Custom Pendant', price: 99.99, tag: 'Best for: Spouse' },
];

export default function ShopPage() {
  return (
    <PublicShell>
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl md:text-5xl font-heading text-gold">Meaningful Gifts</h1>
          <p className="text-lg text-text-secondary">Hand‑selected keepsakes that pair beautifully with your video messages.</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <Card key={p.name} className="border-gold/20 bg-background-card/60 hover:shadow-glow transition-shadow">
              <CardHeader>
                <div className="aspect-video w-full rounded-md bg-gold/10" />
                <CardTitle>{p.name}</CardTitle>
                <CardDescription>{p.tag}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 font-heading text-xl text-gold">${p.price.toFixed(2)}</div>
                <Button className="w-full" variant="outline">Add to Cart</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}

