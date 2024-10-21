import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:  process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.MOCKAROO_API_KEY
  }
});


axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;