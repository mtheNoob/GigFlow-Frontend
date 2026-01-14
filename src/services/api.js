import axios from "axios";

const api = axios.create({
  baseURL: "https://gigflow-backend-k53b.onrender.com",
  withCredentials: true, 
});

export default api;
