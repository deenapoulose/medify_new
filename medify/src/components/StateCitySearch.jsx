// components/StateCitySearch.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StateCitySearch({ onSearch }) {

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
  
    useEffect(() => {
      fetch("https://meddata-backend.onrender.com/states")
        .then((res) => res.json())
        .then((data) => setStates(data))
        .catch((err) => console.error("Failed to fetch states:", err));
    }, []);
  
    useEffect(() => {
      if (selectedState) {
        fetch(`https://meddata-backend.onrender.com/cities/${selectedState}`)
          .then((res) => res.json())
          .then((data) => setCities(data))
          .catch((err) => console.error("Failed to fetch cities:", err));
      }
    }, [selectedState]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (selectedState && selectedCity) {
        onSearch(selectedState, selectedCity);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div id="state">
          <label htmlFor="state-select">State:</label>
          <select
            id="state-select"
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity("");
              setCities([]); // Reset city list
            }}
          >
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
  
        <div id="city">
          <label htmlFor="city-select">City:</label>
          <select
            id="city-select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
  
        <button type="submit" id="searchBtn">Search</button>
      </form>
    );
  }
  