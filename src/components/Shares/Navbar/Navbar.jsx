import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthProvider } from '../../../UserContext/UserContext';
import { toast } from 'react-toastify';
import { HiBars3 } from "react-icons/hi2";
import { HiOutlineLogout, HiOutlineUserCircle } from 'react-icons/hi';

const Navbar = () => {
  const { logOutUser, setUser, user } = useContext(AuthProvider);

  // Handle log out user safely with error fallback handling
  const handleLogOutUser = () => {
    logOutUser()
      .then(() => {
        toast.info("Logged out successfully!");
        setUser({});
      })
      .catch((error) => {
        toast.error(error.message || "Something went wrong while logging out");
      });
  };

  // Centralized Navigation Links Architecture
  const menuItems = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => isActive ? "text-success font-semibold" : ""}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/blogs" className={({ isActive }) => isActive ? "text-success font-semibold" : ""}>
          Blogs
        </NavLink>
      </li>
      {user?.uid && (
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-success font-semibold" : ""}>
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <header className="navbar cardbackground sticky top-0 z-50 px-4 md:px-8 py-3 shadow-md border-b border-base-200/10 backdrop-blur-md">
      {/* Navbar Start Section */}
      <div className="navbar-start">
        {/* Mobile Dropdown Viewports */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost p-1 lg:hidden text-2xl mr-2" aria-label="Open Menu">
            <HiBars3 />
          </label>
          <ul 
            tabIndex={0} 
            className="menu menu-sm dropdown-content mt-3 p-3 shadow-xl cardbackground border border-base-200 rounded-box w-56 space-y-1"
          >
            {menuItems}
            {user?.uid && (
              <>
                <div className="divider opacity-20 my-1"></div>
                <li>
                  <button onClick={handleLogOutUser} className="btn btn-error btn-sm text-white w-full flex items-center justify-center gap-2">
                    <HiOutlineLogout /> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Corporate Brand Identity Logo */}
        <NavLink to="/" className="flex items-center gap-3 tracking-wide normal-case text-lg font-bold">
          <img 
            src="https://i.ibb.co/5nPLpJK/logo.webp" 
            alt="All Green Computers Logo" 
            className="h-9 w-auto object-contain"
          />
          <span className="text-success font-extrabold uppercase tracking-wider hidden md:inline-block">
            All Green Computers
          </span>
        </NavLink>
      </div>

      {/* Navbar Center Section (Desktop Viewports) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1 text-sm font-medium">
          {menuItems}
        </ul>
      </div>

      {/* Navbar End Section */}
      <div className="navbar-end gap-3">
        {user?.uid ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar online border-2 border-primary/20">
              <div className="w-10 rounded-full">
                <img 
                  src={user?.photoURL || "https://i.ibb.co/Pwh4tt1/noimgs.png"} 
                  alt="Authenticated user avatar" 
                />
              </div>
            </label>
            <ul 
              tabIndex={0} 
              className="menu menu-sm dropdown-content mt-3 p-3 shadow-xl cardbackground border border-base-200 rounded-box w-56 space-y-2"
            >
              <li>
                <NavLink to="/profile" className="flex items-center justify-between py-2.5">
                  <span className="flex items-center gap-2"><HiOutlineUserCircle className="text-lg" /> Profile</span>
                  
                </NavLink>
              </li>
              <div className="divider opacity-10"></div>
              <li>
                <button 
                  className="btn btn-error btn-sm text-white w-full flex items-center justify-center gap-2"
                  onClick={handleLogOutUser}
                >
                  <HiOutlineLogout className="text-base" /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-2">
            <NavLink to="/login" className="btn btn-ghost btn-sm">Login</NavLink>
            <NavLink to="/register" className="btn btn-primary btn-sm px-4">Get Started</NavLink>
          </div>
        )}

        {/* Mobile Responsive Structural Hook for Optional Drawer Toggles */}
        <label 
          htmlFor="dashboard" 
          className="drawer-button lg:hidden text-2xl font-bold ml-1 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
        >
          <HiBars3 />
        </label>
      </div>
    </header>
  );
};

export default Navbar;