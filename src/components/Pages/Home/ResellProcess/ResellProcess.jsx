import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { HiOutlineSearchCircle, HiOutlineShieldCheck, HiOutlineBadgeCheck } from 'react-icons/hi';

const steps = [
  {
    icon: <HiOutlineSearchCircle className="text-3xl" />,
    title: "1. Source & Inspect",
    description: "We source pre-owned PC hardware and run diagnostic assessments to verify underlying chip stability."
  },
  {
    icon: <HiOutlineShieldCheck className="text-3xl" />,
    title: "2. Stress Test",
    description: "Every component undergoes thorough thermal and benchmark stress testing under maximum compute loads."
  },
  {
    icon: <HiOutlineBadgeCheck className="text-3xl" />,
    title: "3. Certify & List",
    description: "Once verified functional, items receive our stamp of reliability and are listed for deployment."
  }
];

const ResellProcess = () => {
  return (
    <section className="bg-slate-950 text-slate-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Structural ambient decorative backgrounds */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25),transparent_60%)]" />

      <div className="max-w-6xl mx-auto relative z-10 text-center space-y-16">
        
        {/* Header Block */}
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
            Quality Assurance Pipeline
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Our Resell Process
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            We don't just flip components; we validate them. Every piece of hardware goes through a rigorous inspection sequence before it gets anywhere near your setup.
          </p>
        </div>

        {/* Process Steps Cards Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900 border border-slate-800/80 p-6 sm:p-8 rounded-2xl shadow-xl hover:border-slate-700 transition duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="inline-block p-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button Segment */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold text-white">Still have questions?</h4>
            <p className="text-sm text-slate-400">See how we guarantee platform uptime values.</p>
          </div>
          <button className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-black text-white border border-indigo-600 hover:border-white tracking-wider font-bold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/10 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-base group">
            Get Started
            <BsArrowRight className="ml-2 text-xl group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ResellProcess;