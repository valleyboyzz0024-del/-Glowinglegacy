'use client';

import { Elements } from '@stripe/react-stripe-js';
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
  return (
    <Elements stripe={getStripe()} options={{ clientSecret }}>
      <StripePaymentForm onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
}