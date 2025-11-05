import React from "react";
import { Box } from "@mui/material";
import MessageThread from "./MessageThread";

const ChatRoom = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <MessageThread />
    </Box>
  );
};

export default ChatRoom;
