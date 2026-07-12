import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { AuthProvider } from '../../../UserContext/UserContext';
import { Typewriter } from 'react-simple-typewriter';
import { IoBagCheckOutline, IoWalletOutline, IoCheckmarkCircle, IoCallOutline, IoMailOutline } from "react-icons/io5";

const MyOrders = () => {
    const { user } = useContext(AuthProvider);
    const navigate = useNavigate();
    const email = user?.email;

    // TanStack Query (TanStack v4/v5 compatibility fix-সহ)
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['orders', email], // Query key-টি সঠিক করা হয়েছে
        enabled: !!email, // ইমেইল না থাকলে কোয়েরি রান হবে না
        queryFn: async () => {
            const res = await fetch(`https://green-pc-server-7u1g.vercel.app/orders/${email}`, {
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
                <p className="text-slate-500 font-medium animate-pulse">Loading your orders...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen bg-cyan-700 rounded">
            <Helmet><title>My Orders | AllGreenPC</title></Helmet>

            {/* Header Section */}
            <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center border-b border-slate-200 pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        My <span className="text-emerald-500">Orders</span>
                    </h1>
                    <p className="text-white mt-1">Manage and track your purchased or pending PC components.</p>
                </div>
                <div className="bg-white border border-slate-200 px-5 py-3 rounded-2xl shadow-sm flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                        <IoBagCheckOutline className="text-xl" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Success</p>
                        <p className="text-xl font-bold text-slate-800">{orders?.length || "0"} Orders</p>
                    </div>
                </div>
            </div>

            {/* Orders Grid */}
            {orders?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map(order => (
                        <div 
                            className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group" 
                            key={order._id}
                        >
                            {/* Product Image Area */}
                            <div className="relative h-64 bg-slate-100 overflow-hidden">
                                <img 
                                    src={order.productImage}  
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    alt={order.productName} 
                                />
                                <div className="absolute top-4 right-4">
                                    {order.paid ? (
                                        <span className="bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                                            <IoCheckmarkCircle className="text-sm" /> Paid
                                        </span>
                                    ) : (
                                        <span className="bg-amber-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                                            Pending Pay
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                                        {order.productName}
                                    </h3>
                                    <p className="text-slate-500 text-sm mt-1 line-clamp-2 min-h-[40px]">
                                        {order.description || "No product description provided."}
                                    </p>

                                    {/* Pricing & Summary */}
                                    <div className="my-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Price</span>
                                        <span className="text-2xl font-black text-slate-900">${order.ProductPrice}</span>
                                    </div>

                                    {/* Seller Info Section */}
                                    <div className="bg-slate-50 rounded-2xl p-4 space-y-2 mt-4 border border-slate-100">
                                        <div className="flex items-center gap-3 border-b border-slate-200/60 pb-2 mb-2">
                                            <img 
                                                src={order.sellerProfile || "https://i.ibb.co/colors.png"} 
                                                alt={order.sellerName || "Seller"}
                                                className="h-9 w-9 rounded-full object-cover border border-emerald-500 shadow-sm" 
                                            />
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium">Merchant / Seller</p>
                                                <p className="text-xs font-bold text-slate-700">{order.sellerName || "Verified Seller"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-600">
                                            <IoCallOutline className="text-slate-400 text-sm" />
                                            <span className="truncate">{order.phoneNumber || "N/A"}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-600">
                                            <IoMailOutline className="text-slate-400 text-sm" />
                                            <span className="truncate">{order.sellerEmail || "N/A"}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 pt-2">
                                    {!order.paid ? (
                                        <NavLink to={`/payments/${order._id}`} className="block w-full">
                                            <button className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all active:scale-[0.99] flex justify-center items-center gap-2 shadow-md hover:shadow-emerald-100">
                                                <IoWalletOutline className="text-lg" /> Pay Securely
                                            </button>
                                        </NavLink>
                                    ) : (
                                        <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold py-3 px-4 rounded-xl flex justify-center items-center gap-2 text-sm">
                                            <IoCheckmarkCircle className="text-lg text-emerald-600" /> Success Invoice Generated
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State View */
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/60 shadow-sm max-w-xl mx-auto my-10 px-6">
                    <div className="w-20 h-20 bg-slate-50 border border-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <IoBagCheckOutline className="text-4xl" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">No Orders Found</h2>
                    <div className="text-emerald-600 font-semibold mt-3 h-8 text-lg">
                        <Typewriter
                            words={['Please add some products.', 'Explore the marketplace!', 'Your order page is ready.']}
                            loop={0} // Infinity loop
                            cursor
                            cursorStyle='|'
                            typeSpeed={60}
                            deleteSpeed={40}
                            delaySpeed={1500}
                        />
                    </div>
                    <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
                        It looks like you haven't placed any orders yet. Head back to the shop to find your perfect PC components.
                    </p>
                    <NavLink to="/">
                        <button className="mt-8 bg-slate-900 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md">
                            Browse Products
                        </button>
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default MyOrders;