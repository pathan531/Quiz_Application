import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth0();
  const Normalrole = sessionStorage.getItem("role"); // "user" or "admin"
  const AuthRole=localStorage.getItem("role")
  const role=Normalrole || AuthRole
  const localToken = localStorage.getItem("token") || sessionStorage.getItem("authtoken");

  const buttonStyle = { fontSize: '1.5rem', padding: '8px 20px' };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    logout({ logoutParams: { returnTo: window.location.origin } });
    navigate("/home");
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #1565c0 0%, #26c6da 100%)' }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', letterSpacing: 1, cursor: 'pointer' }}
          onClick={() => navigate("/")}
        >
          Quiz App
        </Typography>

        <Box>
          <Button sx={buttonStyle} color="inherit" onClick={handleLogout}>
            Home
          </Button>

          {!isAuthenticated && !localToken ? (
            <>
              <Button
                sx={buttonStyle}
                color="inherit"
                onClick={() => navigate("/login")} // Student login page
              >
                Student
              </Button>
              <Button
                sx={buttonStyle}
                color="inherit"
                onClick={() => navigate("/login", { state: { role: "admin" } })} // Admin login page
              >
                Admin
              </Button>
              <Button sx={buttonStyle} color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          ) : (
            <>
              {/* Student role */}
              {role === "user" && (
                <>
                  <Button sx={buttonStyle} color="inherit" onClick={() => navigate("/course")}>
                    My Quizzes
                  </Button>
                  <Button sx={buttonStyle} color="inherit" onClick={() => navigate("/results")}>
                    My Results
                  </Button>
                </>
              )}

              {/* Admin role */}
              {role === "admin" && (
                <>
                  <Button sx={buttonStyle} color="inherit" onClick={() => navigate("/courses")}>
                    Courses
                  </Button>
                  <Button sx={buttonStyle} color="inherit" onClick={() => navigate("/allresults")}>
                    All Results
                  </Button>
                </>
              )}

              <Button sx={buttonStyle} color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
