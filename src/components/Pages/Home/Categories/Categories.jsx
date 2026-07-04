import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";
// Fixed context endpoint import to align with standard context usage pattern
import { AuthContext, AuthProvider } from '../../../../UserContext/UserContext';
import AddCategoryCard from '../../AddCategoryCard/AddCategoryCard';

const Categories = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthProvider);

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'], // Fixed crucial trailing whitespace bug here
    queryFn: () => fetch(`https://green-pc-server-1b9h.vercel.app/categories`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("pc-shop-only")}`
      }
    })
    .then(res => {
      if (res.status === 403 || res.status === 401) {
        toast.error("Access denied. Please log in first.");
        navigate("/login");
        throw new Error("Unauthorized access");
      }
      return res.json();
    })
    .catch(error => {
      console.error("Fetch Error:", error);
    })
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <HashLoader color="#DE1068" size={60} />
      </div>
    );
  }

  return (
    <section className="bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Banner/Header Block */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 p-8 md:p-12 shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.4),transparent_50%)]" />
          
          <div className="max-w-3xl relative z-10 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Get the Best Reusable Computers
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              Get the latest verified hardware straight from our collection. We provide certified pre-owned 
              components perfect for starting out or powering your standard workspace. We deal exclusively in 
              PC-centric configurations—monitors, core system towers, premium keyboards, and structural hardware components.
            </p>
            <div className="pt-4">
              <a href="#latest-products" className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-black text-white border border-indigo-600 hover:border-white tracking-wider font-bold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/10 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm group">
                Browse Collection
                <BsArrowRight className="ml-2 text-lg group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          </div>
        </div>

        {/* Categories Dynamic Count Grid Title */}
        <div id="latest-products" className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Available Components By Category
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            We currently host <span className="text-emerald-400 font-bold">{categories?.length || 0} hardware lines</span>. 
            Create your account today to access full booking pipelines.
          </p>
        </div>

        {/* Category Cards Matrix */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {categories?.map((category) => (
            <div 
              key={category._id} 
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 transition duration-300 flex flex-col group"
            >
              {/* Product Image Wrapper */}
              <div className="aspect-video w-full bg-slate-950 border-b border-slate-800/60 overflow-hidden flex items-center justify-center p-4">
                <img 
                  src={category?.productImage} 
                  alt={category?.productCategory || "Product image"}
                  className="max-h-full max-w-full object-contain rounded-lg group-hover:scale-102 transition duration-500"
                  loading="lazy"
                />
              </div>

              {/* Product Info Block */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">
                    {category?.productCategory}
                  </span>
                  <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                    {category?.description || "No product summary provided by merchant."}
                  </p>
                </div>

                {/* Listing metadata key-values */}
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 border-t border-slate-800/60 pt-4 text-xs font-medium text-slate-400">
                  <div>
                    <span className="block text-slate-500">MSRP Valuation</span>
                    <span className="text-sm font-bold text-white">${category?.ProductPrice}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500">Listed Stamp</span>
                    <span className="text-slate-300 font-semibold">{category?.publishDate}</span>
                  </div>
                </div>

                {/* Conditional Rendering Action Pipeline */}
                {currentUser?.role === "Buyer" && (
                  <div className="pt-2">
                    <NavLink to={`/available-products/${category._id}`} className="block">
                      <button className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-slate-800 hover:bg-black border border-slate-700 hover:border-white text-white text-sm font-bold rounded-lg transition-all duration-300">
                        View Category 
                        <BsArrowRight className="ml-2" />
                      </button>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Seller Interactive Category Creator Box */}
          {currentUser?.role === "Seller" && (
            <div className="flex items-stretch h-full">
              <AddCategoryCard />
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Categories;