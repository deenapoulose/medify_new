import Navbar from "../compoents/Navbar";
import { getBookings } from "../utils";


export default function MyBookings() {
  const bookings = getBookings();

  return (
    <div>
      <Navbar />
      <h1 className="text-center text-2xl mt-6">My Bookings</h1>
      <div className="p-6 grid gap-4">
        {bookings.map((b, idx) => (
          <div key={idx} className="border p-4 rounded shadow">
            <h3>{b["Hospital Name"]}</h3>
            <p>Date: {b.bookingDate}</p>
            <p>Time: {b.bookingTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
