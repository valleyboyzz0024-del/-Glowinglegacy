'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User2, Settings, LogOut, CreditCard, Bell, HelpCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getSupabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface UserProfileMenuProps {
  userName?: string;
  userEmail?: string;
}

export function UserProfileMenu({ userName, userEmail }: UserProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const supabase = getSupabase();
      await supabase.auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  const displayName = userName || userEmail?.split('@')[0] || 'User';
  const initials = displayName.substring(0, 2).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 rounded-full border border-gold/20 bg-background-card/60 px-3 py-2 transition-all",
          "hover:shadow-glow hover:border-gold/40",
          isOpen && "shadow-glow border-gold/40"
        )}
      >
        <div className="h-7 w-7 rounded-full bg-gold/10 ring-1 ring-gold/30 flex items-center justify-center">
          <span className="text-xs font-semibold text-gold">{initials}</span>
        </div>
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-medium leading-none">{displayName}</span>
          {userEmail && (
            <span className="text-xs text-text-secondary leading-none mt-0.5">{userEmail}</span>
          )}
        </div>
        <ChevronDown className={cn(
          "h-4 w-4 text-text-secondary transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl border border-gold/20 bg-background-card/95 backdrop-blur shadow-xl overflow-hidden z-50">
          <div className="border-b border-gold/20 p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gold/10 ring-2 ring-gold/30 flex items-center justify-center">
                <span className="text-lg font-semibold text-gold">{initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{displayName}</p>
                {userEmail && (
                  <p className="text-xs text-text-secondary truncate">{userEmail}</p>
                )}
              </div>
            </div>
          </div>

          <div className="py-2">
            <Link
              href="/dashboard/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gold/10 transition-colors"
            >
              <User2 className="h-4 w-4 text-gold" />
              <span>My Profile</span>
            </Link>

            <Link
              href="/dashboard/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gold/10 transition-colors"
            >
              <Settings className="h-4 w-4 text-gold" />
              <span>Settings</span>
            </Link>

            <Link
              href="/dashboard/billing"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gold/10 transition-colors"
            >
              <CreditCard className="h-4 w-4 text-gold" />
              <span>Billing</span>
            </Link>

            <Link
              href="/dashboard/notifications"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gold/10 transition-colors"
            >
              <Bell className="h-4 w-4 text-gold" />
              <span>Notifications</span>
            </Link>

            <Link
              href="/faq"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gold/10 transition-colors"
            >
              <HelpCircle className="h-4 w-4 text-gold" />
              <span>Help & FAQ</span>
            </Link>
          </div>

          <div className="border-t border-gold/20 p-2">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-red-500/10 transition-colors w-full disabled:opacity-50"
            >
              <LogOut className="h-4 w-4 text-red-400" />
              <span className="text-red-400">{isLoggingOut ? 'Logging out...' : 'Log Out'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}