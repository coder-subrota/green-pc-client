import React, { useContext, useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdFileUpload } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { AuthProvider } from '../../../UserContext/UserContext';
import ButtonLoader from '../../Shares/ButtonLoader/ButtonLoader';
import { TiTick } from 'react-icons/ti';

const AddProduct = () => {
    const [productImage, setProductImage] = useState(null);
    const [categoryNames, setCategoryNames] = useState([]);
    const [categoryInfo, setCategoryInfo] = useState({});
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { user, currentUser } = useContext(AuthProvider);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const image_bb_key = process.env.REACT_APP_imageBbKey;

    // Dropzone logic
    const onDrop = useCallback(acceptedFiles => {
        setProductImage(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    // Fetch categories on mount
    useEffect(() => {
        axios.get(`https://green-pc-server-7u1g.vercel.app/categoriesName`)
            .then(res => setCategoryNames(res.data))
            .catch(error => console.error("Category Fetch Error:", error));
    }, []);

    // Fetch single category detailed info
    useEffect(() => {
        if (!categoryName) return;
        axios.get(`https://green-pc-server-7u1g.vercel.app/categoriesInfo/${categoryName}`)
            .then(res => setCategoryInfo(res.data))
            .catch(error => console.error("Category Info Error:", error));
    }, [categoryName]);

    // Submit handler
    const onSubmit = productData => {
        setLoading(true);

        if (!productImage) {
            toast.error("Please upload a product image!");
            setLoading(false);
            return;
        }

        if (!user?.email) {
            toast.error("Your email address was not found!");
            setLoading(false);
            return;
        }

        // FormData must be generated inside the submission flow
        const formData = new FormData();
        formData.append("image", productImage);

        // Upload Image to ImgBB
        fetch(`https://api.imgbb.com/1/upload?key=${image_bb_key}`, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(productImageUrl => {
                if (!productImageUrl.success) {
                    throw new Error("Image upload failed");
                }

                const uploadedUrl = productImageUrl.data.url;
                const date = format(new Date(), "PP");
                const time = new Date().toLocaleTimeString();

                const insertInformation = {
                    productName: productData.productName.trim(),
                    productCategory: productData.productCategory.trim(),
                    categoryId: categoryInfo?._id ? categoryInfo._id.trim() : "",
                    purchaseYear: productData.purchaseYear.trim(),
                    ProductPrice: productData.ProductPrice.trim(),
                    orginalPrice: productData.orginalPrice.trim(),
                    phoneNumber: productData.phoneNumber.trim(),
                    location: productData.location.trim(),
                    productCondition: productData.productCondition.trim(),
                    productImage: uploadedUrl.trim(),
                    description: productData.description.trim(),
                    publishDate: date.trim(),
                    publishTime: time.trim(),
                    sellerName: user?.displayName?.trim() || "Anonymous",
                    sellerEmail: user.email.trim(),
                    sellerProfile: user?.photoURL?.trim() || "",
                };

                // Post to Server
                return fetch(`https://green-pc-server-7u1g.vercel.app/products`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("pc-shop-only")}`
                    },
                    body: JSON.stringify(insertInformation)
                });
            })
            .then(res => {
                if (res.status === 403 || res.status === 401) {
                    toast.error("Forbidden access. Redirecting...");
                    navigate("/");
                    return null;
                }
                return res.json();
            })
            .then(data => {
                if (!data) return;
                if (data.insertedId) {
                    toast.success("Great job! You added a product successfully 🚀");
                    navigate("/dashboard/my-products");
                } else if (data.categoryExisted) {
                    toast.info(data.categoryExisted);
                }
            })
            .catch(error => {
                console.error("Submission Error: ", error);
                toast.error("Something went wrong during submission.");
            })
            .finally(() => setLoading(false));
    };

    // Axios interceptor for JWT
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${localStorage.getItem("pc-shop-only")}`;
            return config;
        },
        error => Promise.reject(error)
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <Helmet><title>Add a Product | Dashboard</title></Helmet>

            <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">

                {/* Left Side: Marketing/Decorative Banner */}
                <div className="md:col-span-4 bg-gradient-to-br from-blue-600 to-indigo-800 p-8 flex flex-col justify-between text-white text-center md:text-left">
                    <div>
                        <h3 className="text-2xl font-bold tracking-wide">Marketplace</h3>
                        <p className="text-blue-100 text-sm mt-2">Reach thousands of tech buyers instantly by listing your gear here.</p>
                    </div>
                    <div className="my-8 md:my-0 flex justify-center">
                        <img
                            src="https://i.ibb.co/924FcWM/rocket.png"
                            alt="rocket animation"
                            className="h-44 w-auto animate-bounce transform rotate-45 object-contain filter drop-shadow-lg"
                        />
                    </div>
                    <div>
                        <p className="text-xs text-blue-200">Please provide accurate pricing and details to attract genuine buyers faster.</p>
                    </div>
                </div>

                {/* Right Side: Form Content */}
                <div className="md:col-span-8 p-8 sm:p-12">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-5 mb-6">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Add A New Product</h2>
                            <p className="text-sm text-gray-500 mt-1">Fill out the information below to create your listing.</p>
                        </div>
                        {currentUser?.isSellerVerified === true && (
                            <div className="mt-3 sm:mt-0 flex items-center bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm w-fit">
                                <span>Verified Seller</span>
                                <TiTick className="text-white text-base bg-blue-600 ml-1.5 rounded-full" />
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Product Category */}
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Product Category</label>
                                <select
                                    {...register("productCategory", { required: true })}
                                    onChange={(event) => setCategoryName(event.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select category...</option>
                                    {categoryNames.map(cat => (
                                        <option value={cat.productCategory} key={cat._id}>
                                            {cat.productCategory}
                                        </option>
                                    ))}
                                </select>
                                {errors.productCategory && <p className="text-xs text-red-500 mt-1.5 font-medium">Please select a product category</p>}
                            </div>

                            {/* Product Name */}
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Ryxen 5 5600X Setup"
                                    {...register("productName", { required: true })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                {errors.productName && <p className="text-xs text-red-500 mt-1.5 font-medium">Please enter the product name</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {/* Purchase Year */}
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Purchase Year</label>
                                <input
                                    type="text"
                                    placeholder="e.g., 2022"
                                    {...register("purchaseYear", { required: true })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                {errors.purchaseYear && <p className="text-xs text-red-500 mt-1.5 font-medium">Required field</p>}
                            </div>

                            {/* Original Price */}
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Original Price</label>
                                <input
                                    type="text"
                                    placeholder="Buying price ($)"
                                    {...register("orginalPrice", { required: true })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                {errors.orginalPrice && <p className="text-xs text-red-500 mt-1.5 font-medium">Required field</p>}
                            </div>

                            {/* Resell Price */}
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Resell Price</label>
                                <input
                                    type="text"
                                    placeholder="Selling price ($)"
                                    {...register("ProductPrice", { required: true })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                {errors.ProductPrice && <p className="text-xs text-red-500 mt-1.5 font-medium">Required field</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {/* Phone Number */}
                            <div className="flex flex-col sm:col-span-1">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Contact info"
                                    {...register("phoneNumber", { required: true })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                {errors.phoneNumber && <p className="text-xs text-red-500 mt-1.5 font-medium">Required field</p>}
                            </div>

                            {/* Location */}
                            <div className="flex flex-col sm:col-span-1">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Location</label>
                                <input
                                    type="text"
                                    placeholder="City, State"
                                    {...register("location", { required: true })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                {errors.location && <p className="text-xs text-red-500 mt-1.5 font-medium">Required field</p>}
                            </div>

                            {/* Product Condition */}
                            <div className="flex flex-col sm:col-span-1">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Product Condition</label>
                                <select
                                    {...register("productCondition", { required: true })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    defaultValue="Good"
                                >
                                    <option value="Good">Good</option>
                                    <option value="Excellent">Excellent</option>
                                    <option value="Fair">Fair</option>
                                </select>
                                {errors.productCondition && <p className="text-xs text-red-500 mt-1.5 font-medium">Required field</p>}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">Detailed Description</label>
                            <textarea
                                placeholder="Describe the specifications, usage history, modifications, defects etc..."
                                {...register("description", { required: true })}
                                rows="4"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                            />
                            {errors.description && <p className="text-xs text-red-500 mt-1.5 font-medium">Please add a small description</p>}
                        </div>

                        {/* Drag and drop product picture */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">Product Images</label>
                            <div {...getRootProps()} className="cursor-pointer group">
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <div className="border-2 border-dashed border-blue-500 bg-blue-50 py-8 px-4 rounded-xl flex flex-col items-center justify-center text-center transition-colors">
                                        <ButtonLoader className="mb-2" />
                                        <p className="text-sm font-medium text-blue-600">Drop files to attach them directly...</p>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-gray-50 py-8 px-4 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-200">
                                        <MdFileUpload className="text-4xl text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                                        {productImage?.name ? (
                                            <p className="text-sm font-medium text-emerald-600">Selected File: {productImage.name}</p>
                                        ) : (
                                            <div>
                                                <p className="text-sm font-semibold text-gray-700">Drag & drop your item photo here</p>
                                                <p className="text-xs text-gray-400 mt-1">or click anywhere inside this box to look up local folders</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Form Action Button */}
                        <div className="pt-2" style={{"backgroundColor":"black",'borderRadius':'55px'}}>
                            <button 
                            style={{"backgroundColor":"black",'borderRadius':'55px'}}
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center py-3 px-4 border  border-transparent rounded-lg text-base font-bold text-white bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                {loading ? <ButtonLoader /> : "Publish Listing"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;