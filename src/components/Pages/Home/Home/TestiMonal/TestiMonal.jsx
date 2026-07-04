import React from "react";

// Robust, high-quality Unsplash portrait URLs that will remain stable and active
const testimonialsData = [
  {
    id: 1,
    name: "Anna Smith",
    role: "Verified Purchaser",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
    text: "I've tried several similar products in the past, but none compare to the Monitor from All green computer. The design is sleek and modern, and the functionality is top-notch. It has become an indispensable tool for me."
  },
  {
    id: 2,
    name: "Dany John",
    role: "Verified Purchaser",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    text: "At All green computer, customer satisfaction is our priority. We are thrilled to receive such positive feedback from our valued customers, and it serves as a testament to our commitment to delivering high-quality resellable products."
  },
  {
    id: 3,
    name: "Mike Blake",
    role: "Verified Purchaser",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120",
    text: "The resellable products offered by all green computer are simply outstanding. From the moment I received my order, I could tell that great care had been taken in packaging and presentation. The product itself is fantastic and has become a game-changer."
  }
];

export default function Testimonials() {
  return (
    <section className="bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-emerald-400 font-semibold tracking-wider uppercase text-sm">
            Customer Success
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Our customers love what we do
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We invite you to experience the excellence and satisfaction that our products offer. 
            Explore our collection today and join the ranks of our delighted customers!
          </p>
          <div className="pt-4">
            <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-black border-indigo-600 hover:border-white transition-all duration-300 shadow-md hover:shadow-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Read success stories
            </button>
          </div>
        </div>

        {/* Testimonials Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {testimonialsData.map((item) => (
            <div 
              key={item.id} 
              className="relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300 group shadow-xl"
            >
              {/* Permanent SVG Quote Icon Component (No Image Dependancy) */}
              <div className="absolute top-6 right-8 text-slate-800 group-hover:text-emerald-500/10 transition-colors duration-300">
                <svg className="w-12 h-12 transform rotate-180 fill-current" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Review Body Text */}
              <div className="relative z-10">
                <p className="text-slate-300 text-base leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              {/* Review Author Profile Section */}
              <div className="mt-8 flex items-center space-x-4 border-t border-slate-800/60 pt-4 relative z-10">
                <img 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-800 group-hover:ring-emerald-400 transition-all duration-300"
                  src={item.avatar} 
                  alt={`Portrait of ${item.name}`} 
                  loading="lazy"
                />
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}