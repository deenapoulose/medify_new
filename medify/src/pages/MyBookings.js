import React, { useEffect, useState } from 'react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(stored);
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.map((b, index) => (
        <div key={index}>
          <h3>{b['Hospital Name']}</h3>
          <p>{b.bookingDate} at {b.bookingTime}</p>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
