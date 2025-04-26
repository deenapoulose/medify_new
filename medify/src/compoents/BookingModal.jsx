import { useState } from "react";
import { saveBookings, getBookings } from "../utils";

export default function BookingModal({ hospital, closeModal }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const times = ['10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM'];

  const handleBooking = () => {
    const newBooking = {
      "Hospital Name": hospital['Hospital Name'],
      "City": hospital.City,
      "State": hospital.State,
      "Hospital Type": hospital['Hospital Type'],
      "Hospital overall rating": hospital['Hospital overall rating'],
      bookingDate: selectedDate,
      bookingTime: selectedTime
    };
    const existing = getBookings();
    saveBookings([...existing, newBooking]);
    closeModal();
  };

  const today = new Date();
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded space-y-4">
        <p>Today</p>
        <div className="flex space-x-2">
          {availableDates.map(date => (
            <button key={date} onClick={() => setSelectedDate(date)}>{date}</button>
          ))}
        </div>

        <p>Morning</p>
        <p>Afternoon</p>
        <p>Evening</p>

        <select onChange={(e) => setSelectedTime(e.target.value)}>
          <option value="">Select Time</option>
          {times.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>

        <button onClick={handleBooking} className="bg-blue-600 text-white px-4 py-2 rounded">Confirm Booking</button>
        <button onClick={closeModal} className="text-red-500 ml-4">Cancel</button>
      </div>
    </div>
  );
}
