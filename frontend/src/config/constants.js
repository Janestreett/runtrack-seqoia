export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const RUN_STATUS = {
  IDLE: "IDLE",
  RUNNING: "RUNNING",
  PAUSED: "PAUSED",
  FINISHED: "FINISHED",
};

export const ACTIVITY_TYPES = ["run", "walk"];

export const DATE_RANGES = [
  { label: "7D", value: "7d" },
  { label: "30D", value: "30d" },
  { label: "3M", value: "3m" },
  { label: "6M", value: "6m" },
  { label: "1Y", value: "1y" },
  { label: "ALL", value: "all" },
];

export const GOAL_TYPES = [
  { label: "Distance", value: "distance", unit: "KM" },
  { label: "Frequency", value: "frequency", unit: "runs" },
  { label: "Time", value: "time", unit: "min" },
  { label: "Pace", value: "pace", unit: "sec/km" },
];
