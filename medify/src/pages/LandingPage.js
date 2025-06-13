import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const saveBookingToLocalStorage = (newBooking) => {
  const existing = JSON.parse(localStorage.getItem('bookings')) || [];
  existing.push(newBooking);
  localStorage.setItem('bookings', JSON.stringify(existing));
};

const LandingPage = () => {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (state && city) {
      const response = await fetch(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`);
      const data = await response.json();
      setHospitals(data);
      setIsSearchClicked(true);
    }
  };

  const handleBook = () => {
    if (selectedHospital && selectedDate && selectedTime) {
      saveBookingToLocalStorage({
        "Hospital Name": selectedHospital["Hospital Name"],
        City: selectedHospital.City,
        State: selectedHospital.State,
        bookingDate: selectedDate,
        bookingTime: selectedTime,
      });
      alert("Appointment booked!");
      setSelectedHospital(null);
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  return (
    <div>
      <div id="state">
        <select onChange={(e) => setState(e.target.value)} value={state}>
          <option value="">Select State</option>
          <option value="Alabama">Alabama</option>
        </select>
      </div>

      <div id="city">
        <select onChange={(e) => setCity(e.target.value)} value={city}>
          <option value="">Select City</option>
          <option value="DOTHAN">DOTHAN</option>
        </select>
      </div>

      <button type="submit" onClick={handleSearch}>
        Search
      </button>

      {isSearchClicked && (
        <h1>{hospitals.length} medical centers available in {city.toLowerCase()}</h1>
      )}

      {hospitals.map((hospital, idx) => (
        <div key={idx}>
          <h2>{hospital["Hospital Name"]}</h2>
          <button onClick={() => setSelectedHospital(hospital)}>
            Book FREE Center Visit
          </button>
        </div>
      ))}

      {selectedHospital && (
        <div>
          <h3>Booking Appointment at {selectedHospital["Hospital Name"]}</h3>
          <p>Today</p>
          <p>Morning</p>
          <button onClick={() => { setSelectedDate("2024-12-15"); setSelectedTime("10:00 AM"); }}>
            10:00 AM
          </button>
          <p>Afternoon</p>
          <button onClick={() => { setSelectedDate("2024-12-15"); setSelectedTime("2:00 PM"); }}>
            2:00 PM
          </button>
          <p>Evening</p>
          <button onClick={() => { setSelectedDate("2024-12-15"); setSelectedTime("6:00 PM"); }}>
            6:00 PM
          </button>
          <br />
          <button onClick={handleBook}>Confirm Booking</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
