'use client';

import React, { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.5, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className={cn('relative', className)}>
      <motion.div style={{ y: smoothY }}>{children}</motion.div>
    </div>
  );
}

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxSection({
  children,
  className,
  speed = 0.3,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      className={cn('relative', className)}
    >
      {children}
    </motion.section>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: 'up' | 'down';
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  className,
  direction = 'up',
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const multiplier = direction === 'up' ? -1 : 1;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, multiplier * speed * 200]
  );

  return (
    <div ref={ref} className={cn('relative', className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.3,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

interface ParallaxTextProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxText({
  children,
  className,
  speed = 0.2,
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, opacity }}>{children}</motion.div>
    </div>
  );
}

interface StickyScrollProps {
  children: ReactNode;
  className?: string;
  top?: number;
}

export function StickyScroll({ children, className, top = 100 }: StickyScrollProps) {
  return (
    <div className={cn('sticky', className)} style={{ top: `${top}px` }}>
      {children}
    </div>
  );
}

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function RevealOnScroll({
  children,
  className,
  direction = 'up',
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 100, x: 0 };
      case 'down':
        return { y: -100, x: 0 };
      case 'left':
        return { y: 0, x: 100 };
      case 'right':
        return { y: 0, x: -100 };
    }
  };

  const initial = getInitialPosition();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [initial.y, 0]);
  const x = useTransform(scrollYProgress, [0, 0.3], [initial.x, 0]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity, y, x }}>{children}</motion.div>
    </div>
  );
}

interface ScaleOnScrollProps {
  children: ReactNode;
  className?: string;
  maxScale?: number;
}

export function ScaleOnScroll({
  children,
  className,
  maxScale = 1.2,
}: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, maxScale]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale, opacity }}>{children}</motion.div>
    </div>
  );
}

interface RotateOnScrollProps {
  children: ReactNode;
  className?: string;
  maxRotation?: number;
}

export function RotateOnScroll({
  children,
  className,
  maxRotation = 15,
}: RotateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-maxRotation, 0, maxRotation]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ rotate }}>{children}</motion.div>
    </div>
  );
}