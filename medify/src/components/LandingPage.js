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
      .then(res => res.json())
      .then(data => setStates(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch(`https://meddata-backend.onrender.com/cities/${selectedState}`)
        .then(res => res.json())
        .then(data => setCities(data))
        .catch(err => console.error(err));
    }
  }, [selectedState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate(`/search?state=${selectedState}&city=${selectedCity}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id="state">
        <ul>
          {states.map((state, idx) => (
            <li
              key={idx}
              onClick={() => setSelectedState(state)}
              style={{
                cursor: 'pointer',
                padding: '5px',
                background: state === selectedState ? '#ddd' : 'transparent'
              }}
            >
              {state}
            </li>
          ))}
        </ul>
      </div>

      <div id="city">
        <ul>
          {cities.map((city, idx) => (
            <li
              key={idx}
              onClick={() => setSelectedCity(city)}
              style={{
                cursor: 'pointer',
                padding: '5px',
                background: city === selectedCity ? '#ddd' : 'transparent'
              }}
            >
              {city}
            </li>
          ))}
        </ul>
      </div>

      <button type="submit" id="searchBtn">Search</button>
    </form>
  );
}

export default LandingPage;
