'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function OrderConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState<string>('');

  useEffect(() => {
    const generateOrderNumber = () => {
      const date = new Date();
      const year = date.getFullYear();
      const random = Math.floor(100000 + Math.random() * 900000);
      return `GL-${year}-${random}`;
    };
    setOrderNumber(generateOrderNumber());
  }, []);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading text-gold mb-2">
            Order Confirmed!
          </h1>
          <p className="text-text-secondary text-lg">
            Thank you for your purchase
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="border-gold/20 bg-background-card/60 mb-6">
          <CardHeader>
            <CardTitle className="text-gold">Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gold/20">
              <span className="text-text-secondary">Order Number</span>
              <span className="text-white font-semibold">{orderNumber}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gold/20">
              <span className="text-text-secondary">Status</span>
              <span className="text-green-500 font-semibold">Confirmed</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-text-secondary">Estimated Delivery</span>
              <span className="text-white font-semibold">5-7 Business Days</span>
            </div>
          </CardContent>
        </Card>

        {/* What's Next Card */}
        <Card className="border-gold/20 bg-background-card/60 mb-6">
          <CardHeader>
            <CardTitle className="text-gold">What&apos;s Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-gold" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">
                  Confirmation Email Sent
                </h3>
                <p className="text-sm text-text-secondary">
                  We&apos;ve sent a confirmation email with your order details and receipt.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <Package className="h-5 w-5 text-gold" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">
                  Order Processing
                </h3>
                <p className="text-sm text-text-secondary">
                  Your order is being prepared for shipment. You&apos;ll receive tracking information once it ships.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-gold" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">
                  Track Your Order
                </h3>
                <p className="text-sm text-text-secondary">
                  View your order status anytime in your dashboard under &quot;Orders&quot;.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard" className="flex-1">
            <Button className="w-full" size="lg">
              View Dashboard
            </Button>
          </Link>
          <Link href="/shop" className="flex-1">
            <Button variant="outline" className="w-full" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Support Section */}
        <div className="mt-8 p-6 bg-gold/5 rounded-lg border border-gold/20 text-center">
          <p className="text-sm text-text-secondary mb-2">
            Questions about your order?
          </p>
          <p className="text-white">
            Contact us at{' '}
            <a
              href="mailto:support@glowinglegacy.com"
              className="text-gold hover:text-gold/80"
            >
              support@glowinglegacy.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}