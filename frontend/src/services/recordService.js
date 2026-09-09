import { api } from "./api";

export const recordService = {
  getRecords: () => api.get("/records").then((r) => r.data.records),
};
