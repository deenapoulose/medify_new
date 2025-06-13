import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ResultsPage() {
  const [hospitals, setHospitals] = useState([]);
  const [selected, setSelected] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const state = query.get('state');
  const city = query.get('city');

  useEffect(() => {
    fetch(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`)
      .then(res => res.json())
      .then(data => setHospitals(data));
  }, [state, city]);

  const bookSlot = (hospital) => {
    setSelected(hospital);
  };

  const confirmBooking = (day, time) => {
    const newBooking = {
      "Hospital Name": selected['Hospital Name'],
      "City": selected['City'],
      "State": selected['State'],
      "Hospital Type": selected['Hospital Type'],
      "Hospital overall rating": selected['Hospital overall rating'],
      bookingDate: day,
      bookingTime: time,
    };
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    alert('Booking Confirmed');
  };

  return (
    <div>
      <h1>{hospitals.length} medical centers available in {city.toLowerCase()}</h1>
      {hospitals.map((h, i) => (
        <div key={i}>
          <h3>{h['Hospital Name']}</h3>
          <button onClick={() => bookSlot(h)}>Book FREE Center Visit</button>
        </div>
      ))}

      {selected && (
        <div>
          <p>Today</p>
          <p onClick={() => confirmBooking('2024-12-15', '10:00 AM')}>Morning</p>
          <p onClick={() => confirmBooking('2024-12-15', '2:00 PM')}>Afternoon</p>
          <p onClick={() => confirmBooking('2024-12-15', '6:00 PM')}>Evening</p>
        </div>
      )}
    </div>
  );
}

export default ResultsPage;
