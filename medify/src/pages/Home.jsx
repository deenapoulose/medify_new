import CarouselSection from "../compoents/CarouselSection";
import Navbar from "../compoents/Navbar";
import StateCitySearch from "../compoents/StateCitySearch";


export default function Home() {
  return (
    <div>
      <Navbar />
      <StateCitySearch />
      <CarouselSection />
    </div>
  );
}
