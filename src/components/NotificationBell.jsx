import { useState } from "react";
import { FiBell } from "react-icons/fi";
import { useNotifications } from "../context/NotificationContext";

function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAllRead } = useNotifications();

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        <FiBell size={22} />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-lg z-50">
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h4 className="font-semibold text-gray-800">
              Notifications
            </h4>
            {notifications.length > 0 && (
              <button
                onClick={markAllRead}
                className="text-sm text-blue-600 hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-500 p-4 text-center">
                No notifications
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`px-4 py-3 border-b text-sm ${
                    !n.read ? "bg-blue-50" : ""
                  }`}
                >
                  <p className="font-medium text-gray-800">
                    {n.title}
                  </p>
                  <p className="text-gray-600 mt-1">
                    {n.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;