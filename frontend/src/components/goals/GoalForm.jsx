import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addWeeks, addMonths, addYears, formatISO } from "date-fns";
import Button from "../common/Button";
import { GOAL_TYPES } from "../../config/constants";

const schema = z.object({
  type: z.enum(["distance", "frequency", "time", "pace"]),
  targetValue: z.coerce.number().positive("Enter a target greater than 0"),
  period: z.enum(["week", "month", "year"]),
});

export default function GoalForm({ onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { type: "distance", period: "month", targetValue: 100 },
  });

  const submit = async (data) => {
    const start = new Date();
    const end =
      data.period === "week" ? addWeeks(start, 1) : data.period === "month" ? addMonths(start, 1) : addYears(start, 1);

    await onSubmit({
      ...data,
      startDate: formatISO(start),
      endDate: formatISO(end),
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
      <div>
        <label className="text-xs text-muted font-medium mb-1.5 block">Goal type</label>
        <select {...register("type")} className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-surface">
          {GOAL_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs text-muted font-medium mb-1.5 block">Target value</label>
        <input
          type="number"
          step="any"
          {...register("targetValue")}
          className="w-full border border-border rounded-lg px-3 py-2.5 text-sm"
        />
        {errors.targetValue && <p className="text-xs text-danger mt-1">{errors.targetValue.message}</p>}
      </div>

      <div>
        <label className="text-xs text-muted font-medium mb-1.5 block">Period</label>
        <select {...register("period")} className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-surface">
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
        </select>
      </div>

      <div className="flex gap-3 mt-2">
        <Button type="button" variant="secondary" fullWidth onClick={onCancel}>Cancel</Button>
        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Create Goal"}
        </Button>
      </div>
    </form>
  );
}
