import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function SearchScores() {
  const [email, setEmail] = useState("");
  const [quizType, setQuizType] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Load all results on page load
  useEffect(() => {
    const fetchAllResults = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/all/scores");
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching initial results:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllResults();
  }, []);

  // Search Handler (POST)
  const handleSearch = async () => {
    if (!email && !quizType) {
      alert("Please enter Email or Quiz Type");
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch("http://localhost:5000/api/search/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, quizType }),
      });

      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "username", headerName: "User Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "quiz_type", headerName: "Quiz Type", width: 150 },
    { field: "score", headerName: "Score", width: 120 },
    { field: "percentage", headerName: "Percentage", width: 150 },
  ];

  const rows = results.map((item, index) => ({
    id: index + 1,
    username: item.username,
    email: item.email,
    quiz_type: item.quiz_type,
    score: item.score,
    percentage: item.percentage,
  }));

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Search User Scores
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Quiz Type"
            value={quizType}
            onChange={(e) => setQuizType(e.target.value)}
          />

          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Paper>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : rows.length > 0 ? (
        <div style={{ height: 480, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} />
        </div>
      ) : searched ? (
        <Typography variant="h6" color="error" mt={2}>
          No records found.
        </Typography>
      ) : (
        <Typography variant="h6" color="textSecondary" mt={2}>
          Enter details and click Search.
        </Typography>
      )}
    </Box>
  );
}

export default SearchScores;
