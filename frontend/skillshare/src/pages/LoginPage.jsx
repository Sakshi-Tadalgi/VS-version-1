import LoginForm from "../features/auth/components/LoginForm";
import { Container, Typography } from "@mui/material";

export default function LoginPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <LoginForm />
    </Container>
  );
}
