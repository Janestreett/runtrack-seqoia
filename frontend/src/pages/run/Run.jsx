import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRunTracker } from "../../hooks/useRunTracker";
import { useRunStore } from "../../store/runStore";
import GPSMap from "../../components/run/GPSMap";
import RunStats from "../../components/run/RunStats";
import RunControls from "../../components/run/RunControls";
import LocationStatus from "../../components/run/LocationStatus";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import { RUN_STATUS } from "../../config/constants";

export default function Run() {
  const navigate = useNavigate();
  const tracker = useRunTracker();
  const [confirmFinish, setConfirmFinish] = useState(false);

  const handleFinish = () => {
    tracker.finish();
    navigate("/run/summary");
  };

  if (tracker.status === RUN_STATUS.IDLE) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="text-2xl font-bold mb-2">Start a Run</p>
        <p className="text-sm text-muted mb-8 max-w-xs">
          RUNTRACK will request access to your device location to record distance and route.
        </p>
        <button
          onClick={tracker.start}
          className="w-full max-w-xs py-5 rounded-full bg-ink text-bg font-bold text-base tracking-wide"
        >
          START
        </button>
        {tracker.gpsError && (
          <div className="mt-6 max-w-xs">
            <LocationStatus error={tracker.gpsError} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row">
      <div className="flex-1 h-[45vh] md:h-screen">
        <GPSMap gpsPoints={tracker.gpsPoints} currentPosition={tracker.currentPosition} />
      </div>

      <div className="flex-1 md:max-w-md p-5 md:p-8 flex flex-col gap-6 justify-between">
        <div className="flex flex-col gap-6">
          <LocationStatus error={tracker.gpsError} accuracy={tracker.accuracy} />
          <RunStats
            distance={tracker.distance}
            duration={tracker.duration}
            pace={tracker.pace}
            speed={tracker.speed}
          />
        </div>

        <RunControls
          status={tracker.status}
          onStart={tracker.start}
          onPause={tracker.pause}
          onResume={tracker.resume}
          onFinish={() => setConfirmFinish(true)}
        />
      </div>

      <Modal open={confirmFinish} title="Finish this run?" onClose={() => setConfirmFinish(false)}>
        <p className="text-sm text-muted mb-6">
          Your run will be summarized and you can review it before saving.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={() => setConfirmFinish(false)}>Cancel</Button>
          <Button fullWidth onClick={handleFinish}>Finish Run</Button>
        </div>
      </Modal>
    </div>
  );
}
