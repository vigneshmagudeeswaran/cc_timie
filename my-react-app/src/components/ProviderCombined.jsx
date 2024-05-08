import React from "react";
import MainDbBlankPage from "../pages/MainDbBlankPage";
import Signup from "../pages/signUp";
import Profile from "./profile";
import { UserProvider } from "./userProvider";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const ProviderCombined = () => {
  return (
    <Router>
      <Routes>
        <UserProvider>
          <Route path="/dashboard" element={<MainDbBlankPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </UserProvider>
      </Routes>
    </Router>
  );
};

export default ProviderCombined;
