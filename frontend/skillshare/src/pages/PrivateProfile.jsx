import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ added for navigation
import API from "../services/api";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import SkillList from "../features/skills/components/SkillList";

export default function PrivateProfilePage() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate(); // ✅ hook for page navigation
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userSkills, setUserSkills] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileRes = await API.get(`/community/profile/${user.id}/`);
        setProfile(profileRes.data);

        const skillsRes = await API.get(`/skills/user/${user.id}/`);
        setUserSkills(skillsRes.data || []);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchProfileData();
  }, [user]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Typography variant="h6" textAlign="center" mt={5}>
        Profile not found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        px: 2,
        py: 5,
        bgcolor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 800,
          borderRadius: 4,
          p: { xs: 3, sm: 5 },
          bgcolor: "white",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Avatar
              sx={{
                width: 90,
                height: 90,
                bgcolor: "primary.main",
                fontSize: 36,
              }}
            >
              {profile.username[0]?.toUpperCase()}
            </Avatar>

            <Box>
              <Typography variant="h5" fontWeight="bold">
                {profile.username}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                {profile.expertise || "No expertise specified"}
              </Typography>
            </Box>
          </Box>

          {/* ✅ Edit Button → navigate to editable profile */}
          <IconButton color="primary" onClick={() => navigate("/profile")}>
            <Edit fontSize="medium" />
          </IconButton>
        </Box>

        {/* Bio */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            About
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            {profile.bio || "You haven’t added a bio yet."}
          </Typography>
        </Box>

        {/* Skills */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Your Skills
          </Typography>
          <SkillList skills={userSkills} />
        </Box>

        {/* Followers / Following */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper
              elevation={2}
              sx={{
                py: 3,
                textAlign: "center",
                borderRadius: 3,
                bgcolor: "#f5f7fa",
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="primary.main">
                {profile.followers?.length || 0}
              </Typography>
              <Typography color="text.secondary">Followers</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              elevation={2}
              sx={{
                py: 3,
                textAlign: "center",
                borderRadius: 3,
                bgcolor: "#f5f7fa",
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="primary.main">
                {profile.following?.length || 0}
              </Typography>
              <Typography color="text.secondary">Following</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
