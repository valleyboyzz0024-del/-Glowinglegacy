'use client';

import { useCart } from '@/lib/context/cart-context';
import { formatPrice } from '@/lib/types/product';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CartDrawer() {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart, itemCount } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-background border-l border-gold/20 z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold/20">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-gold" />
            <h2 className="text-xl font-heading text-gold">Shopping Cart</h2>
            {itemCount > 0 && (
              <span className="bg-gold/20 text-gold px-2 py-0.5 rounded-full text-sm">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gold/10 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-text-secondary" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-text-secondary/40 mb-4" />
              <p className="text-text-secondary mb-2">Your cart is empty</p>
              <p className="text-sm text-text-secondary/70 mb-4">
                Add some items to get started
              </p>
              <Button onClick={closeCart} asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div
                  key={`${item.product.id}-${JSON.stringify(item.selected_variants)}`}
                  className="flex gap-4 p-4 rounded-lg border border-gold/10 bg-background-card/40 hover:border-gold/30 transition-colors"
                >
                  {/* Product Image */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gold/5">
                    {item.product.images && item.product.images[0] ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-secondary/40">
                        <ShoppingBag className="h-8 w-8" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gold font-semibold mb-2">
                      {formatPrice(item.product.base_price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded border border-gold/20 hover:border-gold hover:bg-gold/10 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded border border-gold/20 hover:border-gold hover:bg-gold/10 transition-colors"
                        disabled={item.quantity >= item.product.stock_quantity}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="ml-auto p-1.5 text-destructive hover:bg-destructive/10 rounded transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Totals */}
        {cart.items.length > 0 && (
          <div className="border-t border-gold/20 p-6 bg-background-card/60 backdrop-blur">
            {/* Subtotal */}
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-secondary">Subtotal</span>
              <span className="text-white">{formatPrice(cart.subtotal)}</span>
            </div>

            {/* Tax */}
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-secondary">Tax (8%)</span>
              <span className="text-white">{formatPrice(cart.tax)}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between text-sm mb-4">
              <span className="text-text-secondary">Shipping</span>
              <span className="text-white">
                {cart.shipping === 0 ? 'Calculated at checkout' : formatPrice(cart.shipping)}
              </span>
            </div>

            {/* Total */}
            <div className="flex justify-between text-lg font-bold mb-4 pt-4 border-t border-gold/20">
              <span className="text-gold">Total</span>
              <span className="text-gold">{formatPrice(cart.total)}</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout" onClick={closeCart}>
                  Proceed to Checkout
                </Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={closeCart} asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-text-secondary">
              <div className="flex items-center gap-1">
                <span className="text-gold">🔒</span>
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gold">✓</span>
                <span>Free Shipping $100+</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}