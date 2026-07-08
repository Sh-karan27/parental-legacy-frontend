import { Info, Calendar, BarChart, PieChart } from "lucide-react";

const STEPS = [
  { icon: Calendar, bg: "#EFF6FF", color: "#2563EB", title: "1. Enter your DOB", body: "Register with your date of birth — the only input the model needs." },
  { icon: BarChart, bg: "#ECFDF5", color: "#10B981", title: "2. We compute your factors", body: "Day, month and year are combined into a deterministic score for each of the seven life factors." },
  { icon: PieChart, bg: "#FFFBEB", color: "#F59E0B", title: "3. Explore your dashboard", body: "See your split, factor table, and charts — and compare against the community." },
];

const STACK = ["React", "Tailwind CSS", "Recharts", "Lucide Icons", "Framer Motion", "MongoDB · Express · Node"];

export default function AboutPage() {
  return (
    <div>
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-[72px] pb-8">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-[12.5px] font-semibold px-3 py-1.5 rounded-full mb-5">
          <Info size={13} color="#2563EB" />
          About LegacyLens
        </div>
        <h2 className="text-3xl sm:text-[38px] font-extrabold mb-4 text-slate-900">
          A deterministic lens on parental influence
        </h2>
        <p className="text-base leading-[1.7] text-slate-500 mb-3">
          LegacyLens turns a single input — your date of birth — into a structured
          breakdown of how maternal and paternal influence maps across seven life
          factors: ambition, emotional intelligence, resilience, creativity,
          discipline, social bonding, and health &amp; vitality.
        </p>
        <p className="text-base leading-[1.7] text-slate-500 mb-3">
          Every calculation is deterministic: the same date of birth always produces
          the same result, computed from the day, month, and year values. There's no
          chart-reading or guesswork — just a consistent, repeatable model presented
          the way you'd expect from a modern analytics product.
        </p>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-4 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {STEPS.map((s) => (
          <div key={s.title} className="bg-white border border-slate-200 rounded-2xl p-6">
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-3.5"
              style={{ background: s.bg }}
            >
              <s.icon size={17} color={s.color} />
            </div>
            <div className="text-[15px] font-bold text-slate-900 mb-1.5">{s.title}</div>
            <p className="text-[13.5px] leading-[1.6] text-slate-500 m-0">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-12 sm:pb-16">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7">
          <div className="text-[13px] font-bold text-slate-900 mb-3.5">Built with</div>
          <div className="flex flex-wrap gap-2.5">
            {STACK.map((tag) => (
              <span
                key={tag}
                className="text-[12.5px] font-semibold text-slate-700 bg-slate-100 px-3.5 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
