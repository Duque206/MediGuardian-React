import route from 'ziggy-js';
import axios from "axios";
import useZiggyStore from "../stores/ZiggyStore";
import useUserStore from "../stores/UserStore";

const axiggy = axios.create({
    headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json"
    }
});

axiggy.interceptors.request.use(
    config => {
        const token = useUserStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (config.url) {
            config.url = route(config.url, config.params, undefined, useZiggyStore.getState().routes);
        }

        return config;
    },
    error => {
        return Promise.reject(error)
    }
);

axiggy.interceptors.response.use(
    response => response,
    error => {
        switch (error.response?.status) {
            case 401:
                useUserStore.getState().removeToken();
                break;
            default:
                return Promise.reject(error);
        }
    }
);

export default axiggy;
