'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const nav = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
];

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <nav className="sticky top-0 z-50 border-b border-gold/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center ring-1 ring-gold/30 shadow-glow">
              <span className="text-sm font-heading text-gold">GL</span>
            </div>
            <span className="text-xl font-heading text-gold">Glowing Legacy</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm transition-colors',
                  pathname === item.href ? 'text-gold' : 'text-text-secondary hover:text-gold',
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-text-secondary hover:text-gold transition-colors">Log In</Link>
            <Link href="/signup" className="inline-flex items-center rounded-md border border-gold/30 bg-gold/15 px-4 py-2 text-sm text-gold shadow-glow hover:bg-gold/25">Get Started</Link>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}

export default PublicShell;

