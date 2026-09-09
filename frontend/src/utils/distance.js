const EARTH_RADIUS_KM = 6371;
const MAX_REALISTIC_SPEED_KMH = 40; // filters GPS jumps (car-speed teleports etc.)
const MIN_MOVEMENT_METERS = 2; // filters GPS jitter while standing still

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

/** Haversine distance between two {lat, lng} points, in kilometers. */
export function calculateDistance(pointA, pointB) {
  const dLat = toRad(pointB.lat - pointA.lat);
  const dLng = toRad(pointB.lng - pointA.lng);
  const lat1 = toRad(pointA.lat);
  const lat2 = toRad(pointB.lat);

  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}

/**
 * Sums distance across a GPS track, filtering:
 * - duplicate/near-duplicate coordinates (GPS jitter while stationary)
 * - unrealistic jumps (speed spikes from bad GPS fixes)
 */
export function calculateTotalDistance(points) {
  if (!points || points.length < 2) return 0;

  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];

    const segmentKm = calculateDistance(prev, curr);
    const segmentMeters = segmentKm * 1000;

    if (segmentMeters < MIN_MOVEMENT_METERS) continue;

    const dtSec = (new Date(curr.timestamp) - new Date(prev.timestamp)) / 1000;
    if (dtSec > 0) {
      const speedKmh = segmentKm / (dtSec / 3600);
      if (speedKmh > MAX_REALISTIC_SPEED_KMH) continue; // reject noisy jump
    }

    total += segmentKm;
  }

  return total;
}

/**
 * Initial bearing (compass heading, 0-360°) from pointA to pointB.
 * Used to orient the "current position" marker in the direction of travel.
 */
export function calculateBearing(pointA, pointB) {
  const lat1 = toRad(pointA.lat);
  const lat2 = toRad(pointB.lat);
  const dLng = toRad(pointB.lng - pointA.lng);

  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

  const bearingDeg = (toDeg(Math.atan2(y, x)) + 360) % 360;
  return bearingDeg;
}

function toDeg(rad) {
  return (rad * 180) / Math.PI;
}
