import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { AuthProvider } from '../../../UserContext/UserContext';
import { IoPeopleOutline, IoMailOutline, IoLocationOutline, IoCallOutline, IoPersonCircleOutline } from 'react-icons/io5';

const MyBuyers = () => {
    const { currentUser } = useContext(AuthProvider);
    const email = currentUser?.email;
    const navigate = useNavigate();

    // TanStack Query (সঠিক queryKey এবং ক্যাশিং লজিকসহ)
    const { data: myTotalBuyers = [], isLoading } = useQuery({
        queryKey: ['myBuyers', email],
        enabled: !!email,
        queryFn: async () => {
            const res = await fetch(`https://green-pc-server-7u1g.vercel.app/myBuyers/${email}`, {
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
                <p className="text-slate-500 font-medium animate-pulse">Loading your buyers...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen bg-cyan-700 rounded">
            <Helmet><title>My Buyers | Seller Dashboard</title></Helmet>

            {/* Header Section */}
            <div className="mb-10 border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        My <span className="text-emerald-500">Buyers</span>
                    </h1>
                    <p className="text-white mt-1">View and manage customers who connected with you to purchase components.</p>
                </div>
                <div className="bg-white border border-slate-200 px-5 py-2.5 rounded-2xl shadow-sm text-sm font-bold text-slate-700 flex items-center gap-2">
                    <IoPeopleOutline className="text-emerald-500 text-lg" />
                    Total Buyers: <span className="text-emerald-600 text-base">{myTotalBuyers?.length || 0}</span>
                </div>
            </div>

            {/* Buyers Grid */}
            {myTotalBuyers?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myTotalBuyers.map((buyer, index) => (
                        <div 
                            className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between"
                            key={buyer._id || index}
                        >
                            {/* Card Top / Profile Area */}
                            <div className="p-6 pb-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                                        <img 
                                            src={buyer?.profile || "https://i.ibb.co/colors.png"} 
                                            alt={buyer?.name || "Buyer"} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                                            }}
                                        />
                                    </div>
                                    <div className="truncate">
                                        <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                                            Client
                                        </span>
                                        <h3 className="text-base font-bold text-slate-800 truncate mt-1 group-hover:text-emerald-600 transition-colors">
                                            {buyer?.name || "Anonymous Buyer"}
                                        </h3>
                                    </div>
                                </div>

                                {/* Contact & Meeting Information */}
                                <div className="mt-6 space-y-3 pt-4 border-t border-slate-100 text-sm text-slate-600">
                                    <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                                        <IoMailOutline className="text-slate-400 text-base shrink-0" />
                                        <span className="truncate text-xs font-medium" title={buyer?.email}>
                                            {buyer?.email || "No Email Provided"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                                        <IoCallOutline className="text-slate-400 text-base shrink-0" />
                                        <span className="text-xs font-medium">
                                            {buyer?.phoneNumber || "No Phone Number"}
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                                        <IoLocationOutline className="text-slate-400 text-base shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Deal Location</p>
                                            <p className="text-xs font-semibold text-slate-700 mt-0.5 line-clamp-1">
                                                {buyer?.meetingLocation || "Not specified yet"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer / Action Hint */}
                            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] font-medium text-slate-400 tracking-wide">
                                Connected Profile
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State View */
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/60 shadow-sm max-w-xl mx-auto my-10 px-6">
                    <div className="w-20 h-20 bg-slate-50 border border-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <IoPersonCircleOutline className="text-4xl" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">No Buyers Yet</h2>
                    <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
                        When interested buyers secure or book your advertised computer components, their contact profiles and meet-up coordinates will appear right here.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyBuyers;