import { DayCell } from '@/components/DayCell';
import {
  BONUS_UNIT,
  MULTIPLIER,
  REGULAR_UNIT,
  type MonthData,
} from '@/lib/calendar';

type CalendarViewProps = {
  year: number;
  month: number;
  currencyName: string;
  currencyUnit: string;
  calendar: MonthData;
};

const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;

function weekdayColor(index: number) {
  if (index === 5) return 'text-weekday-sat';
  if (index === 6) return 'text-weekday-sun';
  return 'text-content';
}

export function CalendarView({
  year,
  month,
  currencyName,
  currencyUnit,
  calendar,
}: CalendarViewProps) {
  const monthName = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)));

  const occupiedCellCount = calendar.leadingEmptyCells + calendar.days.length;
  const trailingEmptyCells = (7 - (occupiedCellCount % 7)) % 7;

  return (
    <section
      className='mx-auto max-w-4xl bg-canvas px-8 py-8'
      aria-label={`${monthName} ${year} currency calendar`}
    >
      <header className='text-center'>
        <h1 className='text-5xl font-extrabold tracking-tight text-content'>
          {monthName} {year}
        </h1>
        <p className='mt-3 text-3xl font-extrabold text-content'>
          {currencyName} — Baseline Estimate
        </p>
      </header>

      <div className='mx-auto mt-4 w-fit text-2xl font-extrabold leading-tight'>
        <p className='text-currency-regular'>
          Regular Day: {REGULAR_UNIT} x {MULTIPLIER} ={' '}
          {REGULAR_UNIT * MULTIPLIER} {currencyUnit}/day
        </p>
        <p className='mt-1 text-currency-bonus'>
          Bonus Day: {BONUS_UNIT} x {MULTIPLIER} = {BONUS_UNIT * MULTIPLIER}{' '}
          {currencyUnit}/day
        </p>
      </div>

      <div
        className='mt-6 border border-grid-line bg-grid-line'
        role='table'
        aria-label='Monthly cumulative totals'
      >
        <div className='grid grid-cols-7 gap-px' role='row'>
          {weekdays.map((weekday, index) => (
            <div
              key={weekday}
              className={`flex h-14 items-center justify-center bg-canvas text-2xl font-extrabold ${weekdayColor(index)}`}
              role='columnheader'
            >
              {weekday}
            </div>
          ))}
        </div>

        <div className='mt-px grid grid-cols-7 gap-px' role='rowgroup'>
          {Array.from({ length: calendar.leadingEmptyCells }, (_, index) => (
            <div
              key={`leading-${index}`}
              className='h-24 bg-canvas'
              aria-hidden='true'
            />
          ))}

          {calendar.days.map((date) => (
            <DayCell key={date.day} date={date} />
          ))}

          {Array.from({ length: trailingEmptyCells }, (_, index) => (
            <div
              key={`trailing-${index}`}
              className='h-24 bg-canvas'
              aria-hidden='true'
            />
          ))}
        </div>
      </div>
    </section>
  );
}
