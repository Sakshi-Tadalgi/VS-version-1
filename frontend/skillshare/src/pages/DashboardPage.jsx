import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import {
  Group,
  Chat,
  School,
  Feedback,
  Notifications,
  Logout,
} from "@mui/icons-material";
import { logout } from "../features/auth/slice/authSlice"; // adjust if needed

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // ✅ Navigate to private profile page
  const handleProfileClick = () => {
    navigate("/private-profile");
  };

  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  const sections = [
    {
      title: "Community",
      description: "Connect and collaborate with others.",
      icon: <Group fontSize="large" color="primary" />,
      path: "/community",
    },
    {
      title: "Messages",
      description: "Chat with your connections.",
      icon: <Chat fontSize="large" color="primary" />,
      path: "/messages",
    },
    {
      title: "Workshops",
      description: "Host or attend skill-sharing sessions.",
      icon: <School fontSize="large" color="primary" />,
      path: "/workshops",
    },
    {
      title: "Feedback",
      description: "Share your feedback to improve the platform.",
      icon: <Feedback fontSize="large" color="primary" />,
      path: "/feedback",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8f9fa" }}>
      {/* ✅ Navbar */}
      <AppBar position="static" color="primary" sx={{ mb: 4 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            SkillShare Dashboard
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Notifications */}
            <IconButton color="inherit" onClick={handleNotificationClick}>
              <Notifications />
            </IconButton>

            {/* ✅ Avatar → Opens Private Profile */}
            <Avatar
              alt={user?.username || "User"}
              src={user?.avatar || ""}
              sx={{
                bgcolor: "secondary.main",
                cursor: "pointer",
                "&:hover": { transform: "scale(1.1)" },
              }}
              onClick={handleProfileClick}
            >
              {user?.username?.[0]?.toUpperCase()}
            </Avatar>

            {/* Logout */}
            <IconButton color="inherit" onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ✅ Welcome Section */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
          Welcome, {user?.username || "User"} 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your skills, connect with others, and explore opportunities!
        </Typography>
      </Box>

      {/* ✅ Dashboard Cards */}
      <Box sx={{ px: 4 }}>
        <Grid container spacing={3}>
          {sections.map((section, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card
                onClick={() => navigate(section.path)}
                sx={{
                  p: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6, transform: "scale(1.03)" },
                }}
              >
                <CardContent>
                  {section.icon}
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {section.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {section.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
