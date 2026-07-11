import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLoaderData, useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../../UserContext/UserContext';
import BookNow from '../BookNow/BookNow';
import { TiTick } from "react-icons/ti";
import { HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineFlag, HiHeart, HiOutlineHeart } from "react-icons/hi";

const AllAvailableProducts = () => {
    const products = useLoaderData();
    const categoryId = products[0]?.categoryId;
    const [bookingData, setBookingData] = useState({});
    const [closeModal, setCloseModale] = useState(true); // true means modal is hidden
    const { currentUser } = useContext(AuthProvider);
    const [sellerInfo, setSellerInfo] = useState([]);
    const navigate = useNavigate();

    // Fetch Products
    const { data: productItems = [], isLoading, refetch } = useQuery({
        queryKey: ['available-products', categoryId],
        queryFn: async () => {
            const res = await fetch(`https://green-pc-server-7u1g.vercel.app/availAbleProducts/${categoryId}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("pc-shop-only")}`
                }
            });
            if (res.status === 401 || res.status === 403) {
                navigate("/");
                return [];
            }
            return res.json();
        }
    });

    // Fetch Seller info to check verification
    useEffect(() => {
        axios.get("https://green-pc-server-7u1g.vercel.app/users")
            .then(res => setSellerInfo(res.data))
            .catch(error => toast.error(error.message));
    }, []);

    // FIX: Define handleBookingData correctly
    const handleBookingData = (product) => {
        setBookingData(product);
        setCloseModale(false); // Open the modal
    };

    const handleWishList = (productItem) => {
        if (!currentUser?.email) return toast.warning("Please login first");
        const wishtListInfo = {
            buyerEmail: currentUser?.email,
            productId: productItem._id,
        };
        axios.put(`https://green-pc-server-7u1g.vercel.app/wishList/`, wishtListInfo)
            .then(res => {
                if (res.status === 403 || res.status === 401) return navigate("/");
                if (res.data.modifiedCount > 0) {
                    toast.success(`${productItem?.productName} added to wishlist`);
                    refetch();
                }
            }).catch(error => toast.error(error.message));
    };

    const handleReport = (product) => {
        axios.put(`https://green-pc-server-7u1g.vercel.app/repot/${product._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success(`Reported ${product.productName} successfully`);
                    refetch();
                }
            }).catch(error => toast.error(error.message));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <HashLoader color="#4A90E2" size={50} />
            </div>
        );
    }

    if (currentUser?.role !== "Buyer") {
        return (
            <div className="text-center py-20 bg-base-200 rounded-3xl m-10 border border-dashed border-base-300">
                <h2 className="text-2xl font-bold opacity-50">Access Restricted to Buyers Only</h2>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <Helmet>
                <title>Products | {productItems[0]?.productCategory || 'Available'}</title>
            </Helmet>

            <div className="text-center mb-12">
                <span className="badge badge-primary badge-outline font-bold mb-2 uppercase tracking-widest px-4 py-3">
                    {productItems[0]?.productCategory || "Category"}
                </span>
                <h2 className="text-4xl font-black text-base-content mt-2">
                    Available <span className="text-primary">{productItems?.length}</span> Products
                </h2>
                <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productItems.map(product => {
                    const seller = sellerInfo.find(s => s.email === product.sellerEmail);
                    const isVerified = seller?.isSellerVerified;
                    // Check if product is sold or paid
                    const isSold = product?.product === "sold" || product?.paid === true;

                    return (
                        <div key={product._id} className="group bg-base-100 rounded-[2.5rem] overflow-hidden border border-base-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative">
                            
                            {/* --- Wishlist Icon Logic --- */}
                            {!isSold && (
                                <div className="absolute top-4 right-4 z-10">
                                    <button 
                                        onClick={() => handleWishList(product)}
                                        className={`btn btn-circle btn-sm border-none shadow-md transition-all ${
                                            product.wishList 
                                            ? 'bg-rose-500 text-white' 
                                            : 'bg-white/90 backdrop-blur-sm text-gray-500 hover:text-rose-500'
                                        }`}
                                    >
                                        {product.wishList ? <HiHeart size={20} /> : <HiOutlineHeart size={20} />}
                                    </button>
                                </div>
                            )}

                            <figure className="relative h-72 overflow-hidden">
                                <img src={product?.productImage} alt={product?.productName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4">
                                    <div className="badge badge-neutral bg-black/60 backdrop-blur-md border-none text-white font-bold px-3 py-3">
                                        {product?.productCategory}
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-white/70 text-xs font-bold uppercase tracking-tighter">Resell Price</p>
                                            <p className="text-white text-3xl font-black">${product?.ProductPrice}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white/50 text-[10px] line-through font-bold">Original: ${product?.orginalPrice}</p>
                                        </div>
                                    </div>
                                </div>
                            </figure>

                            <div className="p-6">
                                <h2 className="text-xl font-bold text-base-content leading-tight h-14 overflow-hidden mb-3">
                                    {product?.productName}
                                </h2>

                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="flex items-center gap-2 text-xs font-medium opacity-70">
                                        <HiOutlineLocationMarker className="text-primary text-sm" /> {product?.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-medium opacity-70">
                                        <HiOutlineCalendar className="text-primary text-sm" /> {product?.purchaseYear}
                                    </div>
                                </div>

                                <div className="bg-base-200/50 rounded-2xl p-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img src={product.sellerProfile} alt={product.sellerName} className="h-10 w-10 rounded-full object-cover ring-2 ring-primary ring-offset-2 ring-offset-base-100" />
                                            {isVerified && (
                                                <div className="absolute -right-1 -top-1 bg-blue-600 text-white rounded-full p-0.5">
                                                    <TiTick size={12} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-sm font-black truncate">{product?.sellerName}</p>
                                            <p className="text-[10px] font-bold opacity-50 uppercase tracking-tighter">
                                                {isVerified ? 'Verified Seller' : 'Unverified Seller'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {!isSold ? (
                                        <label 
                                            htmlFor="bookingModal" 
                                            onClick={() => handleBookingData(product)}
                                            className="btn btn-primary rounded-xl font-bold shadow-lg shadow-primary/20"
                                        >
                                            Book Now
                                        </label>
                                    ) : (
                                        <button className="btn btn-disabled bg-success/20 text-success rounded-xl border-none">Sold Out</button>
                                    )}
                                    
                                    <button 
                                        onClick={() => handleReport(product)}
                                        disabled={product?.productIsRepote === "repoted"}
                                        className={`btn btn-sm btn-ghost rounded-xl font-bold gap-2 ${product?.productIsRepote === "repoted" ? 'text-success' : 'text-error hover:bg-error/10'}`}
                                    >
                                        <HiOutlineFlag /> {product?.productIsRepote === "repoted" ? 'Already Reported' : 'Report Product'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal rendering */}
            {!closeModal && (
                <BookNow
                    modalData={bookingData}
                    setCloseModale={setCloseModale}
                />
            )}
        </div>
    );
};

export default AllAvailableProducts;