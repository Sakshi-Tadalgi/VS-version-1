import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/community/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <Typography>Loading profile...</Typography>;

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      {/* Profile Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Avatar
          src={profile.profile_picture}
          alt={profile.username}
          sx={{ width: 80, height: 80, mr: 2 }}
        />
        <Box>
          <Typography variant="h5">{profile.username}</Typography>
          <Typography variant="body2">{profile.bio}</Typography>
          <Typography variant="caption">
            Expertise: {profile.expertise}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Followers & Following Counts */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body1">
          Followers: {profile.followers?.length || 0}
        </Typography>
        <Typography variant="body1">
          Following: {profile.following?.length || 0}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Followers List */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Followers
      </Typography>
      <List>
        {profile.followers?.length > 0 ? (
          profile.followers.map((follower) => (
            <ListItem key={follower.id}>
              <Avatar src={follower.profile_picture} sx={{ mr: 2 }} />
              <ListItemText
                primary={
                  <Link
                    to={`/community/profile/${follower.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {follower.username}
                  </Link>
                }
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body2">No followers yet.</Typography>
        )}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Following List */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Following
      </Typography>
      <List>
        {profile.following?.length > 0 ? (
          profile.following.map((followed) => (
            <ListItem key={followed.id}>
              <Avatar src={followed.profile_picture} sx={{ mr: 2 }} />
              <ListItemText
                primary={
                  <Link
                    to={`/community/profile/${followed.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {followed.username}
                  </Link>
                }
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body2">Not following anyone yet.</Typography>
        )}
      </List>
    </Box>
  );
}
