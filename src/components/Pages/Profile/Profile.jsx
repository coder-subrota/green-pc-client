import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthProvider } from '../../../UserContext/UserContext';
import WaveStart from '../../Shares/Wave/Wave';
import { HiOutlineMail, HiOutlineUser } from 'react-icons/hi';

const Profile = () => {
  const { user } = useContext(AuthProvider);

  // Fallback avatar image if user has no photoURL
  const defaultAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80";

  return (
    <>
      <Helmet>
        <title>Profile | Dashboard</title>
      </Helmet>

      <div className="relative min-h-[70vh] w-full overflow-hidden bg-base-900 pb-12">
        {/* Animated Wave Header */}
        <div className="w-full">
          <WaveStart />
        </div>

        {/* Profile Card Container */}
        <div className="container mx-auto -mt-16 px-4 relative z-10 max-w-xl">
          <div className="card bg-base-100/10 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col items-center text-center">
            
            {/* User Image Wrapper */}
            <div className="relative mb-6">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-primary to-secondary shadow-lg">
                <img 
                  src={user?.photoURL || defaultAvatar} 
                  alt={user?.fullName || "User profile"} 
                  className="w-full h-full object-cover rounded-full bg-base-200"
                  onError={(e) => { e.target.src = defaultAvatar; }}
                />
              </div>
              <span className="absolute bottom-1 right-2 w-5 h-5 bg-success border-2 border-base-100 rounded-full"></span>
            </div>

            {/* Profile Info Details */}
            <div className="w-full space-y-4 text-left mt-2">
              <div className="divider opacity-20 my-2"></div>

              {/* Name Block */}
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="p-2.5 bg-primary/10 text-primary rounded-lg">
                  <HiOutlineUser className="text-xl" />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold uppercase tracking-wider text-base-content/50">Full Name</p>
                  <p className="text-lg font-bold text-base-content truncate">
                    {user?.fullName || "Name not available"}
                  </p>
                </div>
              </div>

              {/* Email Block */}
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="p-2.5 bg-secondary/10 text-secondary rounded-lg">
                  <HiOutlineMail className="text-xl" />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold uppercase tracking-wider text-base-content/50">Email Address</p>
                  <p className="text-lg font-medium text-base-content/90 truncate">
                    {user?.email || "Email not available"}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;