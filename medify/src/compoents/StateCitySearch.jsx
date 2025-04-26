import { useEffect, useState } from "react";
import { getStates, getCities } from "../api";
import { useNavigate } from "react-router-dom";

export default function StateCitySearch() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getStates().then(setStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      getCities(selectedState).then(setCities);
    }
  }, [selectedState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?state=${selectedState}&city=${selectedCity}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4 p-4 justify-center">
      <div id="state">
        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
          <option value="">Select State</option>
          {states.map(state => <option key={state} value={state}>{state}</option>)}
        </select>
      </div>

      <div id="city">
        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
          <option value="">Select City</option>
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
      </div>

      <button type="submit" id="searchBtn" className="bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>
    </form>
  );
}
