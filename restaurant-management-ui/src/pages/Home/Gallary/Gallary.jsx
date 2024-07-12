import React from 'react';
import { motion } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmVlZiUyMHRhY29zfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1661776866702-d671127c2d8b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmVlZiUyMHRhY29zfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1599974496394-93f03b1ba1e0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlZWYlMjB0YWNvc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1673809798703-6082a015f931?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1673580742890-4af144293960?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGZvb2R8ZW58MHx8MHx8fDA%3D",
];

const Gallery = () => {
  return (
    <div className="gallery py-16">
      <div className="container mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="gallery-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-64 object-cover rounded" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
