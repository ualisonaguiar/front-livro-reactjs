import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost/api/',
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    }
});

export default api;
