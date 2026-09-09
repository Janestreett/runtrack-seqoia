import { api } from "./api";

export const statisticsService = {
  getStatistics: (range) => api.get("/statistics", { params: { range } }).then((r) => r.data),
};
