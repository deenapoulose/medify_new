import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ResultsPage() {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const state = query.get('state');
  const city = query.get('city');

  useEffect(() => {
    if (state && city) {
      fetch(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`)
        .then(res => res.json())
        .then(data => setHospitals(data))
        .catch(() => setHospitals([]));
    }
  }, [state, city]);

  const bookSlot = (hospital) => {
    setSelectedHospital(hospital);
  };

  const confirmBooking = (day, time) => {
    if (!selectedHospital) return;
    const newBooking = {
      "Hospital Name": selectedHospital["Hospital Name"],
      "City": selectedHospital["City"],
      "State": selectedHospital["State"],
      "Hospital Type": selectedHospital["Hospital Type"],
      "Hospital overall rating": selectedHospital["Hospital overall rating"],
      bookingDate: day,
      bookingTime: time,
    };
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    alert('Booking Confirmed');
    setSelectedHospital(null); // close booking UI after confirm
  };

  return (
    <div>
      <h1>{hospitals.length} medical centers available in {city?.toLowerCase()}</h1>
      {hospitals.map((hospital, index) => (
        <div key={index}>
          <h3>{hospital["Hospital Name"].toLowerCase()}</h3>
          <button onClick={() => bookSlot(hospital)}>
            Book FREE Center Visit
          </button>
        </div>
      ))}

      {selectedHospital && (
        <div>
          <p>Today</p>
          <p onClick={() => confirmBooking('Today', 'Morning')} style={{cursor: 'pointer'}}>Morning</p>
          <p onClick={() => confirmBooking('Today', 'Afternoon')} style={{cursor: 'pointer'}}>Afternoon</p>
          <p onClick={() => confirmBooking('Today', 'Evening')} style={{cursor: 'pointer'}}>Evening</p>
        </div>
      )}
    </div>
  );
}

export default ResultsPage;
