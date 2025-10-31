'use client';

import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { Stripe } from '@stripe/stripe-js';
import { getStripe } from '@/lib/stripe';
import { StripePaymentForm } from './stripe-payment-form';

interface StripeElementsWrapperProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function StripeElementsWrapper({
  clientSecret,
  onSuccess,
  onError
}: StripeElementsWrapperProps) {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    setStripePromise(getStripe());
  }, []);

  if (!stripePromise) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <StripePaymentForm onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
}