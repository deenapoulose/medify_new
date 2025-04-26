import { useEffect, useState } from "react";
import { getMedicalCenters } from "../api";
import { useLocation } from "react-router-dom";
import BookingModal from "../compoents/BookingModal";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery();
  const state = query.get("state");
  const city = query.get("city");

  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    if (state && city) {
      getMedicalCenters(state, city).then(setHospitals);
    }
  }, [state, city]);

  return (
    <div className="p-4">
      <h1>{hospitals.length} medical centers available in {city?.toLowerCase()}</h1>
      <div className="grid gap-4 mt-4">
        {hospitals.map(hospital => (
          <div key={hospital['Hospital Name']} className="p-4 border rounded shadow">
            <h3>{hospital['Hospital Name']}</h3>
            <p>{hospital.Address}</p>
            <button
              className="bg-green-500 text-white mt-2 px-3 py-2 rounded"
              onClick={() => setSelectedHospital(hospital)}
            >
              Book FREE Center Visit
            </button>
          </div>
        ))}
      </div>

      {selectedHospital && <BookingModal hospital={selectedHospital} closeModal={() => setSelectedHospital(null)} />}
    </div>
  );
}
