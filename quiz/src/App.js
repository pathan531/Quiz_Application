import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Welcome from "./Components/Welcome";
import Quiz from "./Components/Quiz";
import Feedback from "./Components/Feedback";
import MyResults from "./Components/MyResults";
import AllUserResults from "./AdminComponents/AllUserResults"
import Course from "./Components/Course"
import CreateQuestions from "./AdminComponents/CreateQuestions";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import SearchScores from "./AdminComponents/SearchScores";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><MyResults/></ProtectedRoute>}></Route>
        <Route path="/allresults" element={<ProtectedRoute><AllUserResults/></ProtectedRoute>}></Route>
        <Route path="/course" element={<Course/>}></Route>
        <Route path="/courses" element={<ProtectedRoute><CreateQuestions/></ProtectedRoute>}></Route>
        <Route path="/search" element ={<ProtectedRoute><SearchScores/></ProtectedRoute>}></Route>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
