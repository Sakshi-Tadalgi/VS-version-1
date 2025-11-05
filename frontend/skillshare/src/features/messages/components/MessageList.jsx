import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import messagingService from "../services/chatService";

const MessageList = ({ conversations, loading, error }) => {
  const [username, setUsername] = useState("");
  const [starting, setStarting] = useState(false);
  const navigate = useNavigate();

  const handleStartChat = async () => {
    if (!username.trim()) return alert("Please enter a username");
    try {
      setStarting(true);
      const response = await messagingService.startPrivateChat(username);
      navigate(`/chat-room/${response.id}`);
    } catch (err) {
      console.error("Error starting chat:", err);
      alert("Failed to start chat. User not found or already in chat.");
    } finally {
      setStarting(false);
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", height: "60vh" }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" textAlign="center" mt={4}>
        {error}
      </Typography>
    );

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Your Conversations
      </Typography>

      {conversations.length > 0 ? (
        conversations.map((convo) => (
          <Box key={convo.id} sx={{ mb: 2 }}>
            <Link
              to={`/chat-room/${convo.id}`}
              style={{ textDecoration: "none" }}
            >
              <Button fullWidth variant="outlined">
                {convo.user.username}
              </Button>
            </Link>
          </Box>
        ))
      ) : (
        <Typography>No conversations available</Typography>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Start a New Chat
        </Typography>
        <TextField
          fullWidth
          label="Enter username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          fullWidth
          sx={{ mt: 2 }}
          variant="contained"
          onClick={handleStartChat}
          disabled={starting}
        >
          {starting ? "Starting..." : "Start Chat"}
        </Button>
      </Box>
    </Box>
  );
};

export default MessageList;
