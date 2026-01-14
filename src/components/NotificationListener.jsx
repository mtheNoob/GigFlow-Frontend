import { useEffect } from "react";
import socket from "../socket";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";

function NotificationListener() {
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  useEffect(() => {
    const userId = user?._id || user?.id;
    if (!userId) return;

    socket.emit("join", userId);

    socket.on("hired", (data) => {
      console.log("🔔 Notification received:", data);

      addNotification({
        title: "You got hired 🎉",
        message: `You were hired for "${data.gigTitle}"`,
        gigId: data.gigId,
      });

      toast.success(`🎉 You were hired for "${data.gigTitle}"`);
    });

    return () => {
      socket.off("hired");
    };
  }, [user]);

  return null;
}

export default NotificationListener;
