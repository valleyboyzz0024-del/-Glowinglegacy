'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Video, Gift, Calendar, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { LegacyReadinessCalculator } from '@/components/legacy-readiness-calculator';
import { EnhancedHero } from '@/components/ui/enhanced-hero';
import {
  GlassCard,
  GlassCardHeader,
  GlassCardContent,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardFooter,
} from '@/components/ui/glass-card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-gold/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
              <span className="text-xl font-heading text-gold">GL</span>
            </div>
            <span className="text-xl font-heading text-gold">Glowing Legacy</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-text-secondary hover:text-gold transition-colors">
              How It Works
            </Link>
            <Link href="/pricing" className="text-text-secondary hover:text-gold transition-colors">
              Pricing
            </Link>
            <Link href="/shop" className="text-text-secondary hover:text-gold transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-text-secondary hover:text-gold transition-colors">
              About
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section with Particles & Leonardo AI */}
      <EnhancedHero />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading text-gold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Creating your legacy is simple. Just four steps to ensure your love reaches them.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Video,
                title: 'Record',
                description: 'Create video messages using our simple recorder',
                step: 1,
              },
              {
                icon: Gift,
                title: 'Choose',
                description: 'Add gifts from our curated collection',
                step: 2,
              },
              {
                icon: Calendar,
                title: 'Schedule',
                description: 'Set the perfect moment for delivery',
                step: 3,
              },
              {
                icon: Heart,
                title: 'Delivered',
                description: 'They receive your message when it matters most',
                step: 4,
              },
            ].map((item, index) => (
              <GlassCard
                key={index}
                variant="feature"
                delay={index * 0.1}
                className="text-center h-full group"
              >
                <div className="absolute top-4 right-4 text-6xl font-heading text-gold/10 group-hover:text-gold/30 transition-colors duration-500">
                  {item.step}
                </div>
                <GlassCardHeader icon={<item.icon className="h-8 w-8 text-gold" />}>
                  <GlassCardTitle className="text-xl">{item.title}</GlassCardTitle>
                </GlassCardHeader>
                <GlassCardContent>
                  <GlassCardDescription className="text-base leading-relaxed">
                    {item.description}
                  </GlassCardDescription>
                </GlassCardContent>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading text-gold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Pay only for what you use. No monthly subscriptions required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Single Video',
                price: '$19.99',
                description: 'Perfect for one special message',
                features: [
                  '1 video message',
                  '1080p quality',
                  '90-day hosting',
                  'Recipient download',
                ],
                cta: 'Get Started',
              },
              {
                name: '5-Pack',
                price: '$79.99',
                description: 'Best value for multiple messages',
                features: [
                  '5 video messages',
                  '$16 per video',
                  '1080p quality',
                  '90-day hosting',
                  'Recipient download',
                ],
                cta: 'Best Value',
                popular: true,
              },
              {
                name: 'Unlimited',
                price: '$249.99/yr',
                description: 'For those with lots to share',
                features: [
                  'Unlimited videos',
                  '4K quality',
                  '1 year hosting',
                  'Priority support',
                  'Bulk download',
                ],
                cta: 'Go Unlimited',
              },
            ].map((plan, index) => (
              <GlassCard
                key={index}
                variant="pricing"
                delay={index * 0.1}
                glow={plan.popular}
                className="relative h-full"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-gold via-gold-light to-gold text-background px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                <GlassCardHeader className="text-center pb-6 pt-8">
                  <GlassCardTitle className="text-2xl mb-2" gradient={plan.popular}>
                    {plan.name}
                  </GlassCardTitle>
                  <div className="text-5xl font-heading text-gold mb-3 font-bold">{plan.price}</div>
                  <GlassCardDescription className="text-base">{plan.description}</GlassCardDescription>
                </GlassCardHeader>
                <GlassCardContent className="space-y-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-base">
                        <div className="h-6 w-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 ring-1 ring-gold/30">
                          <div className="h-2.5 w-2.5 rounded-full bg-gold shadow-sm shadow-gold/50" />
                        </div>
                        <span className="text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCardContent>
                <GlassCardFooter>
                  <Link href="/signup" className="block">
                    <Button
                      className="w-full text-base py-6"
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </GlassCardFooter>
              </GlassCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/pricing" className="text-gold hover:underline text-lg">
              View all pricing options
            </Link>
          </div>
        </div>
      </section>

      {/* Legacy Planner Section */}
      <section id="legacy-planner" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-4xl md:text-5xl font-heading text-gold mb-4">
              Build A Legacy Plan In Minutes
            </h2>
            <p className="text-xl text-text-secondary">
              Use our readiness calculator to make sure your stories, gifts, and scheduled moments are ready for the people you love.
            </p>
          </div>
          <LegacyReadinessCalculator />
          <p className="mt-6 text-center text-sm text-text-tertiary">
            Want tailored guidance? Your concierge will help fine tune every milestone after you sign up.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background-card/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading text-gold mb-6">
            Start Creating Your Legacy Today
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-12">
            Join thousands of families who are ensuring their love and wisdom live on for generations.
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8">
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold/20 py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-gold font-heading text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-text-secondary hover:text-gold transition-colors">About</Link></li>
                <li><Link href="/how-it-works" className="text-text-secondary hover:text-gold transition-colors">How It Works</Link></li>
                <li><Link href="/blog" className="text-text-secondary hover:text-gold transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-text-secondary hover:text-gold transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-gold font-heading text-lg mb-4">Products</h3>
              <ul className="space-y-2">
                <li><Link href="/pricing" className="text-text-secondary hover:text-gold transition-colors">Videos</Link></li>
                <li><Link href="/shop" className="text-text-secondary hover:text-gold transition-colors">Gift Packages</Link></li>
                <li><Link href="/pricing" className="text-text-secondary hover:text-gold transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-gold font-heading text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="text-text-secondary hover:text-gold transition-colors">FAQ</Link></li>
                <li><Link href="/help" className="text-text-secondary hover:text-gold transition-colors">Help Center</Link></li>
                <li><Link href="/terms" className="text-text-secondary hover:text-gold transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="text-text-secondary hover:text-gold transition-colors">Privacy</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-gold font-heading text-lg mb-4">Connect</h3>
              <p className="text-text-secondary mb-4">Stay updated with our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-background border border-gold/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gold/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-secondary text-sm">
              (c) 2025 Glowing Legacy. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-text-secondary hover:text-gold transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              <Link href="#" className="text-text-secondary hover:text-gold transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              <Link href="#" className="text-text-secondary hover:text-gold transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



