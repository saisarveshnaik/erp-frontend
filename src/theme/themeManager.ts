export type ThemePreset = {
  id: string;
  name: string;
  color: string;
};

type StoredTheme =
  | {
      kind: "preset";
      value: string;
    }
  | {
      kind: "custom";
      value: string;
    };

const THEME_STORAGE_KEY = "erp_theme_config";

export const themePresets: ThemePreset[] = [
  { id: "violet", name: "Violet", color: "#6f4db8" },
  { id: "blue", name: "Ocean Blue", color: "#2563eb" },
  { id: "emerald", name: "Emerald", color: "#059669" },
  { id: "amber", name: "Amber", color: "#d97706" },
  { id: "rose", name: "Rose", color: "#e11d48" },
  { id: "indigo", name: "Indigo", color: "#4f46e5" },
  { id: "teal", name: "Teal", color: "#0f766e" },
  { id: "slate", name: "Slate", color: "#475569" }
];

const clamp = (value: number) => Math.min(255, Math.max(0, Math.round(value)));

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const fullHex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  if (!/^[0-9a-fA-F]{6}$/.test(fullHex)) {
    return { r: 111, g: 77, b: 184 };
  }

  const parsed = Number.parseInt(fullHex, 16);
  return {
    r: (parsed >> 16) & 255,
    g: (parsed >> 8) & 255,
    b: parsed & 255
  };
};

const toRgbString = (rgb: { r: number; g: number; b: number }) => `${rgb.r} ${rgb.g} ${rgb.b}`;

const mixWithWhite = (rgb: { r: number; g: number; b: number }, amount: number) => ({
  r: clamp(rgb.r + (255 - rgb.r) * amount),
  g: clamp(rgb.g + (255 - rgb.g) * amount),
  b: clamp(rgb.b + (255 - rgb.b) * amount)
});

const mixWithBlack = (rgb: { r: number; g: number; b: number }, amount: number) => ({
  r: clamp(rgb.r * (1 - amount)),
  g: clamp(rgb.g * (1 - amount)),
  b: clamp(rgb.b * (1 - amount))
});

const applyThemeByColor = (baseColor: string) => {
  const root = document.documentElement;
  const base = hexToRgb(baseColor);

  const colors = {
    "--color-brand-50": toRgbString(mixWithWhite(base, 0.92)),
    "--color-brand-100": toRgbString(mixWithWhite(base, 0.84)),
    "--color-brand-200": toRgbString(mixWithWhite(base, 0.68)),
    "--color-brand-300": toRgbString(mixWithWhite(base, 0.5)),
    "--color-brand-400": toRgbString(mixWithWhite(base, 0.3)),
    "--color-brand-500": toRgbString(base),
    "--color-brand-600": toRgbString(mixWithBlack(base, 0.12)),
    "--color-brand-700": toRgbString(mixWithBlack(base, 0.25)),
    "--color-page": toRgbString(mixWithWhite(base, 0.94)),
    "--color-border": toRgbString(mixWithWhite(base, 0.86)),
    "--color-card": "255 255 255"
  };

  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};

const readStoredTheme = (): StoredTheme | null => {
  const raw = localStorage.getItem(THEME_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StoredTheme;
    if (
      (parsed.kind === "preset" && typeof parsed.value === "string") ||
      (parsed.kind === "custom" && typeof parsed.value === "string")
    ) {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
};

const storeTheme = (theme: StoredTheme) => {
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
};

export const getStoredThemeState = () => {
  const stored = readStoredTheme();
  if (!stored) {
    const fallback = themePresets[0];
    return { kind: "preset" as const, presetId: fallback.id, color: fallback.color };
  }

  if (stored.kind === "preset") {
    const preset = themePresets.find((item) => item.id === stored.value) ?? themePresets[0];
    return { kind: "preset" as const, presetId: preset.id, color: preset.color };
  }

  return { kind: "custom" as const, presetId: "custom", color: stored.value };
};

export const applyThemePreset = (presetId: string) => {
  const preset = themePresets.find((item) => item.id === presetId) ?? themePresets[0];
  applyThemeByColor(preset.color);
  storeTheme({ kind: "preset", value: preset.id });
};

export const applyCustomTheme = (color: string) => {
  applyThemeByColor(color);
  storeTheme({ kind: "custom", value: color });
};

export const initializeTheme = () => {
  const state = getStoredThemeState();
  applyThemeByColor(state.color);
};
