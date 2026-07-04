import React from "react";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

export default function ContactUs() {
  return (
    <section className="bg-slate-950 text-slate-100 py-16 sm:py-24 relative overflow-hidden">
      {/* Structural ambient decorative background layers */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.45),transparent_45%)]" />
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.3),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
          
          {/* Left Block: Information Column */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
                Find Us
              </span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                We’re Here
              </h1>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                We believe digital innovation sits comfortably at the heart of every business success layer. Stop by our facility or drop a line anytime.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              {/* Address Row */}
              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 group-hover:text-emerald-400 group-hover:border-slate-700 transition duration-300">
                  <HiOutlineLocationMarker className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-wider uppercase text-slate-400">Address</h3>
                  <p className="text-base text-slate-200 mt-1 leading-relaxed">
                    Office #13, NSTP, NUST University<br />H-12 Sector, Joypurhat
                  </p>
                </div>
              </div>

              {/* Contact Numbers Row */}
              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 group-hover:text-emerald-400 group-hover:border-slate-700 transition duration-300">
                  <HiOutlinePhone className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-wider uppercase text-slate-400">Contact</h3>
                  <p className="text-base text-slate-200 mt-1 hover:text-indigo-400 transition cursor-pointer">+880 1745-124578 (Phone)</p>
                  <p className="text-base text-slate-200 hover:text-indigo-400 transition cursor-pointer">+880 1954-125450 (Cell)</p>
                </div>
              </div>

              {/* Email Addresses Row */}
              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 group-hover:text-emerald-400 group-hover:border-slate-700 transition duration-300">
                  <HiOutlineMail className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-wider uppercase text-slate-400">Email</h3>
                  <a href="mailto:bdproduct24@gmail.com" className="text-base text-slate-200 mt-1 block hover:text-indigo-400 transition">
                    bdproduct24@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Fully Functional Form Submission Column */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 sm:p-10 rounded-2xl shadow-2xl relative">
            <div className="space-y-4 mb-8">
              <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
                Get In Touch
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight">
                Let’s Talk
              </h2>
              <p className="text-slate-400 text-sm">
                For commercial enquiries, please message our processing hub down below.
              </p>
            </div>

            <form action="https://formsubmit.co/itinfobd24@gmail.com" method="POST" className="space-y-6">
              
              {/* Explicit Configuration Flags for FormSubmit integration */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div>
                <label htmlFor="form-name" className="block text-sm font-bold text-slate-300 mb-2">Name</label>
                <input 
                  id="form-name"
                  name="name" 
                  type="text" 
                  required
                  placeholder="Justin Timberlake" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-200 placeholder-slate-600 outline-none hover:border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200 text-base"
                />
              </div>

              <div>
                <label htmlFor="form-email" className="block text-sm font-bold text-slate-300 mb-2">Email Address</label>
                <input 
                  id="form-email"
                  name="email" 
                  type="email" 
                  required
                  placeholder="example@mail.com" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-200 placeholder-slate-600 outline-none hover:border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200 text-base"
                />
              </div>

              <div>
                <label htmlFor="form-message" className="block text-sm font-bold text-slate-300 mb-2">Message</label>
                <textarea 
                  id="form-message"
                  name="message" 
                  required
                  rows="4"
                  placeholder="Write us something..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-200 placeholder-slate-600 outline-none hover:border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200 text-base resize-none"
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-black text-white border border-indigo-600 hover:border-white tracking-wider font-bold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/10 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-base"
                >
                  Send Message
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}