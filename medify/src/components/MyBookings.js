import React, { useEffect, useState } from 'react';

const MyBookings = () => {
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
      {bookings.map((booking, idx) => (
        <div key={idx}>
          <h3>{booking['Hospital Name']}</h3>
          <p>{booking.City}, {booking.State}</p>
          <p>{booking.bookingDate} at {booking.bookingTime}</p>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
