// import { NavLink } from "react-router-dom";
// import {
//   FiHome,
//   FiUser,
//   FiBriefcase,
//   FiFileText,
//   FiLogOut,
// } from "react-icons/fi";

// function Sidebar() {
//   const linkClass = ({ isActive }) =>
//     `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
//       isActive
//         ? "bg-blue-600 text-white"
//         : "text-gray-600 hover:bg-gray-100"
//     }`;

//   const handleLogout = () => {
//     // 🔒 Later:
//     // 1. Call logout API
//     // 2. Clear auth state
//     // 3. Redirect to /login
//     console.log("Logout clicked");
//   };

//   return (
//     <aside className="w-64 bg-white border-r min-h-screen p-4 flex flex-col">
//       {/* Logo / Title */}
//       <div className="mb-8 px-2">
//         <h2 className="text-xl font-bold text-blue-600">
//           GigFlow
//         </h2>
//         <p className="text-xs text-gray-400">
//           Freelance Marketplace
//         </p>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 space-y-2">
//         <NavLink to="/gigs" className={linkClass}>
//           <FiHome size={18} />
//           <span>Gigs</span>
//         </NavLink>

//         <NavLink to="/profile" className={linkClass}>
//           <FiUser size={18} />
//           <span>Profile</span>
//         </NavLink>

//         <NavLink to="/my-gigs" className={linkClass}>
//           <FiBriefcase size={18} />
//           <span>My Gigs</span>
//         </NavLink>

//         <NavLink to="/applications" className={linkClass}>
//           <FiFileText size={18} />
//           <span>My Applications</span>
//         </NavLink>
//       </nav>

//       {/* Divider */}
//       <div className="border-t my-4" />

//       {/* Logout */}
//       <button
//         onClick={handleLogout}
//         className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium transition"
//       >
//         <FiLogOut size={18} />
//         <span>Logout</span>
//       </button>
//     </aside>
//   );
// }

// export default Sidebar;
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiFileText,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import socket from "../socket";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `group relative flex items-center justify-center
     w-12 h-12 rounded-lg transition
     ${
       isActive
         ? "bg-blue-600 text-white"
         : "text-gray-500 hover:bg-gray-100"
     }`;

  const tooltipClass =
    "absolute left-14 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition";

  const handleLogout = async () => {
    try {
      console.log("🚪 Logging out...");

      // 🔌 Disconnect socket
      socket.disconnect();

      // 🔒 Clear auth (API + context + localStorage)
      await logout();

      // 🚀 Redirect
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <aside className="fixed top-0 left-0 w-20 h-screen bg-white border-r flex flex-col items-center z-40">
      {/* Big Logo */}
      <div className="h-24 flex items-center justify-center">
        <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
          G
        </div>
      </div>

      {/* Centered Navigation */}
      <nav className="flex-1 flex flex-col items-center justify-center gap-4">
        <NavLink to="/gigs" className={linkClass}>
          <FiHome size={22} />
          <span className={tooltipClass}>Gigs</span>
        </NavLink>

        <NavLink to="/my-gigs" className={linkClass}>
          <FiBriefcase size={22} />
          <span className={tooltipClass}>My Gigs</span>
        </NavLink>

        <NavLink to="/applications" className={linkClass}>
          <FiFileText size={22} />
          <span className={tooltipClass}>Applications</span>
        </NavLink>

          <NavLink to="/profile" className={linkClass}>
          <FiUser size={22} />
          <span className={tooltipClass}>Profile</span>
        </NavLink>
      </nav>

      {/* Logout Bottom */}
      <div className="h-24 flex items-center justify-center">
        <button
          onClick={handleLogout}
          className="group relative flex items-center justify-center w-12 h-12 rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <FiLogOut size={22} />
          <span className={tooltipClass}>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

