import React, { useEffect, useState } from 'react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(data);
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.map((booking, index) => (
        <div key={index}>
          <h3>{booking['Hospital Name']}</h3>
          <p>{booking.City}, {booking.State}</p>
          <p>{booking.bookingDate} at {booking.bookingTime}</p>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
