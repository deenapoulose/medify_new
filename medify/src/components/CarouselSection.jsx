import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function CarouselSection() {
  const doctorCards = [
    { name: "Dr. Sanya", specialization: "Cardiologist" },
    { name: "Dr. Kiran", specialization: "Neurologist" },
    { name: "Dr. Aman", specialization: "Dermatologist" },
    { name: "Dr. Priya", specialization: "Dentist" },
    { name: "Dr. Rahul", specialization: "Pediatrician" },
    { name: "Dr. Anjali", specialization: "Orthopedic" }
  ];

  const newsCards = [
    { title: "New Health Center Opened", description: "New health centers across India are open now." },
    { title: "Free Vaccination Drive", description: "Government announces free vaccine drives." },
    { title: "AI in Medical Research", description: "How AI is revolutionizing healthcare." },
    { title: "Mental Health Awareness", description: "Campaign for mental health awareness week." }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Specializations / Doctors Section */}
      <h2 className="text-3xl font-bold mb-6 text-primary">Specializations</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={3}
        spaceBetween={24}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        className="pb-10"
      >
        {doctorCards.map((doc, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{doc.name}</h3>
              <p className="text-gray-500 text-sm">{doc.specialization}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* News Section */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-primary">Latest News</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={2}
        spaceBetween={24}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 }
        }}
        className="pb-10"
      >
        {newsCards.map((news, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-center text-center">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{news.title}</h3>
              <p className="text-gray-500 text-sm">{news.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
