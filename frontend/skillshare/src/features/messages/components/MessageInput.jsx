import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { sendMessage } from "../actions/chatActions";

const MessageInput = ({ chatId }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(sendMessage({ chatId, content: message }));
      setMessage("");
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <TextField
        fullWidth
        label="Type your message"
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button variant="contained" onClick={handleSendMessage}>
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;
