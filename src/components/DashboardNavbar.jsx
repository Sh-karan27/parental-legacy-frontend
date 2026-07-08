import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Sparkles, LayoutDashboard, User, LogOut } from "lucide-react";
import { logoutUser } from "../store/slices/userSlice";
import { clearLegacy } from "../store/slices/legacySlice";

export default function DashboardNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(clearLegacy());
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-20 bg-white border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-10 py-4 flex items-center justify-between gap-6">
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <div className="w-[30px] h-[30px] rounded-lg bg-blue-600 flex items-center justify-center">
            <Sparkles size={16} color="#FFFFFF" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">LegacyLens</span>
        </Link>

        <div className="flex items-center gap-6">
          <span className="text-sm font-semibold text-blue-600 flex items-center gap-1.5">
            <LayoutDashboard size={15} color="#2563EB" />
            Dashboard
          </span>
          <span className="text-sm font-medium text-slate-500 flex items-center gap-1.5 cursor-pointer">
            <User size={15} color="#64748B" />
            Profile
          </span>
          <span
            onClick={handleLogout}
            className="text-sm font-medium text-slate-500 flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut size={15} color="#64748B" />
            Logout
          </span>
        </div>
      </div>
    </div>
  );
}
