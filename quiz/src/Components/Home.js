import React from "react";
import { Box, Paper, Typography, Button, Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    
      }}
    >
      <Fade in timeout={1000}>
      <Paper
        elevation={8}
        sx={{ p: 6, borderRadius: 3, maxWidth: 600, textAlign: "center" }}
      >
        <Typography variant="h3" sx={{ mb: 3 }}>
          Welcome to the Quiz App 🚀
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Test your knowledge in Various Quizzes and improve your skills.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ px: 5, py: 1.5, fontSize: "20px" }}
          onClick={() => navigate("/login")}
        >
          Get Started
        </Button>
      </Paper>
      </Fade>
    </Box>
  );
}

export default Home;
