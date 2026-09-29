import type { CalendarDay } from "@/lib/calendar";

export type Reward = {
  id: string;
  requiredCurrency: number;
  imageDataUrl: string;
};

export type RewardPlacement = {
  reward: Reward;
  day: number | null;
};

/**
 * A null day represents the first empty cell after the final day of the month.
 */
export function placeRewards(
  days: readonly CalendarDay[],
  rewards: readonly Reward[],
): RewardPlacement[] {
  const lastDay = days.at(-1);
  if (!lastDay) return [];

  const sortedRewards = [...rewards].sort(
    (left, right) => left.requiredCurrency - right.requiredCurrency,
  );
  const placements: RewardPlacement[] = [];
  let hasTrailingReward = false;

  for (const reward of sortedRewards) {
    const earnedDay = days.find(
      (day) => day.total >= reward.requiredCurrency,
    );

    if (earnedDay) {
      placements.push({ reward, day: earnedDay.day });
      continue;
    }

    if (lastDay.weekday !== 6 && !hasTrailingReward) {
      placements.push({ reward, day: null });
      hasTrailingReward = true;
    }
  }

  return placements;
}
