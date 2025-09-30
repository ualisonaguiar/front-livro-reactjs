import axios from "axios";
import AuthenticatorService from "./AuthenticatorService";

const api = axios.create({
    baseURL: 'http://localhost/api/',
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    }
});

api.interceptors.request.use(config => {
    const token = AuthenticatorService.getToken();

    // Se a requisição tiver `requiresAuth = true`, adiciona token
    if (config.headers?.requiresAuth && token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
