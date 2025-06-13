import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://meddata-backend.onrender.com/states')
      .then(res => res.json())
      .then(data => setStates(data));
  }, []);

  useEffect(() => {
    if (state) {
      fetch(`https://meddata-backend.onrender.com/cities/${state}`)
        .then(res => res.json())
        .then(data => setCities(data));
    }
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state && city) {
      navigate(`/results?state=${state}&city=${city}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id="state">
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">Select State</option>
          {states.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div id="city">
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select City</option>
          {cities.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <button type="submit" id="searchBtn">Search</button>
    </form>
  );
}

export default LandingPage;
