import { useCallback, useEffect, useState } from "react";
import { statisticsService } from "../services/statisticsService";

export function useStatistics(range) {
  const [summary, setSummary] = useState(null);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await statisticsService.getStatistics(range);
      setSummary(data.summary);
      setSeries(data.series);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { summary, series, loading, error, refresh };
}
