import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchMyLegacy = createAsyncThunk(
  "legacy/fetchMyLegacy",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/legacy/me");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const legacySlice = createSlice({
  name: "legacy",
  initialState,
  reducers: {
    clearLegacy: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyLegacy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyLegacy.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMyLegacy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
        toast.error(action.payload?.message || "Failed to generate your legacy analysis");
      });
  },
});

export const { clearLegacy } = legacySlice.actions;
export default legacySlice.reducer;
