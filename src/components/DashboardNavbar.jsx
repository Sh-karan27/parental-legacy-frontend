import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Sparkles, LayoutDashboard, Users, LogOut, Menu, X } from "lucide-react";
import { logoutUser } from "../store/slices/userSlice";
import { clearLegacy } from "../store/slices/legacySlice";

export default function DashboardNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    setMenuOpen(false);
    await dispatch(logoutUser());
    dispatch(clearLegacy());
    navigate("/");
  };

  const linkClass = (path) =>
    `text-sm flex items-center gap-1.5 ${
      isActive(path) ? "font-semibold text-blue-600" : "font-medium text-slate-500"
    }`;

  return (
    <div className="sticky top-0 z-20 bg-white border-b border-slate-200 relative">
      <div className="max-w-[1280px] mx-auto px-10 py-4 flex items-center justify-between gap-6">
        <Link to="/me" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <div className="w-[30px] h-[30px] rounded-lg bg-blue-600 flex items-center justify-center">
            <Sparkles size={16} color="#FFFFFF" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">LegacyLens</span>
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          <Link to="/me" className={linkClass("/me")}>
            <LayoutDashboard size={15} color={isActive("/me") ? "#2563EB" : "#64748B"} />
            My Legacy
          </Link>
          <Link to="/dashboard" className={linkClass("/dashboard")}>
            <Users size={15} color={isActive("/dashboard") ? "#2563EB" : "#64748B"} />
            All Users
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm font-medium text-slate-500 flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut size={15} color="#64748B" />
            Logout
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 shrink-0"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div
        className={`sm:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg overflow-hidden transition-[max-height] duration-300 ease-out ${
          menuOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-3 gap-1">
          <Link
            to="/me"
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-2 py-2.5 text-sm ${
              isActive("/me") ? "font-semibold text-blue-600" : "font-medium text-slate-600"
            }`}
          >
            <LayoutDashboard size={16} />
            My Legacy
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-2 py-2.5 text-sm ${
              isActive("/dashboard") ? "font-semibold text-blue-600" : "font-medium text-slate-600"
            }`}
          >
            <Users size={16} />
            All Users
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 py-2.5 text-sm font-medium text-slate-600 text-left"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
