import axios from 'axios';

const http = axios.create({
  baseURL:  process.env.NEXT_PUBLIC_API_URL
});

const requestHandler = (request) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
  }
  return request;
};


const responseHandler = (response) => {
  return response;
};

const errorHandler = (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  return Promise.reject(error);
};

http.interceptors.request.use(requestHandler, errorHandler);
http.interceptors.response.use(responseHandler, errorHandler);

export default http;