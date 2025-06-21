import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ResultsPage from './components/ResultsPage';
import MyBookings from './components/MyBookings';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/my-bookings">My Bookings</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<ResultsPage />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Router>
  );
}

export default App;