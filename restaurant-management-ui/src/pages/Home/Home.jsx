import React from 'react';
import HeroSection from './HeroSection/HeroSection';
import FeaturedDishes from './FeaturedDishes/FeaturedDishes';
import OurServices from './OurServices/OurServices';
import Gallery from './Gallary/Gallary';
import CustomerTestimonials from './CustomerTestimonials/CustomerTestimonials';
import ContactUs from './ContactUs/ContactUs';



const HomePage = () => {
  return (
    <div className="home-page">
      
      <HeroSection />
      
      <FeaturedDishes />

      <OurServices />


      <CustomerTestimonials/>

      <ContactUs />

      <section className="newsletter py-16 bg-red-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <form className="flex justify-center">
            <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-l" />
            <button className="px-6 py-2 bg-black rounded-r">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

