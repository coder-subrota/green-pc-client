import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext, AuthProvider } from '../../../UserContext/UserContext'; 
import { BeatLoader } from 'react-spinners';

const Dashboard = () => {
  const { currentUser, loading } = useContext(AuthProvider);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <BeatLoader color="#4A90E2" size={15} />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-base-100 p-4">
        <div className="text-center p-8 max-w-sm bg-base-200 rounded-2xl shadow-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-error mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-xl font-bold text-base-content mb-2">Access Denied</h3>
          <p className="text-sm text-base-content/70 mb-4">You must be logged in to view the dashboard management portal.</p>
          <NavLink to="/login" className="btn btn-primary w-full btn-sm rounded-lg">Go to Login</NavLink>
        </div>
      </div>
    );
  }

  const navLinkStyles = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 text-sm ` +
    `${isActive ? 'bg-primary text-primary-content shadow-md shadow-primary/20' : 'text-base-content/80 hover:bg-base-300 hover:text-base-content'}`;

  return (
    <>
      <Helmet>
        <title>Dashboard | Portal</title>
      </Helmet>

      <div className="drawer lg:drawer-open min-h-screen bg-base-100 text-base-content">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        
        {/* মেইন কনটেন্ট এরিয়া */}
        <div className="drawer-content flex flex-col bg-base-200/50">
          
          {/* রেসপন্সিভ টপ হেডার বার */}
          <header className="navbar bg-base-100 border-b border-base-300 px-4 py-2 lg:px-8 sticky top-0 z-10 backdrop-blur bg-opacity-90">
            <div className="flex-1">
              <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-circle lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
              </label>
              <h1 className="text-lg font-bold tracking-tight hidden lg:block">
                Welcome back, <span className="text-primary">{currentUser?.name || 'User'}</span>
              </h1>
            </div>
            
            <div className="flex-none gap-4">
              <div className="badge badge-primary badge-outline font-semibold uppercase px-3 py-2 text-xs tracking-wider">
                {currentUser?.role} Portal
              </div>
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-9">
                  <span className="text-xs uppercase">{currentUser?.name?.substring(0, 2) || 'U'}</span>
                </div>
              </div>
            </div>
          </header>

          {/* ডাইনামিক পেজ ভিউ কনটেন্ট */}
          <main className="p-4 md:p-6 lg:p-8 flex-1 w-full max-w-7xl mx-auto">
            <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-300 min-h-[calc(100vh-140px)]">
              <Outlet />
            </div>
          </main>
        </div>
        
        {/* সাইডবার সেকশন */}
        <div className="drawer-side z-20">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <div className="w-72 min-h-full bg-base-100 border-r border-base-300 flex flex-col p-4">
            
            {/* ব্র্যান্ড লোগো এরিয়া (PORTAL ডাবল লেখাটি এখানে সিঙ্গেল করা হয়েছে) */}
            <div className="px-4 py-5 border-b border-base-300 mb-6">
              <span className="text-xl font-black tracking-wider text-primary">PORTAL</span>
            </div>

            {/* মেনু লিংকের তালিকা */}
            <ul className="space-y-1.5 flex-1">
              
              {/* Seller Menu */}
              {currentUser?.role === "Seller" && (
                <>
                  <li>
                    <NavLink to="/dashboard/my-products" className={navLinkStyles}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                      My Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/add-product" className={navLinkStyles}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Add a Product
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/my-buyers" className={navLinkStyles}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      My Buyers
                    </NavLink>
                  </li>
                </>
              )}

              {/* Buyer Menu */}
              {currentUser?.role === "Buyer" && (
                <>
                  <li>
                    <NavLink to="/dashboard/my-orders" className={navLinkStyles}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                      My Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/wishlist" className={navLinkStyles}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      Wish List
                    </NavLink>
                  </li>
                </>
              )}

              {/* Admin Menu */}
              {currentUser?.role === "Admin" && (
                <>
                  <li>
                    <NavLink to="/dashboard/reported-items" className={navLinkStyles}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      Reported Items
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/all-buyers" className={navLinkStyles}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                      All Buyers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/all-sellers" className={navLinkStyles}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      All Sellers
                    </NavLink>
                  </li>
                </>
              )}

            </ul>
            
            <div className="mt-auto border-t border-base-300 pt-4 flex items-center justify-between">
              <div className="text-xs text-base-content/50">
                Logged in as <span className="font-semibold block text-base-content/80">{currentUser?.email}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;