import React, { useContext, useState } from 'react';
import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";
import { toast } from 'react-toastify';
import { AuthProvider } from '../../../UserContext/UserContext';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IoCopy, IoCheckmarkCircle, IoCardOutline, IoShieldCheckmarkOutline, IoDownloadOutline } from "react-icons/io5";
import axios from 'axios';
import ButtonLoader from '../../Shares/ButtonLoader/ButtonLoader';

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://green-pc-server-1b9h.vercel.app";

const CheckoutForm = ({ product }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthProvider);
    const [payLoading, setPayLoading] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const [cardError, setCardError] = useState("");

    const { ProductPrice, _id, productsId, name: productName } = product;

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#1e293b',
                fontFamily: '"Inter", sans-serif',
                '::placeholder': { color: '#94a3b8' },
            },
            invalid: { color: '#ef4444' },
        },
    };

    // Sobcheye simple Window Print/PDF Download System (Kono library chara)
    const handlePrintReceipt = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>Receipt-${transactionId.substring(0, 8)}</title>
                <style>
                    body { font-family: sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
                    .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 30px; display: flex; justify-content: space-between; }
                    .title { font-size: 24px; font-weight: bold; }
                    .info-section { display: flex; justify-content: space-between; margin-bottom: 30px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th { background: #0f172a; color: white; padding: 10px; text-align: left; }
                    td { padding: 12px; border-bottom: 1px solid #e2e8f0; }
                    .total { text-align: right; font-size: 18px; font-weight: bold; margin-top: 20px; color: #059669; }
                    .footer { text-align: center; margin-top: 50px; color: #94a3b8; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="title">All Green Computer Receipts</div>
                    <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
                </div>
                <div class="info-section">
                    <div>
                        <h3>Customer Details</h3>
                        <p><strong>Name:</strong> ${user?.displayName || 'Anonymous'}</p>
                        <p><strong>Email:</strong> ${user?.email || 'Unknown'}</p>
                    </div>
                    <div style="text-align: right;">
                        <h3>Payment Details</h3>
                        <p><strong>Transaction ID:</strong> ${transactionId}</p>
                        <p><strong>Status:</strong> PAID</p>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Product Info</th>
                            <th style="text-align: right;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${productName || 'PC Component'} (ID: ${productsId || _id})</td>
                            <td style="text-align: right;">$${ProductPrice}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="total">Total Paid: $${ProductPrice}</div>
                <div class="footer">Thank you for shopping with All Green Computer!</div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print(); // Kono extra click chara direct browser printing/Save to PDF window open hobe
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card == null) return;

        setPayLoading(true);
        setCardError("");

        try {
            const token = localStorage.getItem("pc-shop-only");
            if (!token) {
                throw new Error("Authorization token missing. Please log in again.");
            }

            const { data } = await axios.post(
                `${API_BASE_URL}/create-payment-intent`,
                { price: parseInt(ProductPrice) },
                { headers: { authorization: `Bearer ${token}` } }
            );

            const clientSecret = data.clientSecret;

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: card,
                        billing_details: {
                            name: user?.displayName || 'Anonymous',
                            email: user?.email || 'Unknown',
                        },
                    },
                }
            );

            if (confirmError) {
                setCardError(confirmError.message);
                setPayLoading(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);
                
                const updateData = {
                    ordersId: _id,
                    productsId: productsId || _id,
                    transactionId: paymentIntent.id
                };
                
                await axios.put(`${API_BASE_URL}/updateDatabase`, updateData, {
                    headers: { authorization: `Bearer ${token}` }
                });

                toast.success("Payment Successful!");
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Network connection failed.";
            toast.error(errorMessage);
            setCardError(errorMessage);
        } finally {
            setPayLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto my-10">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                <div className="bg-slate-900 p-8 text-white">
                    <h2 className="text-2xl font-bold italic tracking-tight">All Green Computer <span className="text-emerald-400">Checkout</span></h2>
                    <div className="mt-4 flex justify-between items-end">
                        <div>
                            <p className="text-slate-400 text-sm uppercase tracking-wider">Amount to Pay</p>
                            <p className="text-3xl font-semibold">${ProductPrice}</p>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    {!transactionId ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <IoCardOutline /> Card Information
                                </label>
                                <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:bg-white transition-all">
                                    <CardElement options={cardElementOptions} />
                                </div>
                                {cardError && <p className="text-red-500 text-xs italic mt-1">{cardError}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={!stripe || payLoading}
                                className={`w-full py-4 rounded-xl font-bold text-gray-700 transition-all flex justify-center items-center gap-2
                                    ${payLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-lg shadow-emerald-200'}
                                `}
                            >
                                {payLoading ? <ButtonLoader /> : `Pay $${ProductPrice}`}
                            </button>

                            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs uppercase tracking-widest font-semibold">
                                <IoShieldCheckmarkOutline className="text-emerald-500 text-lg" />
                                Secured by Stripe
                            </div>
                        </form>
                    ) : (
                        <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
                            <div className="flex justify-center mb-4">
                                <IoCheckmarkCircle className="text-6xl text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">Payment Received!</h3>
                            <p className="text-slate-500 mt-2">Thank you for your purchase.</p>
                            
                            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl relative group">
                                <p className="text-[10px] uppercase text-emerald-600 font-bold tracking-widest mb-1">Transaction Receipt</p>
                                <p className="text-xs font-mono text-emerald-800 break-all">{transactionId}</p>
                                
                                <CopyToClipboard text={transactionId} onCopy={() => toast.success("Copied to clipboard")}>
                                    <button className="mt-3 flex items-center gap-2 mx-auto bg-white px-4 py-2 rounded-full text-xs font-bold text-emerald-700 shadow-sm hover:shadow-md transition-all">
                                        <IoCopy /> Copy Reference
                                    </button>
                                </CopyToClipboard>
                            </div>

                            {/* Simple Working Print/PDF Button */}
                            <button 
                                onClick={handlePrintReceipt}
                                className="mt-6 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all flex justify-center items-center gap-2 shadow-md"
                            >
                                <IoDownloadOutline className="text-lg" /> Download Receipt (PDF)
                            </button>

                            <button 
                                onClick={() => window.location.reload()} 
                                className="mt-6 text-sm text-slate-400 hover:text-slate-600 underline underline-offset-4 block mx-auto"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;