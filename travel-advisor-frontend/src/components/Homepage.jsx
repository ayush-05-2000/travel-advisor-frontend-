import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Navbar from "./Navbar";

const HomePage = () => {
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          backgroundImage: `url("/Homepage.png")`, // Accessing the image from public folder
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          px: 3,
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{ fontSize: { xs: "2.5rem", sm: "4rem" }, textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
        >
          Hello Guest!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4, px: 4, py: 1, fontSize: "1.2rem", fontWeight: "bold" }}
          onClick={() => window.location.href = "/destinations"}
        >
          Let's Start
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
