import React, { useState, useEffect } from 'react';
import BookingModal from './BookingModal';

export default function ResultsPage({ state, city }) {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    if (state && city) {
      fetch(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`)
        .then(res => res.json())
        .then(setHospitals)
        .catch(console.error);
    }
  }, [state, city]);

  return (
    <div>
      <h1>{hospitals.length} medical centers available in {city?.toLowerCase()}</h1>
      {hospitals.map((hospital, idx) => (
        <div key={idx} style={{ border: '1px solid #ccc', marginBottom: 10, padding: 10 }}>
          <h3>{hospital['Hospital Name']}</h3>
          <p>{hospital.Address}</p>
          <button onClick={() => setSelectedHospital(hospital)}>
            Book FREE Center Visit
          </button>
        </div>
      ))}

      {selectedHospital && (
        <BookingModal hospital={selectedHospital} onClose={() => setSelectedHospital(null)} />
      )}
    </div>
  );
}