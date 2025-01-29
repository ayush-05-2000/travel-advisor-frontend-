import React from "react";
import { Box, Button, Typography } from "@mui/material";

const LandingPage = () => {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url("/mount-everest.jpg")`, // Accessing image from public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 3,
      }}
    >
      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark overlay
          zIndex: 1,
        }}
      ></Box>

      {/* Content Wrapper */}
      <Box sx={{ position: "relative", zIndex: 2, color: "white" }}>
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "2.5rem", sm: "4rem" },
            textShadow: "2px 2px 4px rgba(0,0,0,0.8)", // Text shadow for better visibility
          }}
        >
          Adventure Awaits
        </Typography>
        <Typography
          variant="h6"
          mt={2}
          sx={{
            maxWidth: "600px",
            textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
            fontWeight: "300",
          }}
        >
          Discover Nepal Your Way!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 4,
            px: 4,
            py: 1,
            fontSize: "1.2rem",
            fontWeight: "bold",
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#135ba1",
            },
          }}
          onClick={() => window.location.href = "/login"}
        >
          Let's Explore
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
