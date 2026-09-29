import { describe, expect, it } from "vitest";
import { buildMonth, parseBonusDays } from "./calendar";

describe("parseBonusDays", () => {
  it("ignores invalid and out-of-range values", () => {
    expect(parseBonusDays("abc,,99,-1,3", 31)).toEqual([3]);
  });

  it("trims values and removes duplicates", () => {
    expect(parseBonusDays(" 3, 4,3, 4 ", 31)).toEqual([3, 4]);
  });
});

describe("buildMonth", () => {
  it("builds October 2026 from Monday with the expected final total", () => {
    const bonusDays = parseBonusDays("3,4,10,11,17,18,24,25,28,29,30,31", 31);
    const month = buildMonth(2026, 10, bonusDays);

    expect(month.leadingEmptyCells).toBe(3);
    expect(month.days[0]).toMatchObject({ day: 1, total: 240, weekday: 3 });
    expect(month.days[2]).toMatchObject({ day: 3, total: 1080, isBonus: true });
    expect(month.days[30]).toMatchObject({ day: 31, total: 11760, isBonus: true });
  });

  it("reaches 18600 when all 31 days are bonus days", () => {
    const allDays = Array.from({ length: 31 }, (_, index) => index + 1);
    const month = buildMonth(2026, 10, allDays);

    expect(month.days[30].total).toBe(18600);
  });
});
