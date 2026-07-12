import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import { BsGithub, BsFacebook } from "react-icons/bs";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 text-slate-200 overflow-hidden border-t border-slate-900">
      
      {/* Decorative High-Tech Background Glow (Replaces fragile background images) */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.3),transparent_45%)]" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.2),transparent_50%)]" />

      {/* Main Footer Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center space-x-3">
            {/* Embedded Inline SVG Tech Logo (Will never break or fail to load) */}
            <div className="bg-gradient-to-tr from-blue-600 to-emerald-500 p-2.5 rounded-xl shadow-lg shadow-blue-500/10">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-wider text-white bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
             All Green PC
            </span>
          </div>
          <p className="text-sm font-medium text-slate-400 max-w-sm leading-relaxed">
            Providing premium grade, reliable, and performance-certified resell computing hardware across the country since 2012.
          </p>
        </div>

        {/* Links Column 1: Services */}
        <div className="flex flex-col space-y-3">
          <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Services</span>
          <NavLink to="/category/pc" className="text-sm font-semibold hover:text-white transition-colors duration-200">Custom PCs</NavLink>
          <NavLink to="/category/monitors" className="text-sm font-semibold hover:text-white transition-colors duration-200">Monitors</NavLink>
        </div>

        {/* Links Column 2: Company */}
        <div className="flex flex-col space-y-3">
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Company</span>
          <NavLink to="/about" className="text-sm font-semibold hover:text-white transition-colors duration-200">About us</NavLink>
          <NavLink to="/contact" className="text-sm font-semibold hover:text-white transition-colors duration-200">Contact</NavLink>
        </div>

        {/* Links Column 3: Social & Connection */}
        <div className="flex flex-col space-y-4">
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Connect With Us</span>
          <p className="text-xs font-medium text-slate-400 leading-normal"> Stay updated with our latest daily stock drops.</p>
          <div className="flex items-center gap-4 text-2xl">
            <a href="https://twitter.com/Subrota66881404" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
              <AiFillTwitterCircle />
            </a>
            <a href="https://github.com/subrota22" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors duration-200">
              <BsGithub />
            </a>
            <a href="https://www.facebook.com/subrota112/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors duration-200">
              <BsFacebook />
            </a>
            <a href="https://www.instagram.com/fashionbyproduct21/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-500 transition-colors duration-200">
              <AiFillInstagram />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-slate-900 bg-slate-950/80 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>© {currentYear} . All rights reserved.</p>
          <p className="text-center sm:text-right">
            Designed & Engineered by{' '}
            <span className="text-slate-400 font-bold hover:text-emerald-400 transition-colors cursor-pointer">
              Subrota Chandra Sarker
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;