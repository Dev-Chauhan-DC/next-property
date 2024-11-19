import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cookieName } from '../../local_storage/cookies';

const remInstance: AxiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
    timeout: 10000,
});



// Request interceptor
remInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // Modify request config before sending (e.g., add authorization headers)
        const token = await AsyncStorage.getItem(cookieName.token);
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Response interceptor
remInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Modify response data before passing it to your components
        return response;
    },
    (error) => {
        // Handle response errors (e.g., token expiration, 401 Unauthorized)
        if (error.response && error.response.status === 401) {
            // Redirect to login or refresh token logic
        }
        return Promise.reject(error);
    }
);



export default remInstance;