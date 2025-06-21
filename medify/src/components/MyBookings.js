import React, { useEffect, useState } from 'react';

export default function MyBookings() {
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
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking, i) => (
          <div key={i} style={{ border: '1px solid #ccc', marginBottom: 10, padding: 10 }}>
            <h3>{booking['Hospital Name']}</h3>
            <p>{booking.City}, {booking.State}</p>
            <p>{booking.bookingDate} at {booking.bookingTime}</p>
          </div>
        ))
      )}
    </div>
  );
}
