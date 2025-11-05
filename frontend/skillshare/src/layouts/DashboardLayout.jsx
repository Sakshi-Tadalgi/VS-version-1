import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Container sx={{ mt: 4 }}>{children}</Container>
      </Box>
    </Box>
  );
}
