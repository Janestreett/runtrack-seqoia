import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { LocateFixed } from "lucide-react";
import { useSettingsStore } from "../../store/settingsStore";
import { useChartPalette } from "../../utils/chartTheme";
import { calculateDistance, calculateBearing } from "../../utils/distance";

// Minimum movement (meters) between two points before we trust the bearing
// between them — filters GPS jitter that would otherwise make the arrow spin.
const MIN_HEADING_DISTANCE_M = 3;

function icons(c, heading) {
  const hasHeading = heading != null;

  return {
    start: L.divIcon({
      className: "",
      html: `<div style="width:14px;height:14px;border-radius:50%;background:${c.accent};border:3px solid white;box-shadow:0 0 0 1px ${c.accent}"></div>`,
      iconSize: [14, 14],
    }),
    current: hasHeading
      ? L.divIcon({
          className: "",
          html: `<div style="width:28px;height:28px;transform:rotate(${heading}deg);transform-origin:50% 50%;display:flex;align-items:center;justify-content:center;">
              <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L19.5 21L12 16.8L4.5 21L12 2Z" fill="${c.ink}" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
            </div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        })
      : L.divIcon({
          className: "",
          html: `<div style="width:16px;height:16px;border-radius:50%;background:${c.ink};border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3)"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        }),
  };
}

/**
 * Direction of travel, derived from the most recent GPS points.
 * Looks back through the track until it finds a segment long enough to give
 * a stable bearing (short segments are dominated by GPS noise, not motion).
 * Rounded to the nearest 5° so the marker doesn't jitter on tiny fluctuations.
 */
function useHeading(gpsPoints) {
  return useMemo(() => {
    const points = gpsPoints || [];
    if (points.length < 2) return null;

    const last = points[points.length - 1];
    for (let i = points.length - 2; i >= 0; i--) {
      const ref = points[i];
      const meters = calculateDistance(ref, last) * 1000;
      if (meters >= MIN_HEADING_DISTANCE_M) {
        const bearing = calculateBearing(ref, last);
        return Math.round(bearing / 5) * 5;
      }
    }
    return null;
  }, [gpsPoints]);
}

function FollowController({ position, isFollowing, onUserDrag }) {
  const map = useMap();

  // Keep the runner centered while follow mode is active
  useEffect(() => {
    if (isFollowing && position) {
      map.panTo([position.lat, position.lng], { animate: true });
    }
  }, [position, isFollowing, map]);

  // A manual drag means the runner wants to look around — drop out of follow
  // mode instead of fighting them by snapping back on the next GPS point.
  useMapEvents({
    dragstart: () => onUserDrag(),
  });

  return null;
}

export default function GPSMap({ gpsPoints, currentPosition }) {
  const theme = useSettingsStore((s) => s.theme);
  const c = useChartPalette();
  const heading = useHeading(gpsPoints);
  const { start: startIcon, current: currentIcon } = useMemo(
    () => icons(c, heading),
    [c, heading]
  );

  const initialCenter = useMemo(() => {
    if (currentPosition) return [currentPosition.lat, currentPosition.lng];
    if (gpsPoints?.length) return [gpsPoints[0].lat, gpsPoints[0].lng];
    return [-6.2, 106.8];
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const polylinePositions = useMemo(
    () => (gpsPoints || []).map((p) => [p.lat, p.lng]),
    [gpsPoints]
  );

  const mapRef = useRef(null);
  const [isFollowing, setIsFollowing] = useState(true);
  const handleUserDrag = useCallback(() => setIsFollowing(false), []);
  const handleRecenter = useCallback(() => setIsFollowing(true), []);

  return (
    <div
      className={`relative w-full h-full rounded-2xl overflow-hidden border border-border ${
        theme === "dark" ? "[&_.leaflet-tile-pane]:brightness-[0.8] [&_.leaflet-tile-pane]:invert [&_.leaflet-tile-pane]:hue-rotate-180" : ""
      }`}
    >
      <MapContainer
        center={initialCenter}
        zoom={17}
        scrollWheelZoom
        zoomControl={false}
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {polylinePositions.length > 1 && (
          <Polyline positions={polylinePositions} pathOptions={{ color: c.accent, weight: 5 }} />
        )}
        {polylinePositions.length > 0 && (
          <Marker position={polylinePositions[0]} icon={startIcon} />
        )}
        {currentPosition && <Marker position={[currentPosition.lat, currentPosition.lng]} icon={currentIcon} />}
        <FollowController
          position={currentPosition}
          isFollowing={isFollowing}
          onUserDrag={handleUserDrag}
        />
      </MapContainer>

      {!isFollowing && (
        <button
          type="button"
          onClick={handleRecenter}
          aria-label="Recenter map on your location"
          className="absolute bottom-4 right-4 z-[1000] w-11 h-11 rounded-full bg-surface border border-border shadow-lg flex items-center justify-center text-ink active:scale-95 transition-transform"
        >
          <LocateFixed size={20} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
