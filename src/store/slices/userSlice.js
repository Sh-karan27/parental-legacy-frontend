import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const saveTokens = ({ accessToken, refreshToken }) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
};

const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/register", formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/login", { email, password });
      const { accessToken, refreshToken, user } = response.data.data;
      saveTokens({ accessToken, refreshToken });
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (oldRefreshToken, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/refresh-token", {
        refreshToken: oldRefreshToken,
      });
      const { accessToken, refreshToken, user } = response.data.data;
      saveTokens({ accessToken, refreshToken });
      return user || null;
    } catch (error) {
      clearTokens();
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users/current-user");
      return response.data.data;
    } catch (error) {
      clearTokens();
      return rejectWithValue(error.response?.data);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    await axiosInstance.post("/users/logout");
  } catch {
    // ignore — clearing local session regardless
  } finally {
    clearTokens();
  }
  return true;
});

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        toast.success("Account created! Signing you in…");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
        toast.error(action.payload?.message || "Registration failed");
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
        toast.error(action.payload?.message || "Login failed");
      })

      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.error = null;
        if (action.payload) {
          state.user = action.payload;
        }
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.user = null;
      })

      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { clearAuthState } = userSlice.actions;

export default userSlice.reducer;
