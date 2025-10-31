'use client';

import { useCart } from '@/lib/context/cart-context';
import { ShoppingBag } from 'lucide-react';

export function CartButton() {
  const { openCart, itemCount } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative p-2 hover:bg-gold/10 rounded-lg transition-colors group"
      aria-label="Shopping cart"
    >
      <ShoppingBag className="h-5 w-5 text-text-secondary group-hover:text-gold transition-colors" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-gold text-background text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}