'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <motion.div
      className={cn('relative', sizes[size], className)}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <div className="absolute inset-0 border-4 border-gold/20 rounded-full" />
      <div className="absolute inset-0 border-4 border-transparent border-t-gold rounded-full" />
    </motion.div>
  );
}

interface GlowingLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function GlowingLoader({ size = 'md', className }: GlowingLoaderProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <motion.div
      className={cn('relative', sizes[size], className)}
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold via-gold-light to-gold opacity-75 blur-sm" />
      <div className="absolute inset-2 rounded-full bg-black" />
      <div className="absolute inset-0 rounded-full border-2 border-gold/50" />
    </motion.div>
  );
}

export function PulseLoader({ className }: { className?: string }) {
  return (
    <div className={cn('flex gap-2', className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full bg-gold"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

export function WaveLoader({ className }: { className?: string }) {
  return (
    <div className={cn('flex gap-1.5 items-end h-8', className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-2 bg-gold rounded-full"
          animate={{
            height: ['8px', '32px', '8px'],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export function CircularProgress({
  progress,
  size = 'md',
  className,
}: {
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizes = {
    sm: { width: 48, stroke: 4 },
    md: { width: 64, stroke: 6 },
    lg: { width: 96, stroke: 8 },
  };

  const { width, stroke } = sizes[size];
  const radius = (width - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn('relative', className)} style={{ width, height: width }}>
      <svg width={width} height={width} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          stroke="rgba(212, 175, 55, 0.2)"
          strokeWidth={stroke}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          stroke="url(#goldGradient)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5 }}
          style={{
            strokeDasharray: circumference,
          }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#F4E4C1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-gold font-bold text-lg">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}

export function SkeletonLoader({
  className,
  rows = 3,
}: {
  className?: string;
  rows?: number;
}) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-gold/10 rounded"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          style={{ width: `${100 - i * 10}%` }}
        />
      ))}
    </div>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 bg-black/40 backdrop-blur-xl border border-gold/20 rounded-2xl', className)}>
      <motion.div
        className="h-6 bg-gold/10 rounded w-3/4 mb-4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="h-4 bg-gold/10 rounded mb-3"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="h-4 bg-gold/10 rounded w-5/6"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  );
}

export function SpinnerOverlay({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div className={cn('fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center', className)}>
      <div className="text-center">
        <GlowingLoader size="lg" className="mx-auto mb-6" />
        {message && (
          <motion.p
            className="text-xl text-white/90 font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export function LinearProgress({
  progress,
  className,
  showPercentage = false,
}: {
  progress: number;
  className?: string;
  showPercentage?: boolean;
}) {
  return (
    <div className={cn('w-full', className)}>
      {showPercentage && (
        <div className="flex justify-between mb-2">
          <span className="text-sm text-white/70">Loading...</span>
          <span className="text-sm text-gold font-medium">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="h-2 bg-gold/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-gold via-gold-light to-gold rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          style={{
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
          }}
        />
      </div>
    </div>
  );
}

export function DotsLoader({ className }: { className?: string }) {
  return (
    <div className={cn('flex gap-3', className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-4 h-4 rounded-full bg-gold"
          animate={{
            y: [0, -20, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export function RingLoader({ className }: { className?: string }) {
  return (
    <div className={cn('relative w-16 h-16', className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-4 border-gold/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
          }}
        />
      ))}
    </div>
  );
}

export function FadeLoader({ text = 'Loading', className }: { text?: string; className?: string }) {
  return (
    <motion.div
      className={cn('text-2xl font-heading text-gold', className)}
      animate={{
        opacity: [0.3, 1, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {text}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ...
      </motion.span>
    </motion.div>
  );
}