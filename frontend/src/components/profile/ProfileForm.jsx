import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../common/Button";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  weightKg: z.coerce.number().positive().nullable().optional(),
});

export default function ProfileForm({ user, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: user.name, weightKg: user.weightKg || "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <label className="text-xs text-muted font-medium mb-1.5 block">Name</label>
        <input {...register("name")} className="w-full border border-border rounded-lg px-3 py-2.5 text-sm" />
        {errors.name && <p className="text-xs text-danger mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="text-xs text-muted font-medium mb-1.5 block">Weight (kg) — used for calorie estimates</label>
        <input
          type="number"
          step="any"
          {...register("weightKg")}
          className="w-full border border-border rounded-lg px-3 py-2.5 text-sm"
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Save Changes"}
      </Button>
    </form>
  );
}
