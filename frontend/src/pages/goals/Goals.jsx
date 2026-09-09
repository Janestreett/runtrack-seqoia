import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import GoalCard from "../../components/goals/GoalCard";
import GoalForm from "../../components/goals/GoalForm";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import Skeleton from "../../components/common/Skeleton";
import { useGoals } from "../../hooks/useGoals";
import { useToast } from "../../components/common/ToastProvider";

export default function Goals() {
  const { goals, loading, createGoal, deleteGoal } = useGoals();
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();

  const handleCreate = async (data) => {
    await createGoal(data);
    setOpen(false);
    showToast("Goal created");
  };

  const handleDelete = async (id) => {
    await deleteGoal(id);
    showToast("Goal deleted");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Goals"
        action={<Button size="sm" onClick={() => setOpen(true)}>New Goal</Button>}
      />
      <div className="px-5 md:px-8 py-6 md:py-8 flex flex-col gap-5">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[1, 2].map((i) => <Skeleton key={i} className="h-32" />)}
          </div>
        ) : goals.length === 0 ? (
          <EmptyState
            title="No goals yet."
            description="Create a distance, frequency, time, or pace goal."
            action={<Button size="sm" onClick={() => setOpen(true)}>CREATE GOAL</Button>}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {goals.map((g) => (
              <GoalCard key={g.id} goal={g} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      <Modal open={open} title="Create a goal" onClose={() => setOpen(false)}>
        <GoalForm onSubmit={handleCreate} onCancel={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
