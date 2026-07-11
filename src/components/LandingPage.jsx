import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Activity,
  ArrowRight,
  TrendingUp,
  Eye,
  Award,
  Sparkles,
  CheckCircle,
  Users,
} from "lucide-react";

const LIFE_FACTORS = [
  { icon: TrendingUp, bg: "#EFF6FF", color: "#2563EB", title: "Ambition & Drive", body: "Your drive to set and pursue ambitious goals." },
  { icon: Eye, bg: "#ECFDF5", color: "#10B981", title: "Emotional Intelligence", body: "Your capacity to understand and manage emotion." },
  { icon: Award, bg: "#FFFBEB", color: "#F59E0B", title: "Resilience", body: "How you recover from setbacks and adapt to change." },
  { icon: Sparkles, bg: "#EFF6FF", color: "#2563EB", title: "Creativity", body: "Your inclination toward original thinking and ideas." },
  { icon: CheckCircle, bg: "#ECFDF5", color: "#10B981", title: "Discipline", body: "Your consistency and follow-through on commitments." },
  { icon: Users, bg: "#FFFBEB", color: "#F59E0B", title: "Social Bonding", body: "How you build and maintain close relationships." },
  { icon: Activity, bg: "#EFF6FF", color: "#2563EB", title: "Health & Vitality", body: "Your baseline energy and physical wellbeing." },
];

const STEPS = [
  { label: "Step 1", title: "Create your account", body: "Register with your name, email, and date of birth — the only input the model needs." },
  { label: "Step 2", title: "We run the analysis", body: "Your date of birth is deterministically scored across all seven life factors." },
  { label: "Step 3", title: "Explore your dashboard", body: "View your split, factor breakdown, charts, and how you compare to the community." },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      {/* HERO */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-16 lg:pt-[88px] pb-10 sm:pb-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="animate-ll-fade-up">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-[12.5px] font-semibold px-3 py-1.5 rounded-full mb-5">
            <Activity size={13} color="#2563EB" />
            Deterministic Life Factor Analysis
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[58px] leading-[1.04] font-extrabold mb-3.5 text-slate-900">
            LegacyLens
          </h1>
          <p className="text-xl font-semibold text-slate-700 mb-4">
            Parental Legacy &amp; Life Factors Calculator
          </p>
          <p className="text-base leading-[1.65] text-slate-500 mb-8 max-w-[460px]">
            Discover your personalized parental legacy distribution using deterministic
            life factor analysis based on your date of birth.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            {user ? (
              <button
                onClick={() => navigate("/me")}
                className="inline-flex items-center justify-center gap-2 text-[15px] font-semibold text-white bg-blue-600 px-[22px] py-3.5 rounded-[10px] shadow-sm hover:bg-blue-700 transition-colors"
              >
                Go to My Legacy
                <ArrowRight size={16} color="#FFFFFF" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/auth?mode=register")}
                  className="inline-flex items-center justify-center gap-2 text-[15px] font-semibold text-white bg-blue-600 px-[22px] py-3.5 rounded-[10px] shadow-sm hover:bg-blue-700 transition-colors"
                >
                  Get Started
                  <ArrowRight size={16} color="#FFFFFF" />
                </button>
                <button
                  onClick={() => navigate("/auth?mode=login")}
                  className="text-[15px] font-semibold text-slate-900 px-[18px] py-3.5 rounded-[10px] border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>

        {/* Dashboard preview illustration */}
        <div className="relative animate-ll-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="bg-white border border-slate-200 rounded-[20px] shadow-[0_20px_40px_-12px_rgba(15,23,42,0.12)] p-4 sm:p-[26px]">
            <div className="flex items-center justify-between mb-5">
              <div className="text-[13px] font-bold text-slate-900">Legacy Overview</div>
              <div className="flex gap-1.5">
                <div className="w-[7px] h-[7px] rounded-full bg-slate-200" />
                <div className="w-[7px] h-[7px] rounded-full bg-slate-200" />
                <div className="w-[7px] h-[7px] rounded-full bg-slate-200" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              <div className="bg-slate-50 rounded-xl p-3.5">
                <div className="text-xl font-extrabold text-blue-600">62</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Mother</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3.5">
                <div className="text-xl font-extrabold text-emerald-500">38</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Father</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3.5">
                <div className="text-xl font-extrabold text-slate-900">100</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Total</div>
              </div>
            </div>
            <div className="flex items-end gap-2 h-[90px] px-1 border-b border-slate-200 mb-3.5">
              {[52, 34, 70, 46, 60, 40, 78].map((h, i) => (
                <div
                  key={i}
                  className="w-full rounded-t"
                  style={{ height: `${h}%`, background: i % 2 === 0 ? "#2563EB" : "#10B981" }}
                />
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full"
                style={{ background: "conic-gradient(#2563EB 0deg 223deg, #10B981 223deg 360deg)" }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-700 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                  Mother Legacy — 62
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  Father Legacy — 38
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIFE FACTORS */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-2">
        <h2 className="text-2xl sm:text-[28px] font-extrabold mb-2 text-slate-900">
          Seven life factors, one date of birth
        </h2>
        <p className="text-[15px] text-slate-500 mb-8 max-w-[560px]">
          LegacyLens breaks parental influence down into seven deterministic factors,
          each scored independently for mother and father.
        </p>
      </div>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10 pb-12 sm:pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
        {LIFE_FACTORS.map((f) => (
          <div
            key={f.title}
            className="bg-white border border-slate-200 rounded-2xl p-[22px] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_24px_-12px_rgba(15,23,42,0.14)]"
          >
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-3.5"
              style={{ background: f.bg }}
            >
              <f.icon size={17} color={f.color} />
            </div>
            <div className="text-[14.5px] font-bold text-slate-900 mb-1">{f.title}</div>
            <p className="text-[13px] leading-[1.55] text-slate-500 m-0">{f.body}</p>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10 pt-2 pb-2">
        <h2 className="text-2xl sm:text-[28px] font-extrabold mb-8 text-slate-900">
          How it works
        </h2>
      </div>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10 pb-12 sm:pb-16 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {STEPS.map((s) => (
          <div key={s.label} className="px-1">
            <div className="text-[13px] font-bold text-blue-600 mb-2.5">{s.label}</div>
            <div className="text-base font-bold text-slate-900 mb-2">{s.title}</div>
            <p className="text-[13.5px] leading-[1.6] text-slate-500 m-0">{s.body}</p>
          </div>
        ))}
      </div>

      {/* FINAL CTA */}
      <div className="max-w-[1240px] mx-auto mb-12 sm:mb-16 px-4 sm:px-6 lg:px-10">
        <div className="bg-slate-900 rounded-[20px] px-5 sm:px-8 lg:px-12 py-8 sm:py-[52px] flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
          <div>
            <div className="text-2xl font-extrabold text-white mb-2">
              Ready to see your legacy?
            </div>
            <p className="text-[14.5px] text-slate-400 m-0">
              Takes less than a minute — no credit card required.
            </p>
          </div>
          <button
            onClick={() => navigate(user ? "/me" : "/auth?mode=register")}
            className="inline-flex items-center justify-center gap-2 text-[15px] font-semibold text-slate-900 bg-white px-6 py-3.5 rounded-[10px] whitespace-nowrap hover:bg-slate-100 transition-colors"
          >
            {user ? "View My Legacy" : "Get Started"}
            <ArrowRight size={16} color="#0F172A" />
          </button>
        </div>
      </div>
    </div>
  );
}
