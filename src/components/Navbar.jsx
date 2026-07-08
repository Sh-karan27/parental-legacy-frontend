import { Sparkles, LayoutDashboard, User, LogOut } from "lucide-react";

export default function Navbar({ page, currentUser, onNavigate, onLogout }) {
  const isAuthed = Boolean(currentUser);

  return (
    <div className="sticky top-0 z-20 bg-white border-b border-slate-200">
      <div className="max-w-[1240px] mx-auto px-10 py-4 flex items-center justify-between gap-6">
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => onNavigate("landing")}
        >
          <div className="w-[30px] h-[30px] rounded-lg bg-blue-600 flex items-center justify-center">
            <Sparkles size={16} color="#FFFFFF" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            LegacyLens
          </span>
        </div>

        {isAuthed && page === "dashboard" ? (
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
              onClick={onLogout}
              className="text-sm font-medium text-slate-500 flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut size={15} color="#64748B" />
              Logout
            </span>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-7 flex-1 justify-center">
              <span
                onClick={() => onNavigate("landing")}
                className={`text-sm cursor-pointer ${
                  page === "landing" ? "font-medium text-slate-900" : "font-medium text-slate-500"
                }`}
              >
                Home
              </span>
              <span
                onClick={() => onNavigate(isAuthed ? "dashboard" : "community")}
                className={`text-sm cursor-pointer ${
                  page === "dashboard" || page === "community"
                    ? "font-medium text-slate-900"
                    : "font-medium text-slate-500"
                }`}
              >
                Dashboard
              </span>
              <span
                onClick={() => onNavigate("about")}
                className={`text-sm cursor-pointer ${
                  page === "about" ? "font-medium text-slate-900" : "font-medium text-slate-500"
                }`}
              >
                About
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onNavigate("auth", "login")}
                className="text-sm font-semibold text-slate-900 px-4 py-2.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate("auth", "register")}
                className="text-sm font-semibold text-white bg-blue-600 px-[18px] py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
              >
                Register
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
