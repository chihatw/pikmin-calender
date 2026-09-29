"use client";

import Image from "next/image";
import { useRef, useState, type ChangeEvent } from "react";
import type { Reward } from "@/lib/rewards";

type RewardSettingsProps = {
  rewards: Reward[];
  onRewardsChange: (rewards: Reward[]) => void;
};

const fieldClasses =
  "h-11 rounded-md border border-zinc-300 bg-white px-3 text-base text-zinc-900 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200";

function makeRewardId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

export function RewardSettings({
  rewards,
  onRewardsChange,
}: RewardSettingsProps) {
  const [requiredCurrency, setRequiredCurrency] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setError("");

    if (!file) {
      setImageDataUrl("");
      return;
    }

    if (file.type !== "image/png") {
      setImageDataUrl("");
      setError("PNG imageを選択してください。");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") setImageDataUrl(reader.result);
    });
    reader.addEventListener("error", () => {
      setImageDataUrl("");
      setError("画像を読み込めませんでした。");
    });
    reader.readAsDataURL(file);
  }

  function handleAddReward() {
    const parsedCurrency = Number(requiredCurrency);

    if (!Number.isFinite(parsedCurrency) || parsedCurrency < 0) {
      setError("必要通貨には0以上の数値を入力してください。");
      return;
    }

    if (!imageDataUrl) {
      setError("PNG imageを選択してください。");
      return;
    }

    onRewardsChange([
      ...rewards,
      {
        id: makeRewardId(),
        requiredCurrency: parsedCurrency,
        imageDataUrl,
      },
    ]);
    setRequiredCurrency("");
    setImageDataUrl("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <fieldset className="col-span-4 mt-1 border-t border-zinc-200 pt-4">
      <legend className="px-1 text-sm font-semibold text-zinc-700">Rewards</legend>

      <div className="mt-2 flex items-end gap-3">
        <label className="flex flex-1 flex-col gap-2 text-sm font-semibold text-zinc-700">
          必要通貨
          <input
            className={fieldClasses}
            type="number"
            min="0"
            step="any"
            value={requiredCurrency}
            onChange={(event) => setRequiredCurrency(event.target.value)}
            required
          />
        </label>

        <label className="flex flex-[2] flex-col gap-2 text-sm font-semibold text-zinc-700">
          画像（透過PNG）
          <input
            ref={fileInputRef}
            className={`${fieldClasses} py-2 file:mr-3 file:rounded file:border-0 file:bg-zinc-100 file:px-3 file:py-1 file:font-semibold`}
            type="file"
            accept="image/png,.png"
            onChange={handleImageChange}
            required
          />
        </label>

        <button
          className="h-11 rounded-md bg-zinc-800 px-5 font-semibold text-white transition hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={handleAddReward}
          disabled={!requiredCurrency || !imageDataUrl}
        >
          追加
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm font-semibold text-red-600" role="alert">
          {error}
        </p>
      )}

      {rewards.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3" aria-label="登録済みrewards">
          {rewards.map((reward) => (
            <li
              key={reward.id}
              className="flex items-center gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-2"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded bg-reward">
                <Image
                  src={reward.imageDataUrl}
                  alt=""
                  fill
                  sizes="3.5rem"
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span className="min-w-0 flex-1 font-bold tabular-nums text-zinc-800">
                {reward.requiredCurrency}
              </span>
              <button
                className="rounded px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
                type="button"
                onClick={() =>
                  onRewardsChange(rewards.filter((item) => item.id !== reward.id))
                }
                aria-label={`必要通貨 ${reward.requiredCurrency} のrewardを削除`}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </fieldset>
  );
}
