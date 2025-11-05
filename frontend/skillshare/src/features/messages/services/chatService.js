import API from "../../../services/api"; // adjust path if needed

const messagingService = {
  // ✅ Get all conversations
  getConversations: async () => {
    try {
      const res = await API.get("/message/conversations/");
      return res.data;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  },

  // ✅ Get all chat users
  getChatUsers: async () => {
    try {
      const res = await API.get("/message/users/");
      return res.data;
    } catch (error) {
      console.error("Error fetching chat users:", error);
      throw error;
    }
  },

  // ✅ Start private chat
  //   startChat: async (userId) => {
  //     try {
  //       const res = await API.post("/message/start_chat/", { user_id: userId });
  //       return res.data;
  //     } catch (error) {
  //       console.error(`Error starting chat with user ${userId}:`, error);
  //       throw error;
  //     }
  //   },
  startPrivateChat: async (username) => {
    const res = await API.post("/message/start_chat/", { username });
    return res.data;
  },

  // ✅ Get messages for a thread/chat
  getMessages: async (threadId) => {
    try {
      const res = await API.get(`/message/messages/${threadId}/`);
      return res.data;
    } catch (error) {
      console.error(`Error fetching messages for thread ${threadId}:`, error);
      throw error;
    }
  },

  // ✅ Send message
  sendMessage: async ({ chatId, content }) => {
    try {
      const res = await API.post("/message/send_message/", {
        chat_id: chatId,
        content,
      });
      return res.data;
    } catch (error) {
      console.error(`Error sending message to chat ${chatId}:`, error);
      throw error;
    }
  },
};

export default messagingService;
