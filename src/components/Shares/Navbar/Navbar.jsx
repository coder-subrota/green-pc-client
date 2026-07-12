import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthProvider } from '../../../UserContext/UserContext';
import { toast } from 'react-toastify';
import { HiBars3 } from "react-icons/hi2";
import { HiOutlineLogout, HiOutlineUserCircle } from 'react-icons/hi';

const Navbar = () => {
  const { logOutUser, setUser, user } = useContext(AuthProvider);

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

  // নেভিগেশন লিঙ্কগুলো (Shared for both mobile & desktop)
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
    <header className="navbar cardbackground sticky top-0 z-50 px-4 md:px-8 py-3 shadow-md border-b border-base-200/10 backdrop-blur-md text-white">
      
      {/* --- NAVBAR START: Logo and Mobile Menu --- */}
      <div className="navbar-start">
        {/* মোবাইল ডিভাইসের জন্য হ্যামবার্গার মেনু */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <HiBars3 className="text-2xl" />
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl cardbackground border border-base-200 rounded-box w-52 space-y-2">
            {menuItems}
            {!user?.uid && (
              <>
                <div className="divider my-1"></div>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* লোগো সেকশন */}
        <NavLink to="/" className="flex items-center gap-2 md:gap-3 tracking-wide normal-case text-lg font-bold">
          <img 
            src="logo.png" 
            alt="Logo" 
            className="h-8 md:h-10 w-auto object-contain"
            style={{borderRadius:"18px"}}
          />
          <span className="text-success font-extrabold uppercase tracking-wider hidden sm:inline-block text-sm md:text-xl">
            All Green PC
          </span>
        </NavLink>
      </div>

      {/* --- NAVBAR CENTER: Desktop Menu --- */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1 text-sm font-medium">
          {menuItems}
        </ul>
      </div>

      {/* --- NAVBAR END: Profile Picture or Login Buttons --- */}
      <div className="navbar-end gap-3">
        {user?.uid ? (
          /* ইউজার লগ-ইন থাকলে প্রোফাইল পিকচার দেখাবে */
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar online border-2 border-success/30">
              <div className="w-10 rounded-full">
                <img 
                  src={user?.photoURL || "https://i.ibb.co/Pwh4tt1/noimgs.png"} 
                  alt="Profile" 
                />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl cardbackground border border-base-200 rounded-box w-56 space-y-2">
              <li className="px-4 py-2 font-bold text-success border-b border-base-200 mb-2">
                {user?.displayName || "User Profile"}
              </li>
              <li>
                <NavLink to="/profile" className="flex items-center gap-2 py-2">
                  <HiOutlineUserCircle className="text-lg" /> View Profile
                </NavLink>
              </li>
              <div className="divider opacity-10 my-1"></div>
              <li>
                <button 
                  onClick={handleLogOutUser}
                  className="btn btn-error btn-sm text-white flex items-center justify-center gap-2 w-full"
                >
                  <HiOutlineLogout className="text-base" /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          /* ইউজার লগ-ইন না থাকলে Login/Register বাটন দেখাবে (Desktop এ) */
          <div className="hidden lg:flex items-center gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm font-semibold">Login</Link>
            <Link to="/register" className="btn btn-success btn-sm text-white rounded-md px-5">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;