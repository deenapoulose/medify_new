import React, { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(storedBookings);
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>My Bookings</h1>
      {bookings.length === 0 && <p>No bookings found.</p>}

      {bookings.map((booking, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "6px",
          }}
        >
          <h3>{booking.hospitalName}</h3>
          <p>
            {booking.address}, {booking.city}, {booking.state} - {booking.zipCode}
          </p>
          <p>Date: {booking.date}</p>
          <p>Time of Day: {booking.timeOfDay}</p>
        </div>
      ))}
    </main>
  );
}
