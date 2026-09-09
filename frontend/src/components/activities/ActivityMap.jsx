import { useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { useChartPalette } from "../../utils/chartTheme";
import { useSettingsStore } from "../../store/settingsStore";

function FitRouteBounds({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 1) {
      map.fitBounds(L.latLngBounds(positions), { padding: [32, 32] });
    }
  }, [positions, map]);
  return null;
}

export default function ActivityMap({ gpsPoints }) {
  const c = useChartPalette();
  const theme = useSettingsStore((s) => s.theme);

  const startIcon = L.divIcon({
    className: "",
    html: `<div style="width:12px;height:12px;border-radius:50%;background:${c.accent};border:2px solid white"></div>`,
    iconSize: [12, 12],
  });
  const endIcon = L.divIcon({
    className: "",
    html: `<div style="width:12px;height:12px;border-radius:50%;background:${c.ink};border:2px solid white"></div>`,
    iconSize: [12, 12],
  });

  if (!gpsPoints || gpsPoints.length < 2) {
    return (
      <div className="h-64 rounded-2xl border border-border flex items-center justify-center text-sm text-muted">
        No route data recorded for this activity
      </div>
    );
  }

  const positions = gpsPoints.map((p) => [p.lat, p.lng]);
  const center = positions[Math.floor(positions.length / 2)];

  return (
    <div
      className={`h-64 md:h-96 rounded-2xl overflow-hidden border border-border ${
        theme === "dark" ? "[&_.leaflet-tile-pane]:brightness-[0.8] [&_.leaflet-tile-pane]:invert [&_.leaflet-tile-pane]:hue-rotate-180" : ""
      }`}
    >
      <MapContainer center={center} zoom={16} scrollWheelZoom={false} zoomControl={false} style={{ width: "100%", height: "100%" }}>
        <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={positions} pathOptions={{ color: c.accent, weight: 5 }} />
        <Marker position={positions[0]} icon={startIcon} />
        <Marker position={positions[positions.length - 1]} icon={endIcon} />
        <FitRouteBounds positions={positions} />
      </MapContainer>
    </div>
  );
}
