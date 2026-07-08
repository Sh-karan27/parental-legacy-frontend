import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sparkles, Menu, X } from "lucide-react";
import { logoutUser } from "../store/slices/userSlice";
import { clearLegacy } from "../store/slices/legacySlice";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const close = () => setMenuOpen(false);

  const handleLogout = async () => {
    close();
    await dispatch(logoutUser());
    dispatch(clearLegacy());
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-20 bg-white border-b border-slate-200 relative">
      <div className="max-w-[1240px] mx-auto px-10 py-4 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-[30px] h-[30px] rounded-lg bg-blue-600 flex items-center justify-center">
            <Sparkles size={16} color="#FFFFFF" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">LegacyLens</span>
        </Link>

        <div className="hidden sm:flex items-center gap-7 flex-1 justify-center">
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
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              to="/me"
              className="text-sm font-semibold text-slate-900 px-4 py-2.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              My Legacy
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm font-semibold text-white bg-blue-600 px-[18px] py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-2.5">
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
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-3 gap-1">
          <Link
            to="/"
            onClick={close}
            className={`py-2.5 text-sm ${isActive("/") ? "font-semibold text-slate-900" : "font-medium text-slate-600"}`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            onClick={close}
            className={`py-2.5 text-sm ${
              isActive("/dashboard") || isActive("/community")
                ? "font-semibold text-slate-900"
                : "font-medium text-slate-600"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/about"
            onClick={close}
            className={`py-2.5 text-sm ${isActive("/about") ? "font-semibold text-slate-900" : "font-medium text-slate-600"}`}
          >
            About
          </Link>

          <div className="border-t border-slate-100 mt-2 pt-3 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to="/me"
                  onClick={close}
                  className="text-sm font-semibold text-slate-900 px-4 py-2.5 rounded-lg text-center border border-slate-200"
                >
                  My Legacy
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm font-semibold text-white bg-blue-600 px-[18px] py-2.5 rounded-lg text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth?mode=login"
                  onClick={close}
                  className="text-sm font-semibold text-slate-900 px-4 py-2.5 rounded-lg text-center border border-slate-200"
                >
                  Login
                </Link>
                <Link
                  to="/auth?mode=register"
                  onClick={close}
                  className="text-sm font-semibold text-white bg-blue-600 px-[18px] py-2.5 rounded-lg text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
