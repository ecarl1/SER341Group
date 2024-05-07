import logo from './logo.svg';
import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Router } from 'express';
import NavBar from './components/navBar'
import LoginForm from './components/loginForm';
import Attendance from './components/Attendance';
import CreateLab from './components/CreateLab';
import MakeUpLab from './components/MakeUpLab';
import { useState, React, useEffect } from "react";
import auth from "./services/authService";

function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const user = auth.getCurrentUser();
    console.log(user);
    setUser(user);
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar user={user}/>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/labs" element={<CreateLab />} />
        <Route path="/makeuplab" element={<MakeUpLab />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
