import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-4 flex justify-between items-center shadow">
      <h2 className="text-xl font-bold text-blue-600">Medify</h2>
      <div className="space-x-4">
        <Link to="/">Find Doctors</Link>
        <Link to="/">Hospitals</Link>
        <Link to="/">Medicines</Link>
        <Link to="/my-bookings">My Bookings</Link>
      </div>
    </nav>
  );
}
