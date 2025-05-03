import axios from "axios";

export const useAxios = axios.create({
    baseURL: 'https://vitapulse-api.onrender.com/api/',
    // timeout: 1000,
    withCredentials: true
});
