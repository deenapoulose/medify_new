import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery();
  const state = query.get("state");
  const city = query.get("city");
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state && city) {
      fetch(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`)
        .then((res) => res.json())
        .then((data) => {
          setCenters(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch centers", err);
          setLoading(false);
        });
    }
  }, [state, city]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{centers.length} medical centers available in {city.toLowerCase()}</h1>
      {centers.map((center, index) => (
        <div key={index}>
          <h3>{center["Hospital Name"]}</h3>
          <p>{center.Address}</p>
        </div>
      ))}
    </div>
  );
}
