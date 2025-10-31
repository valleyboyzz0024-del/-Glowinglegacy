'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface PublicShellProps {
  children: ReactNode;
}

export function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-gold/20 bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-xl">✨</span>
            </div>
            <span className="font-heading text-xl text-gold">Glowing Legacy</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/how-it-works" className="text-sm hover:text-gold transition-colors">How It Works</Link>
            <Link href="/pricing" className="text-sm hover:text-gold transition-colors">Pricing</Link>
            <Link href="/shop" className="text-sm hover:text-gold transition-colors">Shop</Link>
            <Link href="/about" className="text-sm hover:text-gold transition-colors">About</Link>
            <Link href="/faq" className="text-sm hover:text-gold transition-colors">FAQ</Link>
            <Link href="/login" className="text-sm hover:text-gold transition-colors">Log In</Link>
            <Button asChild size="sm">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-gold/20 bg-background-card/60 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-sm text-text-secondary">
            © 2025 Glowing Legacy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
