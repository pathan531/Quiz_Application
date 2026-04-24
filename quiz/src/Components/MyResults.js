import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
  ButtonGroup
} from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';

function MyResults() {
  const [users, setUsers] = useState([]);   // always an array
  const [loading, setLoading] = useState(true);

  const { state } = useLocation();
  const initialQuiz = state?.quiz_type || "python"; // default quiz type
  const [activeQuiz, setActiveQuiz] = useState(initialQuiz);

  const { isAuthenticated, user } = useAuth0();
  const normalToken = localStorage.getItem("token");
  const authToken = sessionStorage.getItem("authtoken");
  const navigate = useNavigate();

  const quizTypes = ["python", "java", "gd"]; // available quiz types

  // fetch results based on quiz type
  const fetchScores = async (quiz_type) => {
    setActiveQuiz(quiz_type);
    setLoading(true);

    try {
      let url = "";
      let token = "";
      let body = {};

      if (isAuthenticated && user) {
        url = "http://localhost:5000/api/auth/current/score";
        token = authToken;
        body = { email: user.email, quiz_type };
      } else {
        url = "http://localhost:5000/api/normal/current/score";
        token = normalToken;
        const storedEmail = localStorage.getItem("email");
        body = { email: storedEmail, quiz_type };
      }

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log("Fetched scores:", data);

      // normalize response: always an array
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (data) {
        setUsers([data]);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching scores:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // load initial quiz results
  useEffect(() => {
    fetchScores(activeQuiz);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only on mount

  // DataGrid columns
  const columns = [
    { field: "username", headerName: "USER NAME", width: 200 },
    { field: "email", headerName: "EMAIL", width: 200 },
    { field: "totalquestions", headerName: "TOTAL QUESTIONS", width: 180 },
    { field: "score", headerName: "SCORE", width: 150 },
    { field: "percentage", headerName: "PERCENTAGE", width: 150 },
  ];

  // DataGrid rows
  const eachScore = (users || []).map((item, index) => ({
    id: index + 1,
    username: item.username || "",
    email: item.email || "",
    totalquestions: item.total_questions || 0,
    score: item.score || 0,
    percentage: item.percentage || 0,
    quiz_type: item.quiz_type || activeQuiz
  }));

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        My Quiz Results
      </Typography>

      {/* ---------- QUIZ TYPE BUTTON GROUP ---------- */}
      <Box display="flex" justifyContent="center" mb={3}>
        <ButtonGroup>
          {quizTypes.map((type) => (
            <Button
              key={type}
              variant={activeQuiz === type ? "contained" : "outlined"}
              color="primary"
              onClick={() => fetchScores(type)}
              sx={{
                fontWeight: "bold",
                px: 3,
                py: 1,
                fontSize: "16px",
                textTransform: "uppercase"
              }}
            >
              {type}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {activeQuiz.toUpperCase()} Quiz Scores
        </Typography>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={eachScore}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sx={{
              fontSize: "1.2rem",
              "& .MuiDataGrid-cell": { fontSize: "1.1rem" },
              "& .MuiDataGrid-columnHeaders": { fontSize: "1.2rem", fontWeight: "bold" },
              "& .MuiDataGrid-footerContainer": { fontSize: "1.1rem" }
            }}
            components={{
              NoRowsOverlay: () => (
                <Box textAlign="center" p={2}>
                  No results found for {activeQuiz.toUpperCase()} quiz
                </Box>
              )
            }}
          />
        </div>
      </Paper>

    </Box>
  );
}

export default MyResults;