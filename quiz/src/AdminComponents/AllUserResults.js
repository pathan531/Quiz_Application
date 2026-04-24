import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper, CircularProgress, Alert, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";

function SearchScores() {
  const [email, setEmail] = useState("");
  const [quizType, setQuizType] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  // Load all results on page load
  useEffect(() => {
    fetchAllResults();
  }, []);

  const fetchAllResults = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/all/scores", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching initial results:", error);
      setError("Failed to load results. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Search Handler
  const handleSearch = async () => {
    if (!email.trim() && !quizType.trim()) {
      setError("Please enter Email or Quiz Type");
      return;
    }

    // Basic email validation if email is provided
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setSearched(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/search/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          email: email.trim(), 
          quizType: quizType.trim() 
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
      setError("Search failed. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Reset search and show all results
  const handleReset = () => {
    setEmail("");
    setQuizType("");
    setSearched(false);
    setError("");
    fetchAllResults();
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
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
    username: item.username || "N/A",
    email: item.email || "N/A",
    quiz_type: item.quiz_type || "N/A",
    score: item.score ?? 0,
    percentage: item.percentage ?? "0%",
  }));

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">
          Search User Scores
        </Typography>
        <IconButton onClick={handleReset} color="primary" title="Refresh all results">
          <RefreshIcon />
        </IconButton>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {/* Search Area */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            size="medium"
            sx={{ minWidth: 250 }}
          />

          <TextField
            label="Quiz Type"
            value={quizType}
            onChange={(e) => setQuizType(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            size="medium"
            sx={{ minWidth: 200 }}
          />

          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSearch}
            disabled={loading}
          >
            Search
          </Button>

          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </Button>
        </Box>
      </Paper>

      {/* Content Area */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : rows.length > 0 ? (
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid 
            rows={rows} 
            columns={columns} 
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 }
              }
            }}
            pageSizeOptions={[5, 10, 25, 50]}
            disableRowSelectionOnClick
          />
        </div>
      ) : searched ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="error">
            No records found matching your search criteria.
          </Typography>
          <Button 
            variant="contained" 
            onClick={handleReset}
            sx={{ mt: 2 }}
          >
            View All Results
          </Button>
        </Paper>
      ) : (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="textSecondary">
            Enter search criteria and click Search, or view all results above.
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default SearchScores;