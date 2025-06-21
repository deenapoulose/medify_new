import React, { useEffect, useState } from 'react';

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('bookings');
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking, idx) => (
          <div key={idx}>
            <h3>{booking['Hospital Name']}</h3> 
            <p>{booking.City}, {booking.State} - {booking.bookingDate} at {booking.bookingTime}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;
