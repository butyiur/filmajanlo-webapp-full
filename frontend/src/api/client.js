import axios from "axios";

export const auth = {
    get() {
        return localStorage.getItem("basicAuth") || "";
    },
    set(token) {
        if (token) localStorage.setItem("basicAuth", token);
        else localStorage.removeItem("basicAuth");
    }
};

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

// minden kérésre ráteszi az Authorization-t, ha van
api.interceptors.request.use((config) => {
    const token = auth.get();
    if (token) config.headers.Authorization = `Basic ${token}`;
    return config;
});

export default api;