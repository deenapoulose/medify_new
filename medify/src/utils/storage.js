
  export const saveBookingToLocalStorage = (newBooking) => {
  const existing = JSON.parse(localStorage.getItem('bookings')) || [];
  existing.push(newBooking);
  localStorage.setItem('bookings', JSON.stringify(existing));
};
