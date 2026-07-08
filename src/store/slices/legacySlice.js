import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  data: null,
  users: [],
  selectedUserLegacy: null,
  loading: false,
  usersLoading: false,
  selectedUserLoading: false,
  error: null,
  usersError: null,
  selectedUserError: null,
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

export const fetchLegacyUsers = createAsyncThunk(
  "legacy/fetchLegacyUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/legacy/users");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchLegacyByUserId = createAsyncThunk(
  "legacy/fetchLegacyByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/legacy/users/${userId}`);
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
    clearSelectedUserLegacy: (state) => {
      state.selectedUserLegacy = null;
      state.selectedUserError = null;
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
      })

      .addCase(fetchLegacyUsers.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(fetchLegacyUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchLegacyUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersError = action.payload?.message || "Failed to fetch users";
      })

      .addCase(fetchLegacyByUserId.pending, (state) => {
        state.selectedUserLoading = true;
        state.selectedUserError = null;
      })
      .addCase(fetchLegacyByUserId.fulfilled, (state, action) => {
        state.selectedUserLoading = false;
        state.selectedUserLegacy = action.payload;
      })
      .addCase(fetchLegacyByUserId.rejected, (state, action) => {
        state.selectedUserLoading = false;
        state.selectedUserError = action.payload?.message || "Failed to fetch legacy details";
      });
  },
});

export const { clearLegacy, clearSelectedUserLegacy } = legacySlice.actions;
export default legacySlice.reducer;
