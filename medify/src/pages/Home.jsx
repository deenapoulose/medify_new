import React from 'react';
import Navbar from '../components/Navbar';
import StateCitySearch from '../components/StateCitySearch';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (state, city) => {
    navigate(`/search?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`);
  };

  return (
    <>
      <Navbar />
      <StateCitySearch onSearch={handleSearch} />
    </>
  );
}
