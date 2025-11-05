import { configureStore } from "@reduxjs/toolkit";

// Import slices from each feature
import authReducer from "../features/auth/slice/authSlice";
import skillReducer from "../features/skills/slice/skillSlice";
import workshopReducer from "../features/workshops/slice/workshopSlice";
import feedbackReducer from "../features/feedback/slice/feedbackSlice";
import communityReducer from "../features/community/slice/communitySlice";
import notificationReducer from "../features/notifications/slice/notificationSlice";
import adminReducer from "../features/adminpanel/slice/adminSlice";
import chatReducer from "../features/messages/slice/chatSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    skills: skillReducer,
    workshops: workshopReducer,
    chat: chatReducer,
    feedback: feedbackReducer,
    community: communityReducer,
    notifications: notificationReducer,
    admin: adminReducer,
  },
});
