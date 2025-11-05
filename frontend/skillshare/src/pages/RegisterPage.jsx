import RegisterForm from "../features/auth/components/RegisterForm";
import { Container, Typography } from "@mui/material";

export default function RegisterPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <RegisterForm />
    </Container>
  );
}
