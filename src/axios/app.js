import axios from 'axios';
import {AUTH_TOKEN} from "../shared/utility";


const instance = axios.create({
    baseURL: process.env.REACT_APP_HOST_ENV,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
});

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem(AUTH_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // console.log('ERROR SETTING HEADER');
        }
        return config;
    },
    error => Promise.reject(error)
);

export default instance;