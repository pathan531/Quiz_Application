import React, { useEffect, useState } from "react";
import { Box, Paper, Stack, TextField, Typography, Button, MenuItem,Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CreateQuestions() {

  const [quizType, setQuizType] = useState(""); // selected quiz type
  const [questionNumber, setQuestionNumber] = useState(1);
  const MAX_QUESTIONS = 5;

  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");

  const handleTypeSelect = (type) => setQuizType(type);

  const submitQuestion = async () => {
    if (!question || !option1 || !option2 || !option3 || !option4 || !answer) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/add/questions", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          question, option1, option2, option3, option4, answer,quiz_type:quizType || "gd"
        })
      });

      if (!res.ok) throw new Error("Failed to add question");
    } catch (err) {
      console.error(err);
      alert("Error submitting question");
      return;
    }

    // Reset form for next question
    setQuestion(""); setOption1(""); setOption2(""); setOption3(""); setOption4(""); setAnswer("");
    if (questionNumber < MAX_QUESTIONS) setQuestionNumber(questionNumber + 1);
    else {
      alert("All questions added!");
      setQuizType(""); 
      setQuestionNumber(1);

       // Clear form
      setQuestion("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setAnswer("")
    }
  };

  if (!quizType) {
    return (
      <Fade in timeout={1000}>
      <Box 
  sx={{ 
    display: "flex", 
    
    justifyContent: "center", 
    alignItems: "center", 
    minHeight: "70vh", 
    flexDirection: "column",
    p: 2
  }}
>
  <Typography 
    variant="h4" 
    mb={4} 
    sx={{ fontWeight: "bold", letterSpacing: 1 }}
  >
    Choose Quiz Type
  </Typography>
  <Typography
  variant="h5"
  mb={4}
  sx={{
    opacity: 0.8,
    fontSize: "17px",
    maxWidth: "600px",
    textAlign: "center",
    lineHeight: 1.5
  }}
>
  Please select the quiz category for which you want to create or add new
  questions. Each category maintains its own set of questions, so choose
  the correct one before proceeding to the next step.
 </Typography>

  <Stack direction="row" spacing={4}>
    
    <Button 
      variant="contained" 
      color="primary"
      onClick={() => handleTypeSelect("java")}
      sx={{
        fontSize: "20px",
        px: 4,
        py: 2,
        borderRadius: "15px",
        fontWeight: "bold",
        transition: "0.3s",
        transform: "scale(1)",
        "&:hover": {
          transform: "scale(1.1)"
        }
      }}
    >
      Java
    </Button>

    <Button 
      variant="contained" 
      color="warning"
      onClick={() => handleTypeSelect("python")}
      sx={{
        fontSize: "20px",
        px: 4,
        py: 2,
        borderRadius: "15px",
        fontWeight: "bold",
        transition: "0.3s",
        transform: "scale(1)",
        "&:hover": {
          transform: "scale(1.1)"
        }
      }}
    >
      Python
    </Button>

    <Button 
      variant="contained" 
      color="success"
      onClick={() => handleTypeSelect("gd")}
      sx={{
        fontSize: "20px",
        px: 4,
        py: 2,
        borderRadius: "15px",
        fontWeight: "bold",
        transition: "0.3s",
        transform: "scale(1)",
        "&:hover": {
          transform: "scale(1.1)"
        }
      }}
    >
      General Knowledge
    </Button>

  </Stack>
</Box>
</Fade>

    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh", p: 2 }}>
      <Paper sx={{ p: 5, borderRadius: 3, width: "100%", maxWidth: 600 }}>
        <Typography variant="h4" mb={3}>
          Add Question {questionNumber}/{MAX_QUESTIONS} ({quizType.toUpperCase()})
        </Typography>
        <Stack spacing={2}>
          <TextField label="Question" value={question} onChange={e => setQuestion(e.target.value)} fullWidth  />
          <TextField label="Option 1" value={option1} onChange={e => setOption1(e.target.value)} fullWidth />
          <TextField label="Option 2" value={option2} onChange={e => setOption2(e.target.value)} fullWidth  />
          <TextField label="Option 3" value={option3} onChange={e => setOption3(e.target.value)} fullWidth  />
          <TextField label="Option 4" value={option4} onChange={e => setOption4(e.target.value)} fullWidth  />
          <TextField select label="Correct Answer" value={answer} onChange={e => setAnswer(Number(e.target.value))} fullWidth >
            <MenuItem value={1}>Option 1</MenuItem>
            <MenuItem value={2}>Option 2</MenuItem>
            <MenuItem value={3}>Option 3</MenuItem>
            <MenuItem value={4}>Option 4</MenuItem>
          </TextField>
          <Button variant="contained" onClick={submitQuestion}>
            {questionNumber === MAX_QUESTIONS ? "Submit All" : "Next Question"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default CreateQuestions;
