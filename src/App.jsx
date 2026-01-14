import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import GigFeed from "./pages/GigFeed";
import GigDetail from "./pages/GigDetail";
import Profile from "./pages/Profile";
import MyGigsPage from "./pages/MyGigsPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";

import MainLayout from "./layouts/MainLayout";
import NotificationListener from "./components/NotificationListener";
import socket from "./socket";

/* ============================
   Auth Helpers (temporary)
============================ */
const getStoredUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const isAuthenticated = () => {
  return !!localStorage.getItem("user");
};

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
}

/* ============================
   App Component
============================ */
function App() {
  const [user, setUser] = useState(getStoredUser());

  // 🔔 Join socket room once user is available
  useEffect(() => {
    if (user?._id) {
      socket.emit("join", user._id);
    }
  }, [user]);

  return (
    <BrowserRouter>
      {/* 🔔 Global socket notification listener */}
      <NotificationListener />

      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Routes */}
        <Route
          path="/gigs"
          element={
            <ProtectedRoute>
                <GigFeed />
            </ProtectedRoute>
          }
        />

        <Route
          path="/gigs/:id"
          element={
            <ProtectedRoute>
                <GigDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-gigs"
          element={
            <ProtectedRoute>
                <MyGigsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <ProtectedRoute>
                <MyApplicationsPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/gigs" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
