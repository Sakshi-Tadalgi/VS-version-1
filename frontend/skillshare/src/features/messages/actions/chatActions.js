import { createAsyncThunk } from "@reduxjs/toolkit";
import messagingService from "../services/chatService";
// 🔹 Fetch users for chat
export const fetchUsersToChat = createAsyncThunk(
  "chat/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await messagingService.getChatUsers();
      return Array.isArray(response) ? response : response?.users || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔹 Fetch conversations (new action)
export const getConversations = createAsyncThunk(
  "chat/getConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await messagingService.getConversations();
      return response; // Assuming it returns an array of conversations
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔹 Start a private chat
export const startChat = createAsyncThunk(
  "chat/startChat",
  async (userId, { rejectWithValue }) => {
    try {
      return await messagingService.startPrivateChat(userId);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔹 Get messages for a chat
export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (chatId, { rejectWithValue }) => {
    try {
      return await messagingService.getMessages(chatId);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔹 Send a message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatId, content }, { rejectWithValue }) => {
    try {
      return await messagingService.sendMessage({ chatId, content });
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
