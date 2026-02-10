import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 15000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = token; // matches backend middleware
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    // Professional message for backend down
    if (err.code === "ERR_NETWORK") {
      err.message =
        "Backend not reachable. Start server: cd server && node server.js (check /api/health)";
    }
    return Promise.reject(err);
  }
);

export default API;
