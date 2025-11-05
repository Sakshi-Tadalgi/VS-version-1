import SkillForm from "../features/skills/components/SkillForm";
import SkillList from "../features/skills/components/SkillList";
import { Container, Typography } from "@mui/material";

export default function SkillPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <SkillForm />
    </Container>
  );
}
