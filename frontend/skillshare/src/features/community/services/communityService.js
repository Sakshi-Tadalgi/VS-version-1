import API from "../../../services/api";

// ✅ Get all users except current user
export const getExploreUsers = () => API.get("/community/explore/");

// ✅ Toggle follow/unfollow
export const toggleFollowUser = (userId) =>
  API.post(`/community/follow/${userId}/`);

// ✅ Get current user's followers
export const getFollowers = () => API.get("/community/followers/");

// ✅ Get current user's following
export const getFollowing = () => API.get("/community/following/");
