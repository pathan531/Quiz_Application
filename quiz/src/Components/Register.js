import React, { useEffect, useReducer, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button, Paper, Stack, Fade,InputAdornment,InputProps } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LoginIcon from "@mui/icons-material/Login";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
const initialState = {
  name: "",
  email: "",
  password: "",
  confirmpass: "",
  nameError: "",
  emailError: "",
  passwordError: "",
  confirmError: "",
  success: "",
};

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERROR":
      return { ...state, [action.field]: action.value };
    case "SET_SUCCESS":
      return { ...state, success: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function Register() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    dispatch({ type: "SET_ERROR", field: "nameError", value: "" });
    dispatch({ type: "SET_ERROR", field: "emailError", value: "" });
    dispatch({ type: "SET_ERROR", field: "passwordError", value: "" });
    dispatch({ type: "SET_ERROR", field: "confirmError", value: "" });
    dispatch({ type: "SET_SUCCESS", value: "" });

    let isValid = true;

    if (!state.name.trim()) {
      dispatch({ type: "SET_ERROR", field: "nameError", value: "Username is required" });
      isValid = false;
    }

    if (!state.email.trim()) {
      dispatch({ type: "SET_ERROR", field: "emailError", value: "Email is required" });
      isValid = false;
    } else if (!validateEmail(state.email)) {
      dispatch({ type: "SET_ERROR", field: "emailError", value: "Invalid email format!" });
      isValid = false;
    }

    if (!state.password) {
      dispatch({ type: "SET_ERROR", field: "passwordError", value: "Password is required" });
      isValid = false;
    } else if (!validatePassword(state.password)) {
      dispatch({
        type: "SET_ERROR",
        field: "passwordError",
        value: "Password must be at least 8 characters, include 1 uppercase letter and 1 number.",
      });
      isValid = false;
    }

    if (!state.confirmpass) {
      dispatch({ type: "SET_ERROR", field: "confirmError", value: "Confirm password is required" });
      isValid = false;
    } else if (state.password !== state.confirmpass) {
      dispatch({ type: "SET_ERROR", field: "confirmError", value: "Passwords do not match" });
      isValid = false;
    }

    if (!isValid) return;

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: state.name,
          email: state.email,
          password: state.password,
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        dispatch({
          type: "SET_SUCCESS",
          value: "Registration done successfully, Redirecting to login page",
        });

        setTimeout(() => {
          dispatch({ type: "RESET" });
          navigate("/login");
        }, 2000);
      } else {
        dispatch({
          type: "SET_ERROR",
          field: "emailError",
          value: "Registration failed due to email already exists",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      className="container"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",

        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 2,
      }}
    >
      <Fade in timeout={1000}>
      <Paper
        elevation={4}
        sx={{
          p: 5,
          borderRadius: 3,
          width: "100%",
          maxWidth: 600,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" align="center" color="info.main" gutterBottom>
          Registration Form
        </Typography>

        <Stack spacing={2} component="form" onSubmit={handleSubmit}>
          {/* Username */}
          <TextField
            label="Username"
            fullWidth
            value={state.name}
            onChange={(e) =>
              dispatch({ type: "UPDATE_FIELD", field: "name", value: e.target.value })
            }
            error={!!state.nameError}
            helperText={state.nameError}
          />

          {/* Email */}
          <TextField
            label="Email"
            fullWidth
            type="email"
            value={state.email}
            variant="outlined"
            onChange={(e) =>
              dispatch({ type: "UPDATE_FIELD", field: "email", value: e.target.value })
            }
            error={!!state.emailError}
            helperText={state.emailError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
          <TextField
            label="Password"
            fullWidth
            type="password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "UPDATE_FIELD", field: "password", value: e.target.value })
            }
            error={!!state.passwordError}
            helperText={state.passwordError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Confirm Password */}
          <TextField
            label="Confirm Password"
            fullWidth
            type="password"
            value={state.confirmpass}
            onChange={(e) =>
              dispatch({ type: "UPDATE_FIELD", field: "confirmpass", value: e.target.value })
            }
            error={!!state.confirmError}
            helperText={state.confirmError}
          />

          {/* Buttons */}
          <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              endIcon={<SendIcon/>}
              sx={{ fontSize: "18px", py: 1.5, width: "48%" }}
            >
              Submit
            </Button>

            <Button
              variant="contained"
              endIcon={<LoginIcon/>}
              color="success"
              onClick={() => navigate("/login")}
              sx={{ fontSize: "18px", py: 1.5, width: "48%" }}
            >
              Login
            </Button>
          </Stack>

          {/* Success Message */}
          {state.success && (
            <Typography
              sx={{
                color: "green",
                textAlign: "center",
                fontSize: "16px",
                mt: 2,
                bgcolor: "#d4edda",
                p: 1,
                borderRadius: 1,
              }}
            >
              {state.success}
            </Typography>
          )}
        </Stack>
      </Paper>
      </Fade>
    </Box>
  );
}

export default Register;
