// Product Types for Glowing Legacy E-Commerce

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: 'keepsake' | 'memorial' | 'jewelry' | 'package' | 'digital';
  base_price: number;
  images: string[] | any; // JSONB from database, will be array
  stock_quantity: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: VariantOption[];
}

export interface VariantOption {
  id: string;
  value: string;
  price_modifier: number;
  stock_quantity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selected_variants?: {
    [variantId: string]: string; // variant_id: option_id
  };
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  discount?: number;
  discount_code?: string;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  discount?: number;
  discount_code?: string;
  shipping_address: Address;
  billing_address?: Address;
  stripe_payment_intent_id?: string;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  variant_details?: string;
  personalization_text?: string;
}

export interface Address {
  first_name: string;
  last_name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
}

export interface ShippingRate {
  id: string;
  name: string;
  description: string;
  price: number;
  estimated_days: string;
}

// Helper function to calculate cart totals
export function calculateCartTotals(items: CartItem[], shippingCost: number = 0): Cart {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = subtotal * 0.08; // 8% tax rate (adjust as needed)
  const total = subtotal + tax + shippingCost;

  return {
    items,
    subtotal,
    tax,
    shipping: shippingCost,
    total,
  };
}

// Helper function to calculate item subtotal
export function calculateItemSubtotal(product: Product, quantity: number, selectedVariants?: { [key: string]: string }): number {
  // For now, just use base price
  // Variants support will be added in future phase
  return product.base_price * quantity;
}

// Helper function to format price
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Helper function to generate order number
export function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `GL-${year}-${random}`;
}