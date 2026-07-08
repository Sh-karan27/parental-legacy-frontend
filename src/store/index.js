import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/userSlice";
import legacyReducer from "./slices/legacySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    legacy: legacyReducer,
  },
});

export default store;
