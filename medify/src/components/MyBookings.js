import React from 'react';

function MyBookings() {
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.map((booking, idx) => (
        <div key={idx}>
          <h3>{booking['Hospital Name']}</h3>
          <p>{booking.City}, {booking.State}</p>
          <p>Date: {booking.bookingDate}</p>
          <p>Time: {booking.bookingTime}</p>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
