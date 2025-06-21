import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BookingModal from './BookingModal';

function ResultsPage() {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const state = params.get('state');
  const city = params.get('city');

  useEffect(() => {
    if (state && city) {
      fetch(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`)
        .then(res => res.json())
        .then(data => setHospitals(data));
    }
  }, [state, city]);

  return (
    <div>
      <h1>{hospitals.length} medical centers available in {city.toLowerCase()}</h1>
      {hospitals.map((hospital, index) => (
        <div key={index}>
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

export default ResultsPage;