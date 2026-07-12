import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../../UserContext/UserContext';
import axios from "axios";
import DeleteConformation from '../../Shares/DeleteConformation/DeleteConformation';
import { BsTrash } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import { 
    IoMegaphoneOutline, IoCheckmarkDoneOutline, IoTimeOutline, 
    IoCalendarOutline, IoLocationOutline, IoLayersOutline, IoAddCircleOutline 
} from 'react-icons/io5';
import { FiEdit3 } from 'react-icons/fi';

const MyProducts = () => {
    const { user } = useContext(AuthProvider);
    const navigate = useNavigate();
    const [deletedData, setDeletedData] = useState({});
    const [closeModal, setCloseModale] = useState(true);
    const email = user?.email;

    // TanStack Query (সঠিক queryKey এবং ক্যাশিং লজিকসহ)
    const { data: totalMyProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['myProducts', email],
        enabled: !!email,
        queryFn: async () => {
            const res = await fetch(`https://green-pc-server-7u1g.vercel.app/products/${email}`, {
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
                <p className="text-slate-500 font-medium animate-pulse">Loading your products...</p>
            </div>
        );
    }

    // Axios Request Interceptor
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${localStorage.getItem("pc-shop-only")}`;
            return config;
        },
        error => Promise.reject(error)
    );

    // Advertise Product Handle
    const handleAddproduct = (id) => {
        axios.put(`https://green-pc-server-7u1g.vercel.app/products/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success("Your product added to advertise successfully!");
                    refetch();
                }
            })
            .catch(error => console.log(error));
    };

    // Delete Product Handle
    const hadleDelete = (deletdProduct) => {
        const id = deletdProduct._id;
        axios.delete(`https://green-pc-server-7u1g.vercel.app/products/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success("Product successfully deleted");
                    setCloseModale(true);
                    refetch();
                }
            })
            .catch(error => toast.error(error.message));
    };

    const handleDeleteButton = (shareDeleted) => {
        setDeletedData(shareDeleted);
        setCloseModale(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen bg-cyan-700 rounded">
            <Helmet><title>My Products | Seller Dashboard</title></Helmet>

            {/* Header Section */}
            <div className="mb-10 border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        My <span className="text-emerald-500">Products</span>
                    </h1>
                    <p className="text-white mt-1">Manage, advertise, and track your listed computer hardware.</p>
                </div>
                <div className="bg-white border border-slate-200 px-5 py-2.5 rounded-2xl shadow-sm text-sm font-bold text-slate-700">
                    Total Listed: <span className="text-emerald-600 ml-1 text-base">{totalMyProducts?.length || 0} Items</span>
                </div>
            </div>

            {/* Products Grid */}
            {totalMyProducts?.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {totalMyProducts.map(product => (
                        <div 
                            className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row overflow-hidden group" 
                            key={product._id}
                        >
                            {/* Product Left Image Block */}
                            <div className="sm:w-2/5 relative min-h-[260px] bg-slate-100 overflow-hidden">
                                <img 
                                    src={product.productImage} 
                                    alt={product.productName} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3 flex flex-col gap-2">
                                    <span className="bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                                        <IoLayersOutline /> {product.productCategory}
                                    </span>
                                </div>
                            </div>

                            {/* Product Right Content Block */}
                            <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                                            {product.productName}
                                        </h3>
                                        {/* Delete Icon */}
                                        <label 
                                            htmlFor="deleteConfirm" 
                                            onClick={() => handleDeleteButton(product)}
                                            className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                                        >
                                            <BsTrash className="text-lg" />
                                        </label>

                                             {/* Delete Icon */}
                                        <label 
                                            onClick={() => navigate(`/dashboard/edit-products/${product._id}`)}
                                            className="p-1.5 text-slate-400 hover:text-cyan-500 bg-slate-50 hover:bg-gray-700 rounded-xl transition-colors cursor-pointer"
                                        >
                                            <FiEdit3 className="text-lg" />
                                        </label>
                                    </div>
                                    <p className="text-slate-500 text-xs mt-1 line-clamp-2">{product.description}</p>

                                    {/* Pricing Structure */}
                                    <div className="mt-4 p-3 bg-emerald-50/50 rounded-2xl flex justify-around items-center border border-emerald-100/50">
                                        <div className="text-center">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Resell Price</p>
                                            <p className="text-xl font-black text-emerald-600">${product.ProductPrice}</p>
                                        </div>
                                        <div className="h-6 w-[1px] bg-slate-200"></div>
                                        <div className="text-center">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Original Price</p>
                                            <p className="text-slate-500 font-bold line-through text-sm">${product.orginalPrice}</p>
                                        </div>
                                    </div>

                                    {/* Meta Information Grid */}
                                    <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 my-4 text-[11px] text-slate-600 border-t border-slate-100 pt-3">
                                        <div className="flex items-center gap-1 truncate">
                                            <IoLocationOutline className="text-slate-400 text-xs shrink-0" />
                                            <span>{product.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1 truncate">
                                            <IoCalendarOutline className="text-slate-400 text-xs shrink-0" />
                                            <span>Used since: {product.purchaseYear}</span>
                                        </div>
                                        <div className="flex items-center gap-1 truncate">
                                            <IoTimeOutline className="text-slate-400 text-xs shrink-0" />
                                            <span>{product.publishDate}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Dashboard & Action Controls */}
                                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                                    <div className="flex gap-1.5">
                                        {/* Advertise Action */}
                                        {product?.advertise ? (
                                            <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                                                <IoMegaphoneOutline /> Live Ads
                                            </span>
                                        ) : (
                                            <button 
                                                onClick={() => handleAddproduct(product._id)}
                                                className="bg-slate-900 hover:bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                                            >
                                                Advertise
                                            </button>
                                        )}

                                        {/* Sold / Unsold Tag */}
                                        {product?.product === "sold" ? (
                                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                                                <IoCheckmarkDoneOutline /> Sold out
                                            </span>
                                        ) : (
                                            <span className="bg-amber-50 text-amber-700 border border-amber-100 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                                                Unsold
                                            </span>
                                        )}
                                    </div>

                                    {/* Small Profile Signature */}
                                    <div className="flex items-center gap-2">
                                        <img 
                                            src={product.sellerProfile || "https://i.ibb.co/colors.png"} 
                                            alt={product.sellerName} 
                                            className="h-6 w-6 rounded-full border border-slate-200"
                                        />
                                        <span className="text-[10px] font-semibold text-slate-400 truncate max-w-[60px] hidden sm:inline">
                                            {product.sellerName}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty Product List View */
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/60 shadow-sm max-w-xl mx-auto my-10 px-6">
                    <div className="w-20 h-20 bg-slate-50 border border-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <IoAddCircleOutline className="text-4xl" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">No Products Listed Yet</h2>
                    <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
                        Ready to make some cash? Add your used hardware components to start selling right away on AllGreenPC!
                    </p>
                </div>
            )}

            {/* Conditionally Rendered Modal Component */}
            {!closeModal && (
                <DeleteConformation
                    handleDelete={hadleDelete}
                    modalData={deletedData}
                    title={`Delete "${deletedData.productName}"?`}
                    text="Are you sure you want to completely remove this listing? This action cannot be reversed."
                />
            )}
        </div>
    );
};

export default MyProducts;