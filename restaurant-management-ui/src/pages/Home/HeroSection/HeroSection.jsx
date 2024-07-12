import React from 'react';
import { motion } from 'framer-motion';
// Import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdHVyYW50fGVufDB8fDB8fHww",
    title: "Welcome to Our Restaurant",
    subtitle: "Enjoy the best dishes in town!",
  },
  {
    image: "https://images.unsplash.com/photo-1596040014776-459f4fdf9df5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJlc3R1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Experience Fine Dining",
    subtitle: "A perfect place for your family and friends.",
  },
  {
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Delicious Cuisine",
    subtitle: "Prepared with the freshest ingredients.",
  },
];

const HeroSection = () => {
  return (
    <section className="hero-section h-screen text-white">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        className="mySwiper h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="absolute inset-0 object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: index * 0.3 }}
                  className="text-center"
                >
                  <h1 className="text-5xl font-bold">{slide.title}</h1>
                  <p className="mt-4 text-xl">{slide.subtitle}</p>
                  <motion.button
                    className="mt-8 px-6 py-3 bg-red-500 hover:bg-red-700 transition"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Explore Menu
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
