import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { AuthProvider } from '../../../UserContext/UserContext';
import { Typewriter } from 'react-simple-typewriter';
import { IoHeartOutline, IoWalletOutline, IoCheckmarkCircle, IoListOutline } from "react-icons/io5";

const WishList = () => {
    const { user } = useContext(AuthProvider);
    const navigate = useNavigate();
    const email = user?.email;

    // TanStack Query (সঠিক queryKey এবং v4/v5 স্ট্যান্ডার্ডসহ)
    const { data: wishListData = [], isLoading } = useQuery({
        queryKey: ['wishList', email], // Query key-টি উইশলিস্টের জন্য ইউনিক করা হলো
        enabled: !!email,
        queryFn: async () => {
            const res = await fetch(`https://green-pc-server-1b9h.vercel.app/wishList/${email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("pc-shop-only")}`
                }
            });
            if (res.status === 401 || res.status === 403) {
                navigate("/login");
                return [];
            }
            return res.json();
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-[70vh] flex flex-col justify-center items-center gap-4">
                <HashLoader color="#10B981" size={50} />
                <p className="text-slate-500 font-medium animate-pulse">Loading your wishlist...</p>
            </div>
        );
    }

    // wishList !== false ক্যাটাগরির প্রোডাক্টগুলোকে ফিল্টার করে নেওয়া হলো যেন লেআউট ব্রেক না করে
    const activeWishList = wishListData.filter(item => item.wishList !== false);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen bg-cyan-700 rounded">
            <Helmet>
                <title>My Wishlist | GreenPC</title>
            </Helmet>

            {/* Header Section */}
            <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center border-b border-slate-200 pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        My <span className="text-emerald-500">Wishlist</span>
                    </h1>
                    <p className="text-white mt-1">Your favorite PC components saved for later.</p>
                </div>
                <div className="bg-white border border-slate-200 px-5 py-3 rounded-2xl shadow-sm flex items-center gap-3">
                    <div className="p-2 bg-pink-50 text-pink-500 rounded-xl">
                        <IoHeartOutline className="text-xl" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Saved Items</p>
                        <p className="text-xl font-bold text-slate-800">{activeWishList?.length || "0"} Products</p>
                    </div>
                </div>
            </div>

            {/* Wishlist Grid */}
            {activeWishList?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeWishList.map(item => (
                        <div 
                            className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group" 
                            key={item._id}
                        >
                            {/* Product Image */}
                            <div className="relative h-64 bg-slate-100 overflow-hidden">
                                <img 
                                    src={item.productImage}  
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    alt={item.productName} 
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-pink-500 shadow-sm flex items-center justify-center">
                                        <IoHeartOutline className="text-lg fill-pink-500" />
                                    </span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                                        {item.productName}
                                    </h3>
                                    <p className="text-slate-500 text-sm mt-1 line-clamp-2 min-h-[40px]">
                                        {item.description || "No description available for this item."}
                                    </p>

                                    {/* Pricing */}
                                    <div className="my-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Price</span>
                                        <span className="text-2xl font-black text-slate-900">${item.ProductPrice}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-4">
                                    {item.paid !== true ? (
                                        <NavLink to={`/wishListproductPayment/${item._id}`} className="block w-full">
                                            <button className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all active:scale-[0.99] flex justify-center items-center gap-2 shadow-md hover:shadow-emerald-100">
                                                <IoWalletOutline className="text-lg" /> Buy Now
                                            </button>
                                        </NavLink>
                                    ) : (
                                        <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold py-3 px-4 rounded-xl flex justify-center items-center gap-2 text-sm">
                                            <IoCheckmarkCircle className="text-lg text-emerald-600" /> Already Purchased
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty Wishlist State */
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/60 shadow-sm max-w-xl mx-auto my-10 px-6">
                    <div className="w-20 h-20 bg-slate-50 border border-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <IoListOutline className="text-4xl" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Your Wishlist is Empty</h2>
                    <div className="text-emerald-600 font-semibold mt-3 h-8 text-lg">
                        <Typewriter
                            words={['Discover amazing hardware.', 'Save your favorite picks!', 'Build your dream setup.']}
                            loop={0}
                            cursor
                            cursorStyle='|'
                            typeSpeed={60}
                            deleteSpeed={40}
                            delaySpeed={1500}
                        />
                    </div>
                    <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
                        Explore our market and add items to your wishlist. They will show up here so you can buy them anytime.
                    </p>
                    <NavLink to="/">
                        <button className="mt-8 bg-slate-900 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md">
                            Explore Products
                        </button>
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default WishList;