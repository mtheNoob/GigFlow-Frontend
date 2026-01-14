import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <NotificationProvider>
        {/* 🔔 Toast system */}
        <Toaster position="top-right" reverseOrder={false} />

        <App />
      </NotificationProvider>
    </AuthProvider>
  </StrictMode>
);
