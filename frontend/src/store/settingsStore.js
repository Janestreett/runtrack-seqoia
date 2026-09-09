import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSettingsStore = create(
  persist(
    (set) => ({
      distanceUnit: "km",
      paceUnit: "min_km",
      theme: "light",
      notifications: true,

      setSettings: (settings) => set(settings),
    }),
    { name: "runtrack-settings" }
  )
);
