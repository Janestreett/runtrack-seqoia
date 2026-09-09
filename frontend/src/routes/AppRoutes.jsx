import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AppLayout from "../components/layout/AppLayout";

import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Run from "../pages/run/Run";
import RunSummary from "../pages/run/RunSummary";
import Activities from "../pages/activities/Activities";
import ActivityDetail from "../pages/activities/ActivityDetail";
import Statistics from "../pages/statistics/Statistics";
import Goals from "../pages/goals/Goals";
import Records from "../pages/records/Records";
import Profile from "../pages/profile/Profile";
import Settings from "../pages/settings/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/run" element={<Run />} />
          <Route path="/run/summary" element={<RunSummary />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/records" element={<Records />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
