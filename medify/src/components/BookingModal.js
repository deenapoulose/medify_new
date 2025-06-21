import React, { useState } from 'react';

export function BookingModal({ hospital, onClose }) {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const timeSlots = ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'];

  const handleBooking = () => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push({
      ...hospital,
      bookingDate: selectedDate,
      bookingTime: selectedTime,
    });
    localStorage.setItem('bookings', JSON.stringify(bookings));
    onClose();
  };

  return (
    <div style={{ background: '#eee', padding: 20, border: '1px solid black', position: 'fixed', top: 50, left: '10%', right: '10%', zIndex: 999 }}>
      <h2>Book Appointment</h2>

      <input
        type="date"
        min={new Date().toISOString().split('T')[0]}
        max={new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]}
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <p>Today</p>
      <p>Morning</p>
      <p>Afternoon</p>
      <p>Evening</p>

      <div>
        {timeSlots.map((time) => (
          <button
            key={time}
            type="button"
            onClick={() => setSelectedTime(time)}
            style={{
              backgroundColor: selectedTime === time ? 'blue' : 'transparent',
              color: selectedTime === time ? 'white' : 'black',
              margin: '5px',
            }}
          >
            {time}
          </button>
        ))}
      </div>

      <button type="button" onClick={handleBooking}>Confirm Booking</button>
      <button type="button" onClick={onClose} style={{ marginLeft: 10 }}>Cancel</button>
    </div>
  );
}
