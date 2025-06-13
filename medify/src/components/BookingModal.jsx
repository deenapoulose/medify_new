const BookingModal = ({ hospital, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleBook = () => {
    if (!selectedDate || !selectedTime) return;
    saveBookingToLocalStorage({
      "Hospital Name": hospital["Hospital Name"],
      City: hospital.City,
      State: hospital.State,
      bookingDate: selectedDate,
      bookingTime: selectedTime,
    });
    onClose();
  };

  return (
    <div>
      <p>Today</p>
      <p>Morning</p>
      <p onClick={() => setSelectedTime('10:00 AM')}>10:00 AM</p>
      <p>Afternoon</p>
      <p onClick={() => setSelectedTime('2:00 PM')}>2:00 PM</p>
      <p>Evening</p>
      <p onClick={() => setSelectedTime('6:00 PM')}>6:00 PM</p>
      <button onClick={handleBook}>Confirm Booking</button>
    </div>
  );
};
