'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  variant?: 'default' | 'pills' | 'underline';
}

export function Tabs({
  tabs,
  defaultTab,
  className,
  variant = 'default',
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className={cn('w-full', className)}>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative px-6 py-3 text-base font-medium transition-all duration-300 rounded-lg',
              variant === 'pills' && 'rounded-full',
              variant === 'underline' && 'rounded-none border-b-2',
              activeTab === tab.id
                ? 'text-white'
                : 'text-white/60 hover:text-white/80'
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Active background */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className={cn(
                  'absolute inset-0 bg-gold/20 backdrop-blur-sm border border-gold/40',
                  variant === 'pills' && 'rounded-full',
                  variant === 'underline' && 'rounded-none border-b-2 border-gold'
                )}
                style={{
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}

            {/* Tab content */}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <span className="text-gold">{tab.icon}</span>}
              {tab.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTabData?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

interface VerticalTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export function VerticalTabs({
  tabs,
  defaultTab,
  className,
}: VerticalTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className={cn('flex gap-8', className)}>
      {/* Vertical Tab Navigation */}
      <div className="flex flex-col gap-2 min-w-[200px]">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative px-6 py-4 text-left text-base font-medium transition-all duration-300 rounded-lg',
              activeTab === tab.id
                ? 'text-white'
                : 'text-white/60 hover:text-white/80'
            )}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Active background */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="verticalActiveTab"
                className="absolute inset-0 bg-gold/20 backdrop-blur-sm border-l-4 border-gold rounded-lg"
                style={{
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}

            {/* Tab content */}
            <span className="relative z-10 flex items-center gap-3">
              {tab.icon && <span className="text-gold text-xl">{tab.icon}</span>}
              {tab.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTabData?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

interface AccordionTabsProps {
  tabs: Tab[];
  className?: string;
  allowMultiple?: boolean;
}

export function AccordionTabs({
  tabs,
  className,
  allowMultiple = false,
}: AccordionTabsProps) {
  const [openTabs, setOpenTabs] = useState<string[]>([tabs[0]?.id || '']);

  const toggleTab = (tabId: string) => {
    if (allowMultiple) {
      setOpenTabs((prev) =>
        prev.includes(tabId)
          ? prev.filter((id) => id !== tabId)
          : [...prev, tabId]
      );
    } else {
      setOpenTabs((prev) => (prev.includes(tabId) ? [] : [tabId]));
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {tabs.map((tab) => {
        const isOpen = openTabs.includes(tab.id);

        return (
          <div
            key={tab.id}
            className="bg-black/40 backdrop-blur-xl border border-gold/20 rounded-lg overflow-hidden"
          >
            {/* Accordion Header */}
            <motion.button
              onClick={() => toggleTab(tab.id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gold/5 transition-colors"
              whileHover={{ x: 4 }}
            >
              <span className="flex items-center gap-3 text-lg font-medium text-white">
                {tab.icon && <span className="text-gold text-xl">{tab.icon}</span>}
                {tab.label}
              </span>
              <motion.svg
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-5 text-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </motion.button>

            {/* Accordion Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 border-t border-gold/20">
                    {tab.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}