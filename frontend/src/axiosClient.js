import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// console.log(import.meta.env.VITE_API_BASE_URL);

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");

  config.headers["x-auth-token"] = token;

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;

      //user is unauthorised
      if (response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
      }
    } catch (error) {
      console.error(error);
    }

    throw error;
  }
);

export default axiosClient;
