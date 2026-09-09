import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import { settingsService } from "../../services/settingsService";
import { useSettingsStore } from "../../store/settingsStore";
import { useToast } from "../../components/common/ToastProvider";
import Skeleton from "../../components/common/Skeleton";

export default function Settings() {
  const { showToast } = useToast();
  const setStoreSettings = useSettingsStore((s) => s.setSettings);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await settingsService.getSettings();
      setSettings(data);
      setStoreSettings(data);
      setLoading(false);
    })();
  }, [setStoreSettings]);

  const update = async (partial) => {
    const next = { ...settings, ...partial };
    setSettings(next);
    const saved = await settingsService.updateSettings(partial);
    setStoreSettings(saved);
    showToast("Settings saved");
  };

  if (loading || !settings) {
    return (
      <div className="max-w-2xl mx-auto px-5 md:px-8 py-8 flex flex-col gap-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Settings" />
      <div className="px-5 md:px-8 py-6 md:py-8 flex flex-col gap-6">
        <Row label="Distance unit">
          <SegmentedControl
            value={settings.distanceUnit}
            options={[{ label: "Kilometers", value: "km" }, { label: "Miles", value: "mi" }]}
            onChange={(v) => update({ distanceUnit: v })}
          />
        </Row>

        <Row label="Pace unit">
          <SegmentedControl
            value={settings.paceUnit}
            options={[{ label: "min/km", value: "min_km" }, { label: "min/mile", value: "min_mi" }]}
            onChange={(v) => update({ paceUnit: v })}
          />
        </Row>

        <Row label="Appearance">
          <SegmentedControl
            value={settings.theme}
            options={[{ label: "Light", value: "light" }, { label: "Dark", value: "dark" }]}
            onChange={(v) => update({ theme: v })}
          />
        </Row>

        <Row label="Notifications">
          <button
            onClick={() => update({ notifications: !settings.notifications })}
            className={`w-12 h-7 rounded-full transition-colors relative ${settings.notifications ? "bg-ink" : "bg-border"}`}
            aria-pressed={settings.notifications}
          >
            <span
              className={`absolute top-0.5 w-6 h-6 rounded-full bg-surface transition-transform ${
                settings.notifications ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </Row>
      </div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex items-center justify-between border border-border rounded-2xl px-5 py-4 bg-surface">
      <p className="text-sm font-medium">{label}</p>
      {children}
    </div>
  );
}

function SegmentedControl({ value, options, onChange }) {
  return (
    <div className="flex bg-bg rounded-full p-0.5 border border-border">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
            value === o.value ? "bg-ink text-bg" : "text-muted"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
