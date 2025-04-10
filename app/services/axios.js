import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAccessToken();

      return axiosClient(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const refreshAccessToken = async () => {
  let refresh_token = localStorage.getItem("refresh");

  if (!refresh_token) {
    redirectToLogin();
  }

  let response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/token/refresh/",
    {
      refresh: refresh_token,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  try {
    let data = response.data;
    localStorage.setItem("token", data.access);
    axiosClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.access}`;

    return data;
  } catch (error) {
    if (error.response.status === 401) {
      redirectToLogin();
    }
    return Promise.reject(error);
  }
};

const redirectToLogin = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
  window.location = "/login";
  return;
};

export default axiosClient;
