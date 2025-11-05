import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Grid,
  Paper,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import SkillList from "../features/skills/components/SkillList"; // Assuming you have SkillList component

export default function PublicProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get(`/community/profile/${id}/`);
        setProfile(res.data);

        // Fetch user skills
        const skillRes = await API.get(`/skills/user/${id}/`);
        setSkills(skillRes.data || []);

        // Check follow status
        const followRes = await API.get(`/community/is-following/${id}/`);
        setIsFollowing(followRes.data.is_following);
      } catch (error) {
        console.error("Error fetching public profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await API.post(`/community/unfollow/${id}/`);
      } else {
        await API.post(`/community/follow/${id}/`);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };

  const handleStartChatting = () => {
    // Navigate to the chat page or open the chat modal
    navigate(`/messages?user=${id}`);
  };

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
        User not found
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
        </Box>
        {/* Bio */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            About
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            {profile.bio || "This user hasn’t added a bio yet."}
          </Typography>
        </Box>
        {/* Skills */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Skills
          </Typography>
          <SkillList skills={skills} />
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
        {/* Start Chatting Button */}
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleStartChatting}
          >
            Start Chatting
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
