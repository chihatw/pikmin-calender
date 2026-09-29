export type ColorKey =
  | "canvas"
  | "reward"
  | "currencyRegular"
  | "currencyBonus";

export type ColorValue = {
  hex: string;
  opacity: number;
};

export type CalendarColors = Record<ColorKey, ColorValue>;

export const DEFAULT_CALENDAR_COLORS: CalendarColors = {
  canvas: { hex: "#fff2da", opacity: 100 },
  reward: { hex: "#e6b8f2", opacity: 100 },
  currencyRegular: { hex: "#087fc1", opacity: 100 },
  currencyBonus: { hex: "#f76c00", opacity: 100 },
};

export function toRgba({ hex, opacity }: ColorValue) {
  const red = Number.parseInt(hex.slice(1, 3), 16);
  const green = Number.parseInt(hex.slice(3, 5), 16);
  const blue = Number.parseInt(hex.slice(5, 7), 16);

  return `rgb(${red} ${green} ${blue} / ${opacity / 100})`;
}
