import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../actions/communityActions";

export default function UserCard({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFollowing, setIsFollowing] = useState(user.is_following);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFollowToggle = async () => {
    if (isFollowing) {
      await dispatch(unfollowUser(user.id));
      setIsFollowing(false);
    } else {
      await dispatch(followUser({ following: user.id }));
      setIsFollowing(true);
    }
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleUnfollow = async () => {
    await dispatch(unfollowUser(user.id));
    setIsFollowing(false);
    handleMenuClose();
  };

  // ✅ Navigate to public profile
  const openProfile = () => navigate(`/community/profile/${user.id}`);

  return (
    <Card
      sx={{
        width: 250,
        m: 2,
        p: 2,
        textAlign: "center",
        cursor: "pointer",
        "&:hover": { boxShadow: 4 },
      }}
      onClick={openProfile} //  Entire card is clickable
    >
      <Avatar
        src={user.profile_picture}
        alt={user.username}
        sx={{ width: 60, height: 60, mx: "auto", mb: 1 }}
      />
      <CardContent>
        <Typography variant="h6">{user.username}</Typography>
        <Typography variant="body2" color="text.secondary">
          {user.bio || "No bio yet"}
        </Typography>

        <Box sx={{ mt: 2 }}>
          {!isFollowing ? (
            <Button
              variant="contained"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleFollowToggle();
              }}
            >
              Follow
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuOpen(e);
                }}
              >
                Following
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleUnfollow}>Unfollow</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
