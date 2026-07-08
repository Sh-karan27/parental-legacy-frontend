import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { fetchLegacyUsers, fetchLegacyByUserId, clearSelectedUserLegacy } from "../store/slices/legacySlice";
import LegacyBarChart from "./charts/LegacyBarChart";
import LegacyPieChart from "./charts/LegacyPieChart";

const AVATAR_COLORS = ["#2563EB", "#10B981", "#F59E0B", "#64748B", "#0F172A"];

function formatDob(dob) {
  if (!dob) return "—";
  const d = new Date(dob);
  if (isNaN(d.getTime())) return String(dob);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function initials(name) {
  return (name || "?").trim().charAt(0).toUpperCase();
}

export default function CommunityPage() {
  const dispatch = useDispatch();
  const { users, usersLoading, selectedUserLegacy, selectedUserLoading } = useSelector((state) => state.legacy);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(fetchLegacyUsers());
  }, [dispatch]);

  const handleRowClick = (userId) => {
    setSelectedId(userId);
    dispatch(fetchLegacyByUserId(userId));
  };

  const handleBack = () => {
    setSelectedId(null);
    dispatch(clearSelectedUserLegacy());
  };

  if (selectedId) {
    return (
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 mb-6"
        >
          <ArrowLeft size={15} /> Back to all users
        </button>

        {selectedUserLoading || !selectedUserLegacy ? (
          <div className="text-center text-slate-400 py-16">Loading legacy…</div>
        ) : (
          <UserLegacyDetail legacy={selectedUserLegacy} />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
      <h2 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 mb-1.5">All Users</h2>
      <p className="text-[14.5px] text-slate-500 mb-8 max-w-[560px]">
        Every registered LegacyLens member. Click a row to view their full legacy breakdown.
      </p>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-[26px]">
        {usersLoading ? (
          <div className="text-center text-slate-400 py-16">Loading users…</div>
        ) : !users || users.length === 0 ? (
          <div className="text-center text-slate-400 py-16">No users yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" style={{ minWidth: 700 }}>
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
                {users.map((u, i) => (
                  <tr
                    key={u.userId}
                    onClick={() => handleRowClick(u.userId)}
                    className="cursor-pointer hover:bg-slate-100 transition-colors"
                    style={{ background: i % 2 === 0 ? "#FFFFFF" : "#F8FAFC" }}
                  >
                    <td className="px-3 py-2.5">
                      <div
                        className="w-[30px] h-[30px] rounded-full text-white text-xs font-bold flex items-center justify-center"
                        style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                      >
                        {initials(u.username)}
                      </div>
                    </td>
                    <td className="text-left text-[13.5px] font-medium text-slate-900 px-3 py-2.5 whitespace-nowrap">
                      {u.username}
                    </td>
                    <td className="text-left text-[13px] text-slate-500 px-3 py-2.5 whitespace-nowrap">
                      {formatDob(u.dob)}
                    </td>
                    <td className="text-right text-[13.5px] font-semibold text-blue-600 px-3 py-2.5">
                      {u.motherTotal != null ? `${u.motherTotal}%` : "—"}
                    </td>
                    <td className="text-right text-[13.5px] font-semibold text-emerald-500 px-3 py-2.5">
                      {u.fatherTotal != null ? `${u.fatherTotal}%` : "—"}
                    </td>
                    <td className="text-left text-[13px] text-slate-700 px-3 py-2.5">
                      {u.higherLegacy || "—"}
                    </td>
                    <td className="px-3 py-2.5">
                      <span
                        className={`text-[11.5px] font-semibold px-2.5 py-1 rounded-full ${
                          u.hasGeneratedLegacy ? "bg-emerald-50 text-emerald-500" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {u.hasGeneratedLegacy ? "Generated" : "Not generated"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function UserLegacyDetail({ legacy }) {
  const { user, summary, factors, charts } = legacy;

  return (
    <div className="animate-ll-fade-up">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-blue-600 text-white text-xl font-bold flex items-center justify-center shrink-0">
          {initials(user.name)}
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-extrabold text-slate-900 truncate">{user.name}</h2>
          <p className="text-[13px] text-slate-500 truncate">
            {formatDob(user.dob)} · {user.email}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[18px] mb-7">
        <SummaryCard label="Mother Legacy" value={`${summary.motherTotal}%`} color="text-blue-600" />
        <SummaryCard label="Father Legacy" value={`${summary.fatherTotal}%`} color="text-emerald-500" />
        <SummaryCard label="Higher Legacy" value={summary.higherLegacy} color="text-slate-900" />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-[26px] mb-7">
        <h3 className="text-base font-bold mb-[18px] text-slate-900">Life Factor Breakdown</h3>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 min-w-0">
          <h3 className="text-base font-bold mb-3 text-slate-900">Mother vs Father by Factor</h3>
          <LegacyBarChart data={charts.barChart} height={280} />
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 min-w-0">
          <h3 className="text-base font-bold mb-3 text-slate-900">Overall Legacy Split</h3>
          <LegacyPieChart data={charts.pieChart} height={280} />
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center">
      <div className={`text-2xl font-extrabold ${color}`}>{value}</div>
      <div className="text-[13px] text-slate-500 mt-1">{label}</div>
    </div>
  );
}
