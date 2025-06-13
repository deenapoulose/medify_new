import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "rgb(0,0,51)",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="logo">
        <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "1.5rem" }}>
          MedFinder
        </Link>
      </div>
      <div className="menu" style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Find Doctors
        </Link>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Hospitals
        </Link>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Medicines
        </Link>
        <Link to="/my-bookings" style={{ color: "white", textDecoration: "none" }}>
          My Bookings
        </Link>
      </div>
    </nav>
  );
}
