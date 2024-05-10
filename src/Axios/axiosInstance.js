import axios from "axios"
import { API } from "./endPoint";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";


export const axiosInstance = axios.create({
    baseURL: API,
    headers: {
        'Content-Type': 'application/json'
    }
});


axiosInstance.interceptors.request.use(
    config => {
        // Retrieve token from local storage
        const token = localStorage.getItem('access');
        console.log('token', token);
        
        // If token exists, add it to the request headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);