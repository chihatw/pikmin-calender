export const REGULAR_UNIT = 80;
export const BONUS_UNIT = 200;
export const MULTIPLIER = 3;

export type CalendarDay = {
  day: number;
  total: number;
  isBonus: boolean;
  /** Monday = 0, Sunday = 6. */
  weekday: number;
};

export type MonthData = {
  leadingEmptyCells: number;
  days: CalendarDay[];
};

export function parseBonusDays(input: string, daysInMonth: number): number[] {
  return Array.from(
    new Set(
      input
        .split(",")
        .map((value) => Number(value.trim()))
        .filter(
          (value) => Number.isInteger(value) && value >= 1 && value <= daysInMonth,
        ),
    ),
  );
}

export function buildMonth(
  year: number,
  month: number,
  bonusDays: readonly number[],
): MonthData {
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const firstDayOfWeek = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const leadingEmptyCells = (firstDayOfWeek + 6) % 7;
  const bonusDaySet = new Set(bonusDays);
  let total = 0;

  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const isBonus = bonusDaySet.has(day);
    total += (isBonus ? BONUS_UNIT : REGULAR_UNIT) * MULTIPLIER;

    return {
      day,
      total,
      isBonus,
      weekday: (leadingEmptyCells + index) % 7,
    };
  });

  return { leadingEmptyCells, days };
}
