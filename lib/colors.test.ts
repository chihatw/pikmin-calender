import { describe, expect, it } from "vitest";
import { DEFAULT_CALENDAR_COLORS, toRgba } from "./colors";

describe("calendar colors", () => {
  it("uses the existing colors as opaque defaults", () => {
    expect(DEFAULT_CALENDAR_COLORS).toEqual({
      canvas: { hex: "#fff2da", opacity: 100 },
      reward: { hex: "#e6b8f2", opacity: 100 },
      currencyRegular: { hex: "#087fc1", opacity: 100 },
      currencyBonus: { hex: "#f76c00", opacity: 100 },
    });
  });

  it("converts a color and its opacity to CSS rgba syntax", () => {
    expect(toRgba({ hex: "#123456", opacity: 40 })).toBe(
      "rgb(18 52 86 / 0.4)",
    );
  });
});
