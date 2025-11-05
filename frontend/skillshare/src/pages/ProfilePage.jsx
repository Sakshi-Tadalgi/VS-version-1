import ProfileEditor from "../features/auth/components/ProfileEditor";
import UserSettingsForm from "../features/auth/components/UserSettingsForm";
import { Container, Typography } from "@mui/material";

export default function ProfilePage() {
  return (
    <Container sx={{ mt: 4 }}>
      <ProfileEditor />
      {/* <UserSettingsForm /> */}
    </Container>
  );
}
