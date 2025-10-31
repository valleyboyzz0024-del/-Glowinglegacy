'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ParticleBackground } from '@/components/ui/particle-background';
import { ArrowRight, Shield, Star, Heart, Sparkles } from 'lucide-react';

export function EnhancedHero() {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate Leonardo AI background on mount
    const generateBackground = async () => {
      try {
        const response = await fetch('/api/leonardo/generate-background', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: 'elegant memorial background, golden light rays, dark background with subtle textures, ethereal atmosphere, cinematic lighting, high quality, professional',
            width: 1920,
            height: 1080,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.imageUrl) {
            setBackgroundImage(data.imageUrl);
          }
        }
      } catch (error) {
        console.error('Failed to generate background:', error);
      } finally {
        setIsLoading(false);
      }
    };

    generateBackground();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 bg-black">
        {backgroundImage && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <Image
              src={backgroundImage}
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        
        {/* Radial Gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />
      </div>

      {/* Particle Effect Layer */}
      <div className="absolute inset-0 z-10">
        <ParticleBackground />
      </div>

      {/* Content Layer */}
      <div className="container mx-auto px-4 py-20 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-2xl animate-pulse-glow" />
              <Image
                src="/logo.webp"
                alt="Glowing Legacy"
                width={120}
                height={120}
                className="relative z-10 drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Headline with Shimmer Effect */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-6xl md:text-8xl font-heading text-gold mb-6 leading-tight tracking-tight"
          >
            <span className="inline-block relative">
              Leave More Than
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut',
                }}
              />
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
              Memories
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed font-light"
          >
            Record heartfelt video messages and send meaningful gifts to loved ones,
            <span className="text-gold font-medium"> delivered exactly when they need them most</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <Link href="/signup">
              <Button
                size="lg"
                className="group relative text-lg px-10 py-7 bg-gold hover:bg-gold-dark transition-all duration-300 overflow-hidden shadow-glow-lg"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles className="h-5 w-5" />
                  Create Your First Message
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  style={{ opacity: 0.3 }}
                />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-7 border-2 border-gold/50 hover:border-gold hover:bg-gold/10 transition-all duration-300 backdrop-blur-sm"
              >
                See How It Works
              </Button>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            {[
              { icon: Shield, text: '256-bit Encrypted', color: 'text-blue-400' },
              { icon: Star, text: 'Trusted by 10,000+ Families', color: 'text-gold' },
              { icon: Heart, text: 'Forever Guarantee', color: 'text-red-400' },
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-6 py-4 rounded-full border border-gold/20 hover:border-gold/50 transition-all duration-300 group"
              >
                <badge.icon className={`h-6 w-6 ${badge.color} group-hover:scale-110 transition-transform`} />
                <span className="text-white/90 font-medium text-base md:text-lg">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gold/60 hover:text-gold transition-colors cursor-pointer"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}