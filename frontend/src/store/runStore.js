import { create } from "zustand";
import { RUN_STATUS } from "../config/constants";

const initialState = {
  status: RUN_STATUS.IDLE,
  distance: 0, // km
  duration: 0, // sec
  pace: null, // sec/km
  speed: 0, // km/h
  gpsPoints: [],
  startTime: null,
  pausedAt: null,
  totalPausedTime: 0,
  currentPosition: null,
  accuracy: null,
  elevationGainM: 0,
};

export const useRunStore = create((set, get) => ({
  ...initialState,

  startRun: () =>
    set({
      ...initialState,
      status: RUN_STATUS.RUNNING,
      startTime: Date.now(),
    }),

  pauseRun: () => {
    if (get().status !== RUN_STATUS.RUNNING) return;
    set({ status: RUN_STATUS.PAUSED, pausedAt: Date.now() });
  },

  resumeRun: () => {
    if (get().status !== RUN_STATUS.PAUSED) return;
    const pausedFor = Date.now() - get().pausedAt;
    set((s) => ({
      status: RUN_STATUS.RUNNING,
      totalPausedTime: s.totalPausedTime + pausedFor,
      pausedAt: null,
    }));
  },

  finishRun: () => set({ status: RUN_STATUS.FINISHED }),

  resetRun: () => set(initialState),

  updateMetrics: (partial) => set(partial),

  addGPSPoint: (point) => {
    if (get().status !== RUN_STATUS.RUNNING) return; // ignore points while paused/idle
    set((s) => ({ gpsPoints: [...s.gpsPoints, point] }));
  },
}));
