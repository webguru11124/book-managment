import axios from "axios";
import { getStoreItem } from "../services/localstorage.service"; // Update the path according to your project structure

const api = "http://localhost:8100/api";

export const apiSearch = `${api}`;
export const loginUrl = "/login";

export const customHeader = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

const apiClient = axios.create({

    apiSearch,
    headers: customHeader,
});

// Add request interceptor to set the Authorization header
apiClient.interceptors.request.use(
    (config) => {
        const jwt = getStoreItem("auth")?.jwt; // Get JWT from local storage
        if (jwt) {
            config.headers.Authorization = `Bearer ${jwt}`;
        } else {
            // config.headers.Authorization = `token ${applicationToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
export { api };
