"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarView } from "@/components/CalendarView";
import { SettingsForm } from "@/components/SettingsForm";
import { buildMonth, parseBonusDays } from "@/lib/calendar";
import type { Reward } from "@/lib/rewards";

const DEFAULT_CURRENCY_NAME = "Stained Glass Cookies";
const DEFAULT_CURRENCY_UNIT = "cookies";
const DEFAULT_BONUS_DAYS = "3,4,10,11,17,18,24,25,28,29,30,31";
const REWARDS_STORAGE_KEY = "pikmin-calendar-rewards-v1";

function isReward(value: unknown): value is Reward {
  if (!value || typeof value !== "object") return false;
  const reward = value as Partial<Reward>;
  return (
    typeof reward.id === "string" &&
    typeof reward.requiredCurrency === "number" &&
    Number.isFinite(reward.requiredCurrency) &&
    typeof reward.imageDataUrl === "string" &&
    reward.imageDataUrl.startsWith("data:image/png")
  );
}

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
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [hasLoadedRewards, setHasLoadedRewards] = useState(false);

  useEffect(() => {
    try {
      const storedRewards = sessionStorage.getItem(REWARDS_STORAGE_KEY);
      if (storedRewards) {
        const parsedRewards: unknown = JSON.parse(storedRewards);
        if (Array.isArray(parsedRewards)) {
          setRewards(parsedRewards.filter(isReward));
        }
      }
    } catch {
      // Start clean when stored data is invalid or storage access is blocked.
    } finally {
      setHasLoadedRewards(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedRewards) return;

    try {
      sessionStorage.setItem(REWARDS_STORAGE_KEY, JSON.stringify(rewards));
    } catch {
      // Keep the in-memory rewards usable if browser storage is unavailable or full.
    }
  }, [hasLoadedRewards, rewards]);

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
        rewards={rewards}
        onRewardsChange={setRewards}
      />

      <CalendarView
        year={year}
        month={month}
        currencyName={currencyName}
        currencyUnit={currencyUnit}
        calendar={calendar}
        rewards={rewards}
      />
    </main>
  );
}
