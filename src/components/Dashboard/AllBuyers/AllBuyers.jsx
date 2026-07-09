import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { BsTrash } from "react-icons/bs";
import axios from 'axios';
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import HashLoader from 'react-spinners/HashLoader';
import DeleteConformation from '../../Shares/DeleteConformation/DeleteConformation';
import { useNavigate } from 'react-router-dom';
import { IoPeopleOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';

const AllBuyers = () => {
    const [buyersData, setbuyersData] = useState(null);
    const [closeModal, setCloseModale] = useState(false);
    const navigate = useNavigate();

    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${localStorage.getItem("pc-shop-only")}`;
            return config;
        },
        error => Promise.reject(error)
    );

    const { data: buyers = [], isLoading, refetch } = useQuery({
        queryKey: ['adminBuyersList'],
        queryFn: async () => {
            const res = await fetch(`https://green-pc-server-1b9h.vercel.app/buyers`, {
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
                <p className="text-slate-500 font-medium animate-pulse">Loading buyers database...</p>
            </div>
        );
    }

    const handleDelete = (buyerInfo) => {
        axios.delete(`https://green-pc-server-1b9h.vercel.app/buyers/${buyerInfo._id}`)
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return navigate("/");
                }
                if (res.data.acknowledged) {
                    toast.success("Buyer account successfully deleted");
                    refetch();
                    setCloseModale(false);
                }
            });
    };

    const triggerDeleteModal = (buyer) => {
        setbuyersData(buyer);
        setCloseModale(true);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen bg-cyan-700 rounded">
            <Helmet> <title>All Buyers | Admin Dashboard</title></Helmet>

            <div className="mb-10 border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Manage <span className="text-emerald-500">Buyers</span>
                    </h1>
                    <p className="text-white">Review active consumer accounts, monitor structural profiles, or prune credentials.</p>
                </div>
                <div className="bg-white border border-slate-200 px-5 py-2.5 rounded-2xl shadow-sm text-sm font-bold text-slate-700 flex items-center gap-2">
                    <IoPeopleOutline className="text-emerald-500 text-lg" />
                    Total Buyers: <span className="text-emerald-600 text-base">{buyers?.length || 0} Members</span>
                </div>
            </div>

            {buyers?.length > 0 ? (
                <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                              <th className="py-4 px-6 text-center">Index</th>
                              <th className="py-4 px-6">Profile Image</th>
                              <th className="py-4 px-6">Identity Specs</th>
                              <th className="py-4 px-6">System Role</th>
                              <th className="py-4 px-6 text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                            {buyers.map((buyer, index) => (
                              <tr className="hover:bg-slate-50/80 transition-colors group" key={buyer._id}>
                                <td className="py-4 px-6 text-center font-medium text-slate-400">{index + 1}</td>
                                <td className="py-4 px-6">
                                  <div className="h-12 w-12 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shadow-sm">
                                    <img 
                                      src={buyer.profile || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                                      className="w-full h-full object-cover" 
                                      alt="buyer profile" 
                                    />
                                  </div>
                                </td>
                                <td className="py-4 px-6">
                                  <p className="font-bold text-slate-800">{buyer?.name || "Anonymous Consumer"}</p>
                                  <p className="text-xs text-slate-400 mt-0.5">{buyer?.email || "No Email Bound"}</p>
                                </td>
                                <td className="py-4 px-6">
                                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-slate-200/50">
                                    {buyer.role || "buyer"}
                                  </span>
                                </td>
                                <td className="py-4 px-6 text-center">
                                  <div className="flex items-center justify-center gap-2">

                                    <label 
                                      htmlFor="deleteConfirm" 
                                      onClick={() => triggerDeleteModal(buyer)}
                                      className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                                    >
                                      <BsTrash className="text-base" />
                                    </label>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/60 shadow-sm max-w-xl mx-auto my-10 px-6">
                  <div className="w-20 h-20 bg-slate-50 border border-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <IoShieldCheckmarkOutline className="text-4xl" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">No Buyers Found</h2>
                  <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
                    There are currently no standard buyer accounts or user profiles matching this registry space.
                  </p>
                </div>
            )}

            {closeModal && (
                <DeleteConformation
                    handleDelete={handleDelete}
                    modalData={buyersData}
                    title={`Terminate Account Record?`}
                    text={`Are you sure you want to delete the consumer registration for "${buyersData?.name}" (${buyersData?.role})? This platform sweep is permanent.`}
                />
            )}
        </div>
    );
};

export default AllBuyers;