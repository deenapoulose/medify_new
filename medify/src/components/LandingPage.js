import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://meddata-backend.onrender.com/states')
      .then(res => res.json())
      .then(setStates)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      setSelectedCity('');
      return;
    }
    fetch(`https://meddata-backend.onrender.com/cities/${selectedState}`)
      .then(res => res.json())
      .then(setCities)
      .catch(console.error);
  }, [selectedState]);

  const handleSubmit = e => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate(`/search?state=${selectedState}&city=${selectedCity}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id="state">
        <ul style={{ border: '1px solid #ccc', maxHeight: 150, overflowY: 'auto' }}>
          {states.length === 0 && <li>Loading states...</li>}
          {states.map((state, i) => (
            <li
              key={i}
              onClick={() => setSelectedState(state)}
              style={{
                cursor: 'pointer',
                backgroundColor: state === selectedState ? '#ddd' : 'transparent',
                padding: '5px',
              }}
              data-testid={`state-option-${state}`}
            >
              {state}
            </li>
          ))}
        </ul>
      </div>

      <div id="city">
        <ul style={{ border: '1px solid #ccc', maxHeight: 150, overflowY: 'auto' }}>
          {selectedState === '' && <li>Please select a state first</li>}
          {selectedState && cities.length === 0 && <li>Loading cities...</li>}
          {cities.map((city, i) => (
            <li
              key={i}
              onClick={() => setSelectedCity(city)}
              style={{
                cursor: 'pointer',
                backgroundColor: city === selectedCity ? '#ddd' : 'transparent',
                padding: '5px',
              }}
              data-testid={`city-option-${city}`}
            >
              {city}
            </li>
          ))}
        </ul>
      </div>

      <button id="searchBtn" type="submit">
        Search
      </button>
    </form>
  );
}
