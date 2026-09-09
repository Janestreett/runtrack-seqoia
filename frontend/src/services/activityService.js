import { api } from "./api";

export const activityService = {
  getActivities: (params) => api.get("/activities", { params }).then((r) => r.data.activities),
  getActivity: (id) => api.get(`/activities/${id}`).then((r) => r.data.activity),
  createActivity: (data) => api.post("/activities", data).then((r) => r.data.activity),
  updateActivity: (id, data) => api.put(`/activities/${id}`, data).then((r) => r.data.activity),
  deleteActivity: (id) => api.delete(`/activities/${id}`),
};
