import { useMemo, useState } from "react";
import { Check, Palette } from "lucide-react";
import clsx from "clsx";
import SectionCard from "../SectionCard";
import {
  applyCustomTheme,
  applyThemePreset,
  getStoredThemeState,
  themePresets
} from "../../theme/themeManager";

const ThemeConfigurationPage = () => {
  const currentTheme = useMemo(() => getStoredThemeState(), []);
  const [activePresetId, setActivePresetId] = useState(currentTheme.kind === "preset" ? currentTheme.presetId : "");
  const [customColor, setCustomColor] = useState(currentTheme.color);

  const currentThemeLabel = useMemo(() => {
    const preset = themePresets.find((item) => item.id === activePresetId);
    return preset ? preset.name : "Custom";
  }, [activePresetId]);

  return (
    <SectionCard title="Theme Configuration">
      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-white p-4">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-brand-600" />
            <p className="text-sm font-semibold text-slate-800">Color Palette</p>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Choose an accent color to update the full dashboard theme instantly.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {themePresets.map((preset) => {
              const isActive = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    applyThemePreset(preset.id);
                    setActivePresetId(preset.id);
                    setCustomColor(preset.color);
                  }}
                  className={clsx(
                    "relative rounded-xl border p-3 text-left transition",
                    isActive
                      ? "border-brand-300 bg-brand-50 shadow-soft"
                      : "border-border bg-white hover:border-brand-200"
                  )}
                >
                  <span
                    className="mb-2 block h-8 w-full rounded-lg border border-white/70 shadow-sm"
                    style={{ backgroundColor: preset.color }}
                  />
                  <span className="block text-sm font-semibold text-slate-700">{preset.name}</span>
                  {isActive && (
                    <span className="absolute right-2 top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-4">
          <p className="text-sm font-semibold text-slate-800">Custom Color</p>
          <p className="mt-1 text-sm text-slate-500">
            Pick any custom accent color and apply it to the dashboard.
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <input
              type="color"
              value={customColor}
              onChange={(event) => setCustomColor(event.target.value)}
              className="h-11 w-14 cursor-pointer rounded-lg border border-border bg-white p-1"
              aria-label="Pick custom color"
            />
            <code className="rounded-lg border border-border bg-page px-3 py-2 text-sm font-semibold text-slate-600">
              {customColor.toUpperCase()}
            </code>
            <button
              type="button"
              onClick={() => {
                applyCustomTheme(customColor);
                setActivePresetId("");
              }}
              className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Apply Custom Color
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-page p-4">
          <p className="text-sm text-slate-600">
            Active theme: <span className="font-bold text-slate-800">{currentThemeLabel}</span>
          </p>
        </div>
      </div>
    </SectionCard>
  );
};

export default ThemeConfigurationPage;
