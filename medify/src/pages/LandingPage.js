import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoadingStates(true);
    fetch("https://meddata-backend.onrender.com/states")
      .then((res) => res.json())
      .then((data) => {
        setStates(data);
      })
      .catch(() => alert("Failed to load states"))
      .finally(() => setLoadingStates(false));
  }, []);

  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      setSelectedCity("");
      return;
    }

    setLoadingCities(true);
    fetch(
      `https://meddata-backend.onrender.com/cities/${encodeURIComponent(
        selectedState
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        setSelectedCity("");
      })
      .catch(() => alert("Failed to load cities"))
      .finally(() => setLoadingCities(false));
  }, [selectedState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedState || !selectedCity) {
      alert("Please select both state and city");
      return;
    }

    navigate(`/search?state=${selectedState}&city=${selectedCity}`);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Find Medical Centers</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
      >
        <div id="state">
          <label htmlFor="state-select">State:</label>
          <br />
          <select
            id="state-select"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            disabled={loadingStates}
          >
            <option value="">Select State</option>
            {states.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div id="city">
          <label htmlFor="city-select">City:</label>
          <br />
          <select
            id="city-select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState || loadingCities}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            type="submit"
            id="searchBtn"
            style={{ padding: "0.5rem 1rem", marginTop: "1.6rem" }}
          >
            Search
          </button>
        </div>
      </form>
    </main>
  );
}
