import React, { useEffect, useReducer} from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate,useLocation } from 'react-router-dom'
import { Box, Button, List, ListItemButton, ListItemText, Paper, Typography,Fade } from "@mui/material";

// Initial state
const initialState = {
    index: 0,
    selected: null,
    score: 0,
    result: false,
    questions: [],
    loading: true,
    timeLeft: 30
}

// Reducer function
const quizReducer = (state, action) => {
    switch (action.type) {
        case 'SET_INDEX':
            return { ...state, index: action.payload }
        case 'SET_SELECTED':
            return { ...state, selected: action.payload }
        case 'SET_SCORE':
            return { ...state, score: action.payload }
        case 'SHOW_RESULT':
            return { ...state, result: action.payload }
        case 'SET_QUESTIONS':
            return { ...state, questions: action.payload }
        case 'SET_LOADING':
            return { ...state, loading: action.payload }
        case 'SET_TIME_LEFT':
            return { ...state, timeLeft: action.payload }
        case 'INCREMENT_SCORE':
            return { ...state, score: state.score + 1 }
        case 'NEXT_QUESTION':
            return {
                ...state,
                selected: null,
                index: state.index + 1,
                timeLeft: 30
            }
        case 'RESET_QUIZ':
            return {
                ...state,
                index: 0,
                selected: null,
                score: 0,
                result: false,
                timeLeft: 30
            }
        default:
            return state
    }
}

function Quiz() {
    const [state, dispatch] = useReducer(quizReducer, initialState)
    const MAX_QUESTIONS = 5;
    const { state: locationState } = useLocation(); // rename here
    const quizType = locationState?.quizType;
    const { index, selected, score, result, questions, loading, timeLeft } = state
    const { user } = useAuth0()
    const navigate = useNavigate()

    // ------------------- Register user if Auth0 -------------------
    useEffect(() => {
        const authToken = sessionStorage.getItem("authtoken")
        if (authToken && user) {
            fetch("http://localhost:5000/api/auth/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    username: user.name,
                    email: user.email,
                    password: user.sub,

                })
            })
            .then(res => res.json())
            .then(data => console.log(data.message))
            .catch(err => console.log(err))
        }
    }, [user])


    // ------------------- Fetch questions -------------------
    useEffect(() => {
        const authToken = sessionStorage.getItem("authtoken")
        const regularToken = localStorage.getItem("token")
        const token = authToken || regularToken
        const endpoint = authToken 
            ? `http://localhost:5000/api/auth/questions?quizType=${quizType}`
            : `http://localhost:5000/api/questions?quizType=${quizType}`
            

        if (!token) {
            dispatch({ type: 'SET_LOADING', payload: false })
            return
        }

        fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch({ type: 'SET_QUESTIONS', payload: data.slice(0, MAX_QUESTIONS) })
            dispatch({ type: 'SET_LOADING', payload: false })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: 'SET_LOADING', payload: false })
        })
    }, [quizType])

    // ------------------- Handle next question -------------------
    const handleNext = () => {
        if (!questions[index]) return;
        if (selected === questions[index].answer) {
            dispatch({ type: 'INCREMENT_SCORE' })
        }

        if (index + 1 < MAX_QUESTIONS) {
            dispatch({ type: 'NEXT_QUESTION' })
        } else {
            dispatch({ type: 'SHOW_RESULT', payload: true })
            submitScore()
        }
    }

    // ------------------- Timer ------------------
    useEffect(() => {
        if (result || MAX_QUESTIONS === 0) return;

        const timer = setInterval(() => {
            dispatch({ type: 'SET_TIME_LEFT', payload: timeLeft - 1 })
            
            if (timeLeft <= 1) {
                handleNext()
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [index, result, questions, timeLeft])

    // ------------------- Submit score -------------------
    const submitScore = () => {
        const authToken = sessionStorage.getItem("authtoken")
        const regularToken = localStorage.getItem("token")
        const accessToken = authToken || regularToken
        const total_questions = MAX_QUESTIONS
        const percentage = Math.round((score / total_questions) * 100)

        const endpoint = authToken
            ? "http://localhost:5000/api/auth/users/score"
            : "http://localhost:5000/api/score"

        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                total_questions,
                score,
                percentage,
                quizType,
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.message)
            navigate("/feedback", { state: { quiz_type:quizType } });
        })
        .catch(err => console.log(err))
        navigate("/feedback", { state: { quiz_type:quizType } });
    }

    // ------------------- Select option -------------------
    const optionSelect = (e) => dispatch({ type: 'SET_SELECTED', payload: e })

    // ------------------- Reset quiz -------------------
    const resetQuiz = () => {
        dispatch({ type: 'RESET_QUIZ' })
    }

    // ------------------- Early returns -------------------
    if (loading) return <div className='container'><div className='child'>Loading...</div></div>
    if (questions.length === 0) return <div className='container'><div className='child'>No questions available</div></div>

    const question = questions[index]

    // ------------------- Render -------------------
    return (
        <Box
        className="container"
        display="flex"
        height="80vh"
        justifyContent="center"
        alignItems="center"
      >
        <Fade in timeout={1000}>
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: "1000px",
            p: 3,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          {!result ? (
            <>
              {/* Timer */}
              <Typography align="center" color="#553f9a" variant="h5"sx={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                {timeLeft}
              </Typography>
    
              {/* Question */}
              <Typography align="center" variant="h5" mt={2} sx={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                {index + 1}. {question.question}
              </Typography>
    
              {/* Options */}
              <List sx={{ mt: 2 }}>
                <ListItemButton onClick={() => optionSelect(1)} sx={optionStyle(selected === 1)}>
                  <ListItemText primary={question.option1} sx={{ "& .MuiListItemText-primary": { fontSize: "1.5rem", fontWeight: "600" } }}/>
                </ListItemButton>
    
                <ListItemButton onClick={() => optionSelect(2)} sx={optionStyle(selected === 2)}>
                  <ListItemText primary={question.option2}sx={{ "& .MuiListItemText-primary": { fontSize: "1.5rem", fontWeight: "600" } }} />
                </ListItemButton>
    
                <ListItemButton onClick={() => optionSelect(3)} sx={optionStyle(selected === 3)}>
                  <ListItemText primary={question.option3}sx={{ "& .MuiListItemText-primary": { fontSize: "1.5rem", fontWeight: "600" } }} />
                </ListItemButton>
    
                <ListItemButton onClick={() => optionSelect(4)} sx={optionStyle(selected === 4)}>
                  <ListItemText primary={question.option4}sx={{ "& .MuiListItemText-primary": { fontSize: "1.5rem", fontWeight: "600" } }} />
                </ListItemButton>
              </List>
    
              {/* Next Button */}
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#553f9a",
                  "&:hover": { backgroundColor: "#4a3489" },
                }}
                onClick={handleNext}
                disabled={!selected}
              >
                {index + 1 === MAX_QUESTIONS ? "Submit" : "Next"}
              </Button>
    
              {/* Question count */}
              <Typography mt={2} color="textSecondary">
                {index + 1} of {questions.length}
              </Typography>
              
            </>
          ) : null}
        </Paper>
        </Fade>
      </Box>

    )
}
const optionStyle = (isSelected) => ({
    border: isSelected ? "3px solid #553f9a" : "2px solid #ddd",
    bgcolor: isSelected ? "#553f9a" : "#f9f9f9",
    color: isSelected ? "white" : "black",
    borderRadius: 2,
    my: 1,
    transition: "0.3s",
    "&:hover": { bgcolor: isSelected ? "#553f9a" : "#f0f0ff" }
});
  

export default Quiz