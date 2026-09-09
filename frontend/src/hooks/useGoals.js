import { useCallback, useEffect, useState } from "react";
import { goalService } from "../services/goalService";

export function useGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await goalService.getGoals();
      setGoals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createGoal = useCallback(
    async (data) => {
      await goalService.createGoal(data);
      await refresh();
    },
    [refresh]
  );

  const deleteGoal = useCallback(
    async (id) => {
      await goalService.deleteGoal(id);
      await refresh();
    },
    [refresh]
  );

  return { goals, loading, error, refresh, createGoal, deleteGoal };
}
