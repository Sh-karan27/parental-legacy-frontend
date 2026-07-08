import api from "../lib/api";

export const getMyLegacy = () => api.get("/legacy/me");
