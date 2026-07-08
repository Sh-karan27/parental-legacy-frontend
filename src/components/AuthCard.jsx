import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../store/slices/userSlice";

export default function AuthCard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const authMode = searchParams.get("mode") === "login" ? "login" : "register";
  const isRegister = authMode === "register";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    dob: "",
    gender: "",
    familyType: "parents",
    parentOneName: "",
    parentTwoName: "",
  });
  const [errors, setErrors] = useState({});

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: null }));
  };

  const isGuardians = form.familyType === "guardians";
  const parentOneLabel = isGuardians ? "Guardian 1 Name" : "Mother's Name";
  const parentTwoLabel = isGuardians ? "Guardian 2 Name" : "Father's Name";

  const validate = () => {
    const errs = {};
    if (isRegister && !form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password || form.password.length < 6) errs.password = "Minimum 6 characters";
    if (isRegister && form.password !== form.confirm) errs.confirm = "Passwords do not match";
    if (isRegister && !form.dob) errs.dob = "Date of birth is required";
    if (isRegister && !form.gender) errs.gender = "Select a gender";
    if (isRegister && !form.parentOneName.trim()) errs.parentOneName = `${parentOneLabel} is required`;
    if (isRegister && !form.parentTwoName.trim()) errs.parentTwoName = `${parentTwoLabel} is required`;
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const username = form.name.trim().toLowerCase().replace(/\s+/g, "");

    if (isRegister) {
      const registerResult = await dispatch(
        registerUser({
          username,
          email: form.email,
          password: form.password,
          dob: form.dob,
          gender: form.gender,
          familyType: form.familyType,
          parentOneName: form.parentOneName,
          parentTwoName: form.parentTwoName,
        })
      );
      if (registerUser.rejected.match(registerResult)) return;
    }

    const loginResult = await dispatch(loginUser({ email: form.email, password: form.password }));
    if (loginUser.rejected.match(loginResult)) return;

    navigate("/me");
  };

  const switchMode = (mode) => {
    setSearchParams({ mode });
    setErrors({});
  };

  const tabActive =
    "flex-1 py-2.5 border-none rounded-[9px] text-[13.5px] font-semibold cursor-pointer bg-white text-slate-900 shadow-sm";
  const tabInactive =
    "flex-1 py-2.5 border-none rounded-[9px] text-[13.5px] font-semibold cursor-pointer bg-transparent text-slate-500";

  const inputClass =
    "w-full box-border px-3.5 py-[11px] rounded-[10px] border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-[3px] focus:ring-blue-600/10";

  const familyBtn = (active) =>
    `flex-1 py-2.5 rounded-[10px] border text-[13px] font-semibold cursor-pointer transition-colors ${
      active
        ? "bg-blue-600 border-blue-600 text-white"
        : "bg-white border-slate-200 text-slate-600"
    }`;

  return (
    <div id="auth-card" className="max-w-[460px] mx-auto my-16 px-6">
      <div className="bg-white border border-slate-200 rounded-[20px] shadow-[0_8px_24px_-8px_rgba(15,23,42,0.08)] p-9">
        <div className="flex bg-slate-100 rounded-xl p-1 mb-[26px]">
          <button type="button" onClick={() => switchMode("login")} className={isRegister ? tabInactive : tabActive}>
            Login
          </button>
          <button type="button" onClick={() => switchMode("register")} className={isRegister ? tabActive : tabInactive}>
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

              <div className="mb-4">
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setField("dob", e.target.value)}
                  className={inputClass}
                />
                {errors.dob && <div className="text-xs text-red-500 mt-1">{errors.dob}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => setField("gender", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <div className="text-xs text-red-500 mt-1">{errors.gender}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">Family</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setField("familyType", "parents")}
                    className={familyBtn(form.familyType === "parents")}
                  >
                    Parents
                  </button>
                  <button
                    type="button"
                    onClick={() => setField("familyType", "guardians")}
                    className={familyBtn(form.familyType === "guardians")}
                  >
                    Guardians
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">{parentOneLabel}</label>
                <input
                  type="text"
                  value={form.parentOneName}
                  onChange={(e) => setField("parentOneName", e.target.value)}
                  className={inputClass}
                />
                {errors.parentOneName && <div className="text-xs text-red-500 mt-1">{errors.parentOneName}</div>}
              </div>

              <div className="mb-2">
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">{parentTwoLabel}</label>
                <input
                  type="text"
                  value={form.parentTwoName}
                  onChange={(e) => setField("parentTwoName", e.target.value)}
                  className={inputClass}
                />
                {errors.parentTwoName && <div className="text-xs text-red-500 mt-1">{errors.parentTwoName}</div>}
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
              <a href="#" onClick={(e) => { e.preventDefault(); switchMode("login"); }}>
                Sign in
              </a>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); switchMode("register"); }}>
                Register
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
