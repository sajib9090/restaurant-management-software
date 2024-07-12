import React from 'react';

const dishes = [
  {
    name: "Spaghetti Carbonara",
    description: "Classic Italian pasta dish with creamy egg sauce and pancetta.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    price: "$12.99",
    rating: 4.5,
    category: "Italian"
  },
  {
    name: "Margherita Pizza",
    description: "Traditional pizza topped with fresh tomatoes, mozzarella, and basil.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8fDA%3D",
    price: "$10.99",
    rating: 4.7,
    category: "Italian"
  },
  {
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan cheese.",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb2R8ZW58MHx8MHx8fDA%3D",
    price: "$8.99",
    rating: 4.6,
    category: "Salad"
  },
  {
    name: "Grilled Salmon",
    description: "Fresh salmon fillet grilled to perfection, served with lemon and herbs.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    price: "$15.99",
    rating: 4.8,
    category: "Seafood"
  },
  {
    name: "Tiramisu",
    description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cheese.",
    image: "https://images.unsplash.com/photo-1714385905983-6f8e06fffae1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGlyYW1pc3UlMjBjYWtlfGVufDB8fDB8fHww",
    price: "$6.99",
    rating: 4.9,
    category: "Dessert"
  },
  {
    name: "Beef Tacos",
    description: "Soft tortillas filled with seasoned beef, lettuce, tomatoes, and cheese.",
    image: "https://images.unsplash.com/photo-1668724776334-548671c13751?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVlZiUyMHRhY29zfGVufDB8fDB8fHww",
    price: "$9.99",
    rating: 4.4,
    category: "Mexican"
  }
];

const FeaturedDishes = () => {
  return (
    <div className="featured-dishes py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Dishes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <div key={index} className="dish-card bg-white p-4 rounded shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover rounded mb-4" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold">{dish.name}</h3>
                <span className="text-xl font-semibold text-gray-700">{dish.price}</span>
              </div>
              <p className="text-gray-600 mb-4">{dish.description}</p>
              <div className="flex justify-between items-center">
                <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded">{dish.category}</span>
                <span className="text-yellow-500">{Array.from({ length: dish.rating }).map((_, i) => '⭐')}</span>
              </div>
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">View More</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedDishes;
