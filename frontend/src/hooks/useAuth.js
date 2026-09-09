import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { authService } from "../services/authService";

export function useAuth() {
  const { user, token, isAuthenticated, setSession, logout } = useAuthStore();
  const navigate = useNavigate();

  const login = useCallback(
    async (email, password) => {
      const data = await authService.login({ email, password });
      setSession(data.user, data.token);
      navigate("/dashboard");
    },
    [navigate, setSession]
  );

  const register = useCallback(
    async (name, email, password) => {
      const data = await authService.register({ name, email, password });
      setSession(data.user, data.token);
      navigate("/dashboard");
    },
    [navigate, setSession]
  );

  const signOut = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return { user, token, isAuthenticated, login, register, logout: signOut };
}
