import React, { useState } from 'react';
import moment from 'moment';

export default function BookingModal({ hospital, onClose }) {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  const timeSlots = ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'];

  const handleBooking = () => {
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push({
      ...hospital,
      bookingDate: selectedDate,
      bookingTime: selectedTime,
    });
    localStorage.setItem('bookings', JSON.stringify(existingBookings));
    onClose();
  };

  return (
    <div style={{ border: '2px solid black', padding: 20, backgroundColor: '#eee', position: 'fixed', top: 50, left: '10%', right: '10%', zIndex: 999 }}>
      <h2>Book Appointment</h2>

      <label htmlFor="datePicker">Select Date (within 7 days): </label>
      <input
        id="datePicker"
        type="date"
        min={moment().format('YYYY-MM-DD')}
        max={moment().add(7, 'days').format('YYYY-MM-DD')}
        value={selectedDate}
        onChange={e => setSelectedDate(e.target.value)}
      />

      <p>Today</p>
      <p>Morning</p>
      <p>Afternoon</p>
      <p>Evening</p>

      <div>
        {timeSlots.map(time => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            style={{
              margin: 5,
              backgroundColor: time === selectedTime ? '#0d6efd' : '#eee',
              color: time === selectedTime ? 'white' : 'black',
              border: 'none',
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            {time}
          </button>
        ))}
      </div>

      <button onClick={handleBooking} style={{ marginTop: 15 }}>
        Confirm Booking
      </button>
      <button onClick={onClose} style={{ marginLeft: 10 }}>
        Cancel
      </button>
    </div>
  );
}
