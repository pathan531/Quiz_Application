import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, TextField, Button, Stack, Typography, Fade, InputAdornment } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import LoginIcon from "@mui/icons-material/Login";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useAuth0 } from "@auth0/auth0-react";
const initialState = {
  email: "",
  password: "",
  error: "",
  success: "",
  emailError: "",
  passwordError: "",
};

function reducer(state, action) {
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

function Login() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loginWithRedirect,isLoading} = useAuth0();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  const handleGoogle = async () => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          connection: "google-oauth2",
          prompt: "select_account",
          audience: "https://quiz-api.local",
          scope: "openid profile email",
          redirect_uri: window.location.origin + "/course",
        },
  
      });
    } catch (err) {
      dispatch({ type: "SET_ERROR", field: "error", value: "Google login failed" });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_ERROR", field: "error", value: "" });
    dispatch({ type: "SET_ERROR", field: "emailError", value: "" });
    dispatch({ type: "SET_ERROR", field: "passwordError", value: "" });
    dispatch({ type: "SET_SUCCESS", value: "" });

    let isValid = true;

    if (!state.email.trim()) {
      dispatch({ type: "SET_ERROR", field: "emailError", value: "Email is required" });
      isValid = false;
    } else if (!validateEmail(state.email)) {
      dispatch({ type: "SET_ERROR", field: "emailError", value: "Invalid email format!" });
      isValid = false;
    }

    if (!state.password.trim()) {
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

    if (!isValid) return;

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: state.email, password: state.password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email",state.email)
        sessionStorage.setItem("role", data.role);
        dispatch({ type: "SET_SUCCESS", value: "Login successful" });
        console.log(data.token)
        // navigate("/course")
        if(data.role === "user"){
          return navigate("/course")
        }
        if(data.role === "admin"){
          return navigate("/courses")
        }
      }
  
    } catch (err) {
      dispatch({ type: "SET_ERROR", field: "error", value: "Server error: " + err.message });
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h5">Processing authentication...</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="90vh" p={2} sx={{background: "linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)"}}
    >
      <Fade in timeout={1000}>
        <Paper elevation={4} sx={{ p: 5, borderRadius: 3, width: "100%", maxWidth: 600 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="primary">
              Welcome Back 👋
            </Typography>
            <Typography align="center" color="text.secondary" mb={2}>
              Login to continue your quiz journey!
            </Typography>
            <Stack spacing={3}>
              <TextField
                label="Email"
                fullWidth
                type="email"
                value={state.email}
                onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "email", value: e.target.value })}
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
              <TextField
                label="Password"
                fullWidth
                type="password"
                value={state.password}
                onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "password", value: e.target.value })}
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

              <Button type="submit" variant="contained" color="primary" fullWidth endIcon={<LoginIcon />}>
                Login
              </Button>

              <Typography align="center" variant="body1" color="text.secondary">
                Don't have an account?{" "}
                <Button color="primary" onClick={() => navigate("/register")}>
                  Sign up
                </Button>
              </Typography>

              <Typography align="center" variant="body1">
                OR
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                fullWidth
                startIcon={<GoogleIcon />}
                onClick={handleGoogle}
              >
                Google
              </Button>

              {state.error && <Typography color="error" align="center">{state.error}</Typography>}
              {state.success && <Typography color="success.main" align="center">{state.success}</Typography>}
            </Stack>
          </form>
        </Paper>
      </Fade>
    </Box>
  );
}

export default Login;
