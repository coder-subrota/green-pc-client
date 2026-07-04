import React from "react";

const teamMembers = [
  {
    name: "Alexa",
    role: "Co-Founder / Hardware Lead",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500"
  },
  {
    name: "Olivia",
    role: "Operations Manager",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=500"
  },
  {
    name: "Liam",
    role: "Quality Assurance",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=500"
  },
  {
    name: "Elijah",
    role: "Customer Success Lead",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500"
  }
];

const AboutUs = () => {
  return (
    <section className="bg-slate-950 text-slate-100 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section 1: About Us */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium border border-emerald-500/20">
              <span>Who We Are</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              About Us
            </h1>
            <div className="text-base sm:text-lg text-slate-300 space-y-4 leading-relaxed font-normal">
              <p>
                At All Green Computer, we are passionate about delivering exceptional resellable computer products that power your digital world. With an unyielding focus on quality, systemic innovation, and client satisfaction, we offer a precisely curated collection of systems built to elevate your daily computing experiences.
              </p>
              <p>
                Our journey began with a simple idea: to provide access to high-performance hardware you can trust unconditionally. We eliminate the guesswork from choosing custom electronics by matching strict performance standards against highly thoroughly vetted equipment.
              </p>
              <p>
                We believe exceptional computing hardware starts with superior engineering. By maintaining a sharp focus on durability, benchmarks, and thermal dynamics, each unit in our selection undergo extensive component-level testing to ensure reliable stability long before it reaches your desk.
              </p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-35 transition duration-300"></div>
            <img 
              className="relative w-full rounded-2xl object-cover shadow-2xl border border-slate-800 h-[450px]" 
              src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=800&h=500" 
              alt="Our clean hardware validation workshop environment" 
            />
          </div>
        </div>

        {/* Section 2: Our Story & Team Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-8">
          <div className="w-full lg:w-1/2 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/20">
              <span>Our Roots</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Our Story
            </h2>
            <div className="text-base sm:text-lg text-slate-300 space-y-4 leading-relaxed font-normal">
              <p>
                We started out as a tight-knit circle of tech-enthusiasts, technicians, and engineering purists who shared an explicit vision: to disrupt standard recycling cycles with premium hardware alternatives that regularly surpass client standards.
              </p>
              <p>
                We believe premium hardware is vastly superior to the sum of raw specifications. Devices must align tightly with workflows, perform efficiently under extreme stress, and deliver lasting structural value across multi-year cycles.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {teamMembers.map((member, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-900 border border-slate-800/80 p-3 sm:p-4 rounded-xl shadow-xl flex flex-col items-center text-center hover:border-slate-700 transition duration-300 group"
                >
                  <div className="overflow-hidden rounded-lg w-full aspect-[4/5]">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 filter grayscale group-hover:grayscale-0" 
                      src={member.img} 
                      alt={`Professional profile picture of ${member.name}`} 
                    />
                  </div>
                  <h3 className="font-bold text-lg text-white mt-4 group-hover:text-emerald-400 transition duration-200">
                    {member.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;