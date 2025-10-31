import { describe, expect, it } from 'vitest';
import { calculateLegacyReadiness } from '../utils';

describe('calculateLegacyReadiness', () => {
  it('classifies high preparation as legacy ready', () => {
    const result = calculateLegacyReadiness({
      messageCount: 12,
      giftPlanCount: 8,
      scheduledMoments: 24,
      hasEmergencyBackup: true,
    });

    expect(result.score).toBeGreaterThanOrEqual(90);
    expect(result.tier).toBe('Legacy Ready');
    expect(result.recommendations).toContain(
      'You are in great shape. Keep refining your legacy details.',
    );
  });

  it('surfaces actionable recommendations when preparation is low', () => {
    const result = calculateLegacyReadiness({
      messageCount: 1,
      giftPlanCount: 0,
      scheduledMoments: 0,
      hasEmergencyBackup: false,
    });

    expect(result.score).toBeLessThan(40);
    expect(result.tier).toBe('Starting Out');
    expect(result.recommendations).toEqual([
      'Record at least three milestone messages to anchor your story.',
      'Plan at least two intentional gifts to accompany your messages.',
      'Schedule deliveries at least six months into the future.',
      'Add an emergency contact to guarantee timely delivery.',
    ]);
  });

  it('encourages more content when approaching milestones', () => {
    const result = calculateLegacyReadiness({
      messageCount: 4,
      giftPlanCount: 2,
      scheduledMoments: 12,
      hasEmergencyBackup: true,
    });

    expect(result.tier).toBe('Building Momentum');
    expect(result.recommendations).toContain(
      'Consider adding more messages for birthdays and anniversaries.',
    );
  });
});
