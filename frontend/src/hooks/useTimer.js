import { useEffect, useRef, useState } from "react";

/** A precise, drift-free elapsed-time timer that pauses/resumes. */
export function useTimer(isRunning, startTime, totalPausedTime) {
  const [elapsedSec, setElapsedSec] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isRunning || !startTime) return;

    function tick() {
      const now = Date.now();
      const elapsed = (now - startTime - totalPausedTime) / 1000;
      setElapsedSec(elapsed > 0 ? elapsed : 0);
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isRunning, startTime, totalPausedTime]);

  return elapsedSec;
}
