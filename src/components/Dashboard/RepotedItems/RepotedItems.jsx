import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import DeleteConformation from '../../Shares/DeleteConformation/DeleteConformation';
import { IoWarningOutline, IoShieldCheckmarkOutline, IoAlertCircleOutline, IoShieldOutline } from 'react-icons/io5';

const ReportedItems = () => {
    const [deleteData, setDeletedData] = useState({});
    const [closeModal, setCloseModel] = useState(true);
    const navigate = useNavigate();

    // Axios Request Interceptor
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${localStorage.getItem("pc-shop-only")}`;
            return config;
        },
        error => Promise.reject(error)
    );

    // TanStack Query (সঠিক queryKey ও এরর হ্যান্ডলিং-সহ)
    const { data: repotedItems = [], isLoading, refetch } = useQuery({
        queryKey: ['reportedItems'],
        queryFn: async () => {
            const res = await fetch(`https://green-pc-server-1b9h.vercel.app/repotedItems`, {
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
                <HashLoader color="#EF4444" size={50} />
                <p className="text-slate-500 font-medium animate-pulse">Scanning reported listings...</p>
            </div>
        );
    }

    // Delete reported item
    const handleReportDelete = (reportedItem) => {
        axios.delete(`https://green-pc-server-1b9h.vercel.app/deleteRepotedItems/${reportedItem._id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success("Reported listing removed successfully!");
                    setCloseModel(true);
                    refetch();
                }
            })
            .catch(error => toast.error(error.message));
    };

    const handleReportData = (reportedItem) => {
        setDeletedData(reportedItem); 
        setCloseModel(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen bg-cyan-700 rounded">
            <Helmet><title>Reported Items | Admin Dashboard</title></Helmet>

            {/* Header Section */}
            <div className="mb-10 border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        Reported <span className="text-red-500">Items</span>
                    </h1>
                    <p className="text-white">Review and take necessary moderation actions against flagged products.</p>
                </div>
                <div className="bg-white border border-red-100 px-5 py-2.5 rounded-2xl shadow-sm text-sm font-bold text-slate-700 flex items-center gap-2">
                    <IoWarningOutline className="text-red-500 text-lg animate-bounce" />
                    Total Flags: <span className="text-red-600 text-base">{repotedItems?.length || 0}</span>
                </div>
            </div>

            {/* Reported Items Grid */}
            {repotedItems?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {repotedItems.map(item => (
                        <div 
                            className="bg-white rounded-3xl border border-red-100/60 shadow-sm hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col overflow-hidden group" 
                            key={item._id}
                        >
                            {/* Product Image and Flag Tag */}
                            <div className="relative h-56 bg-slate-100 overflow-hidden">
                                <img 
                                    src={item?.productImage} 
                                    alt={item?.productName} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                                        <IoAlertCircleOutline className="text-xs" /> Under Review
                                    </span>
                                </div>
                            </div>

                            {/* Content Details */}
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-base font-bold text-slate-800 line-clamp-1 group-hover:text-red-600 transition-colors">
                                        {item?.productName}
                                    </h3>

                                    {/* Meta specs */}
                                    <div className="mt-4 space-y-2.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                                        <div className="flex justify-between items-center bg-slate-50 p-2 rounded-xl">
                                            <span className="text-slate-400 font-medium">Condition:</span>
                                            <span className="font-bold text-slate-700 uppercase tracking-wide text-[10px]">
                                                {item?.productCondition || "N/A"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Merchant/Seller Row */}
                                    <div className="mt-4 p-3 bg-red-50/30 rounded-2xl border border-red-100/30 flex items-center gap-3">
                                        <img 
                                            src={item?.sellerProfile || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                                            alt={item?.sellerName}
                                            className="h-9 w-9 rounded-full object-cover border-2 border-red-400 shadow-sm" 
                                        />
                                        <div className="truncate">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Reported Seller</p>
                                            <p className="text-xs font-bold text-slate-700 truncate">{item?.sellerName || "Verified User"}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Panel */}
                                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-[10px] font-medium text-slate-400">Action Required</span>
                                    <label 
                                        htmlFor="deleteConfirm" 
                                        onClick={() => handleReportData(item)}
                                        className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-red-50 rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1 text-xs font-bold"
                                    >
                                        <BsTrash className="text-sm" /> Delete Post
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty / No Reports State */
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/60 shadow-sm max-w-xl mx-auto my-10 px-6">
                    <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <IoShieldCheckmarkOutline className="text-4xl" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Marketplace is Clean!</h2>
                    <div className="text-emerald-600 font-semibold mt-3 h-8 text-lg">
                        <Typewriter
                            words={['No reported items found.', 'All products are safe.', 'System status: Secure.']}
                            loop={0}
                            cursor
                            cursorStyle='|'
                            typeSpeed={60}
                            deleteSpeed={40}
                            delaySpeed={1500}
                        />
                    </div>
                    <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
                        Awesome! There are currently no listings flagged by buyers or automated filters. Everything is running smoothly.
                    </p>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {!closeModal && (
                <DeleteConformation
                    handleDelete={handleReportDelete}
                    title={`Remove Flagged Listing?`}
                    text={`Are you sure you want to delete "${deleteData?.productName}"? This action removes it from the store permanently.`}
                    modalData={deleteData}
                />
            )}
        </div>
    );
};

export default ReportedItems;