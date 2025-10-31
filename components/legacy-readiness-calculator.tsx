'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';
import {
  calculateLegacyReadiness,
  type LegacyReadinessInput,
} from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const tierCopy: Record<
  ReturnType<typeof calculateLegacyReadiness>['tier'],
  string
> = {
  'Starting Out': 'You have the spark. A few more plans will make your legacy shine.',
  'Building Momentum': 'Great progress. A little more structure will lock in the experience.',
  'Legacy Ready': 'Outstanding. Your stories and gifts are ready for every milestone.',
};

const defaultInput: LegacyReadinessInput = {
  messageCount: 2,
  giftPlanCount: 1,
  scheduledMoments: 3,
  hasEmergencyBackup: false,
};

export function LegacyReadinessCalculator() {
  const [input, setInput] = useState<LegacyReadinessInput>(defaultInput);

  const result = useMemo(() => calculateLegacyReadiness(input), [input]);

  const handleChange = (field: keyof LegacyReadinessInput, value: number | boolean) => {
    setInput(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="bg-background-card/60 border border-gold/20 shadow-xl">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-2xl font-heading text-gold">
              Legacy Readiness Calculator
            </CardTitle>
            <CardDescription className="text-text-secondary">
              Measure how prepared you are to deliver memories, gifts, and guidance when it matters most.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <CalculatorControl
              label="Messages recorded"
              helper="Include milestone messages for birthdays, achievements, and tough days."
              value={input.messageCount}
              min={0}
              max={12}
              onChange={value => handleChange('messageCount', value)}
            />
            <CalculatorControl
              label="Gift plans created"
              helper="Count heartfelt gifts, letters, or keepsakes ready to send."
              value={input.giftPlanCount}
              min={0}
              max={8}
              onChange={value => handleChange('giftPlanCount', value)}
            />
            <CalculatorControl
              label="Months of deliveries scheduled"
              helper="How far in advance have you mapped out delivery dates?"
              value={input.scheduledMoments}
              min={0}
              max={24}
              onChange={value => handleChange('scheduledMoments', value)}
            />

            <div className="flex items-center justify-between rounded-lg border border-gold/20 bg-background/40 p-4">
              <div>
                <p className="font-medium text-text-primary">
                  Emergency backup contact added
                </p>
                <p className="text-sm text-text-secondary">
                  Choose someone to make sure your plans reach loved ones on time.
                </p>
              </div>
              <Button
                type="button"
                variant={input.hasEmergencyBackup ? 'default' : 'outline'}
                onClick={() => handleChange('hasEmergencyBackup', !input.hasEmergencyBackup)}
              >
                {input.hasEmergencyBackup ? 'Yes' : 'Add Contact'}
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-gold/20 bg-background/60 p-6 shadow-inner"
          >
            <div className="mb-6">
              <span className="text-sm font-semibold uppercase tracking-wide text-gold">
                Your readiness score
              </span>
              <div className="mt-4 flex items-end gap-4">
                <span className="text-5xl font-heading text-gold">{result.score}</span>
                <span className="mb-1 text-sm text-text-secondary">out of 100</span>
              </div>
            </div>

            <div className="mb-6 rounded-xl bg-gold/10 p-4">
              <p className="text-lg font-semibold text-gold">{result.tier}</p>
              <p className="mt-1 text-sm text-text-secondary">{tierCopy[result.tier]}</p>
            </div>

            <div className="space-y-3">
              {result.recommendations.map(recommendation => (
                <div
                  key={recommendation}
                  className="flex items-start gap-3 rounded-lg border border-gold/10 bg-background-card/60 p-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-gold" />
                  <p className="text-sm text-text-secondary">{recommendation}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}

interface CalculatorControlProps {
  label: string;
  helper: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

function CalculatorControl({
  label,
  helper,
  value,
  min,
  max,
  onChange,
}: CalculatorControlProps) {
  return (
    <div className="rounded-lg border border-gold/20 bg-background/40 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-text-primary">{label}</p>
          <p className="text-sm text-text-secondary">{helper}</p>
        </div>
        <span className="text-lg font-semibold text-gold">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={event => onChange(Number(event.target.value))}
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-gold/20"
      />
      <div className="mt-2 flex justify-between text-xs text-text-tertiary">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default LegacyReadinessCalculator;
