import dynamicImport from 'next/dynamic';

// Force this route to be completely dynamic - no static generation
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Import the entire checkout UI as a client component with no SSR
const CheckoutClient = dynamicImport(
  () => import('./checkout-client').then(mod => ({ default: mod.CheckoutClient })),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    )
  }
);

export default function CheckoutPage() {
  return <CheckoutClient />;
}