// utils/bookings.js
export const getBookings = () => {
    return JSON.parse(localStorage.getItem("bookings") || "[]");
  };
  
  export const saveBookings = arr => {
    localStorage.setItem("bookings", JSON.stringify(arr));
  };
  