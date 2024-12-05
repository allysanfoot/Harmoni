import React from "react";
import { Route, Routes } from "react-router-dom";

// Import pages
import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

// Import components
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import JournalAnalysis from "./components/JournalAnalysis";

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/home" element={<ProtectedRoute component={HomePage} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/journals/:id" element={<JournalAnalysis />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
