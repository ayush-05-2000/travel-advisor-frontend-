import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo or Brand */}
        <Typography variant="h5" fontWeight="bold" sx={{ cursor: "pointer" }}>
          T Guide
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button color="inherit" sx={{ fontWeight: "bold" }} href="/">
            Home
          </Button>
          <Button color="inherit" sx={{ fontWeight: "bold" }} href="/destinations">
            Destinations
          </Button>
          <Button color="inherit" sx={{ fontWeight: "bold" }} href="/trips">
            Trips
          </Button>
          <Button color="inherit" sx={{ fontWeight: "bold" }} href="/about">
            About Us
          </Button>
          <Button color="inherit" sx={{ fontWeight: "bold" }} href="/contact">
            Contact
          </Button>
        </Box>

        {/* Login Button */}
        <Button
          variant="contained"
          color="secondary"
          href="/"
          sx={{ fontWeight: "bold", boxShadow: "none", borderRadius: 8 }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
