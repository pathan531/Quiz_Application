import { Box, Fade, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';

function Course() {
  const navigate=useNavigate()
  const {isAuthenticated, getAccessTokenSilently, getIdTokenClaims, isLoading } = useAuth0();
  useEffect(() => {
    const getAuth0Token = async () => {
      if (isLoading) return;
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: { audience: "https://quiz-api.local", scope: "openid profile email" },
          });
          const idtoken = await getIdTokenClaims();
          const rawId = idtoken.__raw;

          sessionStorage.setItem("authtoken", token);
          sessionStorage.setItem("idtoken", rawId);
          localStorage.setItem("role","user")

          console.log(idtoken)

        } catch (err) {
          console.log(" failed to get the token",err);
        }
      }
    };
    getAuth0Token();
  }, [isAuthenticated, isLoading, getAccessTokenSilently, getIdTokenClaims]);

  const handleClick = (course) => {
      navigate("/welcome" , {state:{quiz:course}})
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column', // stack title above paper
        minHeight: '90vh',
        background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)',
        padding: 2,
      }}
    >
           {/* Page Title */}
           <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#0d47a1' }}>
        Choose Your <span style={{ color: '#ff5722' }}>Quiz Topic</span>
      </Typography>

      {/* Page Description */}
      <Typography
        variant="h6"
        textAlign="center"
        sx={{
          maxWidth: 700,
          mb: 4,
          color: '#263238',
          lineHeight: 1.6,
        }}
      >
        Test your knowledge and challenge yourself with our interactive{' '}
        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>quizzes</span>. <br />
        Select a topic below to begin your{' '}
        <span style={{ color: '#4caf50', fontWeight: 'bold' }}>quiz journey</span> — each test is
        designed to boost your skills and make learning{' '}
        <span style={{ color: '#f57c00', fontWeight: 'bold' }}>fun!</span>
      </Typography>
      <Fade in timeout={1000}>
      <Paper
        sx={{
          width: '70vw',
          maxWidth: 1000,
          padding: 6,
          borderRadius: 4,
          boxShadow: 6,

          backgroundColor: '#ffffff',
        }}
      >
        <Stack direction="row" spacing={0} justifyContent="space-between">
          {/* JAVA Box */}
          <Box
            sx={{
              width: 180,
              height: 180,
              backgroundColor: '#2196f3',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 3,
              cursor: 'pointer',
              color: 'white',
              fontWeight: 'bold',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
              },
            }}
            onClick={() => handleClick('java')}
          >
            <Typography variant="h6">JAVA</Typography>
          </Box>

          {/* PYTHON Box */}
          <Box
            sx={{
              width: 180,
              height: 180,
              backgroundColor: '#ff9800',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 3,
              cursor: 'pointer',
              color: 'white',
              fontWeight: 'bold',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
              },
            }}
            onClick={() => handleClick('python')}
          >
            <Typography variant="h6">PYTHON</Typography>
          </Box>

          {/* General Knowledge Box */}
          <Box
            sx={{
              width: 180,
              height: 180,
              backgroundColor: '#4caf50',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 3,
              cursor: 'pointer',
              color: 'white',
              fontWeight: 'bold',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
              },
            }}
            onClick={() => handleClick('gd')}
          >
            <Typography variant="h6" textAlign="center">
              General Knowledge
            </Typography>
          </Box>
        </Stack>
      </Paper>
      </Fade>
    </Box>
  );
}

export default Course;
