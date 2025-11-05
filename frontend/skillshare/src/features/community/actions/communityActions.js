import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";

// ✅ Explore users
export const exploreUsers = createAsyncThunk(
  "community/exploreUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/community/explore/");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load users");
    }
  }
);

// ✅ Toggle Follow/Unfollow user
export const toggleFollowUser = createAsyncThunk(
  "community/toggleFollowUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await API.post(`/community/follow/${userId}/`);
      // Backend returns { message, is_following }
      return { userId, isFollowing: res.data.is_following };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Follow/Unfollow failed");
    }
  }
);

// ✅ Get followers of current user
export const getFollowers = createAsyncThunk(
  "community/getFollowers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/community/followers/");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch followers"
      );
    }
  }
);

// ✅ Get following list of current user
export const getFollowing = createAsyncThunk(
  "community/getFollowing",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/community/following/");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch following"
      );
    }
  }
);

// ✅ Follow a user
export const followUser = createAsyncThunk(
  "community/followUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post(`/community/follow/${data.following}/`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Follow failed");
    }
  }
);

// ✅ Unfollow a user
export const unfollowUser = createAsyncThunk(
  "community/unfollowUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await API.post(`/community/unfollow/${userId}/`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unfollow failed");
    }
  }
);
