import React from "react";
import { Box, Paper, Typography, Button, List, ListItem, Fade } from "@mui/material";
import { useNavigate,useLocation} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

function Welcome() {
  const navigate = useNavigate();
  const {state} =useLocation()
  const quiz =state?.quiz
  
  

  const handleLogin = () => {
    navigate("/quiz", { state: { quizType: quiz } })
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Fade in timeout={1000}>
      <Paper
        elevation={10}
        sx={{
          background: "white",
          p: 6,
          borderRadius: 3,
          width: "75%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          height: "600px",
        }}
      >
        {/* Heading */}
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 2,
            color: "#333",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          Welcome to the Quiz
        </Typography>

        {/* Body Section */}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            gap: 3,
            flexDirection: { xs: "column", md: "row" }, // responsive
          }}
        >
          {/* Left Side - Instructions */}
          <Box
            sx={{
              flex: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              pr: { md: 4 },
            }}
          >
            <Typography
              sx={{
                mb: 2,
                color: "#555",
                fontSize: "22px",
                lineHeight: 1.6,
              }}
            >
              This assessment is designed to evaluate your knowledge and
              problem-solving skills in programming and GD. Please read the
              following instructions carefully before starting.
            </Typography>

            <Typography
              sx={{
                mb: 2,
                color: "red",
                fontSize: "24px",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Instructions
            </Typography>

            <List sx={{ color: "#444", fontSize: "18px", lineHeight: 1.8 }}>
              <ListItem>
                The test consists of <strong> 5 Multiple Choice Questions (MCQs)</strong>.
              </ListItem>
              <ListItem>
                Each MCQ has a time limit of <strong>30 seconds</strong>.
              </ListItem>
              <ListItem>Ensure all the questions should be answered.</ListItem>
              <ListItem>Do not refresh or close the page during the test.</ListItem>
              <ListItem>
                Switching tabs or leaving the test window is <strong>strictly prohibited</strong>.
              </ListItem>
              <ListItem>Once submitted, answers cannot be modified.</ListItem>
              <ListItem>
                Ensure you have a stable internet connection before starting.
              </ListItem>
            </List>
          </Box>

          {/* Right Side - Button */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={handleLogin}
              variant="contained"
              size="large"
              sx={{  
                px: 4,
                py: 2,
                fontSize: "20px",
                borderRadius: "10px",
                backgroundColor: "#4caf50",
                "&:hover": {
                  backgroundColor: "#45a049",
                  transform: "scale(1.05)",
                },
                transition: "transform 0.2s, background 0.3s",
              }}
            >
              Start Test 🚀
            </Button>
          </Box>
        </Box>
      </Paper>
      </Fade>
    </Box>
  );
}

export default Welcome;
