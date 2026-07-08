import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Sparkles } from "lucide-react";

export default function PublicDesktopNav({ onLogout }) {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sticky top-0 z-20 bg-white border-b border-slate-200">
      <div className="max-w-[1240px] mx-auto px-10 py-4 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-[30px] h-[30px] rounded-lg bg-blue-600 flex items-center justify-center">
            <Sparkles size={16} color="#FFFFFF" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">LegacyLens</span>
        </Link>

        <div className="flex items-center gap-7 flex-1 justify-center">
          <Link
            to="/"
            className={`text-sm ${isActive("/") ? "font-medium text-slate-900" : "font-medium text-slate-500"}`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`text-sm cursor-pointer ${
              isActive("/dashboard") || isActive("/community")
                ? "font-medium text-slate-900"
                : "font-medium text-slate-500"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/about"
            className={`text-sm ${isActive("/about") ? "font-medium text-slate-900" : "font-medium text-slate-500"}`}
          >
            About
          </Link>
        </div>

        {user ? (
          <div className="flex items-center gap-2.5">
            <Link
              to="/me"
              className="text-sm font-semibold text-slate-900 px-4 py-2.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              My Legacy
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="text-sm font-semibold text-white bg-blue-600 px-[18px] py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <Link
              to="/auth?mode=login"
              className="text-sm font-semibold text-slate-900 px-4 py-2.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/auth?mode=register"
              className="text-sm font-semibold text-white bg-blue-600 px-[18px] py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
