import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersToChat } from "../features/chat/chatSlice";
import {
  Button,
  CircularProgress,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";

const Messages = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchUsersToChat()); // Fetch users to chat with
  }, [dispatch]);

  // Safeguard for users data
  const userList = Array.isArray(users?.results)
    ? users.results
    : Array.isArray(users)
    ? users
    : [];

  if (loading) {
    return (
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
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Your Messages
      </Typography>

      {userList.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 2,
          }}
        >
          {userList.map((user) => (
            <Card
              key={user.id}
              sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Avatar src={user.profile_image || ""}>
                  {user.username?.[0]?.toUpperCase() || "U"}
                </Avatar>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {user.username}
                </Typography>
              </CardContent>

              <Link to={`/chat-room/${user.id}`}>
                <Button variant="contained" color="primary">
                  Start Chat
                </Button>
              </Link>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography textAlign="center" mt={4}>
          No users available to chat with.
        </Typography>
      )}
    </Box>
  );
};

export default Messages;
