export const FACTORS = [
  "Ambition & Drive",
  "Emotional Intelligence",
  "Resilience",
  "Creativity",
  "Discipline",
  "Social Bonding",
  "Health & Vitality",
];

export function normalizeDate(dobStr) {
  if (!dobStr) return "";
  const dateOnly = String(dobStr).split("T")[0];
  const match = dateOnly.match(/^\d{4}-\d{2}-\d{2}$/);
  return match ? dateOnly : String(dobStr);
}

export function computeLegacy(dobStr) {
  const parts = normalizeDate(dobStr || "1994-05-12").split("-").map(Number);
  const year = parts[0] || 1994;
  const month = parts[1] || 5;
  const day = parts[2] || 12;

  const yearDigitsSum = String(year)
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);

  const seed = day * 31 + month * 12 + yearDigitsSum * 7;

  const factors = FACTORS.map((name, i) => {
    const val = ((seed + (i + 1) * 17 + day * (i + 2) + month * (i + 5)) % 61) + 20;
    return { factor: name, mother: val, father: 100 - val };
  });

  const overallMotherRaw = factors.reduce((sum, f) => sum + f.mother, 0) / factors.length;
  const overallMother = Math.round(overallMotherRaw);
  const overallFather = 100 - overallMother;

  return {
    factors,
    overallMother,
    overallFather,
    higher: overallMother >= overallFather ? "Mother" : "Father",
  };
}

export function formatDate(dobStr) {
  return normalizeDate(dobStr);
}

export const COMMUNITY_SEED = [
  { name: "Ava Thompson", dob: "1992-03-14" },
  { name: "Liam Chen", dob: "1988-11-02" },
  { name: "Sofia Martinez", dob: "1997-07-29" },
  { name: "Noah Williams", dob: "1990-01-08" },
  { name: "Olivia Brown", dob: "1995-09-21" },
  { name: "Ethan Davis", dob: "1985-05-17" },
  { name: "Mia Rodriguez", dob: "1999-12-05" },
  { name: "Lucas Kim", dob: "1993-06-30" },
  { name: "Emma Wilson", dob: "1991-02-11" },
];

export const AVATAR_COLORS = ["#2563EB", "#10B981", "#F59E0B", "#64748B", "#0F172A"];

export function buildCommunity() {
  const statusList = ["Verified", "New", "Active"];
  const statusColors = {
    Verified: ["#ECFDF5", "#10B981"],
    New: ["#EFF6FF", "#2563EB"],
    Active: ["#FFFBEB", "#F59E0B"],
  };

  return COMMUNITY_SEED.map((u, i) => {
    const r = computeLegacy(u.dob);
    const status = statusList[i % 3];

    return {
      id: i,
      name: u.name,
      dobLabel: formatDate(u.dob),
      mother: r.overallMother,
      father: r.overallFather,
      higher: r.higher,
      status,
      statusBg: statusColors[status][0],
      statusColor: statusColors[status][1],
      initial: u.name.trim().charAt(0).toUpperCase(),
      avatarBg: AVATAR_COLORS[i % AVATAR_COLORS.length],
    };
  });
}
