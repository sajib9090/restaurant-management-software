import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Dine-In",
    description: "Enjoy our cozy and welcoming atmosphere.",
    icon: "🍽️",
  },
  {
    title: "Takeaway",
    description: "Order your favorite dishes to go.",
    icon: "🥡",
  },
  {
    title: "Delivery",
    description: "Get your meal delivered right to your doorstep.",
    icon: "🚚",
  },
];

const OurServices = () => {
  return (
    <div className="our-services py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card bg-white p-6 rounded shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
            >
              <div className="text-6xl">{service.icon}</div>
              <h3 className="mt-4 text-2xl font-bold">{service.title}</h3>
              <p className="mt-2 text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
