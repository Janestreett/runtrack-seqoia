import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNavbar from "./MobileNavbar";
import { useTheme } from "../../hooks/useTheme";

export default function AppLayout() {
  useTheme();

  return (
    <div className="min-h-screen bg-bg flex">
      <Sidebar />
      <main className="flex-1 min-w-0 pb-24 md:pb-0">
        <Outlet />
      </main>
      <MobileNavbar />
    </div>
  );
}
