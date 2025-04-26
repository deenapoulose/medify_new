const BASE_URL = 'https://meddata-backend.onrender.com';

export const getStates = async () => {
  const res = await fetch(`${BASE_URL}/states`);
  return res.json();
};

export const getCities = async (state) => {
  const res = await fetch(`${BASE_URL}/cities/${state}`);
  return res.json();
};

export const getMedicalCenters = async (state, city) => {
  const res = await fetch(`${BASE_URL}/data?state=${state}&city=${city}`);
  return res.json();
};
