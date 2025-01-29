import React from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home"); // Navigate directly to home page
  };

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url("/login.webp")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Dark overlay for better text visibility */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
          zIndex: 1,
        }}
      />

      <Paper
        elevation={10}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
          color: "#fff",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
        >
          Welcome!
        </Typography>
        <Typography variant="body1" mb={3} sx={{ opacity: 0.9 }}>
          Explore Nepal Like Never Before!
        </Typography>

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="dense"
          name="email"
          InputProps={{ style: { color: "#fff" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#fff" },
              "&:hover fieldset": { borderColor: "#ccc" },
              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
            },
            "& label": { color: "#fff" },
            "& label.Mui-focused": { color: "#1976d2" },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="dense"
          name="password"
          InputProps={{ style: { color: "#fff" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#fff" },
              "&:hover fieldset": { borderColor: "#ccc" },
              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
            },
            "& label": { color: "#fff" },
            "& label.Mui-focused": { color: "#1976d2" },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{
            mt: 3,
            fontSize: "1rem",
            fontWeight: "bold",
            background: "linear-gradient(to right, #1976d2, #42a5f5)",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            "&:hover": { background: "linear-gradient(to right, #42a5f5, #1976d2)" },
          }}
        >
          Login
        </Button>

        <Typography variant="body2" mt={2}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#fff", fontWeight: "bold" }}>
            Sign Up
          </a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
