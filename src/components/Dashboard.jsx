import { Percent, Award, CheckCircle, TrendingUp, Calendar } from "lucide-react";
import LegacyBarChart from "./charts/LegacyBarChart";
import LegacyPieChart from "./charts/LegacyPieChart";
import { formatDate, buildCommunity } from "../utils/computeLegacy";

export default function Dashboard({ legacy, animMother, animFather }) {
  const community = buildCommunity();
  const { user, summary, factors, charts } = legacy;

  return (
    <div className="animate-ll-fade-up">
      <div className="max-w-[1280px] mx-auto px-10 pt-8 pb-2">
        <h2 className="text-[26px] font-extrabold tracking-[-0.02em] mb-1 text-slate-900">
          Welcome back, {user.name}
        </h2>
        <p className="text-[14.5px] text-slate-500 mb-7">
          Here's your parental legacy distribution based on {formatDate(user.dob)}.
        </p>
      </div>

      <div className="max-w-[1280px] mx-auto px-10 pb-12 grid gap-7 items-start" style={{ gridTemplateColumns: "minmax(0,1fr) 300px" }}>
        <div className="flex flex-col gap-7 min-w-0">
          {/* SUMMARY CARDS */}
          <div className="grid gap-[18px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <div className="bg-white border border-slate-200 rounded-2xl p-[22px] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_24px_-12px_rgba(15,23,42,0.14)]">
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-9 h-9 rounded-[10px] bg-blue-50 flex items-center justify-center">
                  <Percent size={17} color="#2563EB" />
                </div>
              </div>
              <div className="text-[30px] font-extrabold text-slate-900">{animMother}%</div>
              <div className="text-[13px] text-slate-500 mt-0.5">Mother Legacy</div>
              <div className="h-[5px] bg-slate-100 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${animMother}%` }}
                />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-[22px] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_24px_-12px_rgba(15,23,42,0.14)]">
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-9 h-9 rounded-[10px] bg-emerald-50 flex items-center justify-center">
                  <Award size={17} color="#10B981" />
                </div>
              </div>
              <div className="text-[30px] font-extrabold text-slate-900">{animFather}%</div>
              <div className="text-[13px] text-slate-500 mt-0.5">Father Legacy</div>
              <div className="h-[5px] bg-slate-100 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${animFather}%` }}
                />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-[22px] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_24px_-12px_rgba(15,23,42,0.14)]">
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-9 h-9 rounded-[10px] bg-slate-100 flex items-center justify-center">
                  <CheckCircle size={17} color="#0F172A" />
                </div>
              </div>
              <div className="text-[30px] font-extrabold text-slate-900">{summary.grandTotal}</div>
              <div className="text-[13px] text-slate-500 mt-0.5">Overall Total</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-[22px] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_24px_-12px_rgba(15,23,42,0.14)]">
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-9 h-9 rounded-[10px] bg-amber-50 flex items-center justify-center">
                  <TrendingUp size={17} color="#F59E0B" />
                </div>
              </div>
              <div className="text-[30px] font-extrabold text-slate-900">{summary.higherLegacy}</div>
              <div className="text-[13px] text-slate-500 mt-0.5">Higher Legacy</div>
            </div>
          </div>

          {/* LIFE FACTOR TABLE */}
          <div className="bg-white border border-slate-200 rounded-2xl p-[26px]">
            <h3 className="text-base font-bold mb-0.5 text-slate-900">Life Factor Breakdown</h3>
            <p className="text-[13px] text-slate-500 mb-[18px]">
              Distribution across all seven deterministic life factors.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse" style={{ minWidth: 480 }}>
                <thead>
                  <tr>
                    <th className="text-left text-xs font-semibold text-slate-500 px-3 py-2.5 border-b border-slate-200">Life Factor</th>
                    <th className="text-right text-xs font-semibold text-slate-500 px-3 py-2.5 border-b border-slate-200">Mother</th>
                    <th className="text-right text-xs font-semibold text-slate-500 px-3 py-2.5 border-b border-slate-200">Father</th>
                    <th className="text-right text-xs font-semibold text-slate-500 px-3 py-2.5 border-b border-slate-200">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {factors.map((f, i) => (
                    <tr key={f.name} style={{ background: i % 2 === 0 ? "#FFFFFF" : "#F8FAFC" }}>
                      <td className="text-left text-[13.5px] font-medium text-slate-900 px-3 py-3">{f.name}</td>
                      <td className="text-right text-[13.5px] font-semibold text-blue-600 px-3 py-3">{f.mother}%</td>
                      <td className="text-right text-[13.5px] font-semibold text-emerald-500 px-3 py-3">{f.father}%</td>
                      <td className="text-right text-[13.5px] font-semibold text-slate-500 px-3 py-3">{f.total}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CHARTS */}
          <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))" }}>
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-base font-bold mb-0.5 text-slate-900">Mother vs Father by Factor</h3>
              <p className="text-[13px] text-slate-500 mb-1.5">
                Side-by-side comparison across every life factor.
              </p>
              <LegacyBarChart data={charts.barChart} height={300} />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-base font-bold mb-0.5 text-slate-900">Overall Legacy Split</h3>
              <p className="text-[13px] text-slate-500 mb-1.5">
                Aggregate mother vs father share across all factors.
              </p>
              <LegacyPieChart data={charts.pieChart} height={300} />
            </div>
          </div>

          {/* COMMUNITY */}
          <div className="bg-white border border-slate-200 rounded-2xl p-[26px]">
            <h3 className="text-base font-bold mb-0.5 text-slate-900">Community Insights</h3>
            <p className="text-[13px] text-slate-500 mb-[18px]">
              See how other LegacyLens members compare. Display only.
            </p>
            <CommunityTable community={community} />
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="flex flex-col gap-5 sticky top-[84px]">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white text-[22px] font-bold flex items-center justify-center mx-auto mb-3.5">
              {user.name.trim().charAt(0).toUpperCase()}
            </div>
            <div className="text-[15.5px] font-bold text-slate-900">{user.name}</div>
            <div className="flex items-center justify-center gap-1.5 text-[12.5px] text-slate-500 mt-2">
              <Calendar size={13} color="#64748B" />
              {formatDate(user.dob)}
            </div>
            <div className="text-xs text-slate-400 mt-1">Member since July 2026</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-[22px]">
            <div className="text-[13px] font-bold text-slate-900 mb-3.5">Quick Stats</div>
            <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
              <span className="text-[13px] text-slate-500">Factors analyzed</span>
              <span className="text-[13px] font-semibold text-slate-900">{factors.length}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
              <span className="text-[13px] text-slate-500">Birth weight</span>
              <span className="text-[13px] font-semibold text-slate-900">{summary.birthWeight}</span>
            </div>
            <div className="flex justify-between items-center py-2.5">
              <span className="text-[13px] text-slate-500">Account status</span>
              <span className="text-[11.5px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-500">
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunityTable({ community }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse" style={{ minWidth: 640 }}>
        <thead>
          <tr>
            <th className="text-left text-xs font-semibold text-slate-500 px-3 py-2.5 border-b border-slate-200"></th>
            <th className="text-left text-xs font-semibold text-slate-500 px-3 py-2.5 border-b border-slate-200">Name</th>
            <th className="text-left text-xs font-semibold text-slate-500 px-3 py-2.5 border-b border-slate-200">DOB</th>
            <th className="text-right text-xs font-semibold text-slate-500 px-3 py-2.5 border-b border-slate-200">Mother %</th>
            <th className="text-right text-xs font-semibold text-slate-500 px-3 py-2.5 border-b border-slate-200">Father %</th>
            <th className="text-left text-xs font-semibold text-slate-500 px-3 py-2.5 border-b border-slate-200">Higher</th>
            <th className="text-left text-xs font-semibold text-slate-500 px-3 py-2.5 border-b border-slate-200">Status</th>
          </tr>
        </thead>
        <tbody>
          {community.map((u, i) => (
            <tr key={u.id} style={{ background: i % 2 === 0 ? "#FFFFFF" : "#F8FAFC" }}>
              <td className="px-3 py-2.5">
                <div
                  className="w-[30px] h-[30px] rounded-full text-white text-xs font-bold flex items-center justify-center"
                  style={{ background: u.avatarBg }}
                >
                  {u.initial}
                </div>
              </td>
              <td className="text-left text-[13.5px] font-medium text-slate-900 px-3 py-2.5 whitespace-nowrap">{u.name}</td>
              <td className="text-left text-[13px] text-slate-500 px-3 py-2.5 whitespace-nowrap">{u.dobLabel}</td>
              <td className="text-right text-[13.5px] font-semibold text-blue-600 px-3 py-2.5">{u.mother}%</td>
              <td className="text-right text-[13.5px] font-semibold text-emerald-500 px-3 py-2.5">{u.father}%</td>
              <td className="text-left text-[13px] text-slate-700 px-3 py-2.5">{u.higher}</td>
              <td className="px-3 py-2.5">
                <span
                  className="text-[11.5px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: u.statusBg, color: u.statusColor }}
                >
                  {u.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
