import axios from "axios";

export const useAxios = axios.create({
    // baseURL: 'http://localhost:8888/api/', 


    // production
    baseURL: 'https://vitapulse-api.onrender.com/api/', 
    withCredentials: true
});
