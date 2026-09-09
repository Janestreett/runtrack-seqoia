import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../hooks/useAuth";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";
import AuthField from "../../components/auth/AuthField";
import AuthButton from "../../components/auth/AuthButton";
import AuthFooter from "../../components/auth/AuthFooter";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const { register: registerUser } = useAuth();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      // Existing authentication logic — unchanged. confirmPassword is
      // frontend-only and is not sent to the API.
      await registerUser(data.name, data.email, data.password);
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <AuthLayout badge="RUNTRACK / ACCOUNT" headlineLines={["TRACK EVERY RUN.", "BUILD YOUR PROGRESS."]}>
      <AuthCard
        eyebrow="RUNTRACK / ACCOUNT"
        heading="Create your account."
        subtitle="Start tracking your runs and build your progress."
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <AuthField
            id="register-name"
            label="Full name"
            placeholder="Enter your full name"
            autoComplete="name"
            error={errors.name?.message}
            delay="650ms"
            {...register("name")}
          />

          <AuthField
            id="register-email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            error={errors.email?.message}
            delay="720ms"
            {...register("email")}
          />

          <AuthField
            id="register-password"
            label="Password"
            password
            placeholder="Create a password"
            autoComplete="new-password"
            error={errors.password?.message}
            delay="790ms"
            {...register("password")}
          />

          <AuthField
            id="register-confirm-password"
            label="Confirm password"
            password
            placeholder="Confirm your password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            delay="860ms"
            {...register("confirmPassword")}
          />

          {serverError && (
            <p className="auth-server-error" role="alert">
              {serverError}
            </p>
          )}

          <AuthButton loading={isSubmitting} delay="930ms">
            Create account
          </AuthButton>
        </form>

        <AuthFooter
          prompt="Already have an account?"
          linkLabel="Log in"
          to="/login"
          delay="1260ms"
        />
      </AuthCard>
    </AuthLayout>
  );
}
