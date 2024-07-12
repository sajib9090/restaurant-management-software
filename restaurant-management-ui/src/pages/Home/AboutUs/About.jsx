import Gallery from "../Gallary/Gallary";


const AboutUs = () => {
  const teamMembers = [
    {
      name: "John Doe",
      position: "Head Chef",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Jane Smith",
      position: "Sous Chef",
      image: "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Emily Johnson",
      position: "Pastry Chef",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  return (
    <div className="about-page">
      <section className="history py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
          <p className="text-lg text-center">
            Our restaurant started with a simple idea: to create a place where people can enjoy delicious, high-quality food in a warm and welcoming atmosphere. Over the years, we've grown from a small family-owned business to a beloved dining destination, known for our dedication to culinary excellence and exceptional service. We take pride in our rich history, which is filled with passion, hard work, and a commitment to making every dining experience unforgettable.
          </p>
        </div>
      </section>

      <section className="team py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card bg-white p-4 rounded shadow-lg">
                <img src={member.image} alt={member.name} className="w-full h-48 object-cover rounded mb-4" />
                <h3 className="text-2xl font-bold text-center">{member.name}</h3>
                <p className="text-gray-600 text-center">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Photo Gallery</h2>
         
            <Gallery />
   
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
