import React, { useReducer } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { Box, Typography, Paper, Button, TextField, Rating, Alert, Fade } from "@mui/material";

// Initial state
const initialState = {
  rating: 0,
  feedback: "",
  submitted: false,
};

// Reducer
const feedbackReducer = (state, action) => {
  switch (action.type) {
    case "SET_RATING":
      return { ...state, rating: action.payload };
    case "SET_FEEDBACK":
      return { ...state, feedback: action.payload };
    case "SET_SUBMITTED":
      return { ...state, submitted: action.payload };
    case "RESET_FEEDBACK":
      return initialState;
    default:
      return state;
  }
};

function Feedback() {
  const {state:located}=useLocation()
  const quiz_type= located?.quiz_type
  const [state, dispatch] = useReducer(feedbackReducer, initialState);
  const { rating, feedback, submitted } = state;
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Feedback submitted:", { rating, feedback });
    dispatch({ type: "SET_SUBMITTED", payload: true });
    alert("Thank you for your feedback!");
  };

  const handleViewResults = () => {
    navigate("/results",{state:{quiz_type:quiz_type}}); // Navigate to MyResults page
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #74ABE2, #5563DE)",
        p: 3,
      }}
    >
      <Fade in timeout={1000}>
        <Paper
          elevation={10}
          sx={{
            backgroundColor: "#fff",
            p: { xs: 3, sm: 5 },
            borderRadius: "20px",
            maxWidth: "700px",
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, color: "#333", fontWeight: "bold" }}>
            Thank you for completing the test!
          </Typography>

          <Typography variant="h6" sx={{ mb: 3, color: "#555" }}>
            We would love to hear your thoughts.
          </Typography>

          {submitted && (
            <Alert
              severity="success"
              sx={{
                mb: 3,
                borderRadius: 2,
                fontSize: "18px",
                justifyContent: "center",
                width: "100%",
              }}
            >
              ✓ Feedback submitted successfully!
            </Alert>
          )}

          {/* Rating */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: "600", mb: 1 }}>
              Rate your experience:
            </Typography>
            <Rating
              name="user-rating"
              value={rating}
              onChange={(e, newValue) =>
                !submitted && dispatch({ type: "SET_RATING", payload: newValue })
              }
              precision={1}
              size="large"
              sx={{ fontSize: "40px" }}
              readOnly={submitted}
            />
          </Box>

          {/* Feedback Text */}
          <Box sx={{ mb: 4, width: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: "600", mb: 1 }}>
              Additional feedback:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={5}
              value={feedback}
              onChange={(e) => dispatch({ type: "SET_FEEDBACK", payload: e.target.value })}
              placeholder="Write your feedback here..."
              disabled={submitted}
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "18px",
                  borderRadius: "12px",
                },
              }}
            />
          </Box>

          {/* Buttons */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
            {!submitted ? (
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                sx={{
                  px: 5,
                  py: 1.5,
                  fontSize: "20px",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  backgroundColor: "#3399ff",
                  "&:hover": { backgroundColor: "#2673cc", transform: "scale(1.05)" },
                  transition: "transform 0.2s, background 0.3s",
                }}
              >
                Submit Feedback
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                onClick={handleViewResults}
                sx={{
                  px: 5,
                  py: 1.5,
                  fontSize: "20px",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  backgroundColor: "#4caf50",
                  "&:hover": { backgroundColor: "#3e8e41", transform: "scale(1.05)" },
                  transition: "transform 0.2s, background 0.3s",
                }}
              >
                View My Results
              </Button>
            )}
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}

export default Feedback;
