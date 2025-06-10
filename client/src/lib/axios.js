import axios from "axios";

// axios used instead of standard fetch
const axiosInstance = axios.create({
  // everything using axios will be built on top of this -> no need to add /api manually
  // conditional based on dev/prod
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3001/api"
      : "/api",
  // allows proper use of cookies
  withCredentials: true,
});

export default axiosInstance;
