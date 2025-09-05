import axios from "axios";

const api = axios.create({
    baseURL: 'http://web-laravel/api/',
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    }
});

export default api;
