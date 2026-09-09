import { useCallback, useEffect, useMemo } from "react";
import { useRunStore } from "../store/runStore";
import { useGPS } from "./useGPS";
import { useTimer } from "./useTimer";
import { RUN_STATUS } from "../config/constants";
import { calculateTotalDistance } from "../utils/distance";
import { calculatePace } from "../utils/pace";
import { calculateSpeed } from "../utils/speed";
import { calculateElevationGain } from "../utils/elevation";
import { saveActiveRun, clearActiveRun } from "../utils/offlineStorage";

export function useRunTracker() {
  const store = useRunStore();
  const gps = useGPS();
  const elapsedSec = useTimer(store.status === RUN_STATUS.RUNNING, store.startTime, store.totalPausedTime);

  const onGpsPoint = useCallback(
    (point) => {
      useRunStore.getState().addGPSPoint(point);
    },
    []
  );

  const start = useCallback(() => {
    store.startRun();
    gps.start(onGpsPoint);
  }, [store, gps, onGpsPoint]);

  const pause = useCallback(() => {
    store.pauseRun();
  }, [store]);

  const resume = useCallback(() => {
    store.resumeRun();
  }, [store]);

  const finish = useCallback(() => {
    gps.stop();
    store.finishRun();
    clearActiveRun();
  }, [gps, store]);

  const reset = useCallback(() => {
    gps.stop();
    store.resetRun();
    clearActiveRun();
  }, [gps, store]);

  // Recompute live metrics whenever GPS points or elapsed time change
  useEffect(() => {
    const distanceKm = calculateTotalDistance(store.gpsPoints);
    const pace = calculatePace(distanceKm, elapsedSec);
    const speed = calculateSpeed(distanceKm, elapsedSec);
    const elevationGainM = calculateElevationGain(store.gpsPoints) ?? 0;

    useRunStore.getState().updateMetrics({
      distance: distanceKm,
      duration: elapsedSec,
      pace,
      speed,
      elevationGainM,
      currentPosition: gps.currentPosition,
      accuracy: gps.accuracy,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.gpsPoints.length, elapsedSec, gps.currentPosition]);

  // Persist active run state for crash/offline recovery
  useEffect(() => {
    if (store.status === RUN_STATUS.RUNNING || store.status === RUN_STATUS.PAUSED) {
      saveActiveRun({
        status: store.status,
        gpsPoints: store.gpsPoints,
        startTime: store.startTime,
        totalPausedTime: store.totalPausedTime,
      });
    }
  }, [store.status, store.gpsPoints, store.startTime, store.totalPausedTime]);

  const canStart = store.status === RUN_STATUS.IDLE;
  const canPause = store.status === RUN_STATUS.RUNNING;
  const canResume = store.status === RUN_STATUS.PAUSED;
  const canFinish = store.status === RUN_STATUS.RUNNING || store.status === RUN_STATUS.PAUSED;

  return useMemo(
    () => ({
      status: store.status,
      distance: store.distance,
      duration: store.duration,
      pace: store.pace,
      speed: store.speed,
      elevationGainM: store.elevationGainM,
      gpsPoints: store.gpsPoints,
      currentPosition: store.currentPosition,
      accuracy: store.accuracy,
      gpsError: gps.error,
      canStart,
      canPause,
      canResume,
      canFinish,
      start,
      pause,
      resume,
      finish,
      reset,
    }),
    [store, gps.error, canStart, canPause, canResume, canFinish, start, pause, resume, finish, reset]
  );
}
