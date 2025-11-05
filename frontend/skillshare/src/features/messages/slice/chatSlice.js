import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsersToChat,
  startChat,
  getMessages,
  sendMessage,
  getConversations, // new action to get conversations
} from "../actions/chatActions";

const initialState = {
  users: [],
  messages: [],
  currentChat: null,
  conversations: [], // New state for conversations
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearChatState: (state) => {
      state.messages = [];
      state.conversations = [];
      state.currentChat = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch Users
      .addCase(fetchUsersToChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersToChat.fulfilled, (state, action) => {
        state.loading = false;
        state.users = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.results || [];
      })
      .addCase(fetchUsersToChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Fetch Conversations
      .addCase(getConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Start Chat
      .addCase(startChat.fulfilled, (state, action) => {
        state.currentChat = action.payload;
      })
      .addCase(startChat.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 🔹 Get Messages
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Send Message

      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload); // append new message
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearChatState } = chatSlice.actions;
export default chatSlice.reducer;
