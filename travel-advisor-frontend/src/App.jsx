import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/Login";
import Navbar from "./components/Navbar";
import HomePage from "./components/Homepage";
import DestinationsPage from "./components/Destinations";
import ItineraryPage from "./components/ItineraryPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path = "/login" element ={ <LoginPage/>} />
        <Route path ="/navbar" element = {<Navbar/>} />
        <Route path ="/home" element = {<HomePage/>} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/itinerary/:destinationId" element={<ItineraryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
