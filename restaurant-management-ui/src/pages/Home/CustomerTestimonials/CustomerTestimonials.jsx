import React from 'react';
import { motion } from 'framer-motion';
import { StarFilled } from '@ant-design/icons';

const testimonials = [
  {
    name: "Sarah Johnson",
    testimonial: "The ambiance and food at this restaurant are simply amazing. Highly recommend the chef's specials!",
    rating: 5,
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "David Smith",
    testimonial: "A delightful experience from start to finish. The service was impeccable, and the food was outstanding.",
    rating: 4,
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    name: "Emily Williams",
    testimonial: "A perfect spot for family dinners. The kids loved it, and so did we!",
    rating: 5,
    photo: "https://randomuser.me/api/portraits/women/45.jpg",
  },
];

const CustomerTestimonials = () => {
  return (
    <div className="customer-testimonials py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.photo} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                  <div className="flex items-center">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <StarFilled key={i} className="text-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.testimonial}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerTestimonials;
