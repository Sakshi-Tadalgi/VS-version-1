import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, fetchProfile } from "../actions/authActions";
import { removeToken, setToken } from "../../../utils/tokenUtils";
import axios from "axios";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  success: false,
  isLoggedIn: false,
};

// ✅ Follow user thunk
export const followUser = createAsyncThunk(
  "auth/followUser",
  async (targetUserId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const loggedInUserId = auth.user.id;

      const response = await axios.post("/api/follow", {
        followerId: loggedInUserId,
        followingId: targetUserId,
      });

      return response.data; // should return updated user info
    } catch (error) {
      return rejectWithValue(error.response?.data || "Follow failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.success = false;
      state.isLoggedIn = false;
      removeToken();
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access;
        state.isLoggedIn = true;
        setToken(action.payload.access);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Invalid credentials";
      })

      // Fetch profile
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // ✅ Follow user
      .addCase(followUser.fulfilled, (state, action) => {
        state.user.following = action.payload.following;
        state.user.followers = action.payload.followers;
      });
  },
});

export const { logout, clearError, clearSuccess } = authSlice.actions;
export default authSlice.reducer;
