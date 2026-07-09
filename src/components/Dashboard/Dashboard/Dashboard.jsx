import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { AuthContext, AuthProvider } from '../../../UserContext/UserContext'; 
import { BeatLoader } from 'react-spinners';

const Dashboard = () => {
  const { currentUser, loading } = useContext(AuthProvider);
  const location = useLocation();

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

  const userImage = currentUser?.photoURL || currentUser?.image;
  const userInitials = currentUser?.name?.substring(0, 2) || 'U';

  const navLinkStyles = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 text-sm ` +
    `${isActive ? 'bg-primary text-primary-content shadow-lg shadow-primary/20 scale-[1.02]' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}`;

  const WelcomeHome = () => (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 animate-in fade-in zoom-in duration-700">
      <div className="avatar mb-8">
        <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 shadow-2xl">
          {userImage ? (
            <img src={userImage} alt={currentUser?.name} />
          ) : (
            <div className="bg-neutral text-neutral-content flex items-center justify-center text-4xl font-black uppercase w-full h-full">
              {userInitials}
            </div>
          )}
        </div>
      </div>
      <h2 className="text-4xl font-black text-base-content tracking-tight">Welcome to Home Dashboard</h2>
      <p className="mt-4 text-base-content/60 max-w-md mx-auto text-lg leading-relaxed">
        Hello <span className="font-bold text-primary">{currentUser?.name}</span>, you are currently managing the <span className="badge badge-primary badge-outline font-bold px-3">{currentUser?.role}</span> portal.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 w-full max-w-3xl">
        <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm">
          <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">System Status</div>
          <div className="text-success font-bold flex items-center justify-center gap-2 text-sm">
            <span className="w-2.5 h-2.5 bg-success rounded-full animate-pulse"></span> ONLINE
          </div>
        </div>
        <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm">
          <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Account Role</div>
          <div className="text-primary font-bold uppercase text-sm">{currentUser?.role}</div>
        </div>
        <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm">
          <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Identity</div>
          <div className="text-info font-bold text-sm">VERIFIED</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        {/* Fixed: Fallback protection logic added here */}
        <title>Dashboard | {currentUser?.role || 'Portal'}</title>
      </Helmet>

      <div className="drawer lg:drawer-open min-h-screen bg-base-100">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col bg-base-200/40">
          {/* Header */}
          <header className="navbar bg-base-100 border-b border-base-300 px-4 py-3 lg:px-10 sticky top-0 z-10 backdrop-blur-md bg-opacity-95">
            <div className="flex-1">
              <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-circle lg:hidden mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
              </label>
              <div className="hidden lg:block">
                <h1 className="text-sm font-medium text-base-content/50 uppercase tracking-widest">Management Console</h1>
                <p className="text-xl font-bold capitalize text-base-content">{location.pathname === '/dashboard' ? 'Overview' : location.pathname.split('/').pop().replace('-', ' ')}</p>
              </div>
            </div>
            
            <div className="flex-none gap-4">
              <div className="hidden md:flex flex-col items-end mr-2">
                <p className="text-sm font-bold text-base-content leading-tight">{currentUser?.name}</p>
                <p className="text-[10px] font-medium text-primary uppercase tracking-tighter">{currentUser?.role}</p>
              </div>
              <div className="avatar">
                <div className="w-11 rounded-2xl ring-2 ring-primary/10 ring-offset-2 ring-offset-base-100">
                  {userImage ? (
                    <img src={userImage} alt="Profile" />
                  ) : (
                    <div className="bg-neutral text-neutral-content flex items-center justify-center w-full h-full text-sm font-bold">
                      {userInitials}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-4 md:p-8 lg:p-10 flex-1 w-full max-w-7xl mx-auto">
            <div className="bg-base-100 rounded-[2.5rem] shadow-sm border border-base-300 min-h-[calc(100vh-180px)] overflow-hidden">
              {location.pathname === '/dashboard' || location.pathname === '/dashboard/' ? (
                <WelcomeHome />
              ) : (
                <div className="p-4 md:p-8">
                    <Outlet />
                </div>
              )}
            </div>
          </main>
        </div>
    
        {/* Sidebar */}
        <div className="drawer-side z-20">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <div className="w-72 min-h-full bg-base-100 border-r border-base-300 flex flex-col p-6">
            
            {/* Nav Links */}
            <ul className="menu p-0 space-y-2 flex-1 mt-4">
              {currentUser?.role === "Seller" && (
                <>
                  <li className="text-[11px] uppercase font-black tracking-[0.2em] text-base-content/30 px-4 mb-2">Seller Menu</li>
                  <li><NavLink to="/dashboard/my-products" className={navLinkStyles}>My Products</NavLink></li>
                  <li><NavLink to="/dashboard/add-product" className={navLinkStyles}>Add a Product</NavLink></li>
                  <li><NavLink to="/dashboard/my-buyers" className={navLinkStyles}>My Buyers</NavLink></li>
                </>
              )}

              {currentUser?.role === "Buyer" && (
                <>
                  <li className="text-[11px] uppercase font-black tracking-[0.2em] text-base-content/30 px-4 mb-2">Personal</li>
                  <li><NavLink to="/dashboard/my-orders" className={navLinkStyles}>My Orders</NavLink></li>
                  <li><NavLink to="/dashboard/wishlist" className={navLinkStyles}>Wish List</NavLink></li>
                </>
              )}

              {currentUser?.role === "Admin" && (
                <>
                  <li className="text-[11px] uppercase font-black tracking-[0.2em] text-base-content/30 px-4 mb-2">Administration</li>
                  <li><NavLink to="/dashboard/reported-products" className={navLinkStyles}>Reported Items</NavLink></li>
                  <li><NavLink to="/dashboard/all-buyers" className={navLinkStyles}>All Buyers</NavLink></li>
                  <li><NavLink to="/dashboard/all-sellers" className={navLinkStyles}>All Sellers</NavLink></li>
                </>
              )}
            </ul>
            
            {/* Sidebar Bottom Profile Section */}
            <div className="mt-auto pt-6 border-t border-base-200">
              <div className="bg-base-200/50 p-4 rounded-3xl flex items-center gap-4">
                <div className="avatar">
                  <div className="w-10 rounded-xl">
                    {userImage ? (
                      <img src={userImage} alt="User" />
                    ) : (
                      <div className="bg-primary text-primary-content flex items-center justify-center w-full h-full text-xs font-black uppercase">
                        {userInitials}
                      </div>
                    )}
                  </div>
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-black truncate text-base-content">{currentUser?.name}</p>
                  <p className="text-[10px] font-bold opacity-40 truncate uppercase">{currentUser?.role}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;