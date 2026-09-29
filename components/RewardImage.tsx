import Image from "next/image";
import type { Reward } from "@/lib/rewards";

type RewardImageProps = {
  reward: Reward;
};

export function RewardImage({ reward }: RewardImageProps) {
  return (
    <>
      <Image
        className="z-10 object-contain"
        src={reward.imageDataUrl}
        alt=""
        fill
        sizes="8rem"
        unoptimized
      />
      <span className="reward-currency-shadow absolute right-1 top-0 z-40 text-lg font-extrabold leading-tight text-reward-currency">
        {reward.requiredCurrency}
      </span>
    </>
  );
}
