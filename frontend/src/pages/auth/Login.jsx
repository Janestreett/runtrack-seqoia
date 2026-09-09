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

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const { login } = useAuth();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      // Existing authentication logic — unchanged.
      await login(data.email, data.password);
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <AuthLayout badge="RUNTRACK / ACCOUNT" headlineLines={["RUN SMARTER.", "RUN FURTHER."]}>
      <AuthCard
        eyebrow="RUNTRACK / ACCOUNT"
        heading="Welcome back."
        subtitle="Continue your running journey."
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <AuthField
            id="login-email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            error={errors.email?.message}
            delay="720ms"
            {...register("email")}
          />

          <AuthField
            id="login-password"
            label="Password"
            password
            placeholder="Password"
            autoComplete="current-password"
            error={errors.password?.message}
            delay="790ms"
            {...register("password")}
          />

          {serverError && (
            <p className="auth-server-error" role="alert">
              {serverError}
            </p>
          )}

          <AuthButton loading={isSubmitting} delay="930ms">
            Login
          </AuthButton>
        </form>

        <AuthFooter
          prompt="Don't have an account?"
          linkLabel="Create account"
          to="/register"
          delay="1260ms"
        />
      </AuthCard>
    </AuthLayout>
  );
}
