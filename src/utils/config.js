// config.js
import axios from "axios";
import CryptoJS from "crypto-js";

// LocalStorage dan ma'lumotlarni olish
let key = localStorage.getItem("key") || "";
let secret = localStorage.getItem("secret") || "";

export function setAuthData(userKey, userSecret) {
    key = userKey;
    secret = userSecret;
    localStorage.setItem("key", key);
    localStorage.setItem("secret", secret);
}

function generateSign(method, path, body, secret) {
    let bodyStr = "";
    if (body && (method === "POST" || method === "PATCH")) {
        bodyStr = JSON.stringify(body);
    }

    const signStr = method + path + bodyStr + secret;
    const sign = CryptoJS.MD5(signStr).toString();

    return sign;
}

// Axios instance yaratish
export const API = axios.create({
    baseURL: "https://lavina.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor: har bir so'rovdan oldin Sign qo'shiladi
API.interceptors.request.use((config) => {
    const method = config.method?.toUpperCase() || "GET";
    const path = new URL(config.url || "", API.defaults.baseURL).pathname;

    const sign = generateSign(method, path, config.data, secret);

    config.headers["Key"] = key;
    config.headers["Sign"] = sign;

    return config;
});

export const API_URL = "https://lavina.onrender.com/";