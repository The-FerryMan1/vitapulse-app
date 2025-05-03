import axios from "axios";

export const useAxios = axios.create({
    baseURL: 'http://localhost:8888/api/',
    // timeout: 1000,
    withCredentials: true
});
