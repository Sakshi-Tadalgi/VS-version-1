import { Typography, Container, Box, Button } from "@mui/material";
import { keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function HomePage() {
  const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  `;
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "100vh",
        background: `
          linear-gradient(135deg, rgba(12, 35, 64, 0.9) 0%, rgba(24, 60, 115, 0.8) 100%),
          url('https://source.unsplash.com/1920x1080/?creative-class,learing')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container sx={{ animation: `${fadeIn} 1s ease-out` }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            mb: 3,
            textShadow: "0 4px 12px rgba(0,0,0,0.2)",
            letterSpacing: "1.5px",
          }}
        >
          Discover Creative Classes with SkillShare
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 5,
            fontWeight: 300,
            lineHeight: 1.6,
            maxWidth: 800,
            mx: "auto",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          Explore a wide range of classes from skilled professionals. Join now
          to ignite your creativity and learn with passion.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "center",
            "& button": {
              transition: "all 0.3s ease",
              backdropFilter: "blur(8px)",
              borderRadius: "12px",
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
            },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              bgcolor: "rgba(255,255,255,0.15)",
              "&:hover": {
                transform: "translateY(-2px)",
                bgcolor: "rgba(255,255,255,0.25)",
                boxShadow: "0 8px 24px rgba(0,98,255,0.3)",
              },
            }}
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            sx={{
              borderWidth: "2px",
              "&:hover": {
                transform: "translateY(-2px)",
                bgcolor: "rgba(255,255,255,0.1)",
                borderWidth: "2px",
              },
            }}
            onClick={() => alert("Join Community")}
          >
            Join Community
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
