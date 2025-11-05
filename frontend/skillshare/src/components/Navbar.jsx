import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useScrollTrigger,
  Slide,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeToggleButton from "./ThemeToggleButton";
import { useSelector } from "react-redux";

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  boxShadow: theme.shadows[4],
  transition: "all 0.3s ease",
}));

const AnimatedToolbar = styled(Toolbar)({
  transition: "all 0.3s ease",
});

// Hide AppBar on scroll
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);

  return (
    <HideOnScroll>
      <StyledAppBar position="sticky">
        <AnimatedToolbar>
          {/* Optional: Show menu icon if logged in */}
          {isAuthenticated && (
            <IconButton color="inherit" sx={{ mr: 2 }}>
              <MenuIcon sx={{ fontSize: "1.8rem" }} />
            </IconButton>
          )}
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: "0.5px",
              textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            SkillShare
            <Box component="span" sx={{ color: "secondary.main", ml: 1 }}>
              Pro
            </Box>
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "& > *:not(:last-child)": {
                mr: 2,
              },
            }}
          >
            <ThemeToggleButton />
          </Box>
        </AnimatedToolbar>
      </StyledAppBar>
    </HideOnScroll>
  );
}
