'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Search, Bell } from 'lucide-react';
import { UserProfileMenu } from '@/components/dashboard/user-profile-menu';

const nav = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Videos', href: '/dashboard/videos' },
  { label: 'Packages', href: '/dashboard/packages' },
  { label: 'Recipients', href: '/dashboard/recipients' },
  { label: 'Shop', href: '/shop' },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <header className="sticky top-0 z-50 border-b border-gold/20 bg-background/90 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gold/10 ring-1 ring-gold/30 shadow-glow flex items-center justify-center">
              <span className="font-heading text-gold">GL</span>
            </div>
            <span className="font-heading text-lg text-gold">Glowing Legacy</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm transition-colors',
                  pathname?.startsWith(item.href)
                    ? 'text-gold'
                    : 'text-text-secondary hover:text-gold',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-gold/20 bg-background-card/60 px-3 py-1.5">
              <Search className="h-4 w-4 text-text-secondary" />
              <input
                placeholder="Search"
                className="bg-transparent text-sm outline-none placeholder:text-text-secondary"
              />
            </div>
            <button className="h-9 w-9 rounded-full border border-gold/20 bg-background-card/60 hover:shadow-glow transition-shadow flex items-center justify-center">
              <Bell className="h-4 w-4" />
            </button>
            <UserProfileMenu />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

export default DashboardShell;

