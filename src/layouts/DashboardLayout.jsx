import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";

export default function DashboardLayout() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <DashboardNavbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
