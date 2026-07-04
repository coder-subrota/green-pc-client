import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

const slideData = [
  {
    id: "slide1",
    prev: "#slide4",
    next: "#slide2",
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=1600&auto=format&fit=crop",
    title: "Certified Pre-Owned Hardware",
    subtitle: "We supply original, thoroughly stress-tested PC components and reusable hardware systems configured for long-term production stability."
  },
  {
    id: "slide2",
    prev: "#slide1",
    next: "#slide3",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1600&auto=format&fit=crop",
    title: "Rigorous Benchmarking Process",
    subtitle: "Every silicon wafer, controller deck, and processing terminal undergoes thermal testing under load before platform enrollment."
  },
  {
    id: "slide3",
    prev: "#slide2",
    next: "#slide4",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop",
    title: "Sustainable Electronics Circularity",
    subtitle: "Reduce enterprise e-waste footprints without sacrificing compute cycles. Invest in high-performance hardware lines deployment-ready today."
  },
  {
    id: "slide4",
    prev: "#slide3",
    next: "#slide1",
    image: "https://images.unsplash.com/photo-1560085812-149124867a4c?q=80&w=1600&auto=format&fit=crop",
    title: "Why We Stand Apart",
    subtitle: "Original equipment manufacturer validation loops paired with direct localized shipping networks ensure reliable equipment arrival metrics."
  }
];

const Slider = () => {
  return (
    <div className="carousel w-full relative h-[70vh] sm:h-[85vh] min-h-[500px] bg-slate-950 overflow-hidden border-b border-slate-900">
      {slideData.map((slide) => (
        <div 
          key={slide.id} 
          id={slide.id} 
          className="carousel-item relative w-full h-full group"
        >
          {/* Main Background Image Block with modern scale animation logic */}
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="w-full h-full object-cover select-none pointer-events-none scale-100 group-hover:scale-101 transition-transform duration-[8000ms] ease-out" 
          />

          {/* Contrast-enhancing overlay filter layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-transparent" />

          {/* Centered Copywriting Callout Container */}
          <div className="absolute inset-0 flex items-center z-10 px-6 sm:px-12 md:px-20 lg:px-32">
            <div className="max-w-2xl space-y-6 text-left">
              <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase bg-slate-950/40 px-3 py-1 rounded-full border border-slate-800 backdrop-blur-sm inline-block">
                Verified Hardware Ecosystem
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                {slide.title}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed">
                {slide.subtitle}
              </p>
              <div className="pt-2">
                <button className="inline-flex items-center justify-center px-6 py-3.5 bg-indigo-600 hover:bg-black text-white border border-indigo-600 hover:border-white tracking-wider font-bold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/10 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm group">
                  Get Started
                  <BsArrowRight className="ml-2 text-lg group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>

          {/* Left / Right Navigation Triggers */}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2 z-20 pointer-events-none">
            <a 
              href={slide.prev} 
              className="btn btn-circle bg-slate-900/60 hover:bg-indigo-600 border border-slate-800 hover:border-indigo-500 text-slate-300 hover:text-white backdrop-blur-sm pointer-events-auto transition duration-300 shadow-xl"
              aria-label="Previous Slide"
            >
              <HiOutlineChevronLeft className="text-xl sm:text-2xl" />
            </a> 
            <a 
              href={slide.next} 
              className="btn btn-circle bg-slate-900/60 hover:bg-indigo-600 border border-slate-800 hover:border-indigo-500 text-slate-300 hover:text-white backdrop-blur-sm pointer-events-auto transition duration-300 shadow-xl"
              aria-label="Next Slide"
            >
              <HiOutlineChevronRight className="text-xl sm:text-2xl" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;