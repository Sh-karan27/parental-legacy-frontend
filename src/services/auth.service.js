import api from "../lib/api";

export const registerUser = (payload) => api.post("/users/register", payload);

export const loginUser = (payload) => api.post("/users/login", payload);

export const logoutUser = () => api.post("/users/logout");

export const getCurrentUser = () => api.get("/users/current-user");
