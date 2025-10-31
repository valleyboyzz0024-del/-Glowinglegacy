'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'feature' | 'pricing' | 'stat';
  hover?: boolean;
  glow?: boolean;
  delay?: number;
}

export function GlassCard({
  children,
  className,
  variant = 'default',
  hover = true,
  glow = false,
  delay = 0,
}: GlassCardProps) {
  const variants = {
    default: 'bg-black/40 backdrop-blur-xl border border-gold/20',
    feature: 'bg-gradient-to-br from-black/50 to-black/30 backdrop-blur-2xl border border-gold/30',
    pricing: 'bg-black/60 backdrop-blur-2xl border-2 border-gold/40',
    stat: 'bg-gradient-to-br from-gold/10 to-black/40 backdrop-blur-xl border border-gold/30',
  };

  const hoverEffects = hover
    ? 'hover:border-gold/60 hover:shadow-glow-lg hover:-translate-y-1 hover:bg-black/50'
    : '';

  const glowEffect = glow ? 'shadow-glow animate-glow-pulse' : 'shadow-2xl';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={cn(
        'relative overflow-hidden rounded-2xl transition-all duration-300',
        variants[variant],
        hoverEffects,
        glowEffect,
        className
      )}
    >
      {/* Shimmer effect on hover */}
      {hover && (
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent)',
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      )}

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </motion.div>
  );
}

interface GlassCardHeaderProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function GlassCardHeader({
  children,
  className,
  icon,
}: GlassCardHeaderProps) {
  return (
    <div className={cn('p-6 pb-4', className)}>
      {icon && (
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 backdrop-blur-sm border border-gold/20 shadow-lg">
          {icon}
        </div>
      )}
      {children}
    </div>
  );
}

interface GlassCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCardContent({
  children,
  className,
}: GlassCardContentProps) {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>;
}

interface GlassCardTitleProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export function GlassCardTitle({
  children,
  className,
  gradient = false,
}: GlassCardTitleProps) {
  return (
    <h3
      className={cn(
        'text-2xl font-heading font-bold mb-2',
        gradient
          ? 'bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent'
          : 'text-white',
        className
      )}
    >
      {children}
    </h3>
  );
}

interface GlassCardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCardDescription({
  children,
  className,
}: GlassCardDescriptionProps) {
  return (
    <p className={cn('text-white/70 leading-relaxed text-base', className)}>
      {children}
    </p>
  );
}

interface GlassCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCardFooter({
  children,
  className,
}: GlassCardFooterProps) {
  return (
    <div className={cn('p-6 pt-4 border-t border-gold/20', className)}>
      {children}
    </div>
  );
}