import React, { useEffect, useState } from 'react';

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(stored);
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.map((b, i) => (
        <div key={i}>
          <h3>{b['Hospital Name']}</h3>
          <p>{b.bookingDate} at {b.bookingTime}</p>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
