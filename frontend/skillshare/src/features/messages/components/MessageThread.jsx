import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../actions/chatActions";
import { Box, Typography, CircularProgress } from "@mui/material";
import MessageInput from "./MessageInput"; // include message input for sending new messages

const MessageThread = () => {
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const { messages = [], loading, error } = useSelector((state) => state.chat);

  useEffect(() => {
    if (chatId) {
      dispatch(getMessages(chatId));
    }
  }, [dispatch, chatId]);

  if (loading)
    return <CircularProgress sx={{ display: "block", margin: "0 auto" }} />;

  // ✅ Safely handle error (avoid rendering an object)
  if (error)
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 2 }}>
        {typeof error === "string"
          ? error
          : error.message || error.error || JSON.stringify(error)}
      </Typography>
    );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Chat
      </Typography>

      {/* ✅ Chat Messages */}
      <Box
        sx={{
          border: "1px solid #ddd",
          borderRadius: 2,
          p: 2,
          mb: 2,
          height: "60vh",
          overflowY: "auto",
        }}
      >
        {messages.length > 0 ? (
          messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                mb: 1.5,
                p: 1.5,
                bgcolor: msg.is_sender ? "primary.light" : "grey.100",
                borderRadius: 2,
                alignSelf: msg.is_sender ? "flex-end" : "flex-start",
                maxWidth: "80%",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {msg.sender?.username || "Unknown"}:
              </Typography>
              <Typography variant="body1">{msg.content || ""}</Typography>
            </Box>
          ))
        ) : (
          <Typography sx={{ textAlign: "center", color: "grey.600" }}>
            No messages yet. Start the conversation below 👇
          </Typography>
        )}
      </Box>

      {/* ✅ Message Input */}
      <MessageInput chatId={chatId} />
    </Box>
  );
};

export default MessageThread;
