// pages/MyBookings.jsx
import Navbar from "../components/Navbar";
import { getBookings } from "../utils/bookings";

export default function MyBookings() {
  const b = getBookings();
  return (
    <>
      <Navbar />
      <h1>My Bookings</h1>
      {b.map((x, i) => (
        <div key={i}>
          <h3>{x["Hospital Name"]}</h3>
          <p>Date: {x.bookingDate}</p>
          <p>Time: {x.bookingTime}</p>
        </div>
      ))}
    </>
  );
}
