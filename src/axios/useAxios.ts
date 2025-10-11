import axios from "axios";

export const useAxios = axios.create({
  baseURL: import.meta.env.VITE_DOMAIN_NAMe,

  // productions
  // baseURL: 'https://vitapulse-api.onrender.com/api/',
  withCredentials: true,
});
