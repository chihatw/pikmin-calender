import type { CalendarDay } from "@/lib/calendar";

type DayCellProps = {
  date: CalendarDay;
};

export function DayCell({ date }: DayCellProps) {
  const totalColor = date.isBonus ? "text-currency-bonus" : "text-currency-regular";

  return (
    <div
      className="relative flex h-24 items-center justify-center overflow-hidden bg-canvas"
      role="cell"
      aria-label={`Day ${date.day}: ${date.total}${date.isBonus ? ", bonus day" : ""}`}
    >
      <span className="date-badge absolute left-0 top-0 z-0" aria-hidden="true" />
      <span className="absolute left-2 top-0 z-10 text-2xl font-extrabold text-content">
        {date.day}
      </span>
      <span className={`z-10 mt-4 whitespace-nowrap text-4xl font-extrabold tabular-nums tracking-tight ${totalColor}`}>
        {date.total}
      </span>
    </div>
  );
}
