export function normalizeDate(dobStr) {
  if (!dobStr) return "";
  const dateOnly = String(dobStr).split("T")[0];
  const match = dateOnly.match(/^\d{4}-\d{2}-\d{2}$/);
  return match ? dateOnly : String(dobStr);
}

export function formatDate(dobStr) {
  return normalizeDate(dobStr);
}
