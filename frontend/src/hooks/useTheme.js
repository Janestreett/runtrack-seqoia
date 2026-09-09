import { useEffect } from "react";
import { useSettingsStore } from "../store/settingsStore";

/**
 * Applies the current theme (light/dark) to the document root so that
 * Tailwind's `dark:` variant and the CSS custom properties in index.css
 * take effect app-wide. Mount this once, high in the tree (AppLayout).
 */
export function useTheme() {
  const theme = useSettingsStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return theme;
}
