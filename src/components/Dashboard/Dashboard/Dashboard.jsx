import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, Outlet } from 'react-router-dom';
// Changed AuthProvider to AuthContext (assuming that's your context name)
import UserContext, { AuthContext, AuthProvider } from '../../../UserContext/UserContext'; 
import { BeatLoader } from 'react-spinners';

const Dashboard = () => {
  // Use AuthContext here instead of the AuthProvider component
  const { currentUser, loading } = useContext(AuthProvider);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BeatLoader color="#4A90E2" />
      </div>
    );
  }

  // Safety check: If there's no user, prevent the app from crashing on `currentUser.role`
  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-bold">Access Denied. Please log in.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard | Portal</title>
      </Helmet>

      <div className="drawer lg:drawer-open"> {/* Updated DaisyUI class for responsiveness */}
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col items-center justify-center p-4">
          {/* Main content wrapper */}
          <div className="w-full h-full">
            <Outlet />
          </div>
        </div>
        
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content font-bold text-lg space-y-2">
            
            {/* Seller Menu */}
            {currentUser?.role === "Seller" && (
              <>
                <li><NavLink to="/dashboard/my-products">My Products</NavLink></li>
                <li><NavLink to="/dashboard/add-product">Add a Product</NavLink></li>
                <li><NavLink to="/dashboard/my-buyers">My Buyers</NavLink></li>
              </>
            )}

            {/* Buyer Menu */}
            {currentUser?.role === "Buyer" && (
              <>
                <li><NavLink to="/dashboard/my-orders">My Orders</NavLink></li>
                <li><NavLink to="/dashboard/wishlist">Wish List</NavLink></li> {/* Fixed typo 'wishtList' */}
              </>
            )}

            {/* Admin Menu */}
            {currentUser?.role === "Admin" && (
              <>
                <li><NavLink to="/dashboard/reported-items">Reported Items</NavLink></li> {/* Fixed typo 'repoted' */}
                <li><NavLink to="/dashboard/all-buyers">All Buyers</NavLink></li>
                <li><NavLink to="/dashboard/all-sellers">All Sellers</NavLink></li>
              </>
            )}

          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;