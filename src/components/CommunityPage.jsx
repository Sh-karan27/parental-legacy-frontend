import { Sparkles } from "lucide-react";
import { buildCommunity } from "../utils/computeLegacy";

export default function CommunityPage({ onNavigate }) {
  const community = buildCommunity();

  return (
    <div>
      <div className="max-w-[1240px] mx-auto px-10 pt-12 pb-4">
        <h2 className="text-[28px] font-extrabold tracking-[-0.02em] mb-1.5 text-slate-900">
          Community Dashboard
        </h2>
        <p className="text-[14.5px] text-slate-500 mb-8 max-w-[560px]">
          A public look at members currently on LegacyLens. Create an account to see your
          own personalized legacy breakdown, charts, and factor analysis.
        </p>
      </div>

      <div className="max-w-[1240px] mx-auto px-10 pb-14 grid gap-7 items-start" style={{ gridTemplateColumns: "minmax(0,1fr) 300px" }}>
        <div className="bg-white border border-slate-200 rounded-2xl p-[26px]">
          <h3 className="text-base font-bold mb-0.5 text-slate-900">Registered Users</h3>
          <p className="text-[13px] text-slate-500 mb-[18px]">
            {community.length} members currently on LegacyLens.
          </p>
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
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-[26px] text-center">
          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3.5">
            <Sparkles size={20} color="#2563EB" />
          </div>
          <div className="text-[15px] font-bold text-slate-900 mb-1.5">See your own legacy</div>
          <p className="text-[13px] text-slate-500 leading-[1.55] mb-[18px]">
            Register with your date of birth to unlock your personal factor breakdown and charts.
          </p>
          <button
            onClick={() => onNavigate("auth", "register")}
            className="block w-full box-border text-sm font-semibold text-white bg-blue-600 py-2.5 rounded-[10px] hover:bg-blue-700 transition-colors"
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}
