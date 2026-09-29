import { describe, expect, it } from "vitest";
import { buildMonth } from "./calendar";
import { placeRewards, type Reward } from "./rewards";

function reward(id: string, requiredCurrency: number): Reward {
  return { id, requiredCurrency, imageDataUrl: "data:image/png;base64,image" };
}

describe("placeRewards", () => {
  it("places a reward on the first day whose total reaches its requirement", () => {
    const month = buildMonth(2026, 10, [3]);

    expect(placeRewards(month.days, [reward("exact", 480), reward("next", 500)]))
      .toMatchObject([
        { reward: { id: "exact" }, day: 2 },
        { reward: { id: "next" }, day: 3 },
      ]);
  });

  it("places only the smallest unearned reward after a non-Sunday final day", () => {
    const month = buildMonth(2026, 10, []);

    expect(
      placeRewards(month.days, [reward("large", 10_000), reward("small", 9_000)]),
    ).toMatchObject([{ reward: { id: "small" }, day: null }]);
  });

  it("does not place an unearned reward after a Sunday final day", () => {
    const month = buildMonth(2026, 5, []);

    expect(placeRewards(month.days, [reward("future", 100_000)])).toEqual([]);
  });
});
