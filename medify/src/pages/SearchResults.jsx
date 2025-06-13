import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookingSection from "../components/BookingSection";

export default function SearchResults() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const state = params.get("state") || "";
  const city = params.get("city") || "";

  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    if (!state || !city) return;
    setLoading(true);
    fetch(
      `https://meddata-backend.onrender.com/data?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`
    )
      .then((res) => res.json())
      .then((data) => setHospitals(data))
      .catch(() => alert("Failed to fetch hospitals"))
      .finally(() => setLoading(false));
  }, [state, city]);

  if (!state || !city) {
    return (
      <main style={{ padding: "2rem" }}>
        <p>Please select state and city on the home page to see results.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>
        {hospitals.length} medical centers available in {city.toLowerCase()}
      </h1>

      {loading && <p>Loading hospitals, please wait (may take up to 1 minute)...</p>}

      {!loading && hospitals.length === 0 && <p>No medical centers found.</p>}

      {hospitals.map((hospital, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "6px",
          }}
        >
          <h3>{hospital["Hospital Name"]}</h3>
          <p>{hospital.Address}</p>
          <p>
            {hospital.City}, {hospital.State} - {hospital["ZIP Code"]}
          </p>
          <p>Overall Rating: {hospital["Overall Rating"]}</p>
          <button onClick={() => setSelectedHospital(hospital)}>Book FREE Center Visit</button>
        </div>
      ))}

      {selectedHospital && (
        <BookingSection hospital={selectedHospital} onClose={() => setSelectedHospital(null)} />
      )}
    </main>
  );
}
