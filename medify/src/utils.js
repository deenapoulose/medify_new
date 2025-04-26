export const saveBookings = (bookings) => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  };
  
  export const getBookings = () => {
    const bookings = localStorage.getItem('bookings');
    return bookings ? JSON.parse(bookings) : [];
  };
  