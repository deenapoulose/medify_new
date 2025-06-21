import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://meddata-backend.onrender.com/states')
      .then((res) => res.json())
      .then(setStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch(`https://meddata-backend.onrender.com/cities/${selectedState}`)
        .then((res) => res.json())
        .then(setCities);
    }
  }, [selectedState]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate(`/search?state=${selectedState}&city=${selectedCity}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div id="state">
          <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div id="city">
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <button id="searchBtn" type="submit">Search</button>
      </form>
    </div>
  );
}

export default LandingPage;