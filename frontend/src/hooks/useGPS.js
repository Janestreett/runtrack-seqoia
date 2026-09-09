import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Wraps the real browser Geolocation API. No simulated coordinates.
 */
export function useGPS() {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [error, setError] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const watchIdRef = useRef(null);

  const start = useCallback((onPoint) => {
    if (!("geolocation" in navigator)) {
      setError("GPS_UNAVAILABLE");
      return;
    }

    setError(null);
    setIsTracking(true);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const point = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          altitude: pos.coords.altitude ?? null,
          accuracy: pos.coords.accuracy ?? null,
          timestamp: new Date(pos.timestamp).toISOString(),
        };
        setCurrentPosition({ lat: point.lat, lng: point.lng });
        setAccuracy(point.accuracy);
        onPoint?.(point);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) setError("GPS_DENIED");
        else if (err.code === err.POSITION_UNAVAILABLE) setError("GPS_UNAVAILABLE");
        else setError("GPS_WEAK");
      },
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 15000 }
    );
  }, []);

  const stop = useCallback(() => {
    if (watchIdRef.current != null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
  }, []);

  useEffect(() => () => stop(), [stop]);

  return { currentPosition, accuracy, error, isTracking, start, stop };
}
