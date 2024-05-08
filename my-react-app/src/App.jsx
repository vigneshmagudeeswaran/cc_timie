import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import F12Main from "./F12Main";
import Loginpage from "./pages/Loginpage";
import MainDbBlankPage from "./pages/MainDbBlankPage";
import Signup from "./pages/signUp";
import Profile from "./components/profile";
// import { UserProvider } from "./components/UserProvider";
import { UserProvider } from "./components/userProvider";
import AttendanceList from "./components/AttendanceList";

export default function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/attendance-list" element={<AttendanceList />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<MainDbBlankPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}
