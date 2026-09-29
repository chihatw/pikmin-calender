import { RewardSettings } from "@/components/RewardSettings";
import type { Reward } from "@/lib/rewards";

type SettingsFormProps = {
  selectedMonth: string;
  currencyName: string;
  currencyUnit: string;
  bonusInput: string;
  onMonthChange: (value: string) => void;
  onCurrencyNameChange: (value: string) => void;
  onCurrencyUnitChange: (value: string) => void;
  onBonusInputChange: (value: string) => void;
  rewards: Reward[];
  onRewardsChange: (rewards: Reward[]) => void;
};

const inputClasses =
  "mt-2 h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-lg text-zinc-900 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200";

export function SettingsForm({
  selectedMonth,
  currencyName,
  currencyUnit,
  bonusInput,
  onMonthChange,
  onCurrencyNameChange,
  onCurrencyUnitChange,
  onBonusInputChange,
  rewards,
  onRewardsChange,
}: SettingsFormProps) {
  return (
    <form
      className="mx-auto mb-6 grid max-w-4xl grid-cols-4 gap-4 rounded-lg bg-white p-4 shadow-sm"
      aria-label="Calendar settings"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="text-sm font-semibold text-zinc-700">
        Month
        <input
          className={inputClasses}
          type="month"
          value={selectedMonth}
          onChange={(event) => {
            if (event.target.value) onMonthChange(event.target.value);
          }}
          required
        />
      </label>

      <label className="text-sm font-semibold text-zinc-700">
        Currency name
        <input
          className={inputClasses}
          type="text"
          value={currencyName}
          onChange={(event) => onCurrencyNameChange(event.target.value)}
        />
      </label>

      <label className="text-sm font-semibold text-zinc-700">
        Currency unit
        <input
          className={inputClasses}
          type="text"
          value={currencyUnit}
          onChange={(event) => onCurrencyUnitChange(event.target.value)}
        />
      </label>

      <label className="text-sm font-semibold text-zinc-700">
        Bonus Day
        <input
          className={inputClasses}
          type="text"
          inputMode="numeric"
          value={bonusInput}
          onChange={(event) => onBonusInputChange(event.target.value)}
          aria-describedby="bonus-day-help"
        />
        <span id="bonus-day-help" className="mt-1 block text-xs font-normal text-zinc-500">
          Enter comma-separated dates
        </span>
      </label>

      <RewardSettings rewards={rewards} onRewardsChange={onRewardsChange} />
    </form>
  );
}
