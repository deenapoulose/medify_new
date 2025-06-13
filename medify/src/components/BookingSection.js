import React, { useState } from "react";

const TIMES_OF_DAY = ["Morning", "Afternoon", "Evening"];

export default function BookingSection({ hospital, onClose }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.toISOString().slice(0, 10));
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");

  const next7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date.toISOString().slice(0, 10);
  });

  const handleConfirmBooking = () => {
    if (!selectedTime) {
      setMessage("Please select a time slot.");
      return;
    }

    const booking = {
      hospitalName: hospital["Hospital Name"],
      address: hospital.Address,
      city: hospital.City,
      state: hospital.State,
      zipCode: hospital["ZIP Code"],
      rating: hospital["Overall Rating"],
      date: selectedDate,
      timeOfDay: selectedTime,
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    existingBookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    setMessage("Booking successful!");
  };

  return (
    <section
      style={{
        border: "2px solid blue",
        padding: "1rem",
        marginTop: "2rem",
        borderRadius: "8px",
      }}
    >
      <h3>Booking for {hospital["Hospital Name"]}</h3>

      <div>
        <p>Select Date:</p>
        {next7Days.map((date) => (
          <label key={date} style={{ marginRight: "1rem" }}>
            <input
              type="radio"
              name="bookingDate"
              value={date}
              checked={selectedDate === date}
              onChange={() => setSelectedDate(date)}
            />
            {date}
          </label>
        ))}
      </div>

      <div>
        <p>Select Time of Day:</p>
        {TIMES_OF_DAY.map((time) => (
          <label key={time} style={{ marginRight: "1rem" }}>
            <input
              type="radio"
              name="bookingTime"
              value={time}
              checked={selectedTime === time}
              onChange={() => setSelectedTime(time)}
            />
            <p>{time}</p>
          </label>
        ))}
      </div>

      <button onClick={handleConfirmBooking} style={{ marginRight: "1rem" }}>
        Confirm Booking
      </button>
      <button onClick={onClose}>Cancel</button>

      {message && <p>{message}</p>}
    </section>
  );
}
