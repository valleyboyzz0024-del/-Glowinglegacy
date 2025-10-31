'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/context/cart-context';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/types/product';
import { ShoppingBag, CreditCard, Truck, Lock } from 'lucide-react';
import Image from 'next/image';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe';
import { StripePaymentForm } from '@/components/checkout/stripe-payment-form';

interface ShippingAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, itemCount, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
    phone: '',
  });

  const [errors, setErrors] = useState<Partial<ShippingAddress>>({});

  // Redirect if cart is empty
  if (itemCount === 0) {
    router.push('/shop');
    return null;
  }

  const validateShipping = (): boolean => {
    const newErrors: Partial<ShippingAddress> = {};

    if (!shippingAddress.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!shippingAddress.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingAddress.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!shippingAddress.city.trim()) newErrors.city = 'City is required';
    if (!shippingAddress.state.trim()) newErrors.state = 'State is required';
    if (!shippingAddress.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!shippingAddress.phone.trim()) newErrors.phone = 'Phone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setLoading(true);
      try {
        // Create payment intent
        const response = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: cart.total,
            cartItems: cart.items,
            shippingAddress,
          }),
        });

        const data = await response.json();
        
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setStep('payment');
        } else {
          setPaymentError('Failed to initialize payment');
        }
      } catch (error) {
        setPaymentError('Failed to initialize payment');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading text-gold mb-2">Checkout</h1>
          <p className="text-text-secondary">Complete your order securely</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-gold' : 'text-text-secondary'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'shipping' ? 'bg-gold text-background' : 'bg-gold/20'}`}>
                  1
                </div>
                <span className="font-semibold">Shipping</span>
              </div>
              <div className="flex-1 h-px bg-gold/20" />
              <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-gold' : 'text-text-secondary'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-gold text-background' : 'bg-gold/20'}`}>
                  2
                </div>
                <span className="font-semibold">Payment</span>
              </div>
            </div>

            {/* Shipping Form */}
            {step === 'shipping' && (
              <Card className="border-gold/20 bg-background-card/60">
                <CardHeader>
                  <CardTitle className="text-gold flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold ${
                            errors.firstName ? 'border-destructive' : 'border-gold/20'
                          }`}
                        />
                        {errors.firstName && (
                          <p className="text-xs text-destructive mt-1">{errors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={`w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold ${
                            errors.lastName ? 'border-destructive' : 'border-gold/20'
                          }`}
                        />
                        {errors.lastName && (
                          <p className="text-xs text-destructive mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.addressLine1}
                        onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                        placeholder="Street address, P.O. box"
                        className={`w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold ${
                          errors.addressLine1 ? 'border-destructive' : 'border-gold/20'
                        }`}
                      />
                      {errors.addressLine1 && (
                        <p className="text-xs text-destructive mt-1">{errors.addressLine1}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.addressLine2}
                        onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                        placeholder="Apartment, suite, unit, building, floor, etc."
                        className="w-full px-4 py-2 bg-background border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className={`w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold ${
                            errors.city ? 'border-destructive' : 'border-gold/20'
                          }`}
                        />
                        {errors.city && (
                          <p className="text-xs text-destructive mt-1">{errors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          placeholder="CA"
                          className={`w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold ${
                            errors.state ? 'border-destructive' : 'border-gold/20'
                          }`}
                        />
                        {errors.state && (
                          <p className="text-xs text-destructive mt-1">{errors.state}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-1">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          className={`w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold ${
                            errors.postalCode ? 'border-destructive' : 'border-gold/20'
                          }`}
                        />
                        {errors.postalCode && (
                          <p className="text-xs text-destructive mt-1">{errors.postalCode}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                        className={`w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold ${
                          errors.phone ? 'border-destructive' : 'border-gold/20'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Payment Form */}
            {step === 'payment' && (
              <Card className="border-gold/20 bg-background-card/60">
                <CardHeader>
                  <CardTitle className="text-gold flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {paymentError && (
                    <div className="mb-4 p-4 bg-destructive/10 border border-destructive rounded-lg">
                      <p className="text-sm text-destructive">{paymentError}</p>
                    </div>
                  )}
                  
                  {clientSecret ? (
                    <Elements stripe={getStripe()} options={{ clientSecret }}>
                      <StripePaymentForm
                        onSuccess={() => {
                          clearCart();
                          router.push('/order-confirmation');
                        }}
                        onError={(error) => setPaymentError(error)}
                      />
                    </Elements>
                  ) : (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    onClick={() => setStep('shipping')}
                    className="w-full mt-4"
                  >
                    Back to Shipping
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-gold/20 bg-background-card/60 sticky top-4">
              <CardHeader>
                <CardTitle className="text-gold">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded bg-gold/5">
                        {item.product.images && item.product.images[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-text-secondary/40" />
                          </div>
                        )}
                        <div className="absolute -top-2 -right-2 bg-gold text-background rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {formatPrice(item.product.base_price)} × {item.quantity}
                        </p>
                        <p className="text-sm text-gold font-semibold">
                          {formatPrice(item.subtotal)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gold/20 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="text-white">{formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Tax</span>
                    <span className="text-white">{formatPrice(cart.tax)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Shipping</span>
                    <span className="text-white">
                      {cart.shipping === 0 ? 'FREE' : formatPrice(cart.shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gold/20">
                    <span className="text-gold">Total</span>
                    <span className="text-gold">{formatPrice(cart.total)}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-text-secondary pt-4 border-t border-gold/20">
                  <Lock className="h-4 w-4 text-gold" />
                  <span>Secure SSL Encrypted Checkout</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}