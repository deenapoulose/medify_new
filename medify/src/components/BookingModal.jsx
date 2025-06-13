// components/BookingModal.jsx
import { useState } from "react";
import { getBookings, saveBookings } from "../utils/bookings";

export default function BookingModal({ hospital, close }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const slots = ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM"];
  const today = new Date();
  const dates = [...Array(7)].map((_, i) => {
    let d = new Date(today);
    d.setDate(today.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const book = () => {
    const newBk = {
      "Hospital Name": hospital["Hospital Name"],
      City: hospital.City,
      State: hospital.State,
      bookingDate: date,
      bookingTime: time
    };
    saveBookings([...getBookings(), newBk]);
    close();
  };

  return (
    <div className="modal">
      <p>Today</p>
      <div>
        {dates.map(d => (
          <button key={d} onClick={() => setDate(d)}>{d}</button>
        ))}
      </div>

      <p>Morning</p>
      <p>Afternoon</p>
      <p>Evening</p>

      <select onChange={e => setTime(e.target.value)}>
        <option value="">Select Time</option>
        {slots.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <button onClick={book}>Confirm Booking</button>
      <button onClick={close}>Cancel</button>
    </div>
  );
}
