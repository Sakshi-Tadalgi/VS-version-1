import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../auth/slice/authSlice";

export default function FollowButton({ userId }) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);

  const isFollowing = loggedInUser?.following?.includes(userId);

  const handleFollow = () => {
    dispatch(followUser(userId));
  };

  return (
    <Button
      variant="contained"
      color={isFollowing ? "success" : "primary"}
      onClick={handleFollow}
      disabled={isFollowing}
      sx={{ mt: 2 }}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
