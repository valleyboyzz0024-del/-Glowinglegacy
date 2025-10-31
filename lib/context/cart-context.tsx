'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Product, CartItem, Cart } from '@/lib/types/product';
import { calculateCartTotals, calculateItemSubtotal } from '@/lib/types/product';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number, variants?: { [key: string]: string }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'glowing-legacy-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCart(parsed);
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Calculate item count
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    variants?: { [key: string]: string }
  ) => {
    setCart((currentCart) => {
      // Check if item already exists in cart
      const existingItemIndex = currentCart.items.findIndex(
        (item) =>
          item.product.id === product.id &&
          JSON.stringify(item.selected_variants) === JSON.stringify(variants)
      );

      let newItems: CartItem[];

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        newItems = [...currentCart.items];
        newItems[existingItemIndex].quantity += quantity;
        newItems[existingItemIndex].subtotal = calculateItemSubtotal(
          product,
          newItems[existingItemIndex].quantity,
          variants
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          product,
          quantity,
          selected_variants: variants,
          subtotal: calculateItemSubtotal(product, quantity, variants),
        };
        newItems = [...currentCart.items, newItem];
      }

      // Recalculate totals
      return calculateCartTotals(newItems, currentCart.shipping);
    });

    // Open cart drawer when item is added
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((currentCart) => {
      const newItems = currentCart.items.filter((item) => item.product.id !== productId);
      return calculateCartTotals(newItems, currentCart.shipping);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((currentCart) => {
      const newItems = currentCart.items.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity,
            subtotal: calculateItemSubtotal(
              item.product,
              quantity,
              item.selected_variants
            ),
          };
        }
        return item;
      });

      return calculateCartTotals(newItems, currentCart.shipping);
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
    });
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}