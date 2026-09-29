"use client";

import { useMemo, useState } from "react";
import { CalendarView } from "@/components/CalendarView";
import { SettingsForm } from "@/components/SettingsForm";
import { buildMonth, parseBonusDays } from "@/lib/calendar";

const DEFAULT_CURRENCY_NAME = "Stained Glass Cookies";
const DEFAULT_CURRENCY_UNIT = "cookies";
const DEFAULT_BONUS_DAYS = "3,4,10,11,17,18,24,25,28,29,30,31";

function getCurrentMonthValue() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export default function Home() {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthValue);
  const [currencyName, setCurrencyName] = useState(DEFAULT_CURRENCY_NAME);
  const [currencyUnit, setCurrencyUnit] = useState(DEFAULT_CURRENCY_UNIT);
  const [bonusInput, setBonusInput] = useState(DEFAULT_BONUS_DAYS);

  const [year, month] = selectedMonth.split("-").map(Number);

  const calendar = useMemo(() => {
    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
    const bonusDays = parseBonusDays(bonusInput, daysInMonth);
    return buildMonth(year, month, bonusDays);
  }, [bonusInput, month, year]);

  return (
    <main className="py-6">
      <SettingsForm
        selectedMonth={selectedMonth}
        currencyName={currencyName}
        currencyUnit={currencyUnit}
        bonusInput={bonusInput}
        onMonthChange={setSelectedMonth}
        onCurrencyNameChange={setCurrencyName}
        onCurrencyUnitChange={setCurrencyUnit}
        onBonusInputChange={setBonusInput}
      />

      <CalendarView
        year={year}
        month={month}
        currencyName={currencyName}
        currencyUnit={currencyUnit}
        calendar={calendar}
      />
    </main>
  );
}
