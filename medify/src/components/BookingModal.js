import React, { useState } from 'react';
import moment from 'moment';

function BookingModal({ hospital, onClose }) {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  const timeSlots = ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'];

  const handleBooking = () => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push({ ...hospital, bookingDate: selectedDate, bookingTime: selectedTime });
    localStorage.setItem('bookings', JSON.stringify(bookings));
    onClose();
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      <label>Select Date (next 7 days):</label>
      <input
        type="date"
        min={moment().format('YYYY-MM-DD')}
        max={moment().add(7, 'days').format('YYYY-MM-DD')}
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <p>Today</p>
      <p>Morning</p>
      <p>Afternoon</p>
      <p>Evening</p>

      {timeSlots.map((time) => (
        <button key={time} onClick={() => setSelectedTime(time)}>{time}</button>
      ))}
      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}

export default BookingModal;
