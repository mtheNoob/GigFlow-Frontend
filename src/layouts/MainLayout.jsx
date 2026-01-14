import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import PostGigForm from "../components/PostGigForm";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "../components/NotificationBell";

function MainLayout({ children, onGigPosted }) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content (offset for sidebar width) */}
      <div className="ml-20 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            GigFlow
          </h1>

          <div className="flex items-center gap-5">
            {/* 🔔 Notifications */}
            <NotificationBell />

            {/* Post Gig */}
            <button
              onClick={() => setOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Post a Gig
            </button>

            {/* User Avatar */}
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="text-sm text-gray-500 hover:text-red-600 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Post Gig Modal */}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Post a New Gig"
      >
        <PostGigForm
          onSubmit={() => {
            setOpen(false);
            onGigPosted?.(); // 🔁 refresh GigFeed / MyGigs
          }}
        />
      </Modal>
    </div>
  );
}

export default MainLayout;
