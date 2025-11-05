import { Routes, Route } from "react-router-dom";
import SkillPage from "../../../pages/SkillPage";
import PublicProfilePage from "../../../pages/PublicProfilePage";

export default function SkillRoutes() {
  return (
    <Routes>
      <Route path="/skills" element={<SkillPage />} />
      <Route path="/public-profile" element={<PublicProfilePage />} />
    </Routes>
  );
}
