import { useSettingsStore } from "../store/settingsStore";

const PALETTE = {
  light: { grid: "#E5E5E1", tick: "#6B6B6B", accent: "#1F5C56", surface: "#FFFFFF", border: "#E5E5E1", ink: "#111111" },
  dark: { grid: "#292A28", tick: "#999A96", accent: "#5E9E92", surface: "#171817", border: "#292A28", ink: "#F4F4F1" },
};

/** Returns theme-aware hex colors for Recharts/Leaflet, which can't consume Tailwind's `dark:` variant directly. */
export function useChartPalette() {
  const theme = useSettingsStore((s) => s.theme);
  return PALETTE[theme] || PALETTE.light;
}

export function chartTooltipStyle(c) {
  return { borderRadius: 12, border: `1px solid ${c.border}`, fontSize: 13, background: c.surface, color: c.ink };
}
