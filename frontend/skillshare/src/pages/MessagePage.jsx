import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/messages/actions/chatActions"; // Fetch conversations
import MessageList from "../features/messages/components/MessageList";
import { Box, CircularProgress, Typography } from "@mui/material";
import ChatRoom from "../features/messages/components/ChatRoom";

const MessagePage = () => {
  const dispatch = useDispatch();
  const { conversations, loading, error } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(getConversations()); // Fetch the list of conversations
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Your Messages
      </Typography>

      {/* Loading State */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Error Handling */}
      {error && (
        <Typography color="error" textAlign="center" mt={4}>
          {error}
        </Typography>
      )}
      <ChatRoom />
      {/* Display Conversations */}
      {!loading && !error && <MessageList conversations={conversations} />}
    </Box>
  );
};

export default MessagePage;
