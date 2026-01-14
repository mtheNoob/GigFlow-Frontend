import { io } from "socket.io-client";

// const socket = io("http://localhost:4000", {
const socket = io("https://gigflow-backend-k53b.onrender.com", {

  withCredentials: true,
});

socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Socket disconnected");
});

export default socket;
