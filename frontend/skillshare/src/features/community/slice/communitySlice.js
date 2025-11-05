import { createSlice } from "@reduxjs/toolkit";
import {
  exploreUsers,
  toggleFollowUser,
  getFollowers,
  getFollowing,
} from "../actions/communityActions";

// 🔹 Load data from localStorage (for persistence)
const loadFromLocalStorage = (key, fallback = []) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (e) {
    console.error("Error loading from localStorage:", e);
    return fallback;
  }
};

// 🔹 Save data to localStorage
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving to localStorage:", e);
  }
};

const initialState = {
  users: loadFromLocalStorage("community_users", []), // all users for explore page
  followers: loadFromLocalStorage("community_followers", []), // list of followers
  following: loadFromLocalStorage("community_following", []), // list of users current user follows
  status: "idle",
  error: null,
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    updateFollowStatus(state, action) {
      const { userId, isFollowing } = action.payload;
      const user = state.users.find((u) => u.id === userId);
      if (user) user.is_following = isFollowing;

      // 🔹 Update following list as well
      if (isFollowing) {
        state.following.push(user);
      } else {
        state.following = state.following.filter((u) => u.id !== userId);
      }

      // 🔹 Persist to localStorage
      saveToLocalStorage("community_users", state.users);
      saveToLocalStorage("community_following", state.following);
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Explore Users
      .addCase(exploreUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "succeeded";
        saveToLocalStorage("community_users", state.users);
      })

      // ✅ Toggle Follow/Unfollow
      .addCase(toggleFollowUser.fulfilled, (state, action) => {
        const { userId, isFollowing } = action.payload;
        const user = state.users.find((u) => u.id === userId);
        if (user) user.is_following = isFollowing;

        // 🔹 Update following list
        if (isFollowing) {
          if (!state.following.some((u) => u.id === userId)) {
            state.following.push(user);
          }
        } else {
          state.following = state.following.filter((u) => u.id !== userId);
        }

        saveToLocalStorage("community_users", state.users);
        saveToLocalStorage("community_following", state.following);
      })

      // ✅ Followers List
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.followers = action.payload;
        saveToLocalStorage("community_followers", state.followers);
      })

      // ✅ Following List
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.following = action.payload;
        saveToLocalStorage("community_following", state.following);
      })

      // ❌ Handle Errors
      .addMatcher(
        (action) => action.type.endsWith("rejected"),
        (state, action) => {
          state.error = action.error?.message || "Something went wrong";
          state.status = "failed";
        }
      );
  },
});

export const { updateFollowStatus } = communitySlice.actions;
export default communitySlice.reducer;
