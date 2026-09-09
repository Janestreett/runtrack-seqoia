import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import RecordCard from "../../components/records/RecordCard";
import EmptyState from "../../components/common/EmptyState";
import Skeleton from "../../components/common/Skeleton";
import { recordService } from "../../services/recordService";

export default function Records() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await recordService.getRecords();
      setRecords(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader title="Records" subtitle="Your fastest efforts and longest runs." />
      <div className="px-5 md:px-8 py-6 md:py-8 flex flex-col gap-5">
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28" />)}
          </div>
        ) : records.length === 0 ? (
          <EmptyState title="No records yet" description="Complete a run to start setting personal records." />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {records.map((r) => (
              <RecordCard key={r.id} record={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
