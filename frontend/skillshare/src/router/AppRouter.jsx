import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "../components/ProtectedRoute";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import SkillPage from "../pages/SkillPage";
import WorkshopPage from "../pages/WorkshopPage";
import MessagePage from "../pages/MessagePage";
import FeedbackPage from "../pages/FeedbackPage";
import CommunityPage from "../pages/CommunityPage";
import NotificationPage from "../pages/NotificationPage";
import AdminPanelPage from "../pages/AdminPanelPage";
import PublicProfilePage from "../pages/PublicProfilePage";
import CommunityRoutes from "../features/community/router/communityRoutes";
import DashboardPage from "../pages/DashboardPage";
import PrivateProfilePage from "../pages/PrivateProfile";

export default function AppRouter() {
  const { token, user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute isAuthenticated={!!token} />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/private-profile" element={<PrivateProfilePage />} />
        <Route path="/skills" element={<SkillPage />} />
        <Route path="/workshops" element={<WorkshopPage />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/*" element={<CommunityRoutes />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
      </Route>
      <Route path="/public-profile" element={<PublicProfilePage />} />
      <Route
        path="/admin"
        element={<ProtectedRoute isAuthenticated={!!token && user?.is_admin} />}
      >
        <Route index element={<AdminPanelPage />} />
      </Route>
    </Routes>
  );
}
