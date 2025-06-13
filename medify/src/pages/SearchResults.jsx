import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [hospitals, setHospitals] = useState([]);
  const [activeHospital, setActiveHospital] = useState(null);
  const state = searchParams.get('state');
  const city = searchParams.get('city');

  useEffect(() => {
    if (state && city) {
      fetch(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`)
        .then(res => res.json())
        .then(setHospitals);
    }
  }, [state, city]);

  const handleBook = (hospital) => {
    setActiveHospital(hospital);
  };

  const handleConfirm = (date, time) => {
    const booking = {
      ...activeHospital,
      bookingDate: date,
      bookingTime: time,
    };
    const stored = JSON.parse(localStorage.getItem('bookings') || '[]');
    stored.push(booking);
    localStorage.setItem('bookings', JSON.stringify(stored));
    alert('Booked!');
  };

  return (
    <div>
      <h1>{hospitals.length} medical centers available in {city?.toLowerCase()}</h1>
      {hospitals.map(h => (
        <div key={h.id}>
          <h3>{h['Hospital Name']}</h3>
          <button onClick={() => handleBook(h)}>Book FREE Center Visit</button>
        </div>
      ))}

      {activeHospital && (
        <div>
          <p>Today</p>
          <p>Morning</p>
          <p>Afternoon</p>
          <p>Evening</p>
          <button onClick={() => handleConfirm('2024-12-15', '10:00 AM')}>Confirm Booking</button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;