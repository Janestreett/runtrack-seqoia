import { api } from "./api";

export const goalService = {
  getGoals: () => api.get("/goals").then((r) => r.data.goals),
  createGoal: (data) => api.post("/goals", data).then((r) => r.data.goal),
  updateGoal: (id, data) => api.put(`/goals/${id}`, data).then((r) => r.data.goal),
  deleteGoal: (id) => api.delete(`/goals/${id}`),
};
