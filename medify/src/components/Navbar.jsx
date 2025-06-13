import { Link } from "react-router-dom";
import "./Navbar.css"; 

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Medify</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Find Doctors</Link></li>
        <li><Link to="/">Hospitals</Link></li>
        <li><Link to="/">Medicines</Link></li>
        <li><Link to="/my-bookings">My Bookings</Link></li>
      </ul>
    </nav>
  );
}
