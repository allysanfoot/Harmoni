import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

// Import pages
//import JournalList from "./components/JournalList";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/journal" element={<JournalList />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
