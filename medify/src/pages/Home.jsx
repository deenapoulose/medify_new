import Navbar from "../components/Navbar";
import StateCitySearch from "../components/StateCitySearch";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const handleSearch = (state, city) => {
    console.log("Searching for:", state, city);
    navigate(`/search?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`);
    // navigate to search results page and pass params
  };

  return (
    <>
      <Navbar />
      <StateCitySearch onSearch={handleSearch} />
    </>
  );
}