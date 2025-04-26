import { useEffect, useState } from "react";
import { getStates, getCities } from "../api";
import { useNavigate } from "react-router-dom";

export default function StateCitySearch() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showStateOptions, setShowStateOptions] = useState(false);
  const [showCityOptions, setShowCityOptions] = useState(false);

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
        <div onClick={() => setShowStateOptions(!showStateOptions)}>
          {selectedState || "Select State"}
        </div>
        {showStateOptions && (
          <ul>
            {states.map((state) => (
              <li
                key={state}
                onClick={() => {
                  setSelectedState(state);
                  setShowStateOptions(false);
                }}
              >
                {state}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div id="city">
        <div onClick={() => setShowCityOptions(!showCityOptions)}>
          {selectedCity || "Select City"}
        </div>
        {showCityOptions && (
          <ul>
            {cities.map((city) => (
              <li
                key={city}
                onClick={() => {
                  setSelectedCity(city);
                  setShowCityOptions(false);
                }}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        id="searchBtn"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </form>
  );
}
