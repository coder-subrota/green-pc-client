import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BsArrowRight, BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../../../UserContext/UserContext';
import BookNow from '../../BookNow/BookNow';
import "../Categories/Categories.css";

// 1. Create an isolated Axios Instance to prevent global pollution and interceptor bugs
const api = axios.create({
  baseURL: 'https://green-pc-server-1b9h.vercel.app',
});

// 2. Attach the interceptor cleanly to this instance
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("pc-shop-only");
    if (token) {
      // Standardized capitalized Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const Advertise = () => {
  const [bookingData, setBookingData] = useState({});
  const [closeModal, setCloseModal] = useState(true);
  const [sellerInfo, setSellerInfo] = useState([]);
  const { currentUser } = useContext(AuthProvider);

  // Fetch Advertised Items using our clean Axios instance
  const { data: advertiseItems = [], isLoading } = useQuery({
    queryKey: ['advertiseItems'],
    queryFn: async () => {
      const response = await api.get('/advertiseItems');
      return response.data;
    },
    onError: (error) => {
      console.error(error);
      if (error.response?.status === 403) {
        toast.error("Session expired or unauthorized. Please log in again.");
      }
    }
  });

  // Fetch Sellers Info safely using the same verified instance
  useEffect(() => {
    api.get("/users")
      .then(res => setSellerInfo(res.data))
      .catch(error => {
        console.error(error);
        if (error.response?.status !== 403) {
          toast.error(error.message || "Failed to load seller information");
        }
      });
  }, []);

  if (isLoading || !currentUser) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <HashLoader color="#DE1068" size={60} />
      </div>
    );
  }

  // Filter valid advertisement items upfront
  const validAdvertisements = advertiseItems.filter(item => item.advertise === true);

  if (validAdvertisements.length === 0) return null;

  const handleBookingData = (item) => {
    setBookingData(item);
    setCloseModal(false);
  };

  return (
    <section className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 p-8 bg-gradient-to-r from-base-200 to-base-100 rounded-2xl shadow-sm border border-base-300">
        <div className="flex justify-center w-full md:w-auto">
          <img 
            src="https://i.ibb.co/fDCX1yw/unseen.png"
            className="w-48 object-contain drop-shadow-md animate-pulse" 
            alt="Featured products promotion" 
          />
        </div>

        <div className="text-center md:text-left max-w-xl">
          <span className="badge badge-primary font-semibold mb-2">Exclusive Finds</span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Total of {validAdvertisements.length} Hot Deals Waiting
          </h1>
          <p className="text-base-content/70 mb-5 leading-relaxed">
            Discover unmissable, certified pre-owned gear. Lock down your favorites before somebody else claims them!
          </p>
          <a href="#latest-product" className="btn btn-primary gap-2">
            Explore Deals <BsArrowRight className="text-lg" />
          </a>
        </div>
      </div>

      {/* Grid Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="latest-product">
        {validAdvertisements.map((advertise) => {
          const matchingSeller = sellerInfo.find(user => user.email === advertise.sellerEmail);
          const isSold = advertise?.product === "sold";

          return (
            <div 
              className="card card-bordered bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full border-base-200" 
              key={advertise._id}
            >
              {/* Product Image Wrapper */}
              <figure className="relative pt-[75%] bg-base-200 overflow-hidden">
                <img 
                  src={advertise.productImage} 
                  alt={advertise.productName}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                />
                {isSold && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-xs">
                    <span className="badge badge-error text-white font-bold p-4 text-sm tracking-wider uppercase shadow-lg">
                      Sold Out
                    </span>
                  </div>
                )}
              </figure>

              {/* Card Contents */}
              <div className="card-body p-6 flex flex-col flex-grow justify-between gap-4">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="card-title text-xl font-bold text-base-content line-clamp-1">
                      {advertise.productName}
                    </h2>
                    <span className="badge badge-secondary whitespace-nowrap">${advertise.ProductPrice}</span>
                  </div>
                  
                  <p className="text-sm text-base-content/70 line-clamp-2 mb-4">
                    {advertise.description}
                  </p>

                  {/* Info Specifications List */}
                  <div className="space-y-1.5 text-xs border-y border-base-200 py-3 my-3">
                    <div className="flex justify-between"><span className="text-base-content/60">Category:</span> <span className="font-medium">{advertise.productCategory}</span></div>
                    <div className="flex justify-between"><span className="text-base-content/60">Purchase Year:</span> <span className="font-medium">{advertise.purchaseYear}</span></div>
                    <div className="flex justify-between"><span className="text-base-content/60">Location:</span> <span className="font-medium">{advertise.location}</span></div>
                    <div className="flex justify-between"><span className="text-base-content/60">Published:</span> <span className="font-medium">{advertise.publishDate} @ {advertise.publishTime}</span></div>
                  </div>
                </div>

                {/* Seller Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-base-200/50 p-2.5 rounded-xl">
                    <img 
                      src={advertise.sellerProfile || "https://placehold.co/100"} 
                      alt={advertise.sellerName}
                      className="h-10 w-10 rounded-full object-cover border border-primary/20" 
                    />
                    <div className="text-xs truncate flex-1">
                      <p className="font-bold text-base-content">{advertise.sellerName}</p>
                      <p className="text-base-content/60 truncate">{advertise.sellerEmail}</p>
                    </div>
                  </div>

                  {/* Buyer Action Block */}
                  {currentUser.role === "Buyer" && (
                    <div className="space-y-3 pt-1">
                      {/* Seller Verification Status */}
                      <div className="flex items-center justify-between text-xs font-semibold px-1">
                        <span className="text-base-content/60">Seller Status:</span>
                        {matchingSeller ? (
                          matchingSeller.isSellerVerified ? (
                            <span className="text-success flex items-center gap-1">
                              Verified <BsCheckCircleFill className="text-sm" />
                            </span>
                          ) : (
                            <span className="text-base-content/50 flex items-center gap-1">
                              Unverified <BsXCircleFill className="text-sm" />
                            </span>
                          )
                        ) : (
                          <span className="text-base-content/40">Unknown</span>
                        )}
                      </div>

                      {/* Interactive Actions */}
                      <div className="card-actions w-full mt-2">
                        {!isSold ? (
                          <label 
                            htmlFor="bookingModal" 
                            onClick={() => handleBookingData(advertise)}
                            className="btn btn-primary btn-block gap-2 shadow-sm"
                          >
                            Book Now <BsArrowRight />
                          </label>
                        ) : (
                          <button disabled className="btn btn-disabled btn-block">
                            Item Unavailable
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Injection */}
      {!closeModal && (
        <BookNow
          modalData={bookingData}
          setCloseModale={setCloseModal}
        />
      )}
    </section>
  );
};

export default Advertise;