import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface LegacyReadinessInput {
  messageCount: number;
  giftPlanCount: number;
  scheduledMoments: number;
  hasEmergencyBackup: boolean;
}

export interface LegacyReadinessResult {
  score: number;
  tier: "Starting Out" | "Building Momentum" | "Legacy Ready";
  recommendations: string[];
}

export function calculateLegacyReadiness(
  input: LegacyReadinessInput,
): LegacyReadinessResult {
  const clamp = (value: number, max: number) => Math.max(0, Math.min(value, max));

  const messageScore = (clamp(input.messageCount, 12) / 12) * 40;
  const giftScore = (clamp(input.giftPlanCount, 8) / 8) * 25;
  const scheduleScore = (clamp(input.scheduledMoments, 24) / 24) * 20;
  const backupScore = input.hasEmergencyBackup ? 15 : 0;

  const score = Math.round(messageScore + giftScore + scheduleScore + backupScore);

  let tier: LegacyReadinessResult["tier"];
  if (score >= 80) {
    tier = "Legacy Ready";
  } else if (score >= 40) {
    tier = "Building Momentum";
  } else {
    tier = "Starting Out";
  }

  const recommendations: string[] = [];

  if (input.messageCount < 3) {
    recommendations.push("Record at least three milestone messages to anchor your story.");
  } else if (input.messageCount < 6) {
    recommendations.push("Consider adding more messages for birthdays and anniversaries.");
  }

  if (input.giftPlanCount < 2) {
    recommendations.push("Plan at least two intentional gifts to accompany your messages.");
  }

  if (input.scheduledMoments < 6) {
    recommendations.push("Schedule deliveries at least six months into the future.");
  }

  if (!input.hasEmergencyBackup) {
    recommendations.push("Add an emergency contact to guarantee timely delivery.");
  }

  if (recommendations.length === 0) {
    recommendations.push("You are in great shape. Keep refining your legacy details.");
  }

  return {
    score,
    tier,
    recommendations,
  };
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
