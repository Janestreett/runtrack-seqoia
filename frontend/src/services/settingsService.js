import { api } from "./api";

export const settingsService = {
  getSettings: () => api.get("/settings").then((r) => r.data.settings),
  updateSettings: (data) => api.put("/settings", data).then((r) => r.data.settings),
};
