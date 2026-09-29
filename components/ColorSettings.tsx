import type {
  CalendarColors,
  ColorKey,
  ColorValue,
} from "@/lib/colors";

type ColorSettingsProps = {
  colors: CalendarColors;
  onColorChange: (key: ColorKey, value: ColorValue) => void;
};

const colorOptions: { key: ColorKey; label: string }[] = [
  { key: "canvas", label: "Canvas" },
  { key: "reward", label: "Reward（背景）" },
  { key: "currencyRegular", label: "Currency regular" },
  { key: "currencyBonus", label: "Currency bonus" },
];

export function ColorSettings({ colors, onColorChange }: ColorSettingsProps) {
  return (
    <fieldset className="col-span-4 mt-1 border-t border-zinc-200 pt-4">
      <legend className="px-1 text-sm font-semibold text-zinc-700">Colors</legend>

      <div className="mt-2 grid grid-cols-4 gap-4">
        {colorOptions.map(({ key, label }) => {
          const value = colors[key];
          const opacityId = `${key}-opacity`;

          return (
            <div
              key={key}
              className="rounded-md border border-zinc-200 bg-zinc-50 p-3"
            >
              <label className="block text-sm font-semibold text-zinc-700">
                {label}
                <input
                  className="mt-2 h-11 w-full cursor-pointer rounded-md border border-zinc-300 bg-white p-1 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  type="color"
                  value={value.hex}
                  onChange={(event) =>
                    onColorChange(key, { ...value, hex: event.target.value })
                  }
                />
              </label>

              <div className="mt-3 flex items-center justify-between text-xs text-zinc-600">
                <label htmlFor={opacityId}>透明度</label>
                <output htmlFor={opacityId}>{value.opacity}%</output>
              </div>
              <input
                id={opacityId}
                className="mt-1 block w-full accent-zinc-700"
                type="range"
                min="0"
                max="100"
                step="1"
                value={value.opacity}
                onChange={(event) =>
                  onColorChange(key, {
                    ...value,
                    opacity: Number(event.target.value),
                  })
                }
                aria-label={`${label}の透明度`}
              />
              <p className="mt-1 text-xs font-medium uppercase tabular-nums text-zinc-500">
                {value.hex}
              </p>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
