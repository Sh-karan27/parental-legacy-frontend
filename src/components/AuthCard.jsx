import { useState } from "react";

export default function AuthCard({ authMode, onSwitchMode, onSubmit, loading }) {
  const isRegister = authMode === "register";

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", dob: "" });
  const [errors, setErrors] = useState({});

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: null }));
  };

  const validate = () => {
    const errs = {};
    if (isRegister && !form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password || form.password.length < 6) errs.password = "Minimum 6 characters";
    if (isRegister && form.password !== form.confirm) errs.confirm = "Passwords do not match";
    if (isRegister && !form.dob) errs.dob = "Date of birth is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSubmit({ ...form, isRegister });
  };

  const tabActive =
    "flex-1 py-2.5 border-none rounded-[9px] text-[13.5px] font-semibold cursor-pointer bg-white text-slate-900 shadow-sm";
  const tabInactive =
    "flex-1 py-2.5 border-none rounded-[9px] text-[13.5px] font-semibold cursor-pointer bg-transparent text-slate-500";

  const inputClass =
    "w-full box-border px-3.5 py-[11px] rounded-[10px] border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-[3px] focus:ring-blue-600/10";

  return (
    <div id="auth-card" className="max-w-[460px] mx-auto my-16 px-6">
      <div className="bg-white border border-slate-200 rounded-[20px] shadow-[0_8px_24px_-8px_rgba(15,23,42,0.08)] p-9">
        <div className="flex bg-slate-100 rounded-xl p-1 mb-[26px]">
          <button type="button" onClick={() => onSwitchMode("login")} className={isRegister ? tabInactive : tabActive}>
            Login
          </button>
          <button type="button" onClick={() => onSwitchMode("register")} className={isRegister ? tabActive : tabInactive}>
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-4">
              <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">Full Name</label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                className={inputClass}
              />
              {errors.name && <div className="text-xs text-red-500 mt-1">{errors.name}</div>}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              className={inputClass}
            />
            {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
          </div>

          <div className="mb-4">
            <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setField("password", e.target.value)}
              className={inputClass}
            />
            {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
          </div>

          {isRegister && (
            <>
              <div className="mb-4">
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.confirm}
                  onChange={(e) => setField("confirm", e.target.value)}
                  className={inputClass}
                />
                {errors.confirm && <div className="text-xs text-red-500 mt-1">{errors.confirm}</div>}
              </div>
              <div className="mb-2">
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setField("dob", e.target.value)}
                  className={inputClass}
                />
                {errors.dob && <div className="text-xs text-red-500 mt-1">{errors.dob}</div>}
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-[18px] flex items-center justify-center gap-2 py-[13px] rounded-[10px] border-none bg-blue-600 text-white text-[15px] font-semibold cursor-pointer hover:bg-blue-700 transition-colors disabled:opacity-70"
          >
            {loading && (
              <span className="w-[15px] h-[15px] rounded-full border-2 border-white/40 border-t-white inline-block animate-ll-spin" />
            )}
            {loading
              ? isRegister ? "Creating account…" : "Signing in…"
              : isRegister ? "Create account" : "Sign in"}
          </button>
        </form>

        <div className="text-center mt-5 text-[13.5px] text-slate-500">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); onSwitchMode("login"); }}>
                Sign in
              </a>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); onSwitchMode("register"); }}>
                Register
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
